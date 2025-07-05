const express = require('express');
const router = express.Router();
const multer = require('multer');
const { getAbout, updateAbout } = require('../controllers/aboutController');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// GET about information
router.get('/', getAbout);

// PUT (update) about information
router.put('/', upload.single('image'), updateAbout);

module.exports = router;
