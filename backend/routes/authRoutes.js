const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authControlleur');
const upload = require('../middlewares/upload'); // le fichier multer configuré

router.post('/signup',
  upload.fields([
    { name: 'cv', maxCount: 1 },
    { name: 'lettreMotivation', maxCount: 1 }
  ]),
  authController.signup
);

module.exports = router;
