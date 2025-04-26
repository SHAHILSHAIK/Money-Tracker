import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function IncomeForm() {
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");

  const navigate = useNavigate(); // ✅ Moved here at the top

  const data = { amount, date };
  function handleAddIncome(event) {
    event.preventDefault(); // Prevent page reload on form submission

    axios
      .post("http://localhost:3001/api/income/add", data)
        .then((res) => {
          window.location.reload();
        navigate("/"); // Navigate after successful post
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div className="flex items-center justify-center w-full p-6">
      <div className="w-full max-w-md">
        <h1 className="text-2xl text-center font-semibold mb-6">Add Income</h1>

        <div className="mb-4">
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Enter income amount"
          />
        </div>

        <div className="mb-4">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="border p-2 rounded w-full"
            placeholder="Select date"
          />
        </div>

        <button
          onClick={handleAddIncome}
          className="bg-green-500 text-white px-4 py-2 rounded w-full"
        >
          Add Income
        </button>
      </div>
    </div>
  );
}

export default IncomeForm;
