const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: false,
  },
  // You can add more fields here like an icon or image path if needed
});

module.exports = mongoose.model('Service', ServiceSchema);
