import dbConnect from '@/lib/db';

const Home = async () => {
  await dbConnect();
  return <div>page</div>;
};
export default Home;
