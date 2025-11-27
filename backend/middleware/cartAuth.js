import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

const cartAuth = async (req, res, next) => {
    try {
        const { token } = req.headers;

        if (!token) {
            return res.status(401).json({ success: false, message: "You are not authorized" });
        }

        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        // Validate the decoded ID
        if (!mongoose.Types.ObjectId.isValid(decoded.id)) {
            return res.status(400).json({ success: false, message: "Invalid user ID in token" });
        }

        // Attach the user ID to the request body
        req.body.userId = decoded.id;

        // Proceed to the next middleware or route handler
        return next();
    } catch (error) {
        console.error('JWT verification error:', error.message);
        res.status(500).json({ success: false, message: "Error with authentication" });
    }
};

export default cartAuth;
