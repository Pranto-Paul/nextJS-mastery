import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI;
let isConnected = false;
export default async function dbConnect() {
  try {
    if (!isConnected) {
      const db = await mongoose.connect(MONGO_URI);
      isConnected = db.connections[0].readyState === 1;
      console.log('✅Connected to DB');
    }
  } catch (error) {
    console.error('❌Can not connect to DB: ', error);
  }
}
