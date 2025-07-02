const Note = require('./../models/Note');

exports.createNote = async (req, res) => {

    const { title, content } = req.body;
    const userID = '64f42fbe14e2d1c62b76e999'; // Assuming user ID is stored in req.user after authentication

    if (!title || !content) {
        return res.status(400).json({
            message: 'Title and content are required'
        });
    }

    try{
        const newNote = await Note.create({
            user: req.user?.id || userID,
            title,
            content
        });
        res.status(201).json({
            message: 'Note created successfully',
            note: newNote
        })
    }
    catch (err) {
        res.status(500).json({
            message: 'Error creating note',
            error: err.message
        });
    }
};

exports.getNote = async ( req, res) => {
    try{
        const note = await Note.find({});

        if (!note) {
            return res.status(404).json({
                message: 'Note not found'
            })
        }
        res.status(200).json({
            message: 'Note fetched successfully',
            note: note
        })

    }
    catch (err) {
        res.status(500).json({
            message: 'Error fetching note',
            error: err.message
        })
    }

};

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

        if (!deletedNote) {
            return res.status(404).json({
                message: 'Note not found'
            });
        }
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