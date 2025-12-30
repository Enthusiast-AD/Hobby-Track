import Router from 'express';
import { createHabit, getHabits } from '../controllers/habit.controllers.js';
import { verifyJWT } from '../middlewares/auth.middllewares.js'; 


const router = Router();

router.use(verifyJWT);

router.route('/')
    .post(createHabit)
    .get(getHabits);

export default router;