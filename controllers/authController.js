const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Course = require('../models/Course'); // Assuming you have a Course model

// User registration
const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: "Email already registered." });

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        return res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        return res.status(500).json({ message: "Server error: " + error.message });
    }
};

// User login
const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (error) {
        return res.status(500).json({ message: "Server error: " + error.message });
    }
};

// Adding a course (admin functionality)
const addCourse = async (req, res) => {
    try {
        const { courseName, courseDescription, coursePrice, courseAuthor } = req.body;
        const newCourse = new Course({
            courseName,
            courseDescription,
            coursePrice,
            courseAuthor
        });
        await newCourse.save();
        res.status(201).json({ message: "Course added successfully", course: newCourse });
    } catch (error) {
        res.status(500).json({ message: "Failed to add course", error: error.message });
    }
};

// Export the functions
module.exports = { register, login, addCourse };
