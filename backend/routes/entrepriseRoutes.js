const express = require('express');
const router = express.Router();
const controller = require('../Controllers/entrepriseControlleur');

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
router.get('/:userId/applications', controller.getApplications);
router.get('/applications/:candidatureId', controller.getApplicationDetails);
router.put('/applications/:applicationId', controller.updateApplicationStatus);

module.exports = router;
