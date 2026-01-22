import NoteClient from '@/components/NoteClient';
import dbConnect from '@/lib/db';

const Home = async () => {
  await dbConnect();
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-semibold mb-6">Note app</h1>
      <NoteClient />
    </div>
  );
};
export default Home;
