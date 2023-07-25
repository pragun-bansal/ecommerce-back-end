const crypto = require("crypto");
const bcrypt = require("bcrypt");
const jsonwebtoken = require("jsonwebtoken");
const jwt = require("jsonwebtoken");
const fs = require("fs");
const path = require("path");

// const pathToKey = path.join(__dirname, "..", "id_rsa_priv.pem");
// const PRIV_KEY = process.env.ID_RSA_PRIVATE_KEY

/**
 * -------------- HELPER FUNCTIONS ----------------
 */

/**
 *
 * @param {*} password - The plain text password
 * @param {*} hash - The hash stored in the database
 * @param {*} salt - The salt stored in the database
 *
 * This function uses the crypto library to decrypt the hash using the salt and then compares
 * the decrypted hash/salt with the password that the user provided at login
 */
const validPassword=async(password, hash)=> {
  try{

    const validatePassword = await bcrypt.compare(
        password,
        hash
      );
      // console.log("valid or not",validatePassword)
      return validatePassword;
  }
  catch(err){
    console.log(err);
    return(err,false);

  }
}

/**
 *
 * @param {*} password - The password string that the user inputs to the password field in the register form
 *
 * This function takes a plain text password and creates a salt and hash out of it.  Instead of storing the plaintext
 * password in the database, the salt and hash are stored for security
 *
 * ALTERNATIVE: It would also be acceptable to just use a hashing algorithm to make a hash of the plain text password.
 * You would then store the hashed password in the database and then re-hash it to verify later (similar to what we do here)
 */
const genPassword =async(password) =>{

    const hashedPassword = await bcrypt.hash(password,10);
  console.log("hash",hashedPassword)
  return {
    hash:hashedPassword,
  };
}

/**
 * @param {*} user - The user object.  We need this to set the JWT `sub` payload property to the MongoDB user ID
 */
function issueJWT(user) {
  const _id = user._id;

  const expiresIn = "30d";

  const payload = {
    user:user
  };

  const signedToken = jsonwebtoken.sign(payload,process.env.JWT_SECRET_KEY, {
    expiresIn: expiresIn,
  });

  return {
    token: signedToken,
    expires: expiresIn,
  };
}


const verifyToken = async (req, res, next) => {
  console.log(req.body)
    const authToken = JSON.parse(req.body.token);
    console.log(authToken)
    console.log(req.body);
    // authToken = JSON.parse(authToken)
    if (authToken) {
      jwt.verify(authToken, process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(403).json("Token is not valid!");}

            console.log(user);
            req.user = user.user;
            console.log(req.user);
        next();
      });
    } else {
      return res.status(401).json("You are not authenticated!");
    }
  };
  
const verifyUser = async (req, res, next) => {
    verifyToken(req, res, () => {
      // if (req.user.user._id === req.body.user_id) {
      //   // console.log("user verified!");
      //   next();
      // } else {
      //   return res.status(403).json("You are not alowed to do that!");
      // }

      next();
    });
  };

// Export the functions and middlewares correctly
module.exports = {
  validPassword,
  genPassword,
  issueJWT,
  verifyToken,
  verifyUser,
};
