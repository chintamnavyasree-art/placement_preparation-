const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/codingController');

router.get('/',       ctrl.getAllCoding);
router.post('/',      ctrl.createCoding);
router.put('/:id',    ctrl.updateCoding);
router.delete('/:id', ctrl.deleteCoding);

module.exports = router;
