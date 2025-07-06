const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getAboutText, getAboutImage, updateAbout } = require('../controllers/aboutController');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage, limits: { fileSize: 10 * 1024 * 1024 } }); // 10MB limit

// GET about information (text only)
router.get('/text', getAboutText);

// GET about image
router.get('/image', getAboutImage);

// PUT (update) about information
router.put('/', upload.single('image'), updateAbout);

module.exports = router;
