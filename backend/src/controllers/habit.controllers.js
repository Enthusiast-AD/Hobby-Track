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

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const habitsWithStatus = habits.map((habit) => {
        let lastCompleted = habit.lastCompletedDate ? new Date(habit.lastCompletedDate) : null;
        if (lastCompleted) lastCompleted.setHours(0, 0, 0, 0);

        let isCompleted = false;
        if (habit.type === 'daily') {
             isCompleted = !!(lastCompleted && lastCompleted.getTime() === today.getTime());
        } else {
             // For todo, if it has a lastCompletedDate, it is done.
             isCompleted = !!habit.lastCompletedDate;
        }
        
        let displayStreak = 0;
        if (habit.type === 'daily') {
             if (lastCompleted && (lastCompleted.getTime() === today.getTime() || lastCompleted.getTime() === yesterday.getTime())) {
                displayStreak = habit.currentStreak;
            }
        }

        return {
            ...habit.toObject(),
            completedToday: isCompleted,
            currentStreak: displayStreak
        };
    });

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