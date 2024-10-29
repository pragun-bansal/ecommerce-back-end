// const { default: mongoose, Mongoose } = require("mongoose");
//
// const UserSchema = new mongoose.Schema({
//     name:{
//         type:String,
//         require:true
//     },
//     email: {
//         type: String,
//         trim: true,
//         lowercase: true,
//         unique: true,
//         required: true,
//         match: [
//           /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
//           "Please fill a valid email address",
//         ],
//         // validate: [isEmail, "invalid email"],
//     },
//     pfp: {
//       type: String,
//       required:true,
//       default: "https://i.ibb.co/LNchwvr/5794329.jpg"
//     },
//     hash: {
//       type: String,
//       required: true,
//     },
//     cart:{
//       type: mongoose.Schema.Types.ObjectId,
//       ref:"Cart"
//     }
//
// })
//
// module.exports = mongoose.model('User',UserSchema);

const { default: mongoose, Mongoose } = require("mongoose");

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    lastName: {
        type: String,
        require: true
    },
    username: {
        type: String,
        require: true,
        unique: true
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
    },
    pfp: {
        type: String,
        required: true,
        default: "https://i.ibb.co/LNchwvr/5794329.jpg"
    },
    hash: {
        type: String,
        required: true,
    },
    addressLine1: {
        type: String,
        required: true
    },
    addressLine2: {
        type: String
    },
    town: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    pinCode: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ["male", "female", "other"]
    },
    cart: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cart"
    }
});

module.exports = mongoose.model('User', UserSchema);