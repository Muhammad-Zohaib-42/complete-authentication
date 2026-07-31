import cookieParser from "cookie-parser"
import express from "express"
import cors from "cors"

const app = express()

app.use(express.json({limit: "15kb"}))
app.use(cookieParser({limit: "15kb"}))
app.use(cors({origin: process.env.CORS_ORIGIN, credentials: true}))

export {app}