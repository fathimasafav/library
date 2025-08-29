// import { data } from "react-router-dom";
// import { title } from "process";
// import { categories } from "@arcjet/node";
import book from "../models/book.model.js";

export const getBooks = async (req, res, next) => {
    try {
        const { q,category } = req.query;
        let filter = {};
        if (q) {
            filter = {
                $or: [
                    { title: { $regex: q, $options: "i" } },
                    { author: { $regex: q, $options: "i" } },
                    { category: { $regex: q, $options: "i" } }
                ]
            }
        }

        if (category && category !== "All"){
            filter.category=category
        }
        let query = book.find(filter);

        // // sorting
        // if (sort === "asc") query = query.sort({ price: 1 });
        // if (sort === "desc") query = query.sort({ price: -1 });

        const Books = await query;

        res.status(200).json({
            success: true,
            data: Books
        })

    } catch (error) {
        next(error)
    }
}

export const getBook = async (req, res, next) => {
    try {

        const Book = await book.findById(req.params.id);
        if (!Book) {
            const error = new Error("book not found");
            error.statusCode = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            data: Book
        })

    } catch (error) {
        next(error)
    }
}

export const addNewBook = async (req, res, next) => {

    try {
        const { title, author, price, category, rating } = req.body;
        const coverImage = req.file ? req.file.filename : null;

        const newBook = await book.create({
            coverImage,
            title,
            author,
            price,
            category,
            rating,

        });

        res.status(201).json({
            success: true,
            data: newBook
        })

    } catch (error) {
        next(error)
    }
    // try{
    //     const addBook = await book.create({...req.body});

    //     if(!addBook){
    //         return res(404).json({
    //             success:false,
    //             message:"cannt add book",
    //         });
    //     }
    //     res.status(200).json({
    //         success:true,
    //         data:addBook
    //     })
    // }catch(error){
    //     next(error)
    // }
}

export const bookUpdateById = async (req, res, next) => {
    try {
        const bookId = req.params.id
        const updates = req.body

        console.log(updates, "ups")
        const updateBook = await book.findByIdAndUpdate(
            bookId,
            updates, { new: true, runValidators: true });

        console.log(updateBook, "update book");

        if (!updateBook) {
            res.status(404).json({
                success: false,
                message: "book data is not updated"
            })
            console.log(11)
        }

        updateBook.save();

        res.status(200).json({
            success: true,
            data: updateBook
        })

    } catch (error) {
        next(error)
    }
}

export const bookDeleteById = async (req, res, next) => {
    try {
        const deletebook = await book.findByIdAndDelete(req.params.id);
        if (!deletebook) {
            return res.status(404).json({
                success: false,
                message: "book is not deleted"
            })
        }
        res.status(200).json({
            success: true,
            data: deletebook
        })
    } catch (error) {
        next(error)
    }
}