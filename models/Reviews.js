const mongoose = require("mongoose");

const reviewSchema = mongoose.Schema(
    { 
      product: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      title: { type: String, required: true },
      rating: { type: Number, required: true },
      comment: { type: String, required: true },
      user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    },
    {
      timestamps: true,
    }
  );

module.exports= mongoose.model("Review",reviewSchema);
  