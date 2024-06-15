import express from 'express'
import { sendMessage,getMessages } from '../controllers/message.controllers.js'
import { protectRoute } from '../middlewares/protectRoute.middlewares.js'
const router = express.Router()

router.post("/sendMessage",protectRoute,sendMessage)
router.get("/getMessages",protectRoute,getMessages)


export default router