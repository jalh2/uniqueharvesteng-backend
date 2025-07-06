const About = require('../models/About');

// Get About information (text only)
exports.getAboutText = async (req, res) => {
  try {
    const about = await About.findOne().select('-image');
    if (!about) {
      return res.status(404).json({ message: 'About information not found' });
    }
    res.status(200).json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get About image
exports.getAboutImage = async (req, res) => {
  try {
    const about = await About.findOne().select('image');
    if (!about || !about.image) {
      return res.status(404).json({ message: 'About image not found' });
    }
    // Send the image object directly
    res.status(200).json(about.image);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update About information
exports.updateAbout = async (req, res, next) => {
  const { introduction, motto, slogan, goal, mission, vision } = req.body;

  try {
    let about = await About.findOne();
    if (!about) {
      // If no document, create one to ensure we have an object to update
      about = new About();
    }

    // Assign text fields from the request body
    about.introduction = introduction || about.introduction;
    about.motto = motto || about.motto;
    about.slogan = slogan || about.slogan;
    about.goal = goal || about.goal;
    about.mission = mission || about.mission;
    about.vision = vision || about.vision;

    // Handle the image file if it exists
    if (req.file) {
      about.image = {
        data: req.file.buffer.toString('base64'),
        contentType: req.file.mimetype,
      };
    }

    const updatedAbout = await about.save();
    res.status(200).json(updatedAbout);

  } catch (error) {
    next(error); // Pass error to the global error handler
  }
};
