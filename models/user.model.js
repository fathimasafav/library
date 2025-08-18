import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min_Length:2,
        max_Length:50,
    },
    email:{
        type:String,
        required:[true,'User email is required'],
        unique:true,
        trim:true,
        lowercase:true,
        match: [/^\S+@\S+\.\S+$/, 'Please fill a valid email address']
    },
    password:{
        type:String,
        required:[true,'User password is required'],
        min_Length:3,
    },profilePi:{
        type:String,
        default:""
    }
}, { timestamps: true });


const User = mongoose.model('user',userSchema);


export default User;

User.create();