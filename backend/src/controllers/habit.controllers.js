import {asyncHandler} from '../utils/asyncHandler.js';
import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import { Habit } from '../models/habit.js';

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
    return res.status(200).json(new ApiResponse(200,habits, 'Habits retrieved successfully',));
})

export {createHabit, getHabits};