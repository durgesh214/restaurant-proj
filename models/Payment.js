
const mongoose = require('mongoose');
const paymentSchema = new mongoose.Schema({

   
    orderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        required: true
    },

   
    amount: {
        type: Number,
        required: true
    },

    method: {
        type: String,
        enum: ['cash', 'card', 'upi'],
        required: true
    },

   
    status: {
        type: String,
        enum: ['paid', 'pending', 'failed'],
        default: 'paid'
    }

}, { 
    timestamps: true   
});

module.exports = mongoose.model('Payment', paymentSchema);