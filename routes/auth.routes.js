import express from 'express'
const router = express.Router()
import { signIn,signUp,getAllUser} from '../controllers/auth.controllers.js'

router.post("/signin",signIn)
router.post("/signup",signUp)
router.get("/allUsers",getAllUser)

export default router