import {ActivityLog} from "../models/activityLog.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import {ApiError} from "../utils/ApiError.js"
import mongoose from "mongoose"; 
import { isValidObjectId } from "mongoose";
import {Habit} from "../models/habit.js";

const getUserStats = asyncHandler(async (req, res) => {
    const userId = req.params.userId;

    
    if(!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user ID");
    }

    const oneYearAgo = new Date();
    oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

    const stats = await ActivityLog.aggregate([
        {
            $match: {
                userId: new mongoose.Types.ObjectId(userId), 
                date: { 
                    $gte: oneYearAgo,
                }
            }
        },
        {
            $group: {
                _id: { 
                    $dateToString: { format: "%Y-%m-%d", date: "$date" } 
                },
                count: { $sum: 1 }
            }
        },
        {
            $sort: { _id: 1 }
        }
    
    ])

    return res.status(200).json(new ApiResponse(200, stats, "User activity stats retrieved successfully"))
});

const createActivityLog = asyncHandler(async (req, res) => {
    const { userId, habitId } = req.body;
    
    if(!isValidObjectId(userId) || !isValidObjectId(habitId)) {
        throw new ApiError(400, "Invalid user ID or habit ID");
    }

    const habit = await Habit.findById(habitId);
    if (!habit) {
        throw new ApiError(404, "Habit not found");
    }

    if (habit.isArchived) {
        throw new ApiError(400, "Cannot log activity for an archived habit");
    }


    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);

    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    if (habit.type === 'daily') {
        const existingLog = await ActivityLog.findOne({
            userId,
            habitId,
            date: { $gte: todayStart, $lte: todayEnd }
        });

        if (existingLog) {
            throw new ApiError(400, "You have already completed this daily habit today!");
        }
    } else if (habit.type === 'todo') {
        const existingLog = await ActivityLog.findOne({
            userId,
            habitId
        });

        if (existingLog) {
            throw new ApiError(400, "This To-Do is already completed!");
        }
    }

    const newLog  = await ActivityLog.create({
        userId,
        habitId,
        date: new Date(),
        count: 1
    });

    // Update Streak Logic
    const now = new Date();
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);

    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    let lastCompleted = habit.lastCompletedDate ? new Date(habit.lastCompletedDate) : null;
    if (lastCompleted) {
        lastCompleted.setHours(0, 0, 0, 0);
    }

    if (lastCompleted && lastCompleted.getTime() === yesterday.getTime()) {
        habit.currentStreak += 1;
    } else if (lastCompleted && lastCompleted.getTime() === today.getTime()) {
        // Already done today, shouldn't happen due to checks above, but keep streak same
    } else {
        // Missed a day or first time
        habit.currentStreak = 1;
    }

    if (habit.currentStreak > habit.maxStreak) {
        habit.maxStreak = habit.currentStreak;
    }

    habit.lastCompletedDate = now;
    await habit.save();

    return res.status(201).json(new ApiResponse(201, newLog, "Activity log created successfully"));
});

export { getUserStats, createActivityLog };