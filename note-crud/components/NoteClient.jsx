'use client';

import { useState } from 'react';

const NoteClient = () => {
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
      console.log(result);
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
    </div>
  );
};
export default NoteClient;
