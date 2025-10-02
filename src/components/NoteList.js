// src/components/NoteList.js
import React from 'react';
import Note from './Note';
import AddNote from './AddNote';

// --- ADD handleUpdateNote HERE ---
const NotesList = ({ notes, handleAddNote, handleDeleteNote, handleUpdateNote }) => {
    return (
        <div className='notes-list'>
            {notes.map((note) => (
                <Note
                    key={note.id}
                    id={note.id}
                    text={note.text}
                    date={note.date}
                    handleDeleteNote={handleDeleteNote}
                    handleUpdateNote={handleUpdateNote} // --- AND PASS IT DOWN HERE ---
                />
            ))}
            <AddNote handleAddNote={handleAddNote} />
        </div>
    );
};

export default NotesList;