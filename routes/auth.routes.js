import express from 'express'
const router = express.Router()
import { signUp ,signIn,signUp2} from '../controllers/auth.controllers.js'

router.post("/signup",signUp)
router.post("/signin",signIn)
router.post("/signup2",signUp2)

export default router