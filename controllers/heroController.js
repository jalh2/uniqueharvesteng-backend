const Hero = require('../models/Hero');
const multer = require('multer');

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { files: 4, fileSize: 100 * 1024 * 1024, fieldSize: 25 * 1024 * 1024 } }); // 100MB per file, 25MB for fields

// Get the hero section text content
exports.getHeroText = async (req, res) => {
  try {
    let hero = await Hero.findOne().select('heading subheading');
    if (!hero) {
      // Create a default hero document if none exists
      hero = new Hero({
        heading: 'Default Heading',
        subheading: 'Default Subheading',
      });
      await hero.save();
    }
    res.json(hero);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get the hero section images
exports.getHeroImages = async (req, res) => {
    try {
      const hero = await Hero.findOne().select('images');
      if (!hero) {
        return res.json({ images: [] });
      }
      res.json(hero);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
};

// Update the hero section content
exports.updateHero = async (req, res, next) => {
  const { heading, subheading, existingImages } = req.body;

  try {
    const updateData = {};
    if (heading) updateData.heading = heading;
    if (subheading) updateData.subheading = subheading;

    let images = [];
    if (existingImages) {
      try {
        images = JSON.parse(existingImages);
      } catch (e) {
        return res.status(400).json({ message: 'Invalid format for existingImages.' });
      }
    }

    if (req.files && req.files.length > 0) {
      const newImages = req.files.map(file => ({
        data: file.buffer.toString('base64'),
        contentType: file.mimetype,
      }));
      images = images.concat(newImages);
    }

    updateData.images = images;

    const updatedHero = await Hero.findOneAndUpdate({}, { $set: updateData }, {
      new: true,
      upsert: true,
      runValidators: true,
      setDefaultsOnInsert: true
    });

    res.json(updatedHero);
  } catch (error) {
    next(error);
  }
};

exports.upload = upload;
