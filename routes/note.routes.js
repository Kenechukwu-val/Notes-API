const express = require('express');
const router = express.Router();
const noteController = require('../controllers/note.controller')


//Create a new note
router.post('/notes', noteController.createNote);

//Get a note by ID
router.get('/notes', noteController.getNote);

//Update a note by ID
router.put('/notes/:id', noteController.updateNote);

//Delete a note by ID
router.delete('/notes/:id', noteController.deleteNote);



module.exports = router;