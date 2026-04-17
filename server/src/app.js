import cors from "cors";
import express from "express";
import { env } from "./config/env.js";
import adminRoutes from "./features/admin/admin.routes.js";
import aiRoutes from "./features/ai/ai.routes.js";
import authRoutes from "./features/auth/auth.routes.js";
import blogRoutes from "./features/blog/blog.routes.js";
import healthRoutes from "./features/health/health.routes.js";
import serpBlogRoutes from "./features/serp-blog/serp-blog.routes.js";
import { errorHandler } from "./middlewares/error.middleware.js";

export function createApp() {
  const app = express();
  const allowedOrigins = new Set([
    env.clientUrl,
    env.frontendUrl,
    "http://localhost:5173",
    "http://localhost:5174",
  ]);

  app.use(
    cors({
      origin(origin, callback) {
        if (!origin || allowedOrigins.has(origin)) {
          callback(null, true);
          return;
        }

        callback(new Error("Origin not allowed by CORS"));
      },
      credentials: true,
    }),
  );
  app.use(express.json());

  app.get("/", (_req, res) => {
    res.status(200).json({
      success: true,
      message: "BlogGalaxy API is running",
    });
  });

  app.use("/api/health", healthRoutes);
  app.use("/api/admin", adminRoutes);
  app.use("/api/auth", authRoutes);
  app.use("/api/blogs", blogRoutes);
  app.use("/api/ai", aiRoutes);
  app.use("/api/serp-blog", serpBlogRoutes);

  app.use(errorHandler);

  return app;
}
