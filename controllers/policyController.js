const Policy = require('../models/Policy');

// Get Policy information
exports.getPolicy = async (req, res) => {
  try {
    const policy = await Policy.findOne();
    if (!policy) {
      // If no policy exists, return a default empty policy object
      return res.status(200).json({ content: '' });
    }
    res.status(200).json(policy);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update Policy information
exports.updatePolicy = async (req, res) => {
  const { content } = req.body;

  try {
    let policy = await Policy.findOne();

    if (!policy) {
      // If no Policy document exists, create a new one
      policy = new Policy({ content });
      await policy.save();
      return res.status(201).json(policy); // 201 Created
    } else {
      // If a Policy document exists, update it
      policy.content = content || policy.content;
      await policy.save();
      return res.status(200).json(policy); // 200 OK
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
