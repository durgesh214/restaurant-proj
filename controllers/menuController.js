const Menu = require('../models/Menu');

// menu items 
const getMenu = async (req, res) => {
    try {
        const menu = await Menu.find({});
        res.json(menu);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// one menu itm 
const getMenuById = async (req, res) => {
    try {
        const item = await Menu.findById(req.params.id);
        if (item) {
            res.json(item);
        } else {
            res.status(404).json({ message: 'Menu item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// new menu item add karo
const addMenuItem = async (req, res) => {
    try {
        const { name, price, category, available } = req.body;

        
        const menuItem = new Menu({
            name,
            price,
            category,
            available
        });

       
        const createdItem = await menuItem.save();
        res.status(201).json(createdItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// update
const updateMenuItem = async (req, res) => {
    try {
        const { name, price, category, available } = req.body;

        
        const item = await Menu.findById(req.params.id);

        if (item) {
            
            item.name = name || item.name;
            item.price = price || item.price;
            item.category = category || item.category;
            if(available !== undefined) item.available = available;

            const updatedItem = await item.save();
            res.json(updatedItem);
        } else {
            res.status(404).json({ message: 'Menu item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//  delete 
const deleteMenuItem = async (req, res) => {
    try {
        
        const item = await Menu.findById(req.params.id);

        if (item) {
            await item.deleteOne();
            res.json({ message: 'Menu item removed' });
        } else {
            res.status(404).json({ message: 'Menu item not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getMenu, getMenuById, addMenuItem, updateMenuItem, deleteMenuItem };