const express = require('express');
const router = express.Router();
const controller = require('../Controllers/etudiantControlleur');
const passport = require('passport');

router.get('/',passport.authenticate('jwt', {session : false}), controller.getAll);
router.get('/:id',passport.authenticate('jwt', {session : false}), controller.getById);
router.post('/', controller.create);
router.put('/:id',passport.authenticate('jwt', {session : false}), controller.update);
router.delete('/:id',passport.authenticate('jwt', {session : false}), controller.delete);
router.get('/:id/candidatures',passport.authenticate('jwt', {session : false}), controller.getCandidaturesByEtudiant);

module.exports = router;
