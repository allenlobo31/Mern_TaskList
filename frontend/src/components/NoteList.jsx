import React from 'react';

function NoteList({ notes, onEdit, onDelete }) {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-700 border-b pb-2">📋 All Notes ({notes.length})</h2>
            
            {notes.length === 0 ? (
                <p className="text-gray-500 p-4 bg-white rounded shadow-sm">No notes yet. Add one above!</p>
            ) : (
                notes.map(note => (
                    <div 
                        key={note._id} 
                        className="bg-white p-4 rounded shadow-sm hover:shadow-md transition duration-150"
                    >
                        <h3 className="text-lg font-medium mb-1 text-gray-800">
                            {note.title}
                        </h3>
                        <p className="text-gray-600 mb-3 text-sm line-clamp-2">
                            {note.content}
                        </p>
                        <div className="flex space-x-2 pt-2 border-t border-gray-100">
                            <button
                                onClick={() => onEdit(note)}
                                className="text-xs bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-1 px-2 rounded transition"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => onDelete(note._id)}
                                className="text-xs bg-red-600 hover:bg-red-700 text-white font-medium py-1 px-2 rounded transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}

export default NoteList;