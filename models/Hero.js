const mongoose = require('mongoose');

const HeroSchema = new mongoose.Schema({
  heading: {
    type: String,
    required: true,
    trim: true,
  },
  subheading: {
    type: String,
    required: true,
    trim: true,
  },
  images: [
    {
      data: String, // Base64 encoded image
      contentType: String,
    },
  ],
});

module.exports = mongoose.model('Hero', HeroSchema);
