const express = require('express');
const router = express.Router();
const controller = require('../Controllers/adminControlleur');
const passport = require('passport');

router.get('/stats',passport.authenticate('jwt', {session : false}), controller.getStats);
router.delete('/users/:id',passport.authenticate('jwt', {session : false}), controller.deleteUser);
router.get('/users',passport.authenticate('jwt', {session : false}), controller.getAllUsers);
router.get('/users/recent',passport.authenticate('jwt', {session : false}), controller.getRecentUsers);
router.get('/stats/detailed',passport.authenticate('jwt', {session : false}), controller.getDetailedStats);
router.put('/users/:userId/status',passport.authenticate('jwt', {session : false}), controller.updateUserStatus);

module.exports = router;
