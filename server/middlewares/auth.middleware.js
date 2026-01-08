import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    const { token } = req.cookies;

    if (!token) {
        return res.status(401).json({ // 401 means Unauthorized
            success: false,
            message: "Not Authorized. Login again."
        });
    }

    try {
        // You MUST assign the result of verify to a variable
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

        if (decodedToken && decodedToken.id) {
            // Attach the userId to the request body so controllers can use it
            req.body.userId = decodedToken.id;
            
            // IMPORTANT: You must call next() to move to the next function
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