const { verifyUser } = require("../config/utils");
const { getProductById, getAllProducts } = require("../controllers/productController");

const router = require("express").Router();


// router.post("/addItem",verifyUser,addCartItem);
router.post("/productById",getProductById);
router.get("/",getAllProducts);

module.exports = router