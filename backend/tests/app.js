const express = require('express');
const APIRouter = require('./dist/routes/api-router');

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', APIRouter);

module.exports = app;
