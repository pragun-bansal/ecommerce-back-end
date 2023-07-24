const mongoose = require("mongoose");


const offerSchema = mongoose.Schema(
  {
    offer: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports= mongoose.model("Offer",offerSchema);
  