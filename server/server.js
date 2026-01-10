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
]
app.use(cors({
     origin: allowedOrigins,
    credentials: true
}))

app.use(cookieParser())
app.use(express.json());



app.use('/', healthRoutes); 
app.use('/metrics', metricsRoutes)
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);

app.listen(port, () => {
    console.log(`App is listening on http://localhost:${port}`)
})
