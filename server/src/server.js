import http from "http";
import app from "./app.js";
import { connectDB } from "./config/db.config.js";
import { env } from "./config/env.config.js";
import { logger } from "./config/logger.config.js";

let server;

async function bootstrap() {
  try {
    await connectDB();

    server = http.createServer(app);

//protect against slow clients & resource exhaustion
    server.keepAliveTimeout = 60 * 1000;
    server.headersTimeout = 65 * 1000;

    server.listen(env.PORT, () => {
      logger.info("Server started", { port: env.PORT });
    });
  } catch (err) {
    logger.fatal("Server bootstrap failed", {
      error: err?.message,
    });
    process.exit(1);
  }
}

// process saftey
process.on("unhandledRejection", (reason) => {
  logger.fatal("Unhandled promise rejection", {
    reason: reason?.message || reason,
  });
  shutdown(1);
});

process.on("uncaughtException", (error) => {
  logger.fatal("Uncaught exception", {
    error: error?.message,
    stack: error?.stack,
  });
  shutdown(1);
});

// gracefull shutdown

process.on("SIGTERM", () => shutdown(0));
process.on("SIGINT", () => shutdown(0));

function shutdown(code) {
  if (!server) {
    process.exit(code);
  }

  logger.info("Graceful shutdown initiated");

  server.close(() => {
    logger.info("HTTP server closed");
    process.exit(code);
  });

//hard stop safeguard for small VMs
  setTimeout(() => {
    logger.error("Forced shutdown after timeout");
    process.exit(1);
  }, 5000).unref();
}

bootstrap();
