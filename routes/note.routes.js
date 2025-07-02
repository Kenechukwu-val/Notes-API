const express = require('express');
const router = express.Router();
const noteController = require('../controllers/note.controller')


//Create a new note
router.post('/notes', noteController.createNote);

//Get a note by ID
router.get('/notes/:id', noteController.getNote);



module.exports = router;