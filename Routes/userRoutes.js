const User = require("../models/User")
const express = require("express");
const router = express.Router();

//get user
router.get("/find/:email", async (req, res) => {
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

module.exports = router