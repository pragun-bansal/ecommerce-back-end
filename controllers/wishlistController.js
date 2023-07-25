const Product = require("../models/Product");
const Wishlist = require("../models/Wishlist")


const getUserWishlist = async(req,res)=>{
    try{

        const wishlist = await Wishlist.findOne({ user: req.user._id }).populate("items.productId");
    
        if (!wishlist) {
            const wishlist=await Wishlist.create({
                user: req.user._id,
                items: [],
            });
    
            return res.status(200).json({
                status: "success",
                data: {
                    wishlist: wishlist,
                },
            });
        }   
    
        return res.status(200).json({
            status: "success",
            data: {
                wishlist,
            },
        })
    }
    catch(err){
        console.log(err);
        return res.status(404).json({
            message:"Error in fetching wishlist",
            error:err
        })
    }
};

const addWishlistItem =async(req,res)=>{
    const { productId, qty } = req.body;
    const wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
        const newwishlist = await Wishlist.create({
            user: req.user._id,
            items: [{ productId, qty }],
        });
        return res.status(200).json({
            success:true,
            wishlist: newwishlist,
        });
    }
    
    const product = await Product.findById(productId);

    if (!product) {
        return res.status(404).json({
            success:false,
            message:"Product Not Found"
        })
    }

    const itemIndex = wishlist.items.findIndex((p) => p.productId.toString() === productId.toString());

    
    if (itemIndex > -1) {
        const productItem = wishlist.items[itemIndex];
        productItem.qty = qty;
        wishlist.items[itemIndex] = productItem;
    } else {
        wishlist.items.push({ productId, qty });
    }

    const data=await wishlist.save();
    res.status(200).json({ success: true, data });
};


const deleteWishlistItem=async (req, res) => {
    const {productId}  = req.body;
   
    const wishlist = await Wishlist.findOne({ user: req.user._id });

    if (!wishlist) {
        return res.status(404).json({
            success:false,
            message:"wishlist Not Found"
        });
    }

    const itemIndex = wishlist.items.findIndex((p) => p.productId.toString() === productId);
    if (itemIndex > -1) {
        wishlist.items.splice(itemIndex, 1);
    }

    
    const newwishlist =await wishlist.save();
    res.status(200).json({ success: true, newwishlist });
};


module.exports = {
    addWishlistItem,
    deleteWishlistItem,
    getUserWishlist

}