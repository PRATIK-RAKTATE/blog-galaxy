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
const allowedOrigins = [
     'http://localhost:5173',
     process.env.VITE_FRONTEND_URL
].filter(Boolean); // This removes any undefined/null values

app.use(cors({
     origin: function (origin, callback) {
          // Allow requests with no origin (like mobile apps or curl)
          if (!origin) return callback(null, true);
          
          if (allowedOrigins.includes(origin)) {
               callback(null, true);
          } else {
               console.log("Blocked by CORS:", origin); // Helpful for debugging
               callback(new Error('Not allowed by CORS'));
          }
     },
     credentials: true,
     methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
     allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(cookieParser())
app.use(express.json());



app.use('/', healthRoutes); 
app.use('/metrics', metricsRoutes)
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);

app.listen(port, () => {
    console.log(`App is listening on http://localhost:${port}`)
})
