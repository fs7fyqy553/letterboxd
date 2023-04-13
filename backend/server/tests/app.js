const express = require('express');
const initializeMongoServer = require('./mongoConfigTesting');
const APIRouter = require('../routes/APIRouter');

initializeMongoServer();

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/', APIRouter);

module.exports = app;
