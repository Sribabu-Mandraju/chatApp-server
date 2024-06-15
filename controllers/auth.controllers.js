import User from '../models/auth.models.js'
import jwt from 'jsonwebtoken'
import express from 'express';
import bcrypt from 'bcrypt'
import { hashPassword } from '../helpers/hashPassword.helpers.js';
import dotenv from 'dotenv'
import { generateTokenAndSetCookie } from '../middlewares/generateToken.middlewares.js';
dotenv.config()




const router = express.Router()

router.use(express.json())


const generateToken = (user) => {
    return jwt.sign(
        {
            _id: user._id,
            email: user.email,
            name: user.name,
        },
        process.env.JWT_SECRET, // Private key for signing JWT
        {
            expiresIn: '1h', // Token expires in 1 hour (adjust as needed)
        }
    );
};

export const getAllUser = async (req, res, next) => {
    try {
        const users = await User.find();
        if (!users || users.length === 0) {
            console.log("No users found");
            return res.status(404).json({ "message": "No users found" });
        }
        return res.status(200).json(users);
    } catch (err) {
        console.error("Error while fetching users:", err);
        return res.status(500).json({ "message": "Internal server error" });
    }
};

export const getUserById = async (req,res,next) => {
    try{
        const id = req.params.id
        const user = await User.findById(id)
        if(!user){
            return res.status(404).json({
                "message":"no user found"
            })
        }
        return res.status(200).json({
            user:user
        })
    }
    catch(err){
        res.status(400).json({
            "message":err.message
        })
        console.log(err)
    }
}




export const signUp = async (req, res, next) => {
    const { name, email, password ,ID} = req.body;

    try {
        // Check if the user already exists
        let existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            ID
        });

        // Save the user to the database
        await newUser.save();

        return res.status(201).json({
            message: "User created successfully",
            user: newUser,
        });
    } catch (err) {
        console.error("Error while signing up:", err);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};


export const signIn = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found",
            });
        }

        // Check if the entered password matches with the stored hashed password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({
                message: "Invalid credentials",
            });
        }

        generateTokenAndSetCookie(user._id,res)

        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            token:req.cookies.jwt
        })

    } catch (err) {
        console.error("Error while signing in:", err);
        return res.status(500).json({
            message: "Internal server error",
        });
    }
};

export const logout =async  (req,res) => {
 try {
    res.cookie("jwt","")
    res.status(200).json({
        message:"logged out successfully"
    })
 } catch (error) {
    console.log("error while logging out ",error.message)

    res.status(500).json({
        message:error.message
    })
 }
}