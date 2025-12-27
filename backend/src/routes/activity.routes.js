import { Router }from 'express';
import { getUserStats } from '../controllers/activity.controllers.js';

const router = Router();

router.get('/stats/:userId', getUserStats);

export default router;