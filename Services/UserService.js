const User =require("../models/User");
// const crypto = require("crypto");
// const ToDoList = require("../../models/ToDoList");
const {
  genPassword,
  validPassword,
  issueJWT
} = require("../config/utils")





const registerUser = async (userBody) => {

    // generate password
    console.log(userBody);
    const {
      hash
    } =await genPassword(userBody.password);
    console.log("hash",hash)
    // const list = await ToDoList.create({
    //     name:"New List",
    //     Tasks:[],
    // })
    // use repository to create and save the user
    const user = new User({
        name:userBody.name,
        email:userBody.email,
        pfp:userBody.pfp,
        hash:hash,
        // todolists:[list],
      });
      console.log(user);
    //   ToDoList.findOneAndUpdate(list._id,{user_id:user._id})
    //   .then(async()=>{
        const registeredUser = await user.save();
    //     console.log(user);
    //     return registeredUser;
    // })
    // .catch((err)=>{
    //     console.log(err);
    // })
    return registeredUser;
  };


  const loginUser = async (email, password) => {
    const user = await User.findOne({email:email});
    if (!user) return null;
    const isValid =await validPassword(password, user.hash);
    if (!isValid) return null;
    const tokenObject = issueJWT(user);
    return tokenObject;
  };


  module.exports={
    registerUser,
    loginUser
  }