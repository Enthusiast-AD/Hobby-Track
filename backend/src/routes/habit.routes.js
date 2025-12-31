import Router from 'express';
import { createHabit, getHabits, toggleArchiveHabit } from '../controllers/habit.controllers.js';
import { verifyJWT } from '../middlewares/auth.middllewares.js'; 


const router = Router();

router.use(verifyJWT);

router.route('/')
    .post(createHabit)
    .get(getHabits);

router.route('/:habitId/archive').patch(toggleArchiveHabit);

export default router;