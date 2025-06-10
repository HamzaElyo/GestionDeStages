const express = require('express');
const router = express.Router();
const controller = require('../Controllers/tuteurControlleur');
const passport = require('passport');

router.get('/',passport.authenticate('jwt', {session : false}), controller.getAll);
router.get('/:id',passport.authenticate('jwt', {session : false}), controller.getById);
router.post('/', controller.create);
router.put('/:id',passport.authenticate('jwt', {session : false}), controller.update);
router.delete('/:id',passport.authenticate('jwt', {session : false}), controller.delete);
router.get('/entreprise/:userId',passport.authenticate('jwt', {session : false}), controller.getTuteursByEntreprise);

module.exports = router;
