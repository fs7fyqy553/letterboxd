import * as dotenv from 'dotenv';
import { Request, Response, NextFunction } from 'express';

dotenv.config({ path: '.env' });

function rejectAPICall(res: Response): void | Promise<Response> {
  res.status(401).json({ error: 'unauthorised' });
}

function checkAPIKey(key: string, res: Response, next: NextFunction): void | Promise<Response> {
  if (!key || key !== process.env.API_KEY) {
    rejectAPICall(res);
  } else {
    next();
  }
}

export default function authenticateAPICall(req: Request, res: Response, next: NextFunction) {
  const submittedAPIKey = req.get('API-Key');
  checkAPIKey(submittedAPIKey, res, next);
}
