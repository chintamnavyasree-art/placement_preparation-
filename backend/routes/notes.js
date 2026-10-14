const express = require('express');
const router  = express.Router();
const ctrl    = require('../controllers/notesController');

router.get('/',       ctrl.getAllNotes);
router.post('/',      ctrl.createNote);
router.delete('/:id', ctrl.deleteNote);

module.exports = router;
