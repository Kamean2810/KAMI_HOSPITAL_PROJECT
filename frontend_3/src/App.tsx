import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ContactUs from "./pages/ContactUs";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Appointment from "./pages/Appointment";
import Login from "./pages/Login"; // Adjust the path
import Register from "./pages/Register";


const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<ContactUs />} />
         <Route path="/appointments"element={<Appointment/>} />
         <Route path="/login" element={<Login />} />
<Route path="/register" element={<Register />} />

      </Routes>
        <Footer />
    </BrowserRouter>
  );
};

export default App;
