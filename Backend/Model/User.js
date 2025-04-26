const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String, // NOTE: In real apps, password should be hashed
});

module.exports = mongoose.model('User', userSchema);
