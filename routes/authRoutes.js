const express = require('express');
const router = express.Router();
const {
  register,
  login,
  getUsers,
  getUserById,
  updateUser,
  deleteUser
} = require('../controllers/authController');

// POST a new user registration
router.post('/register', register);

// POST a user login
router.post('/login', login);

// GET all users
router.get('/users', getUsers);

// GET a single user by ID
router.get('/users/:id', getUserById);

// PUT (update) a user by ID
router.put('/users/:id', updateUser);

// DELETE a user by ID
router.delete('/users/:id', deleteUser);

module.exports = router;
