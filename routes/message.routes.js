import express from 'express'

import { verifyToken } from '../middlewares/verifyToken.middlewares.js'
import { sendMessage,getMessages } from '../controllers/message.controllers.js'
const router = express.Router()

router.post("/sendMessage/:userId/:receiverId",verifyToken,sendMessage)
router.get("/getMessages/:userId/:charToId",getMessages)


export default router