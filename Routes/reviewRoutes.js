const { verifyUser } = require("../config/utils");
const { addReview, deleteReview, updateReview,getProductReviews } = require("../controllers/reviewControllers");

const router = require("express").Router();

router.post("/add",verifyUser,addReview);
router.post("/delete",verifyUser,deleteReview);
router.post("/update",verifyUser,updateReview);
router.post("/",getProductReviews)

module.exports = router