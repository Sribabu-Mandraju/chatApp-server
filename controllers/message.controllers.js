import express from 'express';
import Conversation from '../models/conversation.models.js';
import Message from '../models/message.models.js';
import mongoose from 'mongoose';


export const sendMessage = async (req, res) => {
    const { message } = req.body;
    const {id:receiverId} = req.params
    const senderId = req.user._id

    if (!senderId || !receiverId || !message) {
        return res.status(400).json({ error: 'senderId' });
    }

    try {
        // Convert senderId and receiverId to ObjectId
        const senderObjectId = senderId;
        const receiverObjectId = receiverId;

        // Find or create a conversation
        let conversation = await Conversation.findOne({
            participants: { $all: [senderObjectId, receiverObjectId] }
        });

        if (!conversation) {
            conversation = new Conversation({
                participants: [senderObjectId, receiverObjectId],
                messages: []
            });
            await conversation.save();
        }

        // Create a new message
        const newMessage = new Message({
            message,
            senderId: senderObjectId,
            receiverId: receiverObjectId
        });

        const savedMessage = await newMessage.save();

        // Add the new message to the conversation
        conversation.messages.push(savedMessage._id);
        await conversation.save();

        res.status(201).json({ message: 'Message sent successfully', data: savedMessage });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

export const getMessages = async(req,res) => {
    try {
        const {userId,charToId} = req.params;
        const conversation = await Conversation.findOne({
            participants:{$all:{userId,charToId}}
        }).populate("messages")

        res.status(200).json(conversation.messages)
    } catch (error) {
        console.log("error sending messages")
        res.status(500).json({ error: 'Internal server error', details: error.message });

    }
}