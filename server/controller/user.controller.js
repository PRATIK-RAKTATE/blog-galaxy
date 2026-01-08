import userModel from "../models/user.model.js";

export const getUserData = async (req, res) => {
    try {
        const {userId} = req.body;

        const user = await userModel.findById(userId);

        if (!user) {
            return res.json({
                success: false,
                message: "User not found"
            })
        }

        res.json({
            success: true,
            userData: {
                name: user.name,
                isAccountVerified: user.isAccountVerified
            }
        })

    } catch (err) {
        res.json({
            success: false,
            message: err.message
        })
    }
}

export const getAllUsers = async (req, res) => {
    try {
        // .find({}) with an empty object returns all documents
        // .select('-password') ensures we don't send sensitive hashes to the frontend
        const users = await userModel.find({}).select('-password');

        res.json({
            success: true,
            count: users.length,
            users
        });

    } catch (err) {
        res.status(500).json({
            success: false,
            message: err.message
        });
    }
}