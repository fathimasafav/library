import Cart from "../models/cart.models.js";

export const addToCart = async (req,res) => {
    try {
        const userId=req.user.id
        const { bookId, quantity } = req.body
        let cart = await Cart.findOne({ userId })
        console.log(userId, "userId")
        if (!cart) {
            cart = new Cart({ userId, items: [{ bookId, quantity }] })
        } else {
            const itemIndex = cart.items.findIndex(
                (item) => item.bookId.toString() === bookId
            )
            if (itemIndex > -1) {
                cart.items[itemIndex].quantity += quantity
            } else {
                cart.items.push({ bookId, quantity })
            }
        }
        await cart.save();
        res.json(cart);

    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}
export const getCart = async (req,res) => {
    console.log(req,'iddddddddd')
    try {
        const cart = await Cart.findOne({ userId: req.params.userId }).populate("items.bookId");
            
        res.json(cart || { items: [] })

    } catch (err) {
        res.status(500).json({ message: err.message })
    }

}

export const removeFromCart = async (req, res) => {

    try{
        const userId = req.user.id;   // get from token, not params
        console.log(userId)
        const { bookId } = req.params;
        const updateCart = await Cart.findOneAndUpdate(
            {userId:userId},
            {$pull:{items:{bookId:bookId}}},
            {new:true}
        )
        if(!updateCart){
            return res.status(404).json({message:"cart not found"})
        }
        res.status(200).json({
            success:true,
            message:"Book Removed from Cart",
            cart:updateCart,
        })
    }catch(err){
        return res.status(500).json({message:err.message})
    }
 
}