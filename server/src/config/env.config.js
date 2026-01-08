import dotenv from "dotenv";
import path from "path";

// Load the correct .env file based on NODE_ENV
const envFile = process.env.NODE_ENV === "test" ? ".env.test" : ".env";
dotenv.config({ path: path.resolve(process.cwd(), envFile) });

export const env = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 5000,
  
  // MongoDB
  MONGO_URI: process.env.MONGO_URI || "mongodb://127.0.0.1:27017/mydb",

  // JWT Authentication
  JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET,
  JWT_SECRET: process.env.JWT_SECRET || "supersecretkey",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "1h",
  JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "refreshsecretkey",
  JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || "7d",

  // CORS
  CORS_ORIGIN: process.env.CORS_ORIGIN || "*",

  // Logging
  LOG_LEVEL: process.env.LOG_LEVEL || "info",

  // Rate Limiting
  RATE_LIMIT_WINDOW_MS: process.env.RATE_LIMIT_WINDOW_MS || 15 * 60 * 1000, // 15 minutes
  RATE_LIMIT_MAX: process.env.RATE_LIMIT_MAX || 100, // max requests per window

  // Other optional envs
  REDIS_URL: process.env.REDIS_URL || null,
};
