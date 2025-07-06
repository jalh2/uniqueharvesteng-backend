const Project = require('../models/Project');
const multer = require('multer');

// Set up multer for file uploads in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 100 * 1024 * 1024 } }); // 100MB per file

// Get all projects (without images)
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find().select('-images');
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single project by ID (text only)
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).select('-images');
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get project images by ID
exports.getProjectImages = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).select('images');
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.status(200).json(project.images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new project with image uploads
exports.createProject = async (req, res) => {
  const { projectName, country, clientName, contactInformation, typeOfWorkPerformed, yearOfCompletion, valueOfContractUSD } = req.body;
  
  const images = req.files ? req.files.map(file => ({
    url: `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
    altText: ''
  })) : [];

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
  const { existingImages, ...projectData } = req.body;

  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Update text fields
    Object.assign(project, projectData);

    // Handle new images
    const newImages = req.files ? req.files.map(file => ({
      url: `data:${file.mimetype};base64,${file.buffer.toString('base64')}`,
      altText: ''
    })) : [];

    // Combine existing and new images
    const updatedImages = existingImages ? JSON.parse(existingImages) : [];
    project.images = [...updatedImages, ...newImages];

    const updatedProject = await project.save();
    res.status(200).json(updatedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a project
exports.upload = upload;

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


