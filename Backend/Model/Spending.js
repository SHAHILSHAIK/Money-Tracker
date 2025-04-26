const mongoose = require('mongoose');

const spendingSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Spending', spendingSchema);
