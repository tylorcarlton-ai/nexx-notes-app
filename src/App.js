// src/App.js
import React, { useState, useEffect } from 'react';
import NotesList from './components/NoteList';
import { v4 as uuidv4 } from 'uuid';
import './App.css';
import Search from './components/Search'; // --- 1. IMPORT SEARCH ---

const App = () => {
    const [notes, setNotes] = useState(() => {
        const savedNotes = JSON.parse(
            localStorage.getItem('react-notes-app-data')
        );
        return savedNotes || [];
    });
    
    // --- 2. ADD NEW STATE FOR SEARCH TEXT ---
    const [searchText, setSearchText] = useState('');

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

    const updateNote = (id, newText) => {
        const newNotes = notes.map((note) =>
            note.id === id ? { ...note, text: newText } : note
        );
        setNotes(newNotes);
    };

    return (
        <div className='container'>
            <h1>Nexx Notes</h1>
            {/* --- 3. RENDER THE SEARCH COMPONENT --- */}
            <Search handleSearchNote={setSearchText} />
            <NotesList
                // --- 4. PASS THE FILTERED NOTES ---
                notes={notes.filter((note) =>
                    note.text.toLowerCase().includes(searchText.toLowerCase())
                )}
                handleAddNote={addNote}
                handleDeleteNote={deleteNote}
                handleUpdateNote={updateNote}
            />
        </div>
    );
};

export default App;