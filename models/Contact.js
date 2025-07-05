const mongoose = require('mongoose');

const ContactSchema = new mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  phoneNumbers: {
    type: [String],
    required: true,
  },
  emails: {
    type: [String],
    required: true,
  },
});

module.exports = mongoose.model('Contact', ContactSchema);
