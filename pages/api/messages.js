import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { message } = req.body;
    try {
      await client.connect();
      const db = client.db('chat-app');
      const collection = db.collection('messages');
      await collection.insertOne(message);
      res.status(201).json({ success: true, message });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  } else if (req.method === 'GET') {
    try {
      await client.connect();
      const db = client.db('chat-app');
      const collection = db.collection('messages');
      const messages = await collection.find({}).toArray();
      res.status(200).json({ success: true, messages });
    } catch (err) {
      res.status(500).json({ success: false, message: err.message });
    }
  }
}
