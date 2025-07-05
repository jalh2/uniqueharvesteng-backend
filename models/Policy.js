const mongoose = require('mongoose');

const PolicySchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Policy', PolicySchema);
