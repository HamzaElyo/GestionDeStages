const express = require('express');
const router = express.Router();
const controller = require('../Controllers/stageControlleur');
const passport = require('passport');

router.get('/:userId',passport.authenticate('jwt', {session : false}), controller.getStagesByEntreprise);
router.get('/',passport.authenticate('jwt', {session : false}), controller.getAll);
router.get('/:id',passport.authenticate('jwt', {session : false}), controller.getById);
router.post('/',passport.authenticate('jwt', {session : false}), controller.create);
router.put('/:id',passport.authenticate('jwt', {session : false}), controller.update);
router.delete('/:id',passport.authenticate('jwt', {session : false}), controller.delete);


module.exports = router;
