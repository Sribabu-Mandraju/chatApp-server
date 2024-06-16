import express from 'express'

import { verifyToken } from '../middlewares/verifyToken.middlewares.js'
import { sendMessage,getMessages,getAllChats } from '../controllers/message.controllers.js'
const router = express.Router()

router.post("/sendMessage/:senderId/:receiverId",sendMessage)
router.get("/getMessages/:userId/:charToId",getMessages)
router.get("/getChats/:id",getAllChats)


export default router