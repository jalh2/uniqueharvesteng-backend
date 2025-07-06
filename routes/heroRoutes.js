const express = require('express');
const router = express.Router();
const { getHeroText, getHeroImages, updateHero, upload } = require('../controllers/heroController');

// GET hero section text content
router.get('/text', getHeroText);

// GET hero section images
router.get('/images', getHeroImages);

// PUT (update) hero section content
router.put('/', upload.array('images', 4), updateHero);

module.exports = router;
