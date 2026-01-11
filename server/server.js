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
  'http://localhost:5173'
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

app.get('/smtp', async (req, res) => {
  try {
    // Attempt to verify the connection
    await transporter.verify();
    
    // If successful, send a 200 OK response
    res.status(200).json({
      status: "success",
      message: "Brevo SMTP is connected and ready to send emails."
    });
  } catch (err) {
    // If it fails, send a 500 Error response
    res.status(500).json({
      status: "error",
      message: "SMTP verification failed",
      error: err.message,
      code: err.code
    });
  }
});

// --- Start ---
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
