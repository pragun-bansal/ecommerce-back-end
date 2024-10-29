// back-end/utils/cloudinaryUpload.js
const cloudinary = require('../config/cloudinary');

const uploadImageToCloudinary = (fileBuffer, folder, publicId) => {
    console.log(cloudinary.config)
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { resource_type: 'image', public_id: publicId, folder, overwrite: true, use_filename: true },
            (error, result) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(result);
                }
            }
        ).end(fileBuffer);
    });
};

module.exports = uploadImageToCloudinary;