const express = require('express');
const router = express.Router();
const authController = require('../Controllers/authControlleur');
const upload = require('../middlewares/upload')


router.post('/signup',
  upload.fields([
    { name: 'cv', maxCount: 1 },
    { name: 'lettreMotivation', maxCount: 1 }
  ]),
  authController.signup
);
router.post('/login', authController.login);

module.exports = router;