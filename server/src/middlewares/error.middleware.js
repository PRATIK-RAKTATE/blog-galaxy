import { env } from '../config/env.config.js';

export function errorMiddleware(err, res, next) {
    const status = err.statusCode || 500;

    res.status(status).json({
        success: false,
        message: err.message || "Internal Server Error", 
        stack: env.NODE_ENV === 'development' ? err.stack : undefined,
    });
}