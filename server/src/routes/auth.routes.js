import { Router } from "express";
import * as authControllers from "../controllers/auth.controllers.js"

const authRouter = Router()

/**
 * POST /api/auth/register
 */
authRouter.post("/register", authControllers.register)

/**
 * GET /api/auth/get-me
 */
authRouter.get("/get-me", authControllers.getMe)

/**
 * GET /api/auth/refresh-token
 */
authRouter.get("/refresh-token", authControllers.refreshToken)

export default authRouter