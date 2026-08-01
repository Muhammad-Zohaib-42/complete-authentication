import {Router} from "express"
import { getMeController, loginUserController, logoutUserController, registerUserController } from "../controllers/auth.controllers.js"
import { authUser } from "../middlewares/auth.middleware.js"

const router = Router()

router.route("/register").post(registerUserController)
router.route("/login").post(loginUserController)
router.route("/logout").post(authUser, logoutUserController)
router.route("/getme").get(authUser, getMeController)

export default router