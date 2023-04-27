const { Router } = require('express');
const cors = require('cors');
const filmRouter = require('./filmRouter');

const APIRouter = Router();
APIRouter.use(cors());
APIRouter.use('/films', filmRouter);

module.exports = APIRouter;
