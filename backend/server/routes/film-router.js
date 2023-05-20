const { Router } = require('express');
const filmControllers = require('../controllers/film-controllers');

const filmRouter = Router();

filmRouter.get('/', filmControllers.getFilms);

module.exports = filmRouter;
