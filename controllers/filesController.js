const db = require('../db/filesQueries');
const path = require('node:path');
const { renderErrorPage } = require('../utils/errorHandler');
const supabase = require('../config/supabase');
const fs = require('fs/promises');

const multer = require('multer');

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + '-' + file.originalname);
//   },
// });

// Stores file with multer temporarily
const upload = multer({ dest: 'uploads/' });

const uploadFile = [
  upload.single('file'),
  async (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log('req.file: ', req.file);
    const fileBuffer = await fs.readFile(req.file.path);
    const currentTimestamp = Date.now();
    const filePath = `${currentTimestamp}-${req.file.originalname}`;

    const data = await supabase.uploadFile(filePath, fileBuffer, req.file);

    // Remove temporary file in uploads folder
    await fs.unlink(req.file.path);

    // File to save in database
    const file = {
      name: req.file.originalname,
      size: req.file.size,
      uploadTime: new Date(currentTimestamp).toISOString(),
      fileUrl: 'test',
    };

    const folderId = req.params.folderId;
    const userId = req.user.id;
    await db.addFile(file, userId, folderId);

    res.redirect(req.get('referer'));
  },
];

async function getFile(req, res) {
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

async function deleteFile(req, res) {
  const fileId = req.params.id;
  const userId = req.user.id;
  await db.deleteFile(fileId, userId);

  res.redirect(req.get('referer'));
}

module.exports = { uploadFile, getFile, deleteFile, downloadFile };
