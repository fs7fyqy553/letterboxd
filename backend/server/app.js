const express = require('express');
const logger = require('morgan');
require('./database/mongo-config');
const APIRouter = require('./routes/api-router');

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', APIRouter);

module.exports = app;
