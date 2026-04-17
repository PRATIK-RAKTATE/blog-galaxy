import dotenv from "dotenv";

dotenv.config();

export const env = {
  mongoUri: process.env.MONGO_URI,
  port: Number(process.env.PORT || 3000),
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
  groqApiKey: process.env.GROQ_API_KEY,
  jwtSecret: process.env.JWT_SECRET,
};
