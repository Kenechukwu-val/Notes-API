const Note = require('./../models/Note');

exports.createNote = async (req, res) => {
    
    const { title, content } = req.body;
    const userID = '64f42fbe14e2d1c62b76e999'; // Assuming user ID is stored in req.user after authentication

    try{
        const newNote = await Note.create({
            user: userID,
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