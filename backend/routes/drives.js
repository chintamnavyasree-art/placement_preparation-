const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/drivesController');

router.get('/',       ctrl.getAllDrives);
router.post('/',      ctrl.createDrive);
router.put('/:id',    ctrl.updateDrive);
router.delete('/:id', ctrl.deleteDrive);

module.exports = router;
