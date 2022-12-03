import React, { useContext, useState } from 'react'
import NoteContext from '../context/NoteContext';


const AddNote = () => {
    const context = useContext(NoteContext);
    const { addNote } = context;

    const [note, setNote] = useState({ title: "", description: "", tag: "default" })


    const handlClick = (e) => {
        e.preventDefault();

        addNote(note.title,note.description,note.tag );
    }


    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <div className="container">
            <h3>Add a Note</h3>
            <form className='my-3'>
                <div className="mb-3">
                    <input className="form-control" placeholder='Make title' id="title" name='title' onChange={onChange} />
                </div>
                <div className="mb-3">
                    <textarea className="form-control" placeholder='type something' id="desc" name='description' onChange={onChange} />
                </div>
                <button type="submit" className="btn btn-primary" onClick={handlClick}>Submit</button>
            </form>
        </div>
    )
}

export default AddNote