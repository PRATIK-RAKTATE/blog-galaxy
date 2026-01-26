import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectDB from './config/mongodb.js';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';
import healthRoutes from './health/health.routes.js';
import metricsRoutes from './metrics/metrics.routes.js';
import aiRoutes from './routes/ai.route.js'
import seoRoutes from './routes/seo.route.js';
import brightDataRoutes from './routes/brightData.route.js'
import blogRoutes from './routes/blog.route.js';


const app = express();
const port = process.env.PORT || 4000;

connectDB();

// --- CORS ---
const allowedOrigins = [
  process.env.FRONTEND_URL || "http://localhost:3000",
  process.env.FRONTEND_STAGING_URL || "http://localhost:5173",
];

console.log("CORS_ALLOWED_ORIGINS:", allowedOrigins);

app.use(
  cors({
    origin: function (requestOrigin, callback) {
      // Allow server-to-server / curl / Postman
      if (!requestOrigin) return callback(null, true);

      if (allowedOrigins.includes(requestOrigin)) {
        return callback(null, true);
      }

      return callback(
        new Error(`CORS not allowed for origin: ${requestOrigin}`)
      );
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(cookieParser());
app.use(express.json());

// --- Routes ---
app.use('/', healthRoutes); 
app.use('/metrics', metricsRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);
app.use('/api/v1/ai', aiRoutes);
app.use('/api/v1/seo', seoRoutes);
app.use("/api/v1/seo", brightDataRoutes);
app.use("/api/v1/blog", blogRoutes);


// --- Start ---
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
