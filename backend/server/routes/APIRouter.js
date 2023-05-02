const { Router } = require('express');
// const cors = require('cors');
const authControllers = require('../controllers/authControllers');
const filmRouter = require('./filmRouter');

const APIRouter = Router();
// APIRouter.use(cors({ origin: 'https://letterboxd-guessing-game.up.railway.app/' }));
// APIRouter.use(authControllers.authenticateAPICall);
APIRouter.use('/films', filmRouter);

module.exports = APIRouter;
