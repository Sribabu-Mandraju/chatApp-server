import express from 'express';
import Conversation from '../models/conversation.models.js';
import Message from '../models/message.models.js';
import mongoose from 'mongoose';


export const sendMessage = async (req, res) => {
    const { message, senderId, receiverId } = req.body;

    if (!senderId || !receiverId || !message) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    try {
        let conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [senderId,receiverId],
                messages: []
            });
        }

        const newMessage = new Message({
            message,
            senderId: senderId,
            receiverId:receiverId
        });

        const savedMessage = await newMessage.save();

        if (savedMessage) {
            conversation.messages.push(savedMessage._id);
            await conversation.save();
        }

        res.status(201).json({ message: 'Message sent successfully', data: savedMessage });
    } catch (error) {
        console.log("error sending message")
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }

};

export const getMessages = async(req,res) => {
    try {
        const {id:userToChatId} = req.params;
        const {senderId} = req.body;
        const conversation = await conversation.findOne({
            participants:{$all:{senderId,userToChatId}}
        }).populate("messages")

        res.status(200).json(conversation.messages)
    } catch (error) {
        console.log("error sending messages")
        res.status(500).json({ error: 'Internal server error', details: error.message });

    }
}