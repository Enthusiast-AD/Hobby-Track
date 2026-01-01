import dotenv from "dotenv";

dotenv.config({
    path: "./.env"
});

import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

app.use(express.json());

import activityRoutes from './routes/activity.routes.js';
import authRoutes from './routes/auth.routes.js';
import habitRoutes from './routes/habit.routes.js';
import userRoutes from './routes/user.routes.js'

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/activity', activityRoutes);
app.use('/api/v1/habits', habitRoutes);
app.use('/api/v1/users', userRoutes);

app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    
    return res.status(statusCode).json({
        success: false,
        message: message,
        errors: err.errors || []
    });
});

export { app };