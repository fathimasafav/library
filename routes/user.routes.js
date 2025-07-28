import { Router } from "express";
import { createUser, getUser, getUsers, UserDeleteById, UserUpdateById,  } from "../controller/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get('/',getUsers)
userRouter.get('/:id',authorize,getUser)
userRouter.post('/', createUser)
userRouter.put('/:id', UserUpdateById)
userRouter.delete('/:id', UserDeleteById)


export default userRouter;



