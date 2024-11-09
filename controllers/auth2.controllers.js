import User2 from "../models/auth2.models.js";
import express from 'express';


const router = express.Router()
router.use(express.json())


export const signUpUser = async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
        const existingUser = await User2.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User with this email already exists.' });
        }

        const newUser = new User2({
            name,
            email,
            password,
        });

        await newUser.save();

        return res.status(201).json({ message: 'User created successfully!' });
    } catch (error) {
        console.error('Error during signup:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};


export const signInUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: 'Both email and password are required.' });
    }

    try {
        const user = await User2.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User not found.' });
        }

        if (user.password !== password) {
            return res.status(400).json({ message: 'Incorrect password.' });
        }

        return res.status(200).json({ message: 'Sign in successful!', user });
    } catch (error) {
        console.error('Error during sign in:', error);
        return res.status(500).json({ message: 'Server error' });
    }
};

