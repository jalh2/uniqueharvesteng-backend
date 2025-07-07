const Contact = require('../models/Contact');

// Get Contact information
exports.getContact = async (req, res) => {
  try {
    const contact = await Contact.findOne();
    if (!contact) {
      return res.status(404).json({ message: 'Contact information not found' });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create Contact information
exports.createContact = async (req, res) => {
  const { address, phoneNumbers, emails } = req.body;

  try {
    const newContact = new Contact({ address, phoneNumbers, emails });
    await newContact.save();
    res.status(201).json(newContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update Contact information
exports.updateContact = async (req, res) => {
  const { id } = req.params;
  const { address, phoneNumbers, emails } = req.body;

  try {
    const updatedContact = await Contact.findByIdAndUpdate(id, 
      { address, phoneNumbers, emails },
      { new: true, runValidators: true }
    );

    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact information not found' });
    }

    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
