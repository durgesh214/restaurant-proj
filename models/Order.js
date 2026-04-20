const mongoose = require('mongoose');

const ORDER_STATUS = ['pending', 'preparing', 'served', 'cancelled'];

const orderSchema = new mongoose.Schema({

    tableId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Table',
        required: true
    },
    items: [
        {
            menuId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Menu',
                required: true
            },  
            quantity: {
                type: Number,
                required: true,
                default: 1
            }
        }
    ],
    totalAmount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ORDER_STATUS,     
        default: 'pending'
    }

}, { 
    timestamps: true    
});

module.exports = mongoose.model('Order', orderSchema);