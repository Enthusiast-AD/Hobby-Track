import express from 'express';
import cors from 'cors';

const app = express();

app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    credentials: true // Allow cookies to be sent with requests
}))

app.use(express.json());

// Importing routes
import activityRoutes from './routes/activity.routes.js';
import authRoutes from './routes/auth.routes.js';

// Using routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/activity', activityRoutes);

export { app };