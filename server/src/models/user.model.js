import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "username is requireid"],
        unique: [true, "username must be unique"]
    },
    email:{
        type:String,
        required:[true, "email is required"],
        unique:[true, "email must be unique"]
    },
    password:{
        type:String,
        required:[true, "password is required"]
    },
    verified:{
        type:Boolean,
        default:false
    }
}, {timestamps: true})

export const userModel = mongoose.model("User", userSchema)