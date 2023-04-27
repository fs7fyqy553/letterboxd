const { Router } = require('express');
const filmControllers = require('../controllers/filmControllers');

const filmRouter = Router();

filmRouter.get('/', filmControllers.getFilms);

module.exports = filmRouter;
