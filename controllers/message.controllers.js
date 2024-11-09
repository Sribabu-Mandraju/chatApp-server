import express from 'express';
import Conversation from '../models/conversation.models.js';
import Message from '../models/message.models.js';
import mongoose from 'mongoose';
import User from '../models/auth.models.js';
const { ObjectId } = mongoose.Types;



// export const sendMessage = async (req, res) => {
//     const { message } = req.body;
//     const { senderId, receiverId } = req.params;
    
//     if (!senderId || !receiverId || !message) {
//         return res.status(400).json({ error: 'senderId' });
//     }

//     try {
//         // Convert senderId and receiverId to ObjectId
//         const senderObjectId = senderId;
//         const receiverObjectId = receiverId;

//         // Find or create a conversation
//         let conversation = await Conversation.findOne({
//             participants: { $all: [senderObjectId, receiverObjectId] }
//         });

//         if (!conversation) {
//             conversation = new Conversation({
//                 participants: [senderObjectId, receiverObjectId],
//                 messages: []
//             });
//             await conversation.save();
//         }

//         // Create a new message
//         const newMessage = new Message({
//             message,
//             senderId: senderObjectId,
//             receiverId: receiverObjectId
//         });

//         const savedMessage = await newMessage.save();

//         // Add the new message to the conversation
//         conversation.messages.push(savedMessage._id);
//         await conversation.save();

//         res.status(201).json({ message: 'Message sent successfully', data: savedMessage });
//     } catch (error) {
//         res.status(500).json({ error: 'Internal server error', details: error.message });
//     }
// };


export const sendMessage = (io) => async (req, res) => {
    const { message } = req.body;
    const { senderId, receiverId } = req.params;

    if (!senderId || !receiverId || !message) {
        return res.status(400).json({ error: 'Missing required fields' });
    }

    try {
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

        // Emit the new message event via Socket.IO
        io.emit('newMessage', savedMessage);

        res.status(201).json({ message: 'Message sent successfully', data: savedMessage });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};


// export const getMessages = async (req, res) => {
//     try {
//         const { userId, charToId } = req.params;

//         // Ensure userId and charToId are valid ObjectId strings
//         if (!ObjectId.isValid(userId) || !ObjectId.isValid(charToId)) {
//             return res.status(400).json({ error: 'Invalid ID format' });
//         }

//         const conversation = await Conversation.findOne({
//             participants: { $all: [new ObjectId(userId), new ObjectId(charToId)] }
//         }).populate('messages');

//         if (!conversation) {
//             return res.status(404).json({ error: 'Conversation not found' });
//         }

//         res.status(200).json(conversation.messages);
//     } catch (error) {
//         console.error('Error fetching messages:', error);
//         res.status(500).json({ error: 'Internal server error', details: error.message });
//     }
// };


export const getMessages = async (req, res) => {
    try {
        const { userId, charToId } = req.params;

        // Ensure userId and charToId are valid ObjectId strings
        if (!ObjectId.isValid(userId) || !ObjectId.isValid(charToId)) {
            return res.status(400).json({ error: 'Invalid ID format' });
        }

        const conversation = await Conversation.findOne({
            participants: { $all: [new ObjectId(userId), new ObjectId(charToId)] }
        }).populate('messages');

        if (!conversation) {
            return res.status(404).json({ error: 'Conversation not found' });
        }

        res.status(200).json(conversation.messages);
    } catch (error) {
        console.error('Error fetching messages:', error);
        res.status(500).json({ error: 'Internal server error', details: error.message });
    }
};

export const getAllChats = async (req,res) => {
    try{
        const userId = req.params.id;
        const users = await User.find({_id:{$ne :userId}}).select("-password")
        res.status(200).json(users)
    }
    catch(err){
        console.log("error aat getAllChats func",err);
        res.status(500).json({
            error:err.message
        })
    }
}