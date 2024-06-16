import mongoose from "mongoose";

const Schema  = mongoose.Schema;

const userSchema = new Schema({
    name:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
        minlength:6,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    }
   })
const User =  mongoose.model('Users',userSchema)
export default User