const { default: mongoose, Mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: true,
        match: [
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
          "Please fill a valid email address",
        ],
        // validate: [isEmail, "invalid email"],
    },
    pfp: {
      type: String,
      required:true,
      default: "https://i.ibb.co/LNchwvr/5794329.jpg"
    },
    hash: {
      type: String,
      required: true,
    },
    cart:{
      type: mongoose.Schema.Types.ObjectId,
    }

})

module.exports = mongoose.model('User',UserSchema);