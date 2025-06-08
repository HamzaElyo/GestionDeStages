const express = require('express');
const router = express.Router();
const controller = require('../Controllers/adminControlleur');

router.get('/stats', controller.getStats);
router.delete('/users/:id', controller.deleteUser);
router.get('/users', controller.getAllUsers);
router.get('/users/recent', controller.getRecentUsers);
router.get('/stats/detailed', controller.getDetailedStats);
router.put('/users/:userId/status', controller.updateUserStatus);

module.exports = router;
