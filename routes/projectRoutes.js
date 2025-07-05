const express = require('express');
const router = express.Router();
const {
  getProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
  upload
} = require('../controllers/projectController');

// GET all projects
router.get('/', getProjects);

// GET a single project by ID
router.get('/:id', getProjectById);

// POST a new project with image uploads
router.post('/', upload.array('images', 10), createProject);

// PUT (update) a project by ID with image uploads
router.put('/:id', upload.array('images', 10), updateProject);

// DELETE a project by ID
router.delete('/:id', deleteProject);

module.exports = router;
