import { Router } from "express";
import os from "os";
import { env } from "../../config/env.config.js";
import fs from "fs";
import path from "path";

const pkg = JSON.parse(fs.readFileSync(path.resolve("package.json"), "utf-8"));
console.log(pkg.version);
// import mongoose from "mongoose"; // uncomment if using MongoDB
// import redisClient from "../../config/redis.js"; // optional if using Redis

const router = Router();

// Helper to convert bytes to MB
const bytesToMB = (bytes) => (bytes / 1024 / 1024).toFixed(2);

// Format uptime in hh:mm:ss
const formatUptime = (seconds) => {
  const h = Math.floor(seconds / 3600).toString().padStart(2, "0");
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, "0");
  const s = Math.floor(seconds % 60).toString().padStart(2, "0");
  return `${h}:${m}:${s}`;
};

/**
 * GET /api/health
 * Returns basic health and version info
 */
router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    status: "ok",
    environment: env.NODE_ENV,
    version: pkg.version,
    nodeVersion: process.version,
    timestamp: new Date().toISOString(),
  });
});

/**
 * GET /api/metrics
 * Returns CPU, memory, OS, uptime and optional service health
 */
router.get("/metrics", async (req, res) => {
  try {
    const memoryUsage = process.memoryUsage();
    const cpuLoad = os.loadavg();
    const cpus = os.cpus().length;

    const response = {
      success: true,
      memory: {
        rss: bytesToMB(memoryUsage.rss),
        heapTotal: bytesToMB(memoryUsage.heapTotal),
        heapUsed: bytesToMB(memoryUsage.heapUsed),
        external: bytesToMB(memoryUsage.external),
        total: bytesToMB(os.totalmem()),
        free: bytesToMB(os.freemem()),
      },
      cpu: {
        cores: cpus,
        loadAvg: cpuLoad.map((l) => l.toFixed(2)),
      },
      os: {
        platform: os.platform(),
        arch: os.arch(),
        uptime: formatUptime(os.uptime()),
      },
      uptime: formatUptime(process.uptime()),
      nodeVersion: process.version,
      appVersion: pkg.version,
      timestamp: new Date().toISOString(),
      services: {
        // mongoDB: mongoose.connection.readyState === 1 ? "connected" : "disconnected",
        // redis: redisClient?.isOpen ? "connected" : "disconnected",
      },
    };

    res.status(200).json(response);
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

/**
 * GET /api/version
 * Returns the app version and environment info
 */
router.get("/version", (req, res) => {
  res.status(200).json({
    success: true,
    version: pkg.version,
    environment: env.NODE_ENV,
    nodeVersion: process.version,
    timestamp: new Date().toISOString(),
  });
});

export default router;
