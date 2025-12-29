import { Router }from 'express';
import { getUserStats, createActivityLog } from '../controllers/activity.controllers.js';

const router = Router();

router.get('/stats/:userId', getUserStats);
router.post('/log', createActivityLog);
export default router;