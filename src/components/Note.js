// src/components/Note.js
import React, { useState } from 'react';
// --- IMPORT THE EDIT ICON ---
import { MdDeleteForever, MdEdit, MdSave } from 'react-icons/md';

// --- RECEIVE handleUpdateNote ---
const Note = ({ id, text, date, handleDeleteNote, handleUpdateNote }) => {
    // State to check if we are in edit mode
    const [isEditing, setIsEditing] = useState(false);
    // State to hold the text while editing
    const [editedText, setEditedText] = useState(text);

    const handleSaveClick = () => {
        // Call the update function from App.js if text is not empty
        if (editedText.trim().length > 0) {
            handleUpdateNote(id, editedText);
            setIsEditing(false); // Switch back to view mode
        }
    };

    return (
        <div className="note">
            {isEditing ? (
                // --- EDITING VIEW ---
                <div className="note-edit">
                    <textarea
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        rows="6"
                    ></textarea>
                    <div className="note-footer">
                        <small>{date}</small>
                        <MdSave onClick={handleSaveClick} className='save-icon' size='1.3em' />
                    </div>
                </div>
            ) : (
                // --- NORMAL VIEW ---
                <>
                    <span>{text}</span>
                    <div className="note-footer">
                        <small>{date}</small>
                        <div>
                            <MdEdit onClick={() => setIsEditing(true)} className='edit-icon' size='1.3em' />
                            <MdDeleteForever
                                onClick={() => handleDeleteNote(id)}
                                className='delete-icon'
                                size='1.3em'
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Note;