const About = require('../models/About');

// Get About information
exports.getAbout = async (req, res) => {
  try {
    const about = await About.findOne();
    if (!about) {
      return res.status(404).json({ message: 'About information not found' });
    }
    res.status(200).json(about);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update About information
exports.updateAbout = async (req, res) => {
  const { introduction, motto, slogan, goal, mission, vision } = req.body;

  try {
    let about = await About.findOne();

    if (!about) {
      // If no About document exists, create a new one
      about = new About({
        introduction,
        motto,
        slogan,
        goal,
        mission,
        vision,
      });
      await about.save();
      return res.status(201).json(about); // 201 Created
    } else {
      // If an About document exists, update it
      about.introduction = introduction || about.introduction;
      about.motto = motto || about.motto;
      about.slogan = slogan || about.slogan;
      about.goal = goal || about.goal;
      about.mission = mission || about.mission;
      about.vision = vision || about.vision;

      if (req.file) {
        about.image = {
          data: req.file.buffer.toString('base64'),
          contentType: req.file.mimetype,
        };
      }

      await about.save();
      return res.status(200).json(about); // 200 OK
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
