// // /server/sockets/socket.js

// import Conversation from '../models/conversation.models.js';
// import Message from '../models/message.models.js';

// let onlineUsers = 0;

// const socketHandler = (io) => {
//   io.on('connection', (socket) => {
//     onlineUsers++;
//     io.emit('onlineUsers', onlineUsers);

//     console.log('A user connected', onlineUsers);

//     socket.on('disconnect', () => {
//       onlineUsers--;
//       io.emit('onlineUsers', onlineUsers);
//       console.log('A user disconnected', onlineUsers);
//     });

//     // Listen for new message event
//     socket.on('newMessage', async (message) => {
//       try {
//         // Save the new message to the database
//         const newMessage = new Message(message);
//         const savedMessage = await newMessage.save();

//         // Find or create a conversation
//         let conversation = await Conversation.findOne({
//           participants: { $all: [message.senderId, message.receiverId] }
//         });

//         if (!conversation) {
//           conversation = new Conversation({
//             participants: [message.senderId, message.receiverId],
//             messages: []
//           });
//           await conversation.save();
//         }

//         // Add the new message to the conversation
//         conversation.messages.push(savedMessage._id);
//         await conversation.save();

//         // Broadcast the new message to all clients
//         io.emit('newMessage', savedMessage);
//       } catch (error) {
//         console.error('Error saving message:', error);
//       }
//     });
//   });
// };

// export default socketHandler;
