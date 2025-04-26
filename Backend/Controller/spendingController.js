const Spending = require('../Model/Spending');

// @desc    Create a new spending
const createSpending = async (req, res) => {
  const { amount, category, date } = req.body;
  try {
    const spending = await Spending.create({ amount, category, date });
    res.status(201).json(spending); // Sends back the created spending object
  } catch (error) {
    res.status(500).json({ message: error.message }); // Error handling
  }
};

// @desc    Get all spendings
const getSpendings = async (req, res) => {
  try {
    const spendings = await Spending.find().sort({ date: -1 });
    res.status(200).json(spendings); // Sends back all spendings
  } catch (error) {
    res.status(500).json({ message: error.message }); // Error handling
  }
};

// @desc    Update a spending
const updateSpending = async (req, res) => {
  const { id } = req.params;
  const { amount, category, date } = req.body;
  try {
    const updatedSpending = await Spending.findByIdAndUpdate(
      id,
      { amount, category, date },
      { new: true }
    );

    if (!updatedSpending) {
      return res.status(404).json({ message: 'Spending not found' });
    }

    res.status(200).json(updatedSpending);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete a spending
const deleteSpending = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedSpending = await Spending.findByIdAndDelete(id);

    if (!deletedSpending) {
      return res.status(404).json({ message: 'Spending not found' });
    }

    res.status(200).json({ message: 'Spending deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createSpending, getSpendings, updateSpending, deleteSpending };
