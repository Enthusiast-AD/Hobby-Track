import {ActivityLog} from "../models/activityLog.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import {ApiError} from "../utils/ApiError.js"
import mongoose from "mongoose"; 
import { isValidObjectId } from "mongoose";

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

export { getUserStats };