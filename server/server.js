import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectDB from './config/mongodb.js';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import healthRoutes from './health/health.routes.js';
import metricsRoutes from './metrics/metrics.routes.js';

const app = express();

const port = process.env.PORT || 4000;

connectDB();
app.use(cors({
     origin: function (origin, callback) {
          // This tells the browser "Yes" regardless of what the origin is
          // while still supporting the 'credentials: true' requirement.
          callback(null, true); 
     },
     credentials: true,
     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
     allowedHeaders: ['Content-Type', 'Authorization']
}));;
app.use(cookieParser())
app.use(express.json());



app.use('/', healthRoutes); 
app.use('/metrics', metricsRoutes)
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);

app.listen(port, () => {
    console.log(`App is listening on http://localhost:${port}`)
})
