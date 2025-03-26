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
    console.log(folderId);
    await db.addFileToFolder(file, folderId);

    res.redirect(req.get('referer'));
  },
];

module.exports = { uploadFile };
