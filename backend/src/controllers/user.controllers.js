import { User }from "../models/user.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";

const getUserByUsername = asyncHandler(async (req, res) => {
    const { username } = req.params;

    const user = await User.findOne({ username }).select("-email -isOnboardingComplete");

    if (!user) {
        throw new ApiError(404, "User not found");
    }

    return res.status(200).json(
        new ApiResponse(200, user, "User profile fetched successfully")
    );
});

const updateUsername = asyncHandler(async (req, res) => {
    const { username } = req.body;
    const userId = req.user._id;

    
    if (!username || username.length < 3) {
        throw new ApiError(400, "Username must be at least 3 characters");
    }

    const existingUser = await User.findOne({ username });
    if (existingUser) {
        throw new ApiError(409, "Username already taken");
    }

    
    const updatedUser = await User.findByIdAndUpdate(
        userId,
        { 
            $set: { 
                username: username.toLowerCase(),
                isOnboardingComplete: true 
            }
        },
        { new: true } 
    ).select("-password");

    return res.status(200).json(
        new ApiResponse(200, updatedUser, "Username updated successfully")
    );
});

export { getUserByUsername, updateUsername };