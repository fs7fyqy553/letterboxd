const { Router } = require('express');
const cors = require('cors');
const filmControllers = require('../controllers/filmControllers');

const filmRouter = Router();

filmRouter.options(
  '/',
  cors({
    origin: 'http://localhost:3006',
  })
);

filmRouter.get('/', cors(), filmControllers.getFilms);

module.exports = filmRouter;
