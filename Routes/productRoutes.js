
const express = require('express');
const router = express.Router();
const {createProduct,editProduct,getAllProducts,getProductById,upload} = require('../controllers/productController');
// const upload = require('../app'); // Ensure this is the correct path to your multer setup

router.get("/",getAllProducts);
router.get("/:productId",getProductById)
router.post('/createProduct', upload.array('all_images'),createProduct);
router.put('/editProduct/:productId',upload.array('all_images'), editProduct);

module.exports = router;