const express = require('express');
const router = express.Router();
const controller = require('../Controllers/entrepriseControlleur');
const passport = require('passport');

router.get('/', controller.getAll);
router.get('/:id',passport.authenticate('jwt', {session : false}), controller.getById);
router.post('/', controller.create);
router.put('/:id',passport.authenticate('jwt', {session : false}), controller.update);
router.delete('/:id',passport.authenticate('jwt', {session : false}), controller.delete);
router.get('/:userId/applications',passport.authenticate('jwt', {session : false}), controller.getApplications);
router.get('/applications/:candidatureId',passport.authenticate('jwt', {session : false}), controller.getApplicationDetails);
router.put('/applications/:applicationId',passport.authenticate('jwt', {session : false}), controller.updateApplicationStatus);

module.exports = router;
