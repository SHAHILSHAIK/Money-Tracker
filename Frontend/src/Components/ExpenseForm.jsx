import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ExpenseForm() {
  const [amount, setamount] = useState("");
  const [category, setcategory] = useState("");
  const [date, setdate] = useState("");

  const navigate = useNavigate(); // ✅ Add this line

  const data = { amount, category, date };

  function handleAddExpense() {
    axios
      .post("http://localhost:3001/api/spendings/add", data)
      .then((res) => {
        console.log("Expense added:", res.data);
        window.location.reload();

        navigate("/"); // ✅ Now this will work
      })
      .catch((err) => {
        console.error("Error adding expense:", err);
      });
  }

  return (
    <div className="flex items-center justify-center w-full p-6">
      <div className="w-full max-w-md">
        <h1 className="text-2xl text-center font-semibold mb-6">Add Expense</h1>

        <div className="mb-4">
          <input
            type="number"
            value={amount}
            onChange={(e) => setamount(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Enter expense amount"
          />
        </div>

        <div className="mb-4">
          <input
            type="text"
            value={category}
            onChange={(e) => setcategory(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Enter expense category"
          />
        </div>

        <div className="mb-4">
          <input
            type="date"
            value={date}
            onChange={(e) => setdate(e.target.value)}
            className="border p-2 rounded w-full"
          />
        </div>

        <button
          onClick={handleAddExpense}
          className="bg-red-500 text-white px-4 py-2 rounded w-full"
        >
          Add Expense
        </button>
      </div>
    </div>
  );
}

export default ExpenseForm;
