import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import { Habit } from '../models/habit.js';
import { ActivityLog } from '../models/activityLog.js';

const createHabit = asyncHandler(async (req, res) => {
    const {title, description, type} = req.body;
    const userId = req.user._id;

    if (!title) {
        throw new ApiError(400, 'Title is required');
    }

    const newHabit = await Habit.create({
        userId,
        title,
        description,
        type
    });

    return res.status(201).json(new ApiResponse(201,newHabit, 'Habit created successfully',));
});

const getHabits = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const habits = await Habit.find({userId, isArchived: false}).sort({createdAt: -1});

    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    const habitsWithStatus = await Promise.all(habits.map(async (habit) => {
        let isCompleted = false;

        if (habit.type === 'daily') {
            const log = await ActivityLog.findOne({
                userId,
                habitId: habit._id,
                date: { $gte: todayStart, $lte: todayEnd }
            });
            isCompleted = !!log;
        } else if (habit.type === 'todo') {
            const log = await ActivityLog.findOne({
                userId,
                habitId: habit._id
            });
            isCompleted = !!log;
        }

        return {
            ...habit.toObject(),
            completedToday: isCompleted
        };
    }));

    return res.status(200).json(new ApiResponse(200, habitsWithStatus, 'Habits retrieved successfully'));
})

const toggleArchiveHabit = asyncHandler(async(req,res) => {
    const {habitId} = req.params;
    const userId = req.user._id;

    const habit = await Habit.findOne({ _id: habitId, userId });

    if(!habit) {
        throw new ApiError(404, 'Habit not found');
    }
    
    habit.isArchived = !habit.isArchived;
    await habit.save();

    return res.status(200).json(new ApiResponse(200,habit, habit.isArchived ? 'Habit archived successfully' : 'Habit unarchived successfully'));
})

export {createHabit, getHabits, toggleArchiveHabit};