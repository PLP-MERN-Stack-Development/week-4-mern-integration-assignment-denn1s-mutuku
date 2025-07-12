// server/controllers/authController.js
const User = require('../models/User');
const { validationResult } = require('express-validator');

// Helper function to send token
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.getSignedJwtToken();
  res.status(statusCode).json({
    success: true,
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
    },
  });
};

// ✅ Define register function
const register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((e) => e.msg).join(', ');
    return res.status(400).json({ success: false, error: errorMessages });
  }

  const { username, email, password } = req.body;

  try {
    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ success: false, error: 'Email already registered' });
    }

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ success: false, error: 'Username already taken' });
    }

    const user = await User.create({ username, email, password });
    sendTokenResponse(user, 201, res);
  } catch (err) {
    console.error('❌ Register error:', err); // ✅ Log exact error to terminal
    res.status(500).json({ success: false, error: err.message || 'Server error' });
  }
};

// ✅ Define login function
const login = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((e) => e.msg).join(', ');
    return res.status(400).json({ success: false, error: errorMessages });
  }

  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({ success: false, error: 'Invalid credentials (email not found)' });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: 'Invalid credentials (wrong password)' });
    }

    sendTokenResponse(user, 200, res);
  } catch (err) {
    console.error('❌ Login error:', err); // ✅ Log exact error to terminal
    res.status(500).json({ success: false, error: err.message || 'Server error' });
  }
};

// ✅ Define getMe function
const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    res.status(200).json({ success: true, data: user });
  } catch (err) {
    console.error('❌ GetMe error:', err);
    res.status(500).json({ success: false, error: err.message || 'Server error' });
  }
};

// ✅ Define logout function
const logout = (req, res) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ success: true, data: {} });
};

// ✅ Export all defined functions
module.exports = {
  register,
  login,
  getMe,
  logout,
};
