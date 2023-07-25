const Product = require("../models/Product")

const getAllProducts=async(req,res)=>{
    try{
        const products =await Product.find();
        if(!products){
            console.log("No Products Found");
            return res.status(204).json({
                message:"No Products were found",
                data:{}
            })
        }
        else{
            return res.status(200).json({
                message:"Products Found Successfully",
                data:products
            })
        }

    }
    catch(err){
        console.log(err);
        res.status(404).json({
            message:"Products can't be fetched",
            error:err
        })
    }
    
}

const getProductById=async(req,res)=>{
    const{productId}=req.body;
    try{
        const products = await Product.findOne({ _id: productId }).populate({
            path: "reviews",
            populate: { path: "user" },
          });
        if(!products){
            console.log("No Products Found");
            return res.status(204).json({
                message:"No Products were found",
                data:{}
            })
        }
        else{
            return res.status(200).json({
                message:"Product Found Successfully",
                data:products
            })
        }

    }
    catch(err){
        console.log(err);
        res.status(404).json({
            message:"Products can't be fetched",
            error:err
        })
    }
}


module.exports={
    getAllProducts,
    getProductById
}