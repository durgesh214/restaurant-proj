const express = require('express');
const router = express.Router();

const { protect, admin } = require('../middleware/authMiddleware');

// Controllers
const { registerUser, loginUser } = require('../controllers/authController');
const { getMenu, getMenuById, addMenuItem, updateMenuItem, deleteMenuItem } = require('../controllers/menuController');
const { getTables, getTableById, addTable, updateTableStatus } = require('../controllers/tableController');
const { getOrders, getOrderById, createOrder, updateOrderStatus, cancelOrder } = require('../controllers/orderController');
const { getPayments, getPaymentById, processPayment } = require('../controllers/paymentController');


// AUTH ROUTES
router.post('/register', registerUser);
router.post('/login', loginUser);


// MENU ROUTES
router.get('/menu', getMenu);
router.post('/menu', protect, admin, addMenuItem);

router.get('/menu/:id', getMenuById);
router.put('/menu/:id', protect, admin, updateMenuItem);
router.patch('/menu/:id', protect, admin, updateMenuItem);
router.delete('/menu/:id', protect, admin, deleteMenuItem);


// TABLE ROUTES
router.get('/tables', protect, getTables);
router.post('/tables', protect, admin, addTable);

router.get('/tables/:id', protect, getTableById);

router.put('/tables/:id/status', protect, updateTableStatus);
router.patch('/tables/:id/status', protect, updateTableStatus);


// ORDER ROUTES
router.get('/orders', protect, getOrders);
router.post('/orders', protect, createOrder);
router.put('/:id/cancel', cancelOrder);

router.get('/orders/:id', protect, getOrderById);

router.put('/orders/:id/status', protect, updateOrderStatus);
router.patch('/orders/:id/status', protect, updateOrderStatus);


// PAYMENT ROUTES
router.get('/payments', protect, getPayments);
router.post('/payments', protect, processPayment);
router.get('/payments/:id', protect, getPaymentById);


module.exports = router;