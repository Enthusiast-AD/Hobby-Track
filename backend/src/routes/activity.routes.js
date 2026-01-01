import { Router }from 'express';
import { getUserStats, createActivityLog, getActivitiesByDate } from '../controllers/activity.controllers.js';

const router = Router();

router.get('/stats/:userId', getUserStats);
router.get('/date/:userId/:date', getActivitiesByDate);
router.post('/log', createActivityLog);
export default router;