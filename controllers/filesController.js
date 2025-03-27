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

    await supabase.uploadFile(filePath, fileBuffer, req.file);

    // Remove temporary file in uploads folder
    await fs.unlink(req.file.path);

    // File to save in database
    const file = {
      name: req.file.originalname,
      size: req.file.size,
      uploadTime: new Date(currentTimestamp).toISOString(),
      fileUrl: filePath,
    };
    // todo get file url download link

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

  const data = await supabase.downloadFile(file.fileUrl);

  res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
  res.setHeader('Content-Type', data.type);
  res.send(Buffer.from(await data.arrayBuffer()));
}

async function deleteFile(req, res) {
  const fileId = req.params.id;
  const userId = req.user.id;
  await db.deleteFile(fileId, userId);

  res.redirect(req.get('referer'));
}

module.exports = { uploadFile, getFile, deleteFile, downloadFile };
