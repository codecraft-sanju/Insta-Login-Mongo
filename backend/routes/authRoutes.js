import express from 'express';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

// Load admin credentials from .env
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

// Login Route
router.post('/login', async (req, res) => {
  try {
    console.log('Request Received:', req.body);
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: 'Username and password are required' });
    }

    // Admin Login Check
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      return res.status(200).json({
        message: 'Admin login successful',
        isAdmin: true,
      });
    }

    // Normal User Registration
    const newUser = new User({ username, password });
    await newUser.save();

    console.log('New User Stored:', newUser);
    return res.status(201).json({
      message: 'User data stored successfully',
      user: newUser,
      isAdmin: false,
    });
  } catch (error) {
    console.error('Server Error:', error);
    return res.status(500).json({ message: 'Server error', error });
  }
});

// Fetch all users (Admin Only)
router.get('/users', async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users from MongoDB
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

export default router;
