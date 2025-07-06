const mongoose = require('mongoose');

const AboutSchema = new mongoose.Schema({
  introduction: {
    type: String,
    // required: true, // Temporarily disable for seeding
  },
  motto: {
    type: String,
    // required: true,
  },
  slogan: {
    type: String,
    // required: true,
  },
  goal: {
    type: String,
    // required: true,
  },
  mission: {
    type: String,
    // required: true,
  },
  vision: {
    type: String,
    // required: true,
  },
  image: {
    data: String, // Base64 encoded image
    contentType: String,
  },
});

module.exports = mongoose.model('About', AboutSchema);
