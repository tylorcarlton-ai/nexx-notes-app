// src/App.js
import React, { useState, useEffect } from 'react';
import NotesList from './components/NoteList';
import { v4 as uuidv4 } from 'uuid';
import './App.css';

const App = () => {
    const [notes, setNotes] = useState(() => {
        const savedNotes = JSON.parse(
            localStorage.getItem('react-notes-app-data')
        );
        return savedNotes || [];
    });

    useEffect(() => {
        localStorage.setItem(
            'react-notes-app-data',
            JSON.stringify(notes)
        );
    }, [notes]);

    const addNote = (text) => {
        const date = new Date();
        const newNote = {
            id: uuidv4(),
            text: text,
            date: date.toLocaleDateString(),
        };
        const newNotes = [...notes, newNote];
        setNotes(newNotes);
    };

    const deleteNote = (id) => {
        const newNotes = notes.filter((note) => note.id !== id);
        setNotes(newNotes);
    };

    // --- NEW FUNCTION TO ADD ---
    const updateNote = (id, newText) => {
        const newNotes = notes.map((note) => 
            note.id === id ? { ...note, text: newText } : note
        );
        setNotes(newNotes);
    };

    return (
        <div className='container'>
            <h1>Nexx Notes</h1>
            <NotesList
                notes={notes}
                handleAddNote={addNote}
                handleDeleteNote={deleteNote}
                handleUpdateNote={updateNote} // --- PASS THE NEW FUNCTION ---
            />
        </div>
    );
};

export default App;