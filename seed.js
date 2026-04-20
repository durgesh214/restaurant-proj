const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

dotenv.config();

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected for seeding');

        // Check if admin already exists
        const adminExists = await User.findOne({ email: 'admin@test.com' });
        
        if (adminExists) {
            console.log('Admin already exists!');
            process.exit();
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('admin123', salt);

        await User.create({
            name: 'Durgesh Admin',
            email: 'admin@test.com',
            password: hashedPassword,
            role: 'admin',
            phone: '9876543210',
            isActive: true
        });

        console.log('Admin User Seeded Successfully!');
        process.exit();
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

seedAdmin();
