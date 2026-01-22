'use client';

import { useState } from 'react';

const NoteClient = ({ intialNotes }) => {
  const [notes, setNotes] = useState(intialNotes);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setLoading(true);
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, content }),
      });
      const result = await response.json();
      if (result.success) {
        setNotes([result.data, ...notes]);
      }
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('❌Error creating notes: ', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4 p-4 ">
        <h2 className="text-xl font-semibold mb-2">Create your notes here</h2>
        <div className="space-y-4">
          <input
            type="text"
            className="w-full border rounded p-2 text-foreground bg-background"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <textarea
            className="w-full border rounded p-2 text-foreground bg-background"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="3"
          ></textarea>
          <button
            type="submit"
            className="px-4 py-2 bg-foreground text-background rounded w-full"
          >
            {loading ? 'saving...' : 'save'}
          </button>
        </div>
      </form>
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Your notes ({notes.length})</h2>
        {notes.length === 0 ? (
          <p className="text-gray-500 text-center mt-4">
            No notes yet! Create your first note
          </p>
        ) : (
          <div className="space-y-4">
            {notes.map((note) => (
              <div
                key={note._id}
                className="border rounded-lg p-4 shadow-sm  space-y-2"
              >
                <h3 className="text-lg font-semibold text-white">
                  {note.title}
                </h3>
                <p className="text-white">{note.content}</p>
                <p className="text-sm text-gray-400">
                  Last updated: {new Date(note.updatedAt).toLocaleString()}
                </p>
                <div className="flex flex-row-reverse gap-3">
                  <button
                    className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => handleUpdate(note._id)}
                  >
                    Update
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    onClick={() => handleDelete(note._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
export default NoteClient;
