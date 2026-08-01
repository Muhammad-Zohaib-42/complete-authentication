import { cookiesOptions } from "../constants.js";
import { userModel } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js"
import { blacklistTokenModel } from "../models/blacklistToken.model.js";


async function generateAccessAndRefreshTokens(user) {
    const accessToken = user.generateAccessToken()
    const refreshToken = user.generateRefreshToken()

    if (!accessToken || !refreshToken) {
        throw new ApiError(500, "Something went wrong while generating tokens")
    }

    user.refreshToken = refreshToken
    await user.save()

    return {accessToken, refreshToken}
}

const registerUserController = asyncHandler(async function(req, res) {
    const {name, email, password} = req.body

    if (!name || !email || !password) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await userModel.findOne({email})

    if (existedUser) {
        throw new ApiError(400, "User with this email already exist")
    }

    const createdUser = await userModel.create({name,email,password})

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(createdUser)

    const user = await userModel.findById(createdUser).select("-password -refreshToken")

    console.log(accessToken, refreshToken)

    return res
    .status(201)
    .cookie("accessToken", accessToken, cookiesOptions)
    .cookie("refreshToken", refreshToken, cookiesOptions)
    .json(
        new ApiResponse(201, "user created successfully", user)
    )
})

const loginUserController = asyncHandler(async (req, res) => {
    const {email, password} = req.body

    if (!email || !password) {
        throw new ApiError(400, "All fields are required")
    }

    const existedUser = await userModel.findOne({email})

    if (!existedUser) {
        throw new ApiError(400, "Account with this email doesn't exist")
    }

    const isPasswordCorrect = await existedUser.isPasswordCorrect(password)

    if (!isPasswordCorrect) {
        throw new ApiError(400, "Invalid Credentials")
    }

    const {accessToken, refreshToken} = await generateAccessAndRefreshTokens(existedUser)

    const user = await userModel.findById(existedUser).select("-password -refreshToken")

    return res
    .status(200)
    .cookie("accessToken", accessToken, cookiesOptions)
    .cookie("refreshToken", refreshToken, cookiesOptions)
    .json(
        new ApiResponse(200, "user loggedIn successfully", user)
    )
})

const logoutUserController = asyncHandler(async (req, res) => {
    const {user} = req
    const {refreshToken} = req.cookies

    await blacklistTokenModel.create({token:refreshToken})

    await userModel.findByIdAndUpdate(
        user._id,
        {$set: {refreshToken: ""}},
        {new:true}
    )

    return res
    .status(200)
    .clearCookie("accessToken", cookiesOptions)
    .clearCookie("refreshToken", cookiesOptions)
    .json(
        new ApiResponse(200, "user loggedOut successfully", user)
    )
})

const getMeController = asyncHandler(async (req, res) => {
    const {user} = req

    return res
    .status(200)
    .json(
        new ApiResponse(200, "user fetched successfully", user)
    )
})

export {registerUserController, loginUserController, logoutUserController, getMeController}