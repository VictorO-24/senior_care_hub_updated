// pages/api/medications/index.js
import { query } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const results = await query('SELECT * FROM medications');
      res.status(200).json(results.rows);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch medications' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
