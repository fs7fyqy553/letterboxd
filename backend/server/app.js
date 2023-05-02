const express = require('express');
const logger = require('morgan');
const cors = require('cors');
require('./database/mongoConfig');
const APIRouter = require('./routes/APIRouter');

const app = express();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', APIRouter);

module.exports = app;
