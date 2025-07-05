const Service = require('../models/Service');

// Get all services
exports.getServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.status(200).json(services);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single service by ID
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json(service);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create a new service
exports.createService = async (req, res) => {
  const { name, description } = req.body;
  const newService = new Service({ name, description });

  try {
    const savedService = await newService.save();
    res.status(201).json(savedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update a service
exports.updateService = async (req, res) => {
  const { name, description } = req.body;

  try {
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true, runValidators: true }
    );
    if (!updatedService) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json(updatedService);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete a service
exports.deleteService = async (req, res) => {
  try {
    const deletedService = await Service.findByIdAndDelete(req.params.id);
    if (!deletedService) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.status(200).json({ message: 'Service deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
