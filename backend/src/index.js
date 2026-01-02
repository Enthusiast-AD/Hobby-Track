import dotenv from "dotenv"
import { app } from "./app.js"
import connectDB from "./db/index.js"

dotenv.config({
    path: "./.env"
})

const PORT = process.env.PORT || 8000

// 1. Connect to DB (but don't block the export)
connectDB()
.then(() => {
    console.log("Mongo Connected");
})
.catch((error) => {
    console.error("Failed to connect to database", error);
})

// 2. Only start the server if we are running locally (not on Vercel)
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on port http://127.0.0.1:${PORT}`);
    });
}

// 3. Export the app for Vercel
export default app;