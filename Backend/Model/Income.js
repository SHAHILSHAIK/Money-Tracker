const mongoose = require('mongoose');

const incomeSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model('Income', incomeSchema);
