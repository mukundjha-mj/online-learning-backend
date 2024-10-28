const jwt = require('jsonwebtoken');
const User = require('../models/User');

const auth = async (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id);

        if (!user) return res.status(404).json({ message: 'User not found' });

        req.userId = user._id;
        req.userRole = user.role; // Pass role for RBAC
        next();
    } catch (error) {
        res.status(403).json({ message: 'Token is invalid' });
    }

    const isAdmin = async (req, res, next) => {
        const user = await User.findById(req.userId); // Assuming req.userId has the user’s ID
        if (user && user.role === 'admin') {
            next();
        } else {
            res.status(403).json({ message: 'Admin access required' });
        }
    };

};

module.exports = auth;
