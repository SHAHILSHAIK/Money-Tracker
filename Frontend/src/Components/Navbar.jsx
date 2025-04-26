// src/components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-violet-600 w-full h-24 p-4 flex fixed z-10">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <h1 className="text-2xl font-bold text-white">Money Tracker</h1>

        {/* Navigation Links */}
        <div className="space-x-6">
          <Link
            to="/"
            className="text-white text-2xl hover:text-gray-200 transition"
          >
            Dashboard
          </Link>
          <Link
            to="/income"
            className="text-white text-2xl hover:text-gray-200 transition"
          >
            Add Income
          </Link>
          <Link
            to="/expense"
            className="text-white text-2xl hover:text-gray-200 transition"
          >
            Add Expense
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
