const mongoose = require('mongoose');

const TeamMemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  position: {
    type: String,
    required: true,
  },
  image: {
    type: String, // URL or path to the image
    required: false,
  },
});

const TeamSchema = new mongoose.Schema({
  keyTechnicalPersonnel: {
    type: [String], // Array of strings for the list items
    required: true,
  },
  methodology: {
    type: [String], // Array of strings for the list items
    required: true,
  },
  teamMembers: {
    type: [TeamMemberSchema], // Array of embedded team member documents
    default: [],
  },
});

module.exports = mongoose.model('Team', TeamSchema);
