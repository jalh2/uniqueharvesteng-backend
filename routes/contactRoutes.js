const express = require('express');
const router = express.Router();
const { getContact, updateContact } = require('../controllers/contactController');

// GET contact information
router.get('/', getContact);

// PUT (update) contact information
router.put('/', updateContact);

module.exports = router;
