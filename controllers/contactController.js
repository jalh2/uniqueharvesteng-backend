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

// Update Contact information
exports.updateContact = async (req, res) => {
  const { address, phoneNumbers, emails } = req.body;

  try {
    let contact = await Contact.findOne();

    if (!contact) {
      // If no Contact document exists, create a new one
      contact = new Contact({ address, phoneNumbers, emails });
      await contact.save();
      return res.status(201).json(contact); // 201 Created
    } else {
      // If a Contact document exists, update it
      contact.address = address || contact.address;
      contact.phoneNumbers = phoneNumbers || contact.phoneNumbers;
      contact.emails = emails || contact.emails;
      await contact.save();
      return res.status(200).json(contact); // 200 OK
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
