import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config({ path: '.env' });

mongoose.connect(process.env.PRODUCTION_CONNECTION_STRING || process.env.DEV_CONNECTION_STRING);
