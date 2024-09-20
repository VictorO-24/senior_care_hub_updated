import { query } from '../../../../lib/db';

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === 'PUT') {
    const { title, date, time } = req.body;
    try {
      await query('UPDATE appointments SET title = $1, date = $2, time = $3 WHERE id = $4', [title, date, time, id]);
      res.status(200).json({ message: 'Appointment updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update appointment' });
    }
  }
}
