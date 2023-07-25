const mongoose = require("mongoose");



const productSchema = new mongoose.Schema(
  {
    // user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, //which user creates
    // brand: { type: String, required: true }, // brand of the product
    // numReviews: { type: Number, required: true, default: 0 }, // number of reviews of the product
    name: { type: String, required: true }, // name of the product
    main_image1: { type: String, required: true }, // main image of the product
    main_image2: { type: String, required: true }, // main image of the product
    all_images: [ { type: String, required: true } ], // all images of the product
    category: [{ type: String, required: true }], // category of the product
    tagline: { type: String, required: true }, // tagline of the product
    description: { type: String, required: true }, // description of the product
    rating: { type: Number, required: true, default: 0 }, // rating of the product
    price: { type: Number, required: true, default: 0 }, // price of the product
    Stock: { type: Number, required: true, default: 0 }, // count of the product in stock
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Review"
    }],
    offers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Offer"
    }],
  },
  { timestamps: true }
);


module.exports =  mongoose.model("Product", productSchema);