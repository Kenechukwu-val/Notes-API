const Note = require('./../models/Note');
const asyncHandler = require('express-async-handler');

exports.createNote = asyncHandler(async (req, res) => {

    const { title, content } = req.body;

    // Validate the input
    // Ensure that title and content are provided
    if (!title || !content) {
        res.status(400);
        throw new Error('Title and Content required')
    }

    // Create a new note
    const newNote = await Note.create({
        user: req.user._id, // Assuming req.user is set by the protect middleware
        title,
        content
    });

    res.status(201).json(newNote);
        
});

exports.getNote = asyncHandler(async (req, res) => {
    const notes = await Note.find({ user: req.user._id });
    res.status(200).json(notes);
});

exports.updateNote = async (req, res) => {
    const { id } = req.params;
    const { title, content } = req.body;

    try{
        const updateNote = await Note.findByIdAndUpdate(id, { title, content }, { new: true });

        if (!updateNote) {
            return res.status(404).json({
                message: 'Note not found'
            });
        }
        // Check if the user is authorized to update the note
        if (updateNote.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: 'You are not authorized to update this note'
            });
        }

        // Return the updated note
        res.status(200).json({
            message: 'Note updated successfully',
            note: updateNote
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'Error updating note',
            error: err.message
        })
    }
}

exports.deleteNote = async (req, res) => {
    const { id } = req.params;

    try {
        const deletedNote = await Note.findByIdAndDelete(id);
        
        // Check if the note exists
        if (!deletedNote) {
            return res.status(404).json({
                message: 'Note not found'
            });
        }

        // Check if the user is authorized to delete the note
        if (deletedNote.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({
                message: 'You are not authorized to delete this note'
            });
        }

        // Return a success message
        res.status(200).json({
            message: 'Note deleted successfully',
            note: deletedNote
        });
    } catch (err) {
        res.status(500).json({
            message: 'Error deleting note',
            error: err.message
        });
    }
};