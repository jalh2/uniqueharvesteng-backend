const fs = require('fs');
const path = require('path');

const imageDir = path.join(__dirname, '..', '..', 'frontend', 'public', 'images', 'about');

try {
    const files = fs.readdirSync(imageDir);
    console.log('Files in public/images/about:', files);
} catch (error) {
    console.error('Error reading directory:', error.message);
}
