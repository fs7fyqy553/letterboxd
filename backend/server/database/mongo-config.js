require('dotenv').config({ path: `${__dirname}/../.env` });
const mongoose = require('mongoose');

mongoose.connect(process.env.PRODUCTION_CONNECTION_STRING || process.env.DEV_CONNECTION_STRING);
