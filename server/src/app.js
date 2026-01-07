import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import routes from './routes/index.js';
import infraRoutes from './modules/infra/infra.routes.js';
import { errorMiddleware } from './middlewares/error.middleware.js';
import { env } from './config/env.config.js';
import authRoutes from './modules/auth/auth.routes.js'

const app = express();

app.disable("x-powered-by");

app.use(
    helmet({
        contentSecurityPolicy: false,
        crossOriginEmbedderPolicy: false
    })
);

app.use(
    cors({
        origin: env.CORS_ORIGIN,
        credentials: true,
        maxAge: 86400, // cache prefilight for 24hr
    })
);

// body parsing
app.use(express.json({ limit: '10kb' }));

app.use('/', infraRoutes);
app.use('/api/v1', routes);
app.use("/auth", authRoutes);

app.use(errorMiddleware);

export default app;