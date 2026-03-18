import { Router } from 'express';
import { googleLogin, signup, login } from '../controllers/auth.controllers.js';

const router = Router();

router.post('/google', googleLogin);
router.post('/signup', signup);
router.post('/login', login);

export default router;