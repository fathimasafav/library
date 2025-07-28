// import { json } from "express";
import User from "../models/user.model.js";

export const getUsers = async(req,res,next)=>{
    try{
        const users = await User.find();

        res.status(200).json({
            success:true,
            data: users
        })

    }catch (error){
        next(error)
    }
}

export const getUser = async (req,res,next)=>{
    try{
        const user = await User.findById(req.params.id);

        if(!user){
            const error = new Error("user not found");
            error.statusCode=404;
            throw error;
        }

        res.status(200).json({
            success:true,
            data:user
        })

    }catch(error){
        next(error)
    }
}
 
export const createUser = async(req,res,next)=>{
   try{
    const {email} = req.body
       const existingUser = await User.findOne({email})
       if(existingUser){
           const error = new Error("user is already exist");
           error.statusCode = 404;
           throw error;
       }
       const createNewUser = await User.create(req.body)
    res.status(200).json({
        success:true,
        data:createNewUser
        
    })

   }catch(error){
    next(error)
   }
}

export const UserUpdateById = async(req,res,next)=>{

    try{
        const UserId = req.params.id;
        const updates =req.body;

        const updateUser = await User.findByIdAndUpdate(
            UserId,
            updates,
            { new: true, runValidators: true }
        )
        if(!updateUser){
            return res.status(404).json({
                success:false,
                message:"user is not updated"
            })
        }

        updateUser.save()

        res.status(200).json({
            success:true,
            data:updateUser
        })

    }catch(error){
        next(error)
    }
}

export const UserDeleteById = async (req,res,next)=>{

    try{

        const UserId = req.params.id
        const deleteUser = await User.findByIdAndDelete(UserId);

        if(!deleteUser){
            return res.status(404).json({
                success:false,
                message:"product not found"
            })
        }
    
    res.status(200).json({
        success:true,
        data:deleteUser,
    })
    console.log(deleteUser)

    }catch(error){
        next(error)
    }
}