import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import {User} from '../models/user.js'
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';


const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const googleLogin = asyncHandler(async (req, res) => {
    const { idToken } = req.body; 

    if (!idToken) {
        throw new ApiError(400, "Google ID Token is required");
    }

    let ticket;
    try {
        ticket = await client.verifyIdToken({
            idToken: idToken,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
    } catch (error) {
        throw new ApiError(401, "Invalid Google Token");
    }

    const { email, name, picture } = ticket.getPayload();

    let user = await User.findOne({ email });

    if (!user) {
        
        user = await User.create({
            email,
            fullName: name,
            avatar: picture,
            isOnboardingComplete: false 
        });
    }

    const token = jwt.sign(
        { _id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );

    const responseData = {
        user,
        token
    };

    return res.status(200).json(
        new ApiResponse(200, responseData, "Login Successful")
    );
});

export { googleLogin };