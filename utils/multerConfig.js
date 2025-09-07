const multer = require('multer');
const path = require('path');

// Disk storage configuration (uploads/)
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Folder in the project root
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);  // .jpg or .png
    const name = path.basename(file.originalname, ext)
                   .replace(/\s+/g, '-')    // Replace spaces with hyphens
                   .replace(/[^a-zA-Z0-9-_]/g, ''); // Remove unsafe characters
    const unique = Date.now() + '-' + Math.round(Math.random()*1e9);
    cb(null, unique + '-' + name + ext);   // Example: 162334234-12345-myfile.jpg
  }
});

// File filter - allow only images
function fileFilter(req, file, cb) {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
}

// Multer configuration
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter
});

module.exports = upload;