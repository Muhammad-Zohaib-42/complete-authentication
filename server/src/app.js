import cookieParser from "cookie-parser"
import express from "express"
import cors from "cors"

const app = express()

app.use(express.json({limit: "15kb"}))
app.use(cookieParser({limit: "15kb"}))
app.use(cors({origin: process.env.CORS_ORIGIN, credentials: true}))

function globalErrorHandler(err, req, res, next) {
    const statusCode = err.statusCode || 500
    const message = err.message || "Internal Server Error"

    res
    .status(statusCode)
    .json({
        message,
        success: false
    })
}

app.use()

export {app}