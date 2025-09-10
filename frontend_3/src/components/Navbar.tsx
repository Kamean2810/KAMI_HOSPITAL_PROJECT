import React from "react";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  return (
    <nav className="bg-gray-400 text-white shadow-md h-20 flex items-center">
      <div className="container mx-auto flex justify-between items-center px-6">
        {/* Left: Logo */}
        <div className="flex items-center space-x-2">
          <img
            src="/logo.png" // replace with your logo path
            alt="KamiHospital Logo"
            className="h-24 w-24 object-contain"
          />
        </div>

        {/* Middle: Nav Links */}
        <div className="flex space-x-12 text-lg font-medium">
          <Link to="/" className="hover:text-gray-200 transition">
            Home
          </Link>
          <Link to="/contact" className="hover:text-gray-200 transition">
            Contact Us
          </Link>
          <Link to="/appointments" className="hover:text-gray-200 transition">
            Appointments
          </Link>
        </div>

        {/* Right: Login Button */}
        <div>
          <Link
            to="/login"
            className="bg-white text-blue-600 px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition"
          >
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
