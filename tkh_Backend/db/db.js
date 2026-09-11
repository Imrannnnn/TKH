import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            console.warn("⚠️ MONGO_URI is not set in environment variables. Please check your .env file.");
            return;
        }
        await mongoose.connect(uri);
        console.log("Connected to database successfully");
    } catch (error) {
        console.error(error.message, 'failed to connect to Database');
        // If MongoDB server isn't running locally yet, don't kill server immediately so REST endpoints can still function
    }
};

export { connectDB };
export default connectDB;