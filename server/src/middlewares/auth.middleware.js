import { userModel } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

const authUser = asyncHandler(async (req, res, next) => {
    const {accessToken} = req.cookies

    if (!accessToken) {
        throw new ApiError(400, "token is required")
    }

    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)

    if (!decoded) {
        throw new ApiError(401, "unAuthorized request")
    }

    const user = await userModel.findById(decoded._id).select("-password -refreshToken")

    if (!user) {
        throw new ApiError(401, "unAuthorized request")
    }

    req.user = user
    next()
})

export {authUser}