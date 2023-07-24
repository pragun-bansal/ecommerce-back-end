const Cart = require("../models/Cart")
const Product  = require("../models/Product")


const getUserCart = async(req,res)=>{
    try{
        const user = req.user;
        console.log(user)
        const cart = await Cart.findOne({ user: user._id });
    
        if (!cart) {
            await Cart.create({
                user: user._id,
                items: [],
            });
    
            return res.status(200).json({
                status: "success",
                data: {
                    cart: [],
                },
            });
        }   
    
        return res.status(200).json({
            status: "success",
            data: {
                cart,
            },
        })
    }
    catch(err){
        console.log(err);
        return res.status(404).json({
            message:"Error in fetching cart",
            error:err
        })
    }
};

const addCartItem =async(req,res)=>{
    const { productId, qty } = req.body;
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
        const newCart = await Cart.create({
            user: req.user._id,
            items: [{ productId, qty }],
        });
        return res.status(200).json({
            success:true,
            cart: newCart,
        });
    }
    
    const product = await Product.findOne({_id : productId});

    if (!product) {
        return res.status(404).json({
            success:false,
            message:"Product Not Found"
        })
    }

    const itemIndex = cart.items.findIndex((p) => p.productId.toString() === productId.toString());

    
    if (itemIndex > -1) {
        const productItem = cart.items[itemIndex];
        productItem.qty = qty;
        cart.items[itemIndex] = productItem;
    } else {
        cart.items.push({ productId, qty });
    }

    const data =await cart.save();
    res.status(200).json({ success: true, data });
};


const deleteCartItem=async (req, res) => {
    const{productId}  = req.body;
   
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
        return res.status(404).json({
            success:false,
            message:"Cart Not Found"
        });
    }

    const itemIndex = cart.items.findIndex((p) => p.productId.toString() === productId);
    if (itemIndex > -1) {
        cart.items.splice(itemIndex, 1);
    }

    
    const data =await cart.save();
    res.status(200).json({ success: true, data });
};


module.exports = {
    addCartItem,
    deleteCartItem,
    getUserCart

}