const express = require('express');
const router = express.Router();
const { getPolicy, updatePolicy } = require('../controllers/policyController');

// GET policy information
router.get('/', getPolicy);

// PUT (update) policy information
router.put('/', updatePolicy);

module.exports = router;
