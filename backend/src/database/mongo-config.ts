import * as dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config({ path: '.env' });

console.log("Hi");
console.log(process.env.PRODUCTION_CONNECTION_STRING || process.env.DEV_CONNECTION_STRING)

mongoose.connect(process.env.PRODUCTION_CONNECTION_STRING || process.env.DEV_CONNECTION_STRING);
