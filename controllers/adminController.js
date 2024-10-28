const Course = require('../models/Course');
const User = require('../models/User');

// Add a new course
exports.addCourse = async (req, res) => {
  const course = new Course(req.body);
  await course.save();
  res.status(201).json(course);
};

// Update course details
exports.updateCourse = async (req, res) => {
  const updatedCourse = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!updatedCourse) return res.status(404).json({ message: 'Course not found' });
  res.json(updatedCourse);
};

// Delete a course
exports.deleteCourse = async (req, res) => {
  const deletedCourse = await Course.findByIdAndDelete(req.params.id);
  if (!deletedCourse) return res.status(404).json({ message: 'Course not found' });
  res.json({ message: 'Course deleted successfully' });
};

// Get all registered users
exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};
