import book from "../models/book.model.js";

 export const getBooks = async(req,res,next)=>{
    try{
        const Books = await book.find();
        
        res.status(200).json({
            success:true,
            data:Books
        })

    }catch(error){
        next(error)
    }
}

export const getBook = async(req,res,next)=>{
    try{

        const Book = await book.findById(req.params.id);
        if(!Book){
            const error = new Error("book not found");
            error.statusCode=404;
            throw error;
        }

        res.status(200).json({
            success:true,
            data:Book
        })

    }catch(error){
        next(error)
    }
}

export const addNewBook = async(req,res,next)=>{
    try{
        const addBook = await book.create({...req.body});

        if(!addBook){
            return res(404).json({
                success:false,
                message:"cannt add book",
            });
        }
        res.status(200).json({
            success:true,
            data:addBook
        })
    }catch(error){
        next(error)
    }
}

export const bookUpdateById = async(req,res,next)=>{
    try{
        const bookId = req.params.id
        const updates = req.body

        const updateBook= await book.findByIdAndUpdate(
            bookId,
            updates ,{new:true,runValidators:true});
        
        if(!updateBook){
            res.status(404).json({
                success:false,
                message:"book data is not updated"
            })
        }

        updateBook.save();

        res.status(200).json({
            success:true,
            data:updateBook
        })

    }catch(error){
        next(error)
    }
}

export const bookDeleteById = async(req,res,next)=>{
    try{
        const deletebook = await book.findByIdAndDelete(req.params.id);
        if(!deletebook){
            return res.status(404).json({
                success:true,
                message:"book is not deleted"
            })
        }
        res.status(200).json({
            success:true,
            data:deletebook
        })
    }catch(error){
        next(error)
    }
}