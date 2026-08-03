import { userModel } from "../models/user.model.js"
import crypto from "crypto"
import jwt from "jsonwebtoken"
import config from "../config/config.js"

export async function register(req, res) {
    const {username, email, password} = req.body

    const isAlreadyRegistered = await userModel.findOne({
        $or: [{username}, {email}]
    })

    if (isAlreadyRegistered) {
        res.status(409).json({
            message:"username or email already exist"
        })
    }

    const hashPassword = crypto.createHash("sha256").update(password).digest("hex")

    const user = await userModel.create({username, email, password:hashPassword})

    const accessToken = jwt.sign(
        {_id:user._id},
        config.JWT_SECRET,
        {expiresIn:"15m"}
    )

    const refreshToken = jwt.sign({
        _id:user._id
    },config.JWT_SECRET,{
        expiresIn: "7d"
    })

    res.status(201).cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000
    }).json({
        message:"User registered successfully",
        user:{
            username:user.username,
            email:user.email
        },
        accessToken
    })
}

export async function getMe(req, res){
    const token = req.headers.authorization?.split(" ")[1]

    if (!token) {
        res.status(401).json({
            message: "token not provided"
        })
    }

    const decoded = jwt.verify(token, config.JWT_SECRET)

    const user = await userModel.findById(decoded._id)

    res.status(200).json({
        message:"user fetched successfully",
        user:{
            username:user.username,
            email:user.email
        }
    })
}

export async function refreshToken(req, res) {
    const refreshToken = req.cookies.refreshToken

    if (!refreshToken) {
        res.status(401).json({
            message:"refresh token not found"
        })
    }

    const decoded = jwt.verify(refreshToken, config.JWT_SECRET)

    const accessToken = jwt.sign({
        _id:decoded._id
    }, config.JWT_SECRET, {
        expiresIn: "15m"
    })

    const newRefreshToken = jwt.sign({
        _id:decoded._id
    }, config.JWT_SECRET,{
        expiresIn: "7d"
    })

    res.status(200).cookie("refreshToken", newRefreshToken, {
        httpOnly:true,
        secure:true,
        sameSite:"strict",
        maxAge:7*24*60*60*1000
    }).json({
        message:"access token refreshed successfully",
        accessToken
    })
}