const express = require('express');
const router = express.Router();
const { getHero, updateHero, upload } = require('../controllers/heroController');

// GET hero section content
router.get('/', getHero);

// PUT (update) hero section content
router.put('/', upload.array('images', 4), updateHero);

module.exports = router;
