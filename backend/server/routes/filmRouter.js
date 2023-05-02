const { Router } = require('express');
const cors = require('cors');
const filmControllers = require('../controllers/filmControllers');

const filmRouter = Router();

filmRouter.get('/', cors(), filmControllers.getFilms);

module.exports = filmRouter;
