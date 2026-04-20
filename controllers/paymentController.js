const Payment = require('../models/Payment');
const Order = require('../models/Order');
const Table = require('../models/Table');

//  payments 
const getPayments = async (req, res) => {
    try {
        const payments = await Payment.find({}).populate('orderId'); 
        res.json(payments);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getPaymentById = async (req, res) => {
    try {
        const payment = await Payment.findById(req.params.id).populate('orderId'); 
        if (payment) {
            res.json(payment);
        } else {
            res.status(404).json({ message: 'Payment not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const processPayment = async (req, res) => {
    try {
        const { orderId, amount, method } = req.body;

       
        const order = await Order.findById(orderId);
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        
        const payment = new Payment({
            orderId,
            amount,
            method,
            status: 'paid'
        });

       
        const createdPayment = await payment.save();

        res.status(201).json(createdPayment);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getPayments, getPaymentById, processPayment };