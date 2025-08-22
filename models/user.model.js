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
    },profilePic:{
        type:String,
        default:""
    },bio:{
        type:String,
        max_Length:150,
        default:""
    },dob:{
        type: Date,
        validate:{
            validator: function(value){
                if (!value) return true;  // allow empty/null DOB
                return value <= new Date();  // prevent future dates
            },
            message: "Date of birth cannot be in the future."
        }
    },nationality:{
        type:String,
        trim:true,
    }, address: {
        street: { type: String, trim: true },
        city: { type: String, trim: true },
        state: { type: String, trim: true },
        postalCode: { type: String, trim: true },
        country: { type: String, trim: true },
    },
    number: {
        type: String,
        trim: true,
        validate: {
            validator: function (value) {
                if (!value) return true; // allow empty/null
                // basic regex: allows +countrycode and 7–15 digits
                return /^\+?[0-9]{7,15}$/.test(value);
            },
            message: "Invalid phone number format."
        }
    }, gender: {
        type: String,
        enum: ["Male", "Female", "Other", "Prefer not to say"],
        default: "Prefer not to say",
    },language:{
        type:String,
        enum:["English","Malayalam"],
        default:"English",
    }

}, { timestamps: true });


const User = mongoose.model('user',userSchema);


export default User;

User.create();