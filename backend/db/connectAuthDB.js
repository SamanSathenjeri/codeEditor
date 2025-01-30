import mongoose from "mongoose";

export const connectAuthDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI)
        console.log("db connected")
    }
    catch (error) {
        console.log("error connecting")
        process.exit(1)
    }
}