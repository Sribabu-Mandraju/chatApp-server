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
    },
    ID:{
        type:String,
        unique:true,
        minlength:6,
        required:true
    },

})
const User =  mongoose.model('User',userSchema)
export default User