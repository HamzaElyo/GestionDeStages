const express = require('express');
const router = express.Router();
const controller = require('../Controllers/tuteurControlleur');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
router.get('/entreprise/:userId', controller.getTuteursByEntreprise);

module.exports = router;
