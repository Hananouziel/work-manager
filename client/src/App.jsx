import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { useEffect, useState } from "react";
import { Calendar } from "./components/Calendar";
import { Navbar } from "./components/Navbar";
import { Shifts } from "./components/Shifts";
import { ShiftStatus } from "./components/ShiftStatus";
import { httpService } from "./api";
import { Attendance } from "./components/Attendance";
import { Messages } from "./components/Messages";
import { About } from "./components/About";

function App() {
  const [user, setUser] = useState(null);
  const [shifts, setShifts] = useState([]);

  const refetchShifts = () => {
    setTimeout(() => {
      setUser({ ...user });
    }, 1000);
  };

  const isLoggedIn = !!user;
  const isAdmin = user?.type === "admin";

  useEffect(() => {
    const getShifts = async (userId) => {
      const response = await httpService.get(`/shifts/${userId}`);
      setShifts(response.data.shifts);
    };

    const getAdminShifts = async () => {
      const response = await httpService.get("/shifts");
      setShifts(response.data.shifts);
    };

    if (!user?.id) {
      return;
    }
    if (isAdmin) {
      getAdminShifts();
    } else {
      getShifts(user.id);
    }
  }, [isAdmin, user?.id, user]);

  return (
    <>
      <Navbar setUser={setUser} isAdmin={isAdmin} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        {isLoggedIn && (
          <>
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/messages" element={<Messages user={user} />} />
          </>
        )}
        {isAdmin && (
          <>
            <Route
              path="/shifts-approval"
              element={
                <ShiftStatus
                  user={user}
                  refetchShifts={refetchShifts}
                  shifts={shifts}
                  isAdmin={isAdmin}
                />
              }
            />
          </>
        )}
        {isLoggedIn && !isAdmin && (
          <>
            <Route path="/calendar" element={<Calendar />} />
            <Route
              path="/shifts"
              element={<Shifts user={user} refetchShifts={refetchShifts} />}
            />
            <Route
              path="/shift-status"
              element={<ShiftStatus shifts={shifts} />}
            />
            <Route path="/attendance" element={<Attendance user={user} />} />
            <Route path="/about" element={<About user={user} />} />
          </>
        )}
        <Route path="/*" element={<Login setUser={setUser} />} />
      </Routes>
    </>
  );
}

export default App;
