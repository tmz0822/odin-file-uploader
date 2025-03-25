const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const uploadFile = [
  upload.single('file'),
  (req, res) => {
    console.log(req.body);

    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    console.log('Uploaded file', req.file);
    res.redirect('/');
  },
];

module.exports = { uploadFile };
