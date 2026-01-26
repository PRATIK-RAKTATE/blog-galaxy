import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ 
            success: false, 
            message: "Not Authorized. Login again." 
        });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (decodedToken && decodedToken.id) {
            // INDUSTRY STANDARD: Attach verified data to the req object directly
            req.userId = decodedToken.id; 
            next();
        } else {
            return res.status(401).json({
                success: false,
                message: "Invalid Token. Login again."
            });
        }

    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Token expired or invalid. Please login again."
        });
    }
} 

export default userAuth;