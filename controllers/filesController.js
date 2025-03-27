const db = require('../db/filesQueries');
const path = require('node:path');
const { renderErrorPage } = require('../utils/errorHandler');

const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage });

const uploadFile = [
  upload.single('file'),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const file = {
      name: req.file.originalname,
      size: req.file.size,
      uploadTime: new Date(parseInt(req.file.filename.split('-')[0])),
    };

    const folderId = req.params.folderId;
    const userId = req.user.id;
    await db.addFile(file, userId, folderId);

    res.redirect(req.get('referer'));
  },
];

// TODO
async function getFile(req, res) {
  // show a webpage of the file details
  const fileId = req.params.id;
  const userId = req.user.id;

  try {
    const file = await db.getFileById(fileId, userId);

    res.render('files/file-details', { file, referer: req.get('referer') });
  } catch (error) {
    renderErrorPage(res, 403, error.message);
  }
}

async function downloadFile(req, res) {
  const fileId = req.params.id;
  const userId = req.user.id;
  const file = await db.getFileById(fileId, userId);
  const fileName = file.name;
  const fileUploadTime = new Date(file.uploadTime).getTime();
  const filePath = path.resolve('uploads', `${fileUploadTime}-${fileName}`);

  res.download(filePath, fileName, (err) => {
    if (err) {
      console.error('File download error:', err);
      res.status(500).send('Error downloading file');
    }
  });
}

function deleteFile(req, res) {}

module.exports = { uploadFile, getFile, deleteFile, downloadFile };
