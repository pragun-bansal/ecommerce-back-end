const jwt = require("jsonwebtoken");
const User = require("../models/User");
const UserService = require("../Services/UserService")
const {
  validateRegisterInput
} = require("../validation/register");
const {validateLoginInput} =require("../validation/login")


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
    register
}