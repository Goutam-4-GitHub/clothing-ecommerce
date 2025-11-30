const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const { createOrder } = require('../controllers/orderController');

const router = express.Router();

router.use(protect);

router.post('/', createOrder);

module.exports = router;
