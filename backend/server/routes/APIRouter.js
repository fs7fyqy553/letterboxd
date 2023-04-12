const { Router } = require('express');
const filmRouter = require('./filmRouter');

const APIRouter = Router();
APIRouter.use('/films', filmRouter);

module.exports = APIRouter;
