const fs = require('fs');
const path = require('path');
const multer = require('multer');

const UPLOAD_DIR = path.join(__dirname, '..', 'uploads');

function ensureUploadDir() {
  if (!fs.existsSync(UPLOAD_DIR)) {
    fs.mkdirSync(UPLOAD_DIR, { recursive: true });
  }
}

function safeExt(originalname = '') {
  const ext = path.extname(originalname).toLowerCase();
  if (!ext) return '';
  return ext.slice(0, 10);
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    try {
      ensureUploadDir();
      cb(null, UPLOAD_DIR);
    } catch (e) {
      cb(e);
    }
  },
  filename: (req, file, cb) => {
    const stamp = Date.now();
    const rnd = Math.random().toString(16).slice(2);
    cb(null, `${stamp}-${rnd}${safeExt(file.originalname)}`);
  },
});

function fileFilter(req, file, cb) {
  if (file.fieldname === 'pptFile') {
    const ok =
      file.mimetype === 'application/pdf' ||
      file.originalname.toLowerCase().endsWith('.pdf');
    return cb(ok ? null : new Error('Invalid PPT PDF file type'), ok);
  }

  if (file.fieldname === 'paymentScreenshot') {
    const ok =
      file.mimetype.startsWith('image/') ||
      file.mimetype === 'application/pdf' ||
      file.originalname.toLowerCase().endsWith('.pdf');
    return cb(ok ? null : new Error('Invalid payment screenshot type'), ok);
  }

  return cb(null, true);
}

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 15 * 1024 * 1024, // 15MB
  },
});

module.exports = { upload, UPLOAD_DIR };

