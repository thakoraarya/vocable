const express = require('express');
const { body, validationResult } = require('express-validator');
const router = express.Router();
const fatchuser = require('../middleware/fatchuser')
const Notes = require("../models/Notes")


//1. GET all the notes
router.get('/fatchallnotes', fatchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json(notes);

    } catch (error) {
        console.error(error.message);
        res.status(500).send("SOME ERROR OCCURED");
    }
})



//2. add new the note
router.post('/addnote', fatchuser,
    [body('title', ('enter a valid title')).isLength({ min: 3 }),
    body('description', ('description must be atleast 5 character')).isLength({ min: 5 }),],
    async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            //   if there are errors ,return bad requrest and error
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            const note = new Notes({ title, description, tag, user: req.user.id });
            const saveNote = await note.save();
            res.json(saveNote);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("SOME ERROR OCCURED");
        }
    });


// 3. edit existing note

router.put('/editnote/:id', fatchuser, async (req, res) => {
    const { title, description, tag } = req.body;
    // Create a newNote object
    const newNote = {};
    if (title) { newNote.title = title };
    if (description) { newNote.description = description };
    if (tag) { newNote.tag = tag };

    // Find the note to be updated and update it
    let note = await Notes.findById(req.params.id);
    if (!note) { return res.status(404).send("Not Found") };

    if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
    res.json({ note });
})


// 4 delete note
router.delete('/deletenote/:id', fatchuser, async (req, res) => {
    try {
        // Find the note to be deleted and delete it
        let note = await Notes.findById(req.params.id);
        if (!note) { return res.status(404).send("Not Found") };
        // allow deletion only if user owns the note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndDelete(req.params.id)
        res.json({ "success": "note has been deleted", note: note });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("SOME ERROR OCCURED");
    }
})
module.exports = router