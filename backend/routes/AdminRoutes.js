const express = require('express');
const router = express.Router();
const controller = require('../Controllers/adminControlleur');

router.get('/stats', controller.getStats);
router.delete('/users/:id', controller.deleteUser);
router.get('/users', controller.getAllUsers);

module.exports = router;
