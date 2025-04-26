import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Expense = () => {
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [expenseData, setExpenseData] = useState([]);
  const [editExpense, setEditExpense] = useState(null); // For editing expenses

  const navigator = useNavigate();

  // Add expense to the database
  function handleAddExpense() {
    const data = { amount, category, date };

    axios
      .post("http://localhost:3001/api/spendings/add", data)
      .then((res) => {
        console.log("Expense added:", res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.error("Error adding expense:", err);
      });
  }

  // Fetch all expense data when component is mounted
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/spendings/get")
      .then((res) => {
        setExpenseData(res.data);
      })
      .catch((err) => {
        console.error("Error fetching expenses:", err);
      });
  }, []);

  // Handle expense edit
  function handleEditExpense(expense) {
    setEditExpense(expense); // Set the selected expense for editing
    setAmount(expense.amount);
    setCategory(expense.category);
    setDate(expense.date);
  }

  // Update an expense
  function handleUpdateExpense() {
    if (!editExpense) return;

    const data = { amount, category, date };

    axios
      .put(
        `http://localhost:3001/api/spendings/update/${editExpense._id}`,
        data
      )
      .then((res) => {
        console.log("Expense updated:", res.data);
        window.location.reload();
      })
      .catch((err) => {
        console.error("Error updating expense:", err);
      });
  }

  // Delete an expense
  function handleDeleteExpense(id) {
    axios
      .delete(`http://localhost:3001/api/spendings/delete/${id}`)
      .then((res) => {
        console.log("Expense deleted:", res.data);
        setExpenseData(expenseData.filter((expense) => expense._id !== id)); // Remove deleted expense from state
        window.location.reload();
      })
      .catch((err) => {
        console.error("Error deleting expense:", err);
      });
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-4">
        {editExpense ? "Edit Expense" : "Add Expense"}
      </h1>

      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 rounded w-full mb-4"
        placeholder="Enter expense amount"
      />
      <input
        type="text"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 rounded w-full mb-4"
        placeholder="Enter expense category"
      />
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 rounded w-full mb-4"
      />

      <button
        onClick={editExpense ? handleUpdateExpense : handleAddExpense}
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        {editExpense ? "Update Expense" : "Add Expense"}
      </button>

      <div className="mt-6">
        <h2 className="text-xl font-semibold">Expense List</h2>
        {expenseData.length > 0 ? (
          expenseData.map((expense) => (
            <div
              key={expense._id}
              className="mb-4 p-4  bg-white shadow-lg rounded-lg flex flex-col space-y-2"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-semibold text-gray-800">
                    Amount: ₹{expense.amount}
                  </h2>
                  <p className="text-md text-gray-600">
                    Category: {expense.category}
                  </p>
                  <p className="text-md text-gray-600">
                    Date: {new Date(expense.date).toLocaleDateString()}
                  </p>
                </div>
                <div className=" space-x-4">
                  <button
                    onClick={() => handleEditExpense(expense)}
                    className="bg-blue-500 text-white px-3 py-1.5 rounded mt-2 w-32"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteExpense(expense._id)}
                    className="bg-red-500 text-white px-3 py-1.5 rounded mt-2 ml-2 w-32"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-xl text-gray-500">No expense data available.</p>
        )}
      </div>
    </div>
  );
};

export default Expense;
