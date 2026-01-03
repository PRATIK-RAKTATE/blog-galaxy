import mongoose from 'mongoose';
import { env } from './env.config.js';
import { logger } from './logger.config.js';

export async function connectDB() {
    try {
        mongoose.set('strictQuery', true);

        await mongoose.connect(env.MONGO_URI);

        logger.info("MongoDB connected");
    } catch (error) {
        logger.error("MongoDB connection failed ", error);
        process.exit(1);
    }
}