const express = require('express');
const router = express.Router();
const controller = require('../Controllers/etudiantControlleur');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
router.get('/:id/candidatures', controller.getCandidaturesByEtudiant);

module.exports = router;
