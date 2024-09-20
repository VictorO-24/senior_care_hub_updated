import { query } from '../../../../lib/db';

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === 'DELETE') {
    try {
      await query('DELETE FROM caregiver_tasks WHERE id = $1', [id]);
      res.status(200).json({ message: 'Caregiver task deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete caregiver task' });
    }
  }
}
