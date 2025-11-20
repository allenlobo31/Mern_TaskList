import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import NoteList from './components/NoteList';
import NoteForm from './components/NoteForm';

const API_URL = 'http://localhost:5000/api/notes';

function App() {
    const [notes, setNotes] = useState([]);
    const [editingNote, setEditingNote] = useState(null); 

    const fetchNotes = useCallback(async () => {
        try {
            const response = await axios.get(API_URL);
            setNotes(response.data);
            console.log("READ JSON:", response.data);
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    }, []);

    useEffect(() => {
        fetchNotes();
    }, [fetchNotes]);

    const handleSaveNote = async (noteData) => {
        try {
            let response;
            if (editingNote) {
                response = await axios.put(`${API_URL}/${editingNote._id}`, noteData);
                setNotes(notes.map(n => n._id === editingNote._id ? response.data : n));
                setEditingNote(null); 
                console.log("UPDATE JSON:", response.data);
            } else {
                response = await axios.post(API_URL, noteData);
                setNotes([response.data, ...notes]);
                console.log("CREATE JSON:", response.data);
            }
        } catch (error) {
            console.error('Error saving note:', error.message);
        }
    };

    const handleDeleteNote = async (id) => {
        try {
            const response = await axios.delete(`${API_URL}/${id}`);
            setNotes(notes.filter(note => note._id !== id));
            console.log("DELETE JSON:", response.data); 
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    return (
        <div className="min-h-screen min-w-screen bg-gray-50 p-6 md:p-10">
            <header className="max-w-6xl mx-auto mb-10"> 
                <h1 className="text-4xl font-bold text-gray-800 text-center border-b pb-4 mb-12">
                    📝 Notes CRUD Application
                </h1>
            </header>
            
            <main className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
                <NoteForm 
                    onSave={handleSaveNote} 
                    currentNote={editingNote}
                    onCancel={() => setEditingNote(null)}
                />

                <NoteList 
                    notes={notes} 
                    onEdit={setEditingNote} 
                    onDelete={handleDeleteNote} 
                />
            </main>
        </div>
    );
}

export default App;