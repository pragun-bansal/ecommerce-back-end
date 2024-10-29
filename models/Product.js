const mongoose = require("mongoose");




const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true }, // name of the product
    all_images: [ { type: String, required: true } ], // all images of the product
    category: [{ type: String, required: true }], // category of the product
    tagline: { type: String, required: true }, // tagline of the product
    description: { type: String, required: true }, // description of the product
    rating: { type: Number, required: true, default: 5 }, // rating of the product
    price: { type: Number, required: true, default: 0 }, // price of the product
    stock: { type: Number, required: true, default: 0 }, // count of the product in stock
    threads:[{
      type: mongoose.Schema.Types.ObjectId,
      ref:"Threads"
    }],
    sizes:[{
      size:{
        type: String,
        required:true
      },
      price:{
        type:Number,
        required:true
      }
    }],
      colors:[{
        color:{
            type: String,
            required:true
        },
        price:{
            type:Number,
            required:true
        }
      }],
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

// Define a pre hook to update the product.rating whenever a new review is added or removed
productSchema.pre("save", async function (next) {
  const Review = mongoose.model("Review");
  const reviewDocs = await Review.find({ _id: { $in: this.reviews } }).select(
    "rating"
  );

  if (reviewDocs.length === 0) {
    this.rating = 0;
  } else {
    // Calculate the average rating
    const totalRating = reviewDocs.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    const averageRating = totalRating / reviewDocs.length;

    // Round the average to two decimal places and update product.rating
    this.rating = parseFloat(averageRating.toFixed(2));
  }

  next();
});

module.exports =  mongoose.model("Product", productSchema);