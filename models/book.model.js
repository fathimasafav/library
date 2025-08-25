import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
    },
    author: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: [true, "product number is required"],
        min: [0, 'price must be greater than 0'],
        max: [1000, 'price must be less than 1000'],
    },
    category: {
        type: String,
        enum: ["Fantasy", "Fiction", "Thriller","Science","Non-Fiction","Romance"],
        required: true,
    },
    coverImage: {
        type: String, // File path (e.g., /uploads/filename.jpg)
        required: false,
    }, 
    rating: {
        type: Number,
        required: false,
    }
}, { timestamps: true });

const book = mongoose.model('book', bookSchema);

export default book;
