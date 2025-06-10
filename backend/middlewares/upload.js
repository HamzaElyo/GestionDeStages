const multer = require('multer');
const path = require('path');

// Configuration de multer pour stocker les fichiers dans /uploads avec un nom unique
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads'); // dossier uploads à la racine de ton projet backend
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const basename = path.basename(file.originalname, ext).replace(/\s+/g, '_'); // remplacer espaces par _
    cb(null, basename + '-' + Date.now() + ext);
  }
});

const upload = multer({ storage: storage });

module.exports = upload;
