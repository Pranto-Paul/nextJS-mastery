import NoteClient from '@/components/NoteClient';
import dbConnect from '@/lib/db';
import Note from '@/models/Note';

async function getNotes() {
  await dbConnect();
  const notes = await Note.find({}).sort({ createdAt: -1 }).lean();
  return notes.map((note) => ({
    ...note,
    _id: note._id.toString(),
    createdAt:
      note.createdAt instanceof Date
        ? note.createdAt.toISOString()
        : note.createdAt,
    updatedAt:
      note.updatedAt instanceof Date
        ? note.updatedAt.toISOString()
        : note.updatedAt,
  }));
}

const Home = async () => {
  const notes = await getNotes();
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6">Note app</h1>
      <NoteClient intialNotes={notes} />
    </div>
  );
};
export default Home;
