const Project = require('../models/Project');
const multer = require('multer');
const path = require('path');

// Set up multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Append extension
  }
});

const upload = multer({ storage: storage, limits: { fileSize: 100 * 1024 * 1024 } }); // 100MB per file

// Get all projects
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new project with image uploads
exports.createProject = async (req, res) => {
  const { projectName, country, clientName, contactInformation, typeOfWorkPerformed, yearOfCompletion, valueOfContractUSD } = req.body;
  const images = req.files ? req.files.map(file => ({ url: file.path })) : [];

  const newProject = new Project({
    projectName,
    country,
    clientName,
    contactInformation,
    typeOfWorkPerformed,
    yearOfCompletion,
    valueOfContractUSD,
    images
  });

  try {
    const savedProject = await newProject.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a project
exports.updateProject = async (req, res) => {
  const { projectName, country, clientName, contactInformation, typeOfWorkPerformed, yearOfCompletion, valueOfContractUSD } = req.body;
  const images = req.files ? req.files.map(file => ({ url: file.path })) : [];

  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    project.projectName = projectName || project.projectName;
    project.country = country || project.country;
    project.clientName = clientName || project.clientName;
    project.contactInformation = contactInformation || project.contactInformation;
    project.typeOfWorkPerformed = typeOfWorkPerformed || project.typeOfWorkPerformed;
    project.yearOfCompletion = yearOfCompletion || project.yearOfCompletion;
    project.valueOfContractUSD = valueOfContractUSD || project.valueOfContractUSD;
    if (images.length > 0) {
      project.images = images;
    }

    const updatedProject = await project.save();
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a project
exports.deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.upload = upload;
