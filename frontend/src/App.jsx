import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Aboutus from "./pages/Aboutus";
import Contact from "./pages/Contact";
import EmployeeDashbaord from "./pages/Dashboard/EmployeeDashboard.jsx";
import DirectorDashboard from "./pages/Dashboard/DirectorDashboard.jsx";
import HODDashboard from "./pages/Dashboard/HODDashboard.jsx"

const App = () => {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/aboutus" element={<Aboutus />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/employee-dashboard" element={<EmployeeDashbaord />} />
          <Route path="/director-dashboard" element={<DirectorDashboard />} />
          <Route path="/hod-dashboard" element={<HODDashboard />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
