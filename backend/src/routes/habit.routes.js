import Router from 'express';
import { createHabit, getHabits, toggleArchiveHabit, deleteHabit } from '../controllers/habit.controllers.js';
import { verifyJWT } from '../middlewares/auth.middllewares.js'; 


const router = Router();

router.use(verifyJWT);

router.route('/')
    .post(createHabit)
    .get(getHabits);

router.route('/:habitId/archive').patch(toggleArchiveHabit);
router.route('/:habitId').delete(deleteHabit);

export default router;