// import { json } from "express";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken"

// for profile page
// New function: get currently logged-in user (Profile Page)
console.log(1)

export const getMe = async (req, res, next) => {
    console.log(5)
    try {
        const token = req.headers.authorization?.split(" ")[1]
        if (!token) {
            res.status(401).json({ success: false, message: "No token provided" })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // Find user without password

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
            return res.status(404).json({ success: false, message: "user not found" })

        }
        res.status(200).json({
            success: true,
            data: user,
        });
        console.log(user)

    } catch (error) {
        next(error)
    }
}

export const updateMe = async (req, res, next) => {
   
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                success: false,
                message: "no token provided"
            })
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const updates = req.body

        // if image uploaded, add it to updates
        if (req.file) {
            updates.profilePic=req.file.path
        }

        const updateUser = await User.findByIdAndUpdate(
            decoded.userId,
            updates,
            { new: true, runValidators: true }
        ).select("-password")

        if (!updateUser) {
            return res.status(404).json({ success: false, message: "user not found" })
        }
        res.status(200).json({
            success: true,
            message: "updated profile successfully",
            data: updateUser
        });
    } catch (error) {
        next(error)
    }
   
}




export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find();

        res.status(200).json({
            success: true,
            data: users
        })

    } catch (error) {
        next(error)
    }
}

// export const getUser = async (req, res, next) => {
//     try {
//         const user = await User.findById(req.params.id);

//         if (!user) {
//             const error = new Error("user not found");
//             error.statusCode = 404;
//             throw error;
//         }

//         res.status(200).json({
//             success: true,
//             data: user
//         })

//     } catch (error) {
//         next(error)
//     }
// }

export const getUser = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            res.status(401).json({ success: false, message: "no token provided" })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded.id !== req.params.id){
            return res.status(403).json({success:false, message:"you are not authorized to view this"})
        }

        const user = await User.findById(req.params.id).select("-password")
        if(!user){
            return res.status(404).json({success:false,message:"user not found"})
        }
        res.status(200).json({
            success:true,
            data:user
        })

    } catch (error) {
        next(error)
    }
}


export const createUser = async (req, res, next) => {
    try {
        const { email } = req.body
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            const error = new Error("user is already exist");
            error.statusCode = 404;
            throw error;
        }
        const createNewUser = await User.create(req.body)
        res.status(201).json({
            success: true,
            data: createNewUser

        })

    } catch (error) {
        next(error)
    }
}

export const UserUpdateById = async (req, res, next) => {

    try {
        const UserId = req.params.id;
        const updates = req.body;

        const updateUser = await User.findByIdAndUpdate(
            UserId,
            updates,
            { new: true, runValidators: true }
        )
        if (!updateUser) {
            return res.status(404).json({
                success: false,
                message: "user is not updated"
            })
        }

        updateUser.save()

        res.status(200).json({
            success: true,
            data: updateUser
        })

    } catch (error) {
        next(error)
    }
}

export const UserDeleteById = async (req, res, next) => {

    try {

        const UserId = req.params.id
        const deleteUser = await User.findByIdAndDelete(UserId);

        if (!deleteUser) {
            return res.status(404).json({
                success: false,
                message: "product not found"
            })
        }

        res.status(200).json({
            success: true,
            data: deleteUser,
        })
        console.log(deleteUser)

    } catch (error) {
        next(error)
    }
}