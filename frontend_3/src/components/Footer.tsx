import React from "react";
import { Link } from "react-router-dom";
import { FaLocationArrow, FaPhone } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

interface Hour {
  id: number;
  day: string;
  time: string;
}

const Footer: React.FC = () => {
  const hours: Hour[] = [
    { id: 1, day: "Monday", time: "9:00 AM - 11:00 PM" },
    { id: 2, day: "Tuesday", time: "12:00 PM - 12:00 AM" },
    { id: 3, day: "Wednesday", time: "10:00 AM - 10:00 PM" },
    { id: 4, day: "Thursday", time: "9:00 AM - 9:00 PM" },
    { id: 5, day: "Friday", time: "3:00 PM - 9:00 PM" },  // Fixed duplicate Monday → Friday
    { id: 6, day: "Saturday", time: "9:00 AM - 3:00 PM" },
  ];

  return (
    <footer className="bg-gray-500 text-gray-200 py-10">
      <div className="container mx-auto px-4">
        <hr className="border-gray-700 mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {/* Logo */}
          <div className="flex items-center justify-center md:justify-start">
            <img src="/logo.png" alt="logo" className="h-60 w-auto" />
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Quick Links</h4>
            <ul className="flex flex-col space-y-2">
              <li>
                <Link to="/" className="hover:text-blue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/appointment" className="hover:text-blue-400 transition-colors">
                  Appointment
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-blue-400 transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Hours</h4>
            <ul className="space-y-2">
              {hours.map(({ id, day, time }) => (
                <li key={id} className="flex justify-between border-b border-gray-700 pb-1">
                  <span>{day}</span>
                  <span>{time}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xl font-semibold mb-4">Contact</h4>
            <div className="flex items-center space-x-3 mb-3">
              <FaPhone className="text-blue-400" />
              <span>+92 302 0473116</span>
            </div>
            <div className="flex items-center space-x-3 mb-3">
              <MdEmail className="text-blue-400" />
              <span>kami0473116@gmail.com</span>
            </div>
            <div className="flex items-center space-x-3">
              <FaLocationArrow className="text-blue-400" />
              <span>Lahore, Pakistan</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
