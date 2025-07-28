import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min_Length:2,
        max_Length:50,
    },
    price:{
        type: Number,
        required: [true,"product number is required"],
        min_Length: [0,'price must be greater than 0'],
        max_Length: [1000, 'price must be less than 1000'],
    },
    currency: {
        type: String,
        required: [true, 'currency is required'],
        enum: ['INR', 'USD', 'EUR'],
        default: 'INR'
    },
    category:{
        type:String,
        enum:["fantasy","fiction","thriller"],
        required:true,
    }
},{timestamps:true});

const book =mongoose.model('book',bookSchema);

export default book;
