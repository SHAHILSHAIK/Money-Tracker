import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Income = () => {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [incomeData, setIncomeData] = useState([]);
  const [editIncome, setEditIncome] = useState(null); // For editing income

  const navigate = useNavigate();

  // Add income to the database
  function handleAddIncome() {
    const data = { amount: Number(amount), date };

    axios
      .post("http://localhost:3001/api/income/add", data)
      .then((res) => {
        console.log("Income added:", res.data);
        setIncomeData([...incomeData, res.data]); // Add new income to state
        setAmount(""); // Clear input fields
        setDate("");
      })
      .catch((err) => {
        console.error("Error adding income:", err);
      });
  }

  // Fetch all income data when component is mounted
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/income/get")
      .then((res) => {
        setIncomeData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching income:", err);
      });
  }, []);

  // Handle income edit
  function handleEditIncome(income) {
    setEditIncome(income); // Set the selected income for editing
    setAmount(income.amount);
    setDate(income.date);
  }

  // Update an income
  function handleUpdateIncome() {
    if (!editIncome) return;

    const data = { amount: Number(amount), date };

    axios
      .put(`http://localhost:3001/api/income/update/${editIncome._id}`, data)
      .then((res) => {
        console.log("Income updated:", res.data);
        setIncomeData(
          incomeData.map((income) =>
            income._id === editIncome._id ? { ...income, ...data } : income
          )
        );
        setEditIncome(null); // Reset editing state
        setAmount(""); // Clear input fields
        setDate("");
      })
      .catch((err) => {
        console.error("Error updating income:", err);
      });
  }

  // Delete an income
  function handleDeleteIncome(id) {
    axios
      .delete(`http://localhost:3001/api/income/delete/${id}`)
      .then((res) => {
        console.log("Income deleted:", res.data);
        setIncomeData(incomeData.filter((income) => income._id !== id)); // Remove deleted income from state
      })
      .catch((err) => {
        console.error("Error deleting income:", err);
      });
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">
        {editIncome ? "Edit Income" : "Add Income"}
      </h1>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 rounded w-full mb-4"
        placeholder="Enter income amount"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 rounded w-full mb-4"
        placeholder="Select date"
      />

      <button
        onClick={editIncome ? handleUpdateIncome : handleAddIncome}
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        {editIncome ? "Update Income" : "Add Income"}
      </button>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Income List</h2>
        {incomeData.length > 0 ? (
          incomeData.map((income) => (
            <div
              key={income._id}
              className="mb-4 p-4 bg-white shadow-lg rounded-lg flex flex-col space-y-2"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    Amount: ₹{income.amount}
                  </h2>
                  <p className="text-md text-gray-600">
                    Date: {new Date(income.date).toLocaleDateString()}
                  </p>
                </div>
                <div className="space-x-4">
                  <button
                    onClick={() => handleEditIncome(income)}
                    className="bg-blue-500 text-white px-3 py-1.5 rounded mt-2 w-32"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteIncome(income._id)}
                    className="bg-red-500 text-white px-3 py-1.5 rounded mt-2 ml-2 w-32"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-xl text-gray-500">No income data available.</p>
        )}
      </div>
    </div>
  );
};

export default Income;
