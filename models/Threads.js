const mongoose = require("mongoose");

const threadSchema =new mongoose.Schema({
    name:{
      type: String,
      required: true
    },
    image:{
      type: String,
      required: true
    },
    type:{
      type: String,
      required: true
    },
})
  module.exports =  mongoose.model("Threads", threadSchema);