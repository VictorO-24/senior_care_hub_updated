import { query } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    try {
      const results = await query('SELECT * FROM appointments');
      res.status(200).json(results.rows);
    } catch (error) {
      res.status(500).json({ error: 'Failed to fetch appointments' });
    }
  }
}
