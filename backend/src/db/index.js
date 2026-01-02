import mongoose from "mongoose";
import { DB_NAME } from "../constants.js"

let isConnected = false; 

const connectDB = async () => {

    mongoose.set('strictQuery', true);

    if (isConnected) {
        console.log("MongoDB is already connected.");
        return;
    }
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        isConnected = true;
        console.log(`\n MongoDB connected: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error(`MongoDB connection error: ${error.message}`); 
        process.exit(1);
    }
}

export default connectDB;