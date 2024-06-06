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
import { ManageAttendance } from "./components/ManageAttendance";
import { AddUser } from "./components/AddUser";
import { Users } from "./components/Users";

function App() {
  const [user, setUser] = useState(null);
  const [shifts, setShifts] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [userById, setUserById] = useState({});

  const refetchShifts = () => {
    setTimeout(() => {
      setUser({ ...user });
    }, 1000);
  };

  const isLoggedIn = !!user;
  const isAdmin = user?.type === "admin";
  const userGroup = user?.group;

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await httpService.get("/users");
      const allUsers = response.data.users;
      setAllUsers(allUsers);
      return allUsers;
    };
    const getShifts = async (userId) => {
      const response = await httpService.get(`/shifts/${userId}`);
      setShifts(response.data.shifts);
    };

    const getAdminShifts = async (users) => {
      const response = await httpService.get("/shifts/admin");
      const userIdToUser = users.reduce((acc, user) => {
        acc[user.id] = user;
        return acc;
      }, {});
      setUserById(userIdToUser);
      response.data.shifts.forEach((shift) => {
        shift.userName = userIdToUser[shift.userId].name;
      });

      const filteredByGroup = userGroup
        ? response.data.shifts.filter(
            (shift) => userIdToUser[shift.userId].group === userGroup
          )
        : response.data.shifts;

      setShifts(filteredByGroup);
    };

    if (!user?.id) {
      return;
    }
    if (isAdmin) {
      fetchUsers().then((users) => {
        getAdminShifts(users);
      });
    } else {
      getShifts(user.id);
    }
  }, [isAdmin, user?.id, user, userGroup]);

  return (
    <>
      <Navbar setUser={setUser} isAdmin={isAdmin} user={user} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        {isLoggedIn && (
          <>
            <Route
              path="/calendar"
              element={
                <Calendar
                  shifts={shifts}
                  isAdmin={isAdmin}
                  allUsers={allUsers}
                />
              }
            />
            <Route
              path="/messages"
              element={
                <Messages
                  user={user}
                  isAdmin={isAdmin}
                  allUsers={allUsers}
                  userById={userById}
                />
              }
            />
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
            <Route path="/add-user" element={<AddUser />} />
            <Route path="/users" element={<Users />} />
            <Route path="/attendance" element={<ManageAttendance />} />
          </>
        )}
        {isLoggedIn && !isAdmin && (
          <>
            <Route path="/calendar" element={<Calendar shifts={shifts} />} />
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
