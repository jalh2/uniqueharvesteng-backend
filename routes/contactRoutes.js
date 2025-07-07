const express = require('express');
const router = express.Router();
const { getContact, createContact, updateContact } = require('../controllers/contactController');

// GET contact information
router.get('/', getContact);

// POST (create) contact information
router.post('/', createContact);

// PUT (update) contact information by ID
router.put('/:id', updateContact);

module.exports = router;
