import mongoose, {Schema} from "mongoose";

const blacklistTokenSchema = new Schema({
    token: {
        type: String,
        required: [true, "blacklist token is required"]
    }
}, {timestamps:true})

export const blacklistTokenModel = mongoose.model("BlacklistToken", blacklistTokenSchema)
