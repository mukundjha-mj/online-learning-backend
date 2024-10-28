// routes/adminRoutes.js
const express = require('express');
const { addCourse } = require('../controllers/authController'); // Ensure this path is correct
const router = express.Router();

router.post('/courses', addCourse); // This path should match your expected route

module.exports = router;
