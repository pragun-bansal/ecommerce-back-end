const express = require("express");
const router = express.Router();
const {updateProfilePic,upload,updateUserDetails,makeAdmin,removeAdmin} = require("../controllers/userController");
const { verifyUser,verifyAdmin } = require("../config/utils");
const User = require("../models/User");
const { extractUserIdFromToken } = require("../middleware/authMiddleware");
//get user
router.get("/find/:email",async (req, res) => {
  try {
    const user = await User.findOne({ email: req.params.email });
    if (user) {
      res.status(201).json(user);
    } else {
      res.json(null);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("something went wrong");
  }
});

router.put("/findUser/:email",verifyAdmin,async (req, res) => {
  try {

    let user = await User.find({ email: req.params.email });
    console.log(user)
    if(user.length==0){
      user=await User.find({name:req.params.email});
      console.log(user)
    }
    if (user.length>0) {
      res.status(201).json(user);
    } else {
      res.json(null);
    }
  } catch (err) {
    console.log(err);
    res.status(500).json("something went wrong");
  }
});

router.post("/updateProfilePic", verifyUser, updateProfilePic);
router.put("/updateUserDetails", verifyUser,updateUserDetails);
router.put("/:userId/make-admin", verifyAdmin,makeAdmin);
router.put("/:userId/remove-admin", verifyAdmin,removeAdmin);
router.put("/getUser", verifyUser, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json("something went wrong");
  }
});
module.exports = router