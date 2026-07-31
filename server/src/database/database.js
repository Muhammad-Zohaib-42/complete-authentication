import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const mongodbUri = process.env.MONGODB_URI || "mongodb://localhost:27017"

async function connectDB() {
    const connectionInstance = await mongoose.connect(`${mongodbUri}/${DB_NAME}`)
    console.log(`DB connected successfully! host: ${connectionInstance.connection.host}`)
}

export {connectDB}