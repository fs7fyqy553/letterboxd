require("dotenv").config();
const express = require('express');
const logger = require('morgan');
require("./mongoConfig");

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

module.exports = app;
