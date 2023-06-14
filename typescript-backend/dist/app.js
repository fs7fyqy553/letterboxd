import express from 'express';
import logger from 'morgan';
import './database/mongo-config.js';
import APIRouter from './routes/api-router.js';
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', APIRouter);
export default app;
//# sourceMappingURL=app.js.map