import userModel from '../models/userModel.js'

const addToCart = async (req, res) => {
    try {
        const { userId, itemId, size } = req.body;

   
        const user = await userModel.findById(userId);

        if (!user || !user.cart) {
            return res.json({ success: false, message: "Cart does not exist" });
        }

    
        let cart = user.cart; 
        if (cart[itemId]) {
            if (cart[itemId][size]) {
                cart[itemId][size] += 1; 
            } else {
                cart[itemId][size] = 1;
            }
        } else {
            cart[itemId] = { [size]: 1 };
        }

        // Update the user document in the database
        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { cart }, // Update the 'cart' field
            // { new: true } // Return the updated document
        );

        console.log("Updated User:", updatedUser);

        return res.json({ success: true, message: "Item added to cart", cart: updatedUser.cart });
    } catch (error) {
        console.error("Error adding to cart:", error.message);
        return res.json({ success: false, message: error.message });
    }
};


const updateCart = async(req, res) => {
    try {
        const {userId, itemId, size, qty} = req.body

        const user = await userModel.findById(userId)
        let cartData = await user.cart;

        cartData[itemId][size] = qty

        await userModel.findByIdAndUpdate(userId, {cart: cartData})
        res.json({success: true, message: "item updated"})

    } catch (error) {
        console.error(error)
        res.json({success: false, message: error.message})
    }
}

const getUserCart = async(req, res) => {
    try {
        const {userId} = req.body

        const user = await userModel.findById(userId)
        let cartData = await user.cart;
        console.log(cartData)
        res.json({success: true, cartData})

    } catch (error) {
        console.error(error)
        res.json({success: false, message: error.message})
    }
}

export {addToCart, getUserCart, updateCart}