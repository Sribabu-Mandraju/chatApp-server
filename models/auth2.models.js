import mongoose from 'mongoose';

const Schema = mongoose.Schema;

// Define User Schema
const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    }
});

// Create and export User model
const User2 = mongoose.model('User2', userSchema);
export default User2;
