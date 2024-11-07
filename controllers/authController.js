const jwt = require("jsonwebtoken");
const User = require("../models/User");
const UserService = require("../Services/UserService")
const {
  validateRegisterInput
} = require("../validation/register");
const {validateLoginInput} =require("../validation/login");
const randomstring = require("randomstring");
const bcrypt = require("bcrypt");


const gRegister = async (req, res, next) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(randomstring.generate(10), salt);
  const newUser = new User({
    name: req.body.name.toLowerCase(),
    hash: hashedPassword,
    email: req.body.email,
    pfp: req.body.profile,
  });
  try {
    await newUser.save();
    const token = jwt.sign(
      {
        id: newUser._id,
        isAdmin: newUser.isAdmin,
      },
      process.env.JWT_SECRET_KEY
    );
    const { password, isAdmin, ...otherDetails } = newUser._doc;
    res
      .cookie("access_token", token)
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin, token });
  } catch (err) {
    next(err);
  }
};

const gLogin= async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    const token = jwt.sign(
      {
        user:user
      },
      process.env.JWT_SECRET_KEY
    );
    const { password, isAdmin, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token)
      .status(200)
      .json({ details: { ...otherDetails }, isAdmin, token });
  } catch (err) {
    next(err);
  }
};





const CLIENT_URL = `${process.env.FRONT_END_URL}`;

const login=async (req, res) => {
    try {
      const {
        errors,
        isValid
      } = validateLoginInput(req.body);
  
      if (!isValid) {
        return res.status(400).json(errors);
      }
      const email = req.body.email;
      const password = req.body.password;
  
      const token = await UserService.loginUser(email, password);
      console.log(token);
      if (!token) {
        return res
          .status(404)
          .json({
            success: false,
            message: "Email or password not valid"
          });
      } else {
        const user = await User.findOne({email:email})
        res.json({
          success: true,
          message: "Login Successfull",
          user:user,
          token: token.token,
          expiresIn: token.expires,
        });
      }
    } catch (error) {
      console.log(error);
      res.json({
        message: "Error: " + error,
        success: false
      });
    }
};


const register=async(req,res)=>{

    const {
      errors,
      isValid
    } = validateRegisterInput(req.body);
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
  
    const userDetails = req.body;
    const newUser = await User.findOne({ email: userDetails.email });
    console.log(newUser);
          let user;
          if (!newUser) {
            try{
            
  
            // Register the new user
  
            user = await UserService.registerUser({
              name:userDetails.username,
              email: userDetails.email,
              password: userDetails.password,
              // pfp: profile.photos[0].value,
            });
            console.log(user);
            }
            catch(err){
              res.status(400).json({
                err,
                message:"user Can't be created"
              })
            }
            
          } else {
            user = newUser;
          }
    const response = user;
    res.send(response);
        
  }

module.exports={
    login,
    register,
    gLogin,
    gRegister
}