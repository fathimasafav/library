import { Router } from "express";
import { addToCart, getCart, removeFromCart } from "../controller/cart.controller.js";
import authorize from "../middlewares/auth.middleware.js";
// import Cart from "../models/CartModels.js";

const CartRouter = Router();

CartRouter.post('/add',authorize,addToCart)
CartRouter.get('/:userId',authorize,getCart)
CartRouter.delete('/:userId/:bookId',authorize,removeFromCart)

export default CartRouter