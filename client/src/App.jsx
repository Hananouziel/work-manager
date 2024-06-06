import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home } from "./components/Home";
import { Login } from "./components/Login";
import { useState } from "react";
import { Calendar } from "./components/Calendar";
import { Navbar } from "./components/Navbar";
import { Shifts } from "./components/Shifts";

function App() {
  const [user, setUser] = useState(null);
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/calendar" element={<Calendar />} />
        <Route path="/shifts" element={<Shifts />} />
      </Routes>
    </>
  );
}

export default App;
