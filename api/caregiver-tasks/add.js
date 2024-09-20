import { query } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, task, date } = req.body;
    try {
      await query('INSERT INTO caregiver_tasks (name, task, date) VALUES ($1, $2, $3)', [name, task, date]);
      res.status(200).json({ message: 'Caregiver task added successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add caregiver task' });
    }
  }
}
