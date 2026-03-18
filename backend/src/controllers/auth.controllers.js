import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiResponse } from '../utils/ApiResponse.js';
import { ApiError } from '../utils/ApiError.js';

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const generateToken = (user) => {
    return jwt.sign(
        { _id: user._id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

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

    const { email, name, picture, sub } = ticket.getPayload();

    let user = await User.findOne({ email });

    if (!user) {
        user = await User.create({
            email,
            fullName: name,
            avatar: picture,
            googleId: sub,
            password: Math.random().toString(36).slice(-8), // Dummy password for Google users
            isOnboardingComplete: false
        });
    }

    const token = generateToken(user);
    const loggedInUser = await User.findById(user._id).select("-password -googleId");

    return res.status(200).json(
        new ApiResponse(200, { user: loggedInUser, token }, "Google Login Successful")
    );
});

const signup = asyncHandler(async (req, res) => {
    // console.log("Signup Request Body:", req.body); // Debugging
    const { fullName, email, password } = req.body;

    if ([fullName, email, password].some((field) => field?.trim() === "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({ email });

    if (existedUser) {
        throw new ApiError(409, "User with email already exists");
    }

    let user;
    try {
        user = await User.create({
            fullName,
            avatar: `https://ui-avatars.com/api/?name=${fullName}&background=002a20&color=d4f5dd`,
            email,
            password,
            isOnboardingComplete: false
        });
    } catch (error) {
        console.error("Error creating user:", error);
        throw new ApiError(500, "Error creating user in database: " + error.message);
    }

    const createdUser = await User.findById(user._id).select("-password -googleId");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    const token = generateToken(createdUser);

    return res.status(201).json(
        new ApiResponse(201, { user: createdUser, token }, "User registered Successfully")
    );
});

const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email) {
        throw new ApiError(400, "email is required");
    }

    const user = await User.findOne({ email });

    if (!user) {
        throw new ApiError(404, "User does not exist");
    }

    // If user has googleId but no password (managed via update), and tries to login via password
    if (!user.password && user.googleId) {
         throw new ApiError(400, "Please login with Google");
    }

    const isPasswordValid = await user.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid user credentials");
    }

    const loggedInUser = await User.findById(user._id).select("-password -googleId");
    
    const token = generateToken(loggedInUser);

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                user: loggedInUser,
                token
            },
            "User logged In Successfully"
        )
    )
});


export { googleLogin, signup, login };