// TODO: consider that you might be able to use await in here if this is just a module
require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.DEV_CONNECTION_STRING);
const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error"));
