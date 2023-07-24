const { verifyUser } = require("../config/utils");
const { addWishlistItem, deleteWishlistItem, getUserWishlist } = require("../controllers/wishlistController");

const router = require("express").Router();


router.post("/addItem",verifyUser,addWishlistItem);
router.post("/deleteItem",verifyUser,deleteWishlistItem);
router.post("/",verifyUser,getUserWishlist);

module.exports = router