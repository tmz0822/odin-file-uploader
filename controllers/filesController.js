const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const db = require('../db/filesQueries');

const uploadFile = [
  upload.single('file'),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const file = {
      name: req.file.originalname,
      size: req.file.size,
    };
    const folderId = req.params.folderId;
    const userId = req.user.id;
    await db.addFile(file, userId, folderId);

    res.redirect(req.get('referer'));
  },
];

// TODO
function getFileDetails() {
  // show a webpage of the file details
}

function deleteFile() {}

module.exports = { uploadFile, getFileDetails, deleteFile };
