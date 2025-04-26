const express = require('express');
const router = express.Router();

// Import controller methods
const { createSpending, getSpendings, updateSpending, deleteSpending } = require('../Controller/spendingController');
const { addIncome, getIncomes, updateIncome, deleteIncome } = require('../Controller/incomeController');
const {signupUser, loginUser} = require('../Controller/authController')
// Define Routes
router.post('/spendings/add', createSpending);
router.get('/spendings/get', getSpendings);
router.put('/spendings/update/:id', updateSpending);
router.delete('/spendings/delete/:id', deleteSpending);
router.post('/income/add', addIncome);
router.get('/income/get', getIncomes);
router.put("/income/update/:id", updateIncome);
router.delete("/income/delete/:id", deleteIncome);
router.post('/users/signup', signupUser);
router.post('/users/login', loginUser);

// Export Routes
module.exports = router;
