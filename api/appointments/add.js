import { query } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { title, date, time } = req.body;
    try {
      await query('INSERT INTO appointments (title, date, time) VALUES ($1, $2, $3)', [title, date, time]);
      res.status(200).json({ message: 'Appointment added successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add appointment' });
    }
  }
}
