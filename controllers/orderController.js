const Order = require('../models/Order');
const Table = require('../models/Table');
const Menu = require('../models/Menu');

//  orders
const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({})
            .populate('tableId', 'tableNumber status')  
            .populate('items.menuId', 'name price');   
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getOrderById = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id)
            .populate('tableId', 'tableNumber status')  
            .populate('items.menuId', 'name price');    

        if (order) {
            res.json(order);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// create order
const createOrder = async (req, res) => {
    try {
        const { tableId, items, totalAmount } = req.body;

        
        if (!items || items.length === 0) {
            return res.status(400).json({ message: 'No order items' });
        }

       
        const orderItems = await Promise.all(
            items.map(async (item) => {
                const menuItem = await Menu.findById(item.menuId);

                
                if (!menuItem) {
                    throw new Error(`Menu item not found: ${item.menuId}`);
                }

                return {
                    menuId: item.menuId,
                    name: menuItem.name,
                    quantity: item.quantity
                };
            })
        );

        // Order 
        const order = new Order({
            tableId,
            items: orderItems,
            totalAmount,
            status: 'pending'
        });

        
        const createdOrder = await order.save();

        
        await Table.findByIdAndUpdate(tableId, { status: 'occupied' });

        res.status(201).json(createdOrder);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//  update 
const updateOrderStatus = async (req, res) => {
    try {
        const { status } = req.body;

        
        const order = await Order.findById(req.params.id);

        if (order) {
            order.status = status;
            const updatedOrder = await order.save();
            res.json(updatedOrder);
        } else {
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


//cancel

const cancelOrder = async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);

        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

       
        if (order.status === 'served') {
            return res.status(400).json({ 
                message: 'Cannot cancel an order that has already been served' 
            });
        }

        if (order.status === 'cancelled') {
            return res.status(400).json({ 
                message: 'Order is already cancelled' 
            });
        }

       
        order.status = 'cancelled';
        const cancelledOrder = await order.save();

       
        const activeOrders = await Order.find({
            tableId: order.tableId,
            status: { $in: ['pending', 'preparing'] }
        });

        
        if (activeOrders.length === 0) {
            await Table.findByIdAndUpdate(order.tableId, { status: 'available' });
        }

        res.json({ 
            message: 'Order cancelled successfully', 
            order: cancelledOrder 
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getOrders, getOrderById, createOrder, updateOrderStatus, cancelOrder  };