const fs = require('fs');

// Delete local files from the uploads folder
function deleteFilesIfLocal(imagePaths) {
  imagePaths.forEach(img => {
    if (!img) return;
    if (img.startsWith('http')) return; // Skip external URLs
    const filePath = img.startsWith('/') ? img.slice(1) : img; // remove leading "/"
    fs.unlink(filePath, err => {
      if (err) console.log('Delete file error:', err.message);
    });
  });
}

module.exports = { deleteFilesIfLocal };
