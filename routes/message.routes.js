import express from 'express'

import { verifyToken } from '../middlewares/verifyToken.middlewares.js'
import { sendMessage,getMessages } from '../controllers/message.controllers.js'
const router = express.Router()

router.post("/sendMessage/:id",verifyToken,sendMessage)
router.get("/getMessages/:userId/:charToId",verifyToken,getMessages)


export default router