const Product = require("../models/Product")
const multer = require('multer');
const uploadImageToCloudinary = require('../utils/cloudinaryUpload');
const cloudinary = require('../config/cloudinary');
const getAllProducts=async(req,res)=>{
    try{
        const products =await Product.find();
        if(!products){
            console.log("No Products Found");
            return res.status(204).json({
                message:"No Products were found",
                data:{}
            })
        }
        else{
            return res.status(200).json({
                message:"Products Found Successfully",
                data:products
            })
        }

    }
    catch(err){
        console.log(err);
        res.status(404).json({
            message:"Products can't be fetched",
            error:err
        })
    }
    
}

const getProductById=async(req,res)=>{
    const{productId}=req.params;
    console.log(productId);
    try{
        const products = await Product.findOne({ _id: productId }).populate({
            path: "reviews",
            populate: { path: "user" },
          });
        if(!products){
            console.log("No Products Found");
            return res.status(204).json({
                message:"No Products were found",
                data:{}
            })
        }
        else{
            return res.status(200).json({
                message:"Product Found Successfully",
                data:products
            })
        }

    }
    catch(err){
        console.log(err);
        res.status(404).json({
            message:"Products can't be fetched",
            error:err
        })
    }
}


// Set up multer for file storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

const createProduct = async (req, res) => {
    console.log(req.body);
    const { name, category, tagline, description, price, stock, sizes, colors } = req.body;
    const images = req.files;

    try {
        const product = new Product({
            name,
            category,
            tagline,
            description,
            price,
            stock,
            sizes: typeof sizes === 'string' ? JSON.parse(sizes) : sizes,
            colors: typeof colors === 'string' ? JSON.parse(colors) : colors,
        });

    console.log(cloudinary.config().api_key)
        if (images && images.length > 0) {
            const imageUrls = await Promise.all(
                images.map((image, index) => {
                    const folder = `products/${product._id}`;
                    const publicId = `image_${index}`;
                    return uploadImageToCloudinary(image.buffer, folder, publicId);
                })
            );
            product.all_images = imageUrls.map(result => result.secure_url);
        }

        await product.save();
        res.status(201).json(product);
    } catch (error) {
        console.error("Error creating product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
// const editProduct = async (req, res) => {
//     const { productId } = req.params;
//     const { name, category, tagline, description, price, stock, sizes, colors, existingImages } = req.body;
//     const images = req.files;
//
//     try {
//         const product = await Product.findById(productId);
//         if (!product) {
//             return res.status(404).json({ message: "Product not found" });
//         }
//
//         product.name = name;
//         product.category = JSON.parse(category).map(cat => cat.toLowerCase()); // Convert categories to lowercase
//         product.tagline = tagline;
//         product.description = description;
//         product.price = price;
//         product.stock = stock;
//         product.sizes = typeof sizes === 'string' ? JSON.parse(sizes) : sizes;
//         product.colors = typeof colors === 'string' ? JSON.parse(colors) : colors;
//
//         // Parse existing images
//         const existingImageUrls = existingImages ? JSON.parse(existingImages) : [];
//
//         // Upload new images
//         let newImageUrls = [];
//         if (images && images.length > 0) {
//             newImageUrls = await Promise.all(
//                 images.map((image, index) => {
//                     const folder = `products/${product._id}`;
//                     const publicId = `image_${index}`;
//                     return uploadImageToCloudinary(image.buffer, folder, publicId);
//                 })
//             ).then(results => results.map(result => result.secure_url));
//         }
//
//         // Combine existing and new image URLs
//         product.all_images = [...existingImageUrls, ...newImageUrls];
//
//         await product.save();
//         res.status(200).json(product);
//     } catch (error) {
//         console.error("Error editing product:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };
// const editProduct = async (req, res) => {
//     const { productId } = req.params;
//     const { name, category, tagline, description, price, stock, sizes, colors, existingImages } = req.body;
//     const images = req.files;
//
//     try {
//         const product = await Product.findById(productId);
//         if (!product) {
//             return res.status(404).json({ message: "Product not found" });
//         }
//
//         product.name = name;
//         product.category = JSON.parse(category).map(cat => cat.toLowerCase());
//         product.tagline = tagline;
//         product.description = description;
//         product.price = price;
//         product.stock = stock;
//         product.sizes = typeof sizes === 'string' ? JSON.parse(sizes) : sizes;
//         product.colors = typeof colors === 'string' ? JSON.parse(colors) : colors;
//
//         // Parse existing images
//         const existingImageUrls = existingImages ? JSON.parse(existingImages) : [];
//
//         // Create a map to store the new image URLs with their original indices
//         const newImageUrlsMap = new Map();
//
//         // Upload new images
//         if (images && images.length > 0) {
//             await Promise.all(
//                 images.map((image, index) => {
//                     const folder = `products/${product._id}`;
//                     const publicId = `image_${index}`;
//                     return uploadImageToCloudinary(image.buffer, folder, publicId)
//                         .then(result => {
//                             newImageUrlsMap.set(index, result.secure_url);
//                         });
//                 })
//             );
//         }
//
//         // Combine existing and new image URLs in their original order
//         const combinedImageUrls = [];
//         for (let i = 0; i < existingImageUrls.length + newImageUrlsMap.size; i++) {
//             if (newImageUrlsMap.has(i)) {
//                 combinedImageUrls.push(newImageUrlsMap.get(i));
//             } else {
//                 combinedImageUrls.push(existingImageUrls.shift());
//             }
//         }
//
//         product.all_images = combinedImageUrls;
//
//         await product.save();
//         res.status(200).json(product);
//     } catch (error) {
//         console.error("Error editing product:", error);
//         res.status(500).json({ message: "Internal server error" });
//     }
// };
const editProduct = async (req, res) => {
    const { productId } = req.params;
    const { name, category, tagline, description, price, stock, sizes, colors, existingImages } = req.body;
    const images = req.files;

    try {
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Update fields
        product.name = name;
        product.category = JSON.parse(category).map(cat => cat.toLowerCase());
        product.tagline = tagline;
        product.description = description;
        product.price = price;
        product.stock = stock;
        product.sizes = typeof sizes === 'string' ? JSON.parse(sizes) : sizes;
        product.colors = typeof colors === 'string' ? JSON.parse(colors) : colors;

        // Parse and retain existing images
        console.log(existingImages)
        const existingImageUrls = existingImages ? JSON.parse(existingImages) : [];
        const newImageUrls = [];

        console.log(images.length)
        console.log(existingImageUrls.length)
        if (images && images.length > 0) {
            const imageUploadPromises = images.map((image, index) => {
                const folder = `products/${product._id}`;
                const publicId = `image_${index}`;
                return uploadImageToCloudinary(image.buffer, folder, publicId);
            });

            const uploadedImages = await Promise.all(imageUploadPromises);
            newImageUrls.push(...uploadedImages.map(img => img.secure_url));
        }
        // const all_images=[]
        // let a = 0, b = 0;
        // for (let i = 0; i < existingImageUrls.length + newImageUrls.length; i++) {
        //     if (b < existingImages.length && i === existingImages[b].index) {
        //         all_images.push(existingImages[b].image);
        //         b++;
        //     } else {
        //         all_images.push(newImageUrls[a]);
        //         a++;
        //     }
        // }
        product.all_images = newImageUrls

        await product.save();

        res.status(200).json(product);
    } catch (error) {
        console.error("Error editing product:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};


module.exports={
    getAllProducts,
    getProductById,
    upload,
    createProduct,
    editProduct
}