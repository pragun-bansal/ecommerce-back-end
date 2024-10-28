const multer = require('multer');
const cloudinary = require('../config/cloudinary');
const User = require('../models/User');

// Set up multer for file storage
const storage = multer.memoryStorage();
const upload = multer({ storage });


const updateProfilePic = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    try {
        const publicId = `profile_pics/${req.user._id}`;

        const result = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { resource_type: 'image', public_id: publicId, overwrite: true },
                (error, result) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(result);
                    }
                }
            ).end(req.file.buffer);
        });

        user.profilePic = result.secure_url;
        await user.save();

        res.status(200).json({ filePath: result.secure_url });
    } catch (error) {
        res.status(500).json({ error: 'Error uploading profile picture' });
    }
};

module.exports = {
    upload,
    updateProfilePic,
};