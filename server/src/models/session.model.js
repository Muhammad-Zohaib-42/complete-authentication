import mongoose, {Schema} from "mongoose";

const sessionSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:[true, "user is required"]
    },
    refreshToken:{
        type:String,
        required:[true,"refresh token hash is required"]
    },
    ip:{
        type:String,
        required:[true,"ip is required"]
    },
    userAgent:{
        type:String,
        required:[true,"user agent is required"]
    },
    revoke:{
        type:Boolean,
        default:false
    }
},{timestamps: true})

const sessionModel = mongoose.model("Session", sessionSchema)

export default sessionModel