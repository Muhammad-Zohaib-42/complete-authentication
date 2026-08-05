import mongoose, {Schema} from "mongoose"

const otpSchema = new Schema({
    email:{
        type:String,
        required:[true,"email is required"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true,"User is required"]
    },
    otpHash:{
        type:String,
        required:[true,'OTP hash is required']
    }
}, {timestamps:true})

export const otpModel = mongoose.model("Otp", otpSchema)