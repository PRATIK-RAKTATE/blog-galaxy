import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import connectDB from './config/mongodb.js';
import authRoutes from './routes/auth.route.js';
import userRoutes from './routes/user.route.js';

const app = express();

const port = process.env.PORT || 4000;

connectDB();

app.use(cookieParser())
app.use(express.json());
app.use(cors({
    credentials: true
}))



app.get('/', (req, res) => {
    res.send("Health: OK");
})

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/user', userRoutes);

app.listen(port, () => {
    console.log(`App is listening on http://localhost:${port}`)
})
