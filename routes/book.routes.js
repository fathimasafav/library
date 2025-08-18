import { Router } from "express";
import {
    addNewBook,
    bookDeleteById,
    bookUpdateById,
    getBook,
    getBooks
} from "../controller/book.controller.js";
import upload from "../middlewares/upload.middleware.js"



const bookRouter = Router();

bookRouter.get('/', getBooks)
bookRouter.get('/:id', getBook)
bookRouter.post('/', upload.single("coverImage"), addNewBook)
bookRouter.put('/:id', upload.single("coverImage"), bookUpdateById)
bookRouter.delete('/:id', bookDeleteById)




export default bookRouter;