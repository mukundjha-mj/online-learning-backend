const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    courseName: { type: String, required: true },
    courseDescription: { type: String, required: true },
    coursePrice: { type: Number, required: true },
    courseAuthor: { type: String, required: true },
});

module.exports = mongoose.model('Course', courseSchema);
