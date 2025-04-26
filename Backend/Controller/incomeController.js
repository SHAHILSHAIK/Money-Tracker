// src/controllers/incomeController.js

const Income = require('../Model/Income');

// Create new income
const addIncome = async (req, res) => {
  try {
    const { amount, date } = req.body; // Get amount and date from frontend

    const income = new Income({
      amount,
      date, // Save date too
    });

    await income.save();
    res.status(201).json(income);
  } catch (error) {
    res.status(500).json({ error: 'Failed to add income' });
  }
};

// Get all incomes
const getIncomes = async (req, res) => {
  try {
    const incomes = await Income.find().sort({ createdAt: -1 }); // Newest first
    res.status(200).json(incomes);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch incomes' });
  }
};

// Update an income by ID
const updateIncome = async (req, res) => {
  const { id } = req.params; // Get the income ID from the URL params
  const { amount, date } = req.body; // Get the updated amount and date from the request body

  try {
    const updatedIncome = await Income.findByIdAndUpdate(
      id, // Find income by ID
      { amount, date }, // Updated data
      { new: true } // Return the updated document
    );

    if (!updatedIncome) {
      return res.status(404).json({ error: 'Income not found' });
    }

    res.status(200).json(updatedIncome); // Respond with updated income
  } catch (error) {
    res.status(500).json({ error: 'Failed to update income' });
  }
};

// Delete an income by ID
const deleteIncome = async (req, res) => {
  const { id } = req.params; // Get the income ID from the URL params

  try {
    const deletedIncome = await Income.findByIdAndDelete(id); // Delete income by ID

    if (!deletedIncome) {
      return res.status(404).json({ error: 'Income not found' });
    }

    res.status(200).json({ message: 'Income deleted successfully' }); // Success message
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete income' });
  }
};

module.exports = { addIncome, getIncomes, updateIncome, deleteIncome };
