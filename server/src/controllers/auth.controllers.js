import { userModel } from "../models/user.model.js"
import crypto from "crypto"
import jwt from "jsonwebtoken"
import config from "../config/config.js"
import sessionModel from "../models/session.model.js"
import { generateOtp, getOtpHtml } from "../utils/utils.js"
import { otpModel } from "../models/otp.model.js"
import { sendEmail } from "../services/email.service.js"

export async function register(req, res) {
    const {username, email, password} = req.body

    if (!username || !email || !password) {
        return res.status(400).json({
            message:"All fields are required"
        })
    }

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

    const otp = generateOtp()
    const otpHtml = getOtpHtml(otp,username)

    const otpHash = crypto.createHash("sha256").update(otp).digest("hex")
    await otpModel.create({
        email,
        user:user._id,
        otpHash
    })

    await sendEmail(email, "OTP Verification", `Your OTP code is ${otp}`, otpHtml)

    res.status(201).json({
        message:"User registered successfully",
        user:{
            username:user.username,
            email:user.email,
            verified:user.verified
        }
    })
}

export async function login(req, res) {
    const {email, password} = req.body

    if(!email || !password) {
        return res.status(400).json({
            message:"all fields are required"
        })
    }

    const user = await userModel.findOne({email})

    if(!user){
        return res.status(409).json({
            message:"user with this email doesn't exist"
        })
    }

    if (!user.verified) {
        return res.status(401).json({
            message:"Email is not verified"
        })
    }

    const passwordHash = crypto.createHash("sha256").update(password).digest("hex")

    const isPasswordCorrect = user.password == passwordHash

    if(!isPasswordCorrect) {
        return res.status(400).json({
            message:"invalid credentials"
        })
    }

    const refreshToken = jwt.sign({
        _id:user._id
    },config.JWT_SECRET,{
        expiresIn:"7d"
    })

    const accessToken = jwt.sign({
        _id:user._id
    },config.JWT_SECRET,{
        expiresIn:"15m"
    })

    const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest("hex")

    const session = await sessionModel.create({
        user:user._id,
        refreshToken:refreshTokenHash,
        ip:req.ip,
        userAgent:req.headers["user-agent"]
    })

    res.cookie("refreshToken", refreshToken, {
        httpOnly:true,
        secure:true,
        sameSite:"strict",
        maxAge:7*24*60*60*1000
    })

    return res.status(200).json({
        message:"user login successfully",
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

    const refreshTokenHash = crypto.createHash('sha256').update(refreshToken).digest("hex")

    const session = await sessionModel.findOne({
        refreshToken:refreshTokenHash,
        revoke:false
    })

    if(!session){
        return res.status(401).json({
            message:'invalid refresh token'
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

    const newRefreshTokenHash = crypto.createHash("sha256").update(newRefreshToken).digest("hex")

    session.refreshToken = newRefreshTokenHash
    await session.save()

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

export async function logout(req, res) {
    const {refreshToken} = req.cookies

    if (!refreshToken) {
        return res.status(400).json({
            message:"refresh token is required"
        })
    }

    const refreshTokenHash = crypto.createHash("sha256").update(refreshToken).digest("hex")

    const session = await sessionModel.findOne({
        refreshToken: refreshTokenHash,
        revoke: false
    })

    if (!session) {
        return res.status(400).json({
            message:"invalid refresh token"
        })
    }

    session.revoke = true
    await session.save()

    res.clearCookie("refreshToken")

    return res.status(200).json({
        message:"user logout successfully"
    })
}

export async function logoutAll(req, res) {
    const {refreshToken} = req.cookies

    if (!refreshToken) {
        return res.status(400).json({
            message: "refresh token is required"
        })
    }

    const decoded = jwt.verify(refreshToken, config.JWT_SECRET)

    await sessionModel.updateMany({
        user:decoded._id,
        revoke:false
    },{
        revoke:true
    })

    return res.status(200).json({
        message:"user logged out from all devices successfully"
    })
}

export async function verifyEmail(req, res){
    const {otp,email} = req.body

    if (!otp || !email) {
        return res.status(400).json({
            message:"all fields are required"
        })
    }

    const otpHash = crypto.createHash('sha256').update(otp).digest("hex")

    const otpDoc = await otpModel.findOne({email,otpHash})

    if (!otpDoc) {
        return res.status(400).json({
            message:"invalid OTP"
        })
    }

    const user = await userModel.findByIdAndUpdate(otpDoc.user, {verified:true})

    await otpModel.deleteMany({user:otpDoc.user})

    return res.status(200).json({
        message:"user verified successfully",
        user:{
            username:user.username,
            email:user.email,
            verified:user.verified
        }
    })
}