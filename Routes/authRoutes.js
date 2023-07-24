const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const UserService = require("../Services/UserService")

const {login,register} = require("../controllers/authController")


const CLIENT_URL = `${process.env.FRONT_END_URL}`;



router.post("/login",login);
router.post("/register",register)



module.exports = router