const Table = require('../models/Table');

//  tables 
const getTables = async (req, res) => {
    try {
        const tables = await Table.find({});
        res.json(tables);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const getTableById = async (req, res) => {
    try {
        const table = await Table.findById(req.params.id);
        if (table) {
            res.json(table);
        } else {
            res.status(404).json({ message: 'Table not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const addTable = async (req, res) => {
    try {
        const { tableNumber, capacity, status } = req.body;

        
        const tableExists = await Table.findOne({ tableNumber });
        if (tableExists) {
            return res.status(400).json({ message: 'Table number already exists' });
        }

        
        const table = new Table({
            tableNumber,
            capacity,
            status
        });

        
        const createdTable = await table.save();
        res.status(201).json(createdTable);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


const updateTableStatus = async (req, res) => {
    try {
        const { status } = req.body;

       
        const table = await Table.findById(req.params.id);

        if (table) {
            table.status = status;
            const updatedTable = await table.save();
            res.json(updatedTable);
        } else {
            res.status(404).json({ message: 'Table not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getTables, getTableById, addTable, updateTableStatus };