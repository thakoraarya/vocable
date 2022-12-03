import React, { useContext } from 'react'
import NoteContext from '../context/NoteContext';


const NoteItem = (props) => {
    const { note } = props;
    const context = useContext(NoteContext);
    // const { notes, addNote } = context;
    const { deleteNote } = context;
    return (
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h4 className="card-title">{note.title}</h4>
                        <i className="far fa-trash-alt mx-2" onClick={() => { deleteNote(note._id) }}></i>
                        <i className="far fa-edit mx-2"></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default NoteItem