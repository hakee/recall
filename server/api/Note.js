const mongoose = require('mongoose');
const router = require('express').Router();
const Note = require('../models/Note');
const User = require('../models/User');

router.get('/me', async (req, res, next) => {
    const { _id } = req.user;
    const notes = await Note.find({_author: _id}).select('-content -_author');

    res.status(200).json(notes);
});

router.get('/:id', async (req, res, next) => {
    if(!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).json({message: 'ID is not valid'});

    const note = await Note.findOne({ _id: req.params.id}).populate('_author', '-notes');
    if(!note)
        return res.status(400).json({message: 'Note not found'});

    if(req.user._id !== note._author.id)
        return res.status(401).json({message: 'This is not your note to edit. Sorry.'});

    return res.status(200).json(note);
});

router.post('/', async (req, res, next) => {
    if(!req.body.title)
        return res.status(400).status({message: 'Note needs a title'});

    const { _id } = req.user;
    const user = await User.findOne({_id});

    const noteBody = {
        title: req.body.title,
        content: req.body.content || '',
        _author: req.user._id
    };

    const newNote = new Note(noteBody);
    newNote.save((err) => {
        if (err)
            return res.status(500).json({message: err});
    });

    user.notes.push(newNote);
    user.save(() => {
        res.status(200).json(newNote);
    });
});

router.put('/:id', async (req, res, next) => {
    if(!req.body.title)
        return res.status(400).json({message: 'Note needs a title'});

    if(!mongoose.Types.ObjectId.isValid(req.params.id))
        return res.status(400).json({message: 'ID is not valid'});

    const note = await Note.findOne({ _id: req.params.id}).populate('_author', '-notes');

    if(req.user._id !== note._author.id)
        return res.status(401).json({message: 'This is not your note to edit. Sorry.'});

    const noteBody = {
        title: req.body.title,
        content: req.body.content || '',
    };

    note.title = noteBody.title;
    note.content = noteBody.content;

    note.save((err) => {
        if (err)
            return res.status(500).json({message: err});

        res.status(200).json(note);
    });
});

module.exports = router;