import jwt from "jsonwebtoken";
import User from '../models/auth.models.js'
export const verifyToken =async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if(!token){
      return res.status(401).json({error:"Unauthourized - No token provided"})
    }
    const decode = jwt.verify(token,process.env.SECRET_KEY)

    if(!decode){
      return res.status(401).json({error:"Unauthourized - invalid token"})
    }
    const user = await User.findById(decode.userId)
    if(!user){
      return res.status(404).json({error:"no user found"})
    }
    req.user = user
    next()
  } catch (error) {
    
  }
  
}