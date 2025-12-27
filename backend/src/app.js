import express from 'express';

const app = express();

app.use(express.json());

// Importing routes
import activityRoutes from './routes/activity.routes.js';

// Using routes
app.use('/activity', activityRoutes);

export default app;