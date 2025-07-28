import { Router } from "express";
import { addNewBook, bookDeleteById, bookUpdateById, getBook, getBooks } from "../controller/book.controller.js";

const bookRouter = Router();

bookRouter.get('/',getBooks)
bookRouter.get('/:id',getBook)
bookRouter.post('/',addNewBook)
bookRouter.put('/:id',bookUpdateById)
bookRouter.delete('/:id',bookDeleteById)

export default bookRouter;