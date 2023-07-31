const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
    { 
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      title: { type: String, required: true,defaul:"" },
      rating: { type: Number, required: true,default:5 },
      comment: { type: String, required: true,default:"" },
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    },
    {
      timestamps: true,
    }
  );

module.exports= mongoose.model("Review",reviewSchema);
  