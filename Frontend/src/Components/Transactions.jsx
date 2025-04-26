import axios from "axios";
import React, { useEffect, useState } from "react";

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [filterType, setFilterType] = useState("All"); // Income/Expense/All
  const [searchQuery, setSearchQuery] = useState(""); // for search

  useEffect(() => {
    async function getBothData() {
      try {
        const expenseRes = await axios.get(
          "http://localhost:3001/api/spendings/get"
        );
        const incomeRes = await axios.get(
          "http://localhost:3001/api/income/get"
        );

        const expenses = expenseRes.data.map((item) => ({
          ...item,
          type: "Expense",
        }));
        const incomes = incomeRes.data.map((item) => ({
          ...item,
          type: "Income",
        }));

        const allTransactions = [...incomes, ...expenses];
        setTransactions(allTransactions);
      } catch (err) {
        console.log(err);
      }
    }
    getBothData();
  }, []);

  // Apply filter
  const filteredTransactions = transactions.filter((item) => {
    const matchType = filterType === "All" || item.type === filterType;
    const matchSearch =
      item.amount.toString().includes(searchQuery) ||
      (item.category &&
        item.category.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.date &&
        item.date.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchType && matchSearch;
  });

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-violet-700">
        Transactions
      </h1>

      {/* Filter and Search */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
          className="border border-violet-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500"
        >
          <option value="All">All</option>
          <option value="Income">Income</option>
          <option value="Expense">Expense</option>
        </select>

        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search by amount, category, or date"
          className="border border-violet-300 p-3 rounded-md flex-1 focus:outline-none focus:ring-2 focus:ring-violet-500"
        />
      </div>

      {/* Show Data */}
      {filteredTransactions.length > 0 ? (
        <div className="grid gap-4">
          {filteredTransactions.map((data) => (
            <div
              key={data._id}
              className="border rounded-lg shadow-md p-4 hover:shadow-lg transition duration-300 bg-white"
            >
              <div className="flex justify-between items-center mb-2">
                <h2 className="text-lg font-semibold text-gray-800">
                  {data.type}: ₹{data.amount}
                </h2>
                <span
                  className={`text-sm px-2 py-1 rounded-full ${
                    data.type === "Income"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {data.type}
                </span>
              </div>
              {data.category && (
                <p className="text-gray-600 mb-1">
                  <span className="font-medium">Category:</span> {data.category}
                </p>
              )}
              <p className="text-gray-600">
                <span className="font-medium">Date:</span> {data.date}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No transactions found.</p>
      )}
    </div>
  );
}

export default Transactions;
