import { Router } from 'express';
import cors from 'cors';
import authenticateAPICall from '../controllers/authenticate-api-call.js';
import filmRouter from './film-router.js';
const APIRouter = Router();
APIRouter.use(cors());
APIRouter.use(authenticateAPICall);
APIRouter.use('/films', filmRouter);
export default APIRouter;
//# sourceMappingURL=api-router.js.map