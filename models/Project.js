const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  clientName: {
    type: String,
    required: true,
  },
  contactInformation: {
    type: String,
    required: false, // Assuming contact info might not always be available
  },
  typeOfWorkPerformed: {
    type: String,
    required: true,
  },
  yearOfCompletion: {
    type: Number,
    required: true,
  },
  valueOfContractUSD: {
    type: Number,
    required: true,
  },
  images: [
    {
      url: { type: String, required: true },
      altText: { type: String, required: false },
    },
  ],
});

module.exports = mongoose.model('Project', ProjectSchema);
