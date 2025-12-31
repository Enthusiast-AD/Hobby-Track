import { Router } from 'express';
import { getUserByUsername,updateUsername } from '../controllers/user.controllers.js';
import { verifyJWT } from '../middlewares/auth.middllewares.js';

const router = Router();

// Public route to get profile
router.get('/u/:username', getUserByUsername);

router.post('/onboarding', verifyJWT, updateUsername);

export default router;