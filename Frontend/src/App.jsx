// src/App.js
import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Dashboard from "./Components/Dashboard";
import Income from "./Components/Income";
import Expense from "./Components/Expense";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mx-auto pt-30">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/income" element={<Income />} />
          <Route path="/expense" element={<Expense />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
