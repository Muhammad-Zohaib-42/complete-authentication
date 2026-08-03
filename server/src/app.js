import express from "express"
import morgan from "morgan"
import cookieParser from "cookie-parser"

const app = express()

app.use(express.json())
app.use(morgan("dev"))
app.use(cookieParser())

import authRouter from "./routes/auth.routes.js"

app.use("/api/auth", authRouter)

export default app