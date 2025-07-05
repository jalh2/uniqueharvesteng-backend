require('dotenv').config();
const mongoose = require('mongoose');
const About = require('../models/About');
const Contact = require('../models/Contact');
const Hero = require('../models/Hero');
const Project = require('../models/Project');
const Service = require('../models/Service');
const Team = require('../models/Team');
const User = require('../models/User');

const main = async () => {
    const mongoOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
        family: 4
    };

    try {
        console.log('Connecting to database...');
        await mongoose.connect(process.env.MONGODB_URI, mongoOptions);
        console.log('Connected. Clearing database...');

        await Promise.all([
            About.deleteMany({}),
            Contact.deleteMany({}),
            Hero.deleteMany({}),
            Project.deleteMany({}),
            Service.deleteMany({}),
            Team.deleteMany({}),
            User.deleteMany({})
        ]);
        console.log('Database cleared successfully.');

    } catch (error) {
        console.error('Error clearing database:', error);
        process.exit(1);
    } finally {
        if (mongoose.connection.readyState === 1) { // 1 === 'connected'
            await mongoose.disconnect();
            console.log('Disconnected from database.');
        }
    }
};

main();
