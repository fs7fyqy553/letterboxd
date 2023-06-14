import { Router } from 'express';
import getFilms from '../controllers/get-films.js';

const filmRouter = Router();

filmRouter.get('/', getFilms);

export default filmRouter;
