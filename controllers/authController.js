const User = require('../models/User');

// Register a new user
exports.register = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists.' });
    }

    const user = new User({ username });
    user.setPassword(password);

    await user.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login a user
exports.login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  try {
    const user = await User.findOne({ username });
    if (!user || !user.validPassword(password)) {
      return res.status(401).json({ message: 'Invalid username or password.' });
    }

        // Here you would typically create a session or token.
    // For now, we'll just send a success message.
    res.status(200).json({ message: 'Login successful.' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().select('-hash -salt');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-hash -salt');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (username && username !== user.username) {
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists.' });
        }
        user.username = username;
    }

    if (password) {
      user.setPassword(password);
    }

    const updatedUser = await user.save();
    res.json({
        _id: updatedUser._id,
        username: updatedUser.username,
        message: 'User updated successfully'
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
