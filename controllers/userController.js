// back-end/controllers/userController.js
const multer = require('multer');
const User = require('../models/User');
const uploadImageToCloudinary = require('../utils/cloudinaryUpload');

// Set up multer for file storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

const updateUserDetails = async (req, res) => {
    const userId = req.user._id; // Extracted from token by middleware
    const { name, lastName, username, addressLine1, addressLine2, town, city, pinCode, phoneNumber, email, gender } = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                name,
                lastName,
                username,
                addressLine1,
                addressLine2,
                town,
                city,
                pinCode,
                phoneNumber,
                email,
                gender
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        console.error("Error updating user details:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const updateProfilePic = async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
    }
    try {
        const folder = `user_pfps/${req.user._id}`;
        const publicId = `profile_pic`;
        const result = await uploadImageToCloudinary(req.file.buffer, folder, publicId);

        const user = await User.findById(req.user._id);
        user.pfp = result.secure_url;
        await user.save();

        res.status(200).json({ filePath: result.secure_url });
    } catch (error) {
        res.status(500).json({ error: 'Error uploading profile picture' });
    }
};

module.exports = {
    upload,
    updateProfilePic,
    updateUserDetails
};