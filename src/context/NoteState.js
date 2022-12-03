import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:8000/api/notes"
  const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM3YzRiY2I1MGNhZDA5YTI0ZTY5MWQ1In0sImlhdCI6MTY2OTg1MzA1NH0.LjVz0RmQA5cFsiIbK3VZyELH8--YtpBlL_ccmwCMxfQ";
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial)



  // Get all Notes
  const getNotes = async () => {
    // API Call
    const response = await fetch(`${host}/getnotes`,
      {
        method: 'GET',
        // mode: 'no-cors',
        headers: {
          "access-control-allow-origin": "*",
          'Content-Type': 'application/json',
          'auth-token': `${token}`
        }
      })
    const json = await response.json()
    console.log(json)
    //  setNotes(json)
  }



  // Add a Note
  const addNote = async (title, description, tag) => {
    // TODO: API Call
    // API Call
    const response = await fetch(`${host}/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': `${token}`
      },
      body: JSON.stringify({ title, description, tag })
    });
    console.log("Adding a new note")
    const note = {
      "_id": "61322f119553781a8ca8d0e08",
      "user": "6131dc5e3e4037cd4734a0664",
      "title": title,
      "description": description,
      "tag": tag,
      "date": "2021-09-03T14:20:09.668Z",
      "__v": 0
    };
    setNotes(notes.concat(note))
  }



  // Delete a Note
  const deleteNote = (id) => {
    // TODO: API Call
    console.log("Deleting the note with id" + id);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }



  // Edit a Note
  const editNote = async (id, title, description, tag) => {
    // API Call
    const response = await fetch(`${host}/updatenote/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM3YzRiY2I1MGNhZDA5YTI0ZTY5MWQ1In0sImlhdCI6MTY2OTg1MzA1NH0.LjVz0RmQA5cFsiIbK3VZyELH8--YtpBlL_ccmwCMxfQ"
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json = response.json();

    // Logic to edit in client
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        element.title = title;
        element.description = description;
        element.tag = tag;
      }

    }
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )

}
export default NoteState;