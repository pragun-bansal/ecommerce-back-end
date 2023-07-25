const Product = require("../models/Product");
const Reviews = require("../models/Reviews");
const User = require("../models/User");

const getProductReviews=async(req,res)=>{
    try{
        const {productId} = req.body;
        const product =await Product.findOne({_id:productId});
        if(!product){
            return res.status(404).json({
                success:false,
                message:"Product not found",
    
            })
        }
        const reviews = product.reviews;
        console.log(reviews)
        // const reviewsFound = [];
        // reviews.map(async(r)=>{
        //     const re =await Reviews.findOne({_id:r});
        //     if(!re){

        //     }
        //     else{
        //         reviewsFound.push(re);
        //     }
        // })

        const promises = reviews.map(async (r) => {
            const re = await Reviews.findOne({ _id: r });
            if (re) {
              return re;
            }
          });
          
        const reviewsFound = await Promise.all(promises);
          
        console.log(reviewsFound);
        res.status(200).json({
            success:true,
            message:"Reviews Found",
            reviews:reviewsFound
        })
    }
    catch(err){
        console.log(err);
        return res.status(404).json({
            success:false,
            message:"Error in getting Reviews",
            error:err
        })
    }
    
}



const addReview=async(req,res)=>{
    try{

        let {productId,comment,title,rating} = req.body;
        if(!rating){rating=5}
        const user = req.user;
        console.log(user);
        let product =await Product.findOne({_id:productId});
        if(!product){
            return res.status(404).json({
                success:false,
                message:"Product not found",
    
            })
        }
        const userId =user._id
        const review =await Reviews.create({
            product:product._id,
            title:title,
            comment:comment,
            rating:rating,
            user:userId
        })
    
        product.reviews.push(review._id);

        const data =await product.save();
        return res.status(200).json({
            success:true,
            data,
            review,
            message:"Review Added Successfully"
        })
    }
    catch(err){
        console.log(err);
        return res.status(404).json({
            success:false,
            message:"Error in Adding Review",
            error:err
        })
    }
}
const deleteReview=async(req,res)=>{
    try{
        const {productId,reviewId} = req.body;
    let product =await Product.findOne({_id:productId});
    if(!product){
        return res.status(404).json({
            success:false,
            message:"Product not found",

        })
    }

    const deletedR =await Reviews.deleteOne({_id:reviewId});
    const data =await product.save();
    return res.status(200).json({
        success:true,
        data,
        message:"Review Deleted Successfully"
    })
    }
    catch(err){
        console.log(err);
        return res.status(404).json({
            success:false,
            message:"Error in Deleting Review",
            error:err
        })
    }
    
}
const updateReview=async(req,res)=>{
    try{
        const {reviewId,comment,title,rating} = req.body;
    
        const review =await Reviews.findOne({_id:reviewId});
        if(!review){
            return res.status(404).json({
                success:false,
                message:"Review not found",

            })
        }
        review.title = title;
        review.comment = comment;
        review.rating = rating;
        const data =await review.save();
        return res.status(200).json({
            success:true,
            data,
            message:"Review UpdatedSuccessfully"
        })

    }
    catch(err){
        console.log(err);
        return res.status(404).json({
            success:false,
            message:"Error in Deleting Review",
            error:err
        })
    }
}

module.exports = {
    addReview,
    deleteReview,
    updateReview,
    getProductReviews

}