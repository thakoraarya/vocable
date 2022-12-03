import React, { useContext,useEffect } from 'react'
import NoteContext from '../context/NoteContext'
import AddNote from './AddNote'
import NoteItem from './NoteItem'
// import cors from 'cors'
const Notes = () => {
    const context = useContext(NoteContext);
    const { notes, getNotes } = context;
    useEffect(() => {
        // getNotes(cors())
        getNotes()
    })
    return (
        <>
            <AddNote />
            <div className="row">
                <h3>Your Notes</h3>
                {notes.map((note) => {
                    return <NoteItem key={note._id} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes;