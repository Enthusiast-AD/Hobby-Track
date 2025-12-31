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

    // Calculate Streaks
    const dates = stats.map(s => s._id);
    
    // Max Streak
    let maxStreak = 0;
    let currentSequence = 0;
    
    for (let i = 0; i < dates.length; i++) {
        if (i === 0) {
            currentSequence = 1;
        } else {
            const prev = new Date(dates[i-1]);
            const curr = new Date(dates[i]);
            const diffTime = Math.abs(curr - prev);
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
            
            if (diffDays === 1) {
                currentSequence++;
            } else {
                currentSequence = 1;
            }
        }
        if (currentSequence > maxStreak) maxStreak = currentSequence;
    }
    
    // Current Streak
    let currentStreak = 0;
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    const hasToday = dates.includes(todayStr);
    const hasYesterday = dates.includes(yesterdayStr);
    
    if (hasToday || hasYesterday) {
        let checkDate = hasToday ? new Date(today) : new Date(yesterday);
        
        while (true) {
            const checkStr = checkDate.toISOString().split('T')[0];
            if (dates.includes(checkStr)) {
                currentStreak++;
                checkDate.setDate(checkDate.getDate() - 1);
            } else {
                break;
            }
        }
    }

    return res.status(200).json(new ApiResponse(200, { stats, streaks: { current: currentStreak, max: maxStreak } }, "User activity stats retrieved successfully"))
});

const getActivitiesByDate = asyncHandler(async (req, res) => {
    const { userId, date } = req.params;
    
    if(!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid user ID");
    }

    const start = new Date(date);
    if (isNaN(start.getTime())) {
        throw new ApiError(400, "Invalid date format");
    }
    
    start.setUTCHours(0, 0, 0, 0);
    const end = new Date(start);
    end.setUTCHours(23, 59, 59, 999);

    const activities = await ActivityLog.find({
        userId,
        date: { $gte: start, $lte: end }
    }).populate("habitId", "title type");

    return res.status(200).json(new ApiResponse(200, activities, "Activities retrieved successfully"));
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

export { getUserStats, createActivityLog, getActivitiesByDate };