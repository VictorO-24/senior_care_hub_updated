import { query } from '../../../../lib/db';

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === 'PUT') {
    const { name, task, date } = req.body;
    try {
      await query('UPDATE caregiver_tasks SET name = $1, task = $2, date = $3 WHERE id = $4', [name, task, date, id]);
      res.status(200).json({ message: 'Caregiver task updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update caregiver task' });
    }
  }
}
