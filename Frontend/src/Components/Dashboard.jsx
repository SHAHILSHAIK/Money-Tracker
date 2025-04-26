import React, { useEffect, useState } from "react";
import axios from "axios";
import Transactions from "./Transactions";
import IncomeForm from "./IncomeForm";
import ExpenseForm from "./ExpenseForm";

const Dashboard = () => {
  const [incomeList, setIncomeList] = useState([]);
  const [expenseList, setExpenseList] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [balance, setBalance] = useState(0);

  // Fetch income and expenses
  useEffect(() => {
    // Fetch income
    axios
      .get("http://localhost:3001/api/income/get")
      .then((response) => {
        console.log("Income data:", response.data); // Debugging line
        const incomeData = response.data;
        setIncomeList(incomeData);

        const totalIncomeAmount = incomeData.reduce(
          (total, item) => total + item.amount,
          0
        );
        setTotalIncome(totalIncomeAmount);
      })
      .catch((error) => {
        console.error("Error fetching income:", error);
      });

    // Fetch expenses
    axios
      .get("http://localhost:3001/api/spendings/get")
      .then((response) => {
        console.log("Expense data:", response.data); // Debugging line
        const expenseData = response.data;
        setExpenseList(expenseData);

        const totalExpenseAmount = expenseData.reduce(
          (total, item) => total + item.amount,
          0
        );
        setTotalExpense(totalExpenseAmount);
      })
      .catch((error) => {
        console.error("Error fetching expenses:", error);
      });
  }, []);

  useEffect(() => {
    // Update balance whenever income or expenses change
    setBalance(totalIncome - totalExpense);
  }, [totalIncome, totalExpense]);

  const [showAddIncomeForm, setShowAddIncomeForm] = useState(false);
  const [showAddExpenseForm, setShowAddExpenseForm] = useState(false);

  return (
    <div>
      <div className="flex md:flex-row flex-col items-center justify-center gap-14 w-full p-8">
        {/* Current Balance */}
        <div className="bg-violet-600 p-6 rounded-xl shadow-2xl w-96 h-52 flex flex-col justify-between ">
          <h1 className="text-3xl font-semibold text-white">Current Balance</h1>
          <h1 className="text-4xl font-bold text-white mt-4 p-5">
            ₹{balance.toFixed(2)}
          </h1>
        </div>

        {/* Total Income */}
        <div className="bg-white p-6 rounded-xl shadow-2xl w-96 h-52 flex flex-col justify-between ">
          <h1 className="text-2xl font-semibold text-gray-800">Total Income</h1>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">
            ₹{totalIncome.toFixed(2)}
          </h1>
          <button
            onClick={() => setShowAddIncomeForm(!showAddIncomeForm)}
            className="mt-4 bg-violet-600 hover:bg-violet-700 text-white text-lg px-4 py-2 rounded-xl transition-all duration-300 ease-in-out"
          >
            Add Income
          </button>
        </div>

        {/* Total Expense */}
        <div className="bg-white p-6 rounded-xl shadow-2xl  w-96 h-52 flex flex-col justify-between ">
          <h1 className="text-2xl font-semibold text-gray-800">
            Total Expense
          </h1>
          <h1 className="text-2xl font-bold text-gray-900 mt-2">
            ₹{totalExpense.toFixed(2)}
          </h1>
          <button
            onClick={() => setShowAddExpenseForm(!showAddExpenseForm)}
            className="mt-4 bg-violet-600 hover:bg-violet-700 text-white text-lg px-4 py-2 rounded-xl transition-all duration-300 ease-in-out"
          >
            Add Expense
          </button>
        </div>
      </div>
      <div>
        <div>{showAddIncomeForm ? <IncomeForm /> : ""}</div>

        <div>{showAddExpenseForm ? <ExpenseForm /> : ""}</div>
      </div>
      <div>
        <Transactions />
      </div>
    </div>
  );
};

export default Dashboard;
