const express = require('express');
const router = express.Router();
const noteController = require('../controllers/note.controller')
const protect = require('../middleware/user.middleware');


//Create a new note
router.post('/notes', protect, noteController.createNote);

//Get a note by ID
router.get('/notes', protect, noteController.getNote);

//Update a note by ID
router.put('/notes/:id', protect, noteController.updateNote);

//Delete a note by ID
router.delete('/notes/:id', protect, noteController.deleteNote);



module.exports = router;