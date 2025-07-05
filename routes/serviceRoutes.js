const express = require('express');
const router = express.Router();
const {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService
} = require('../controllers/serviceController');

// GET all services
router.get('/', getServices);

// GET a single service by ID
router.get('/:id', getServiceById);

// POST a new service
router.post('/', createService);

// PUT (update) a service by ID
router.put('/:id', updateService);

// DELETE a service by ID
router.delete('/:id', deleteService);

module.exports = router;
