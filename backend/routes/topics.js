const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/topicsController');

router.get('/',       ctrl.getAllTopics);
router.post('/',      ctrl.createTopic);
router.put('/:id',    ctrl.updateTopic);
router.delete('/:id', ctrl.deleteTopic);

module.exports = router;
