const Note = require('./../models/Note');

exports.createNote = async (req, res) => {
    const { title, content } = req.body;
    const userId = req.user._id;

    try{
        const newNote = await Note.create({
            title,
            content,
            user: userId
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