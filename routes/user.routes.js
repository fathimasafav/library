import { Router } from "express";
import { createUser, getMe, getUser, getUsers, updateMe, UserDeleteById, UserUpdateById,  } from "../controller/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";



const userRouter = Router();

userRouter.get('/me/profile', authorize, getMe)
userRouter.put('/me', authorize, upload.single("profile_pic"), updateMe)


userRouter.get('/',getUsers)
userRouter.get('/:id',getUser)
userRouter.post('/', authorize, createUser)
userRouter.put('/:id', UserUpdateById)
userRouter.delete('/:id', UserDeleteById)

// router for logged-in
// userRouter.get('/me/profile', authorize, getMe)

// profile updation
// userRouter.put('/me',authorize, upload.single("profile_pic"),updateMe)



export default userRouter;



