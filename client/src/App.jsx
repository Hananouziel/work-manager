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

function App() {
  const [user, setUser] = useState(null);
  const [shifts, setShifts] = useState([]);

  const refetchShifts = () => {
    setTimeout(() => {
      setUser({ ...user });
    }, 1000);
  };

  const isLoggedIn = !!user;

  useEffect(() => {
    const getShifts = async (userId) => {
      const response = await httpService.get(`/shifts/${userId}`);
      setShifts(response.data.shifts);
    };

    if (user?.id) {
      getShifts(user.id);
    }
  }, [user?.id]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        {isLoggedIn && (
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
          </>
        )}
        <Route path="/*" element={<Login setUser={setUser} />} />
      </Routes>
    </>
  );
}

export default App;
