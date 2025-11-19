// client/src/components/NoteForm.jsx (SIMPLIFIED STYLING)
import React, { useState, useEffect } from 'react';

const initialNoteState = { title: '', content: '' };

function NoteForm({ onSave, currentNote, onCancel }) {
    const [note, setNote] = useState(initialNoteState);

    useEffect(() => {
        setNote(currentNote || initialNoteState);
    }, [currentNote]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNote(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // CRITICAL FRONTEND VALIDATION: Prevents empty data being sent.
        if (!note.title.trim() || !note.content.trim()) {
            alert("Title and Content must not be empty.");
            return; // STOP EXECUTION
        }

        onSave(note);
        setNote(initialNoteState); 
    };
    
    const handleCancel = () => {
        setNote(initialNoteState);
        onCancel();
    };

    return (
        <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
            <h2 className="text-xl font-semibold mb-4 text-gray-700">
                {currentNote ? '✏️ Edit Note' : '➕ Add New Note'}
            </h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <input
                    type="text"
                    name="title"
                    placeholder="Title"
                    value={note.title}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 text-lg font-medium text-black"
                    required
                />
                <textarea
                    name="content"
                    placeholder="Content"
                    value={note.content}
                    onChange={handleChange}
                    rows="4"
                    className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500 text-lg font-medium text-black"
                    required
                />
                <div className="flex space-x-2">
                    <button
                        type="submit"
                        className={`flex-grow font-medium py-2 px-4 rounded text-white transition ${
                            currentNote 
                                ? 'bg-green-600 hover:bg-green-700' 
                                : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                    >
                        {currentNote ? 'Save Changes' : 'Create Note'}
                    </button>
                    {currentNote && (
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="bg-gray-400 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded transition"
                        >
                            Cancel
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
}

export default NoteForm;