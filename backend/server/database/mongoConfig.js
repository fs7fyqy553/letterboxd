require('dotenv').config({ path: `${__dirname}/../.env` });
const mongoose = require('mongoose');

mongoose.connect(process.env.PRODUCTION_CONNECTION_STRING || process.env.DEV_CONNECTION_STRING);
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));
