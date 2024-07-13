import express from 'express'
const router = express.Router()
import { signIn,signUp,getAllUser,getUserById} from '../controllers/auth.controllers.js'

router.post("/signin",signIn)
router.post("/signup",signUp)
router.get("/allUsers",getAllUser)
router.get("/user/:id",getUserById)

export default router