import jwt from 'jsonwebtoken'
import User from '../models/auth.models.js'


export const protectRoute =async (req,res) => {
    try {
        const token = req.cookies.jwt
        if(!token){
            return res.statuc(401).json({
                message:"Unauthourized error"
            })
        }
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        if(!decoded){
            return res.statuc(401).json({
                message:"Unauthourized error"
            })
        }
        const user = await User.findById(decoded._id)
        if(!user){
            return res.status(404).json({
                message:"user not found"
            })
        }
    }
    catch(err){
        console.log("error in protect routes",err);
        res.status(500).json({
            error:"Internal server error"
        })
    }
}