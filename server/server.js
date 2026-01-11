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

// --- CORS ---
const allowedOrigins = [
  'https://blog-galaxy.netlify.app',
  'http://localhost:3000'
];
app.use(cors({
  origin: function(origin, callback){
    if(!origin) return callback(null, true);
    if(allowedOrigins.includes(origin)) return callback(null, true);
    callback(new Error('CORS not allowed'));
  },
  credentials: true,
  methods: ['GET','POST','PUT','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));

app.use(cookieParser());
app.use(express.json());

// --- Routes ---
app.use('/', healthRoutes); 
app.use('/metrics', metricsRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);

// --- Start ---
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
