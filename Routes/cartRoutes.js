const { verifyUser } = require("../config/utils");
const { addCartItem, deleteCartItem, getUserCart } = require("../controllers/cartController");

const router = require("express").Router();


router.post("/addItem",verifyUser,addCartItem);
router.post("/deleteItem",verifyUser,deleteCartItem);
router.post("/",verifyUser,getUserCart);

module.exports = router