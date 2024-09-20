import { query } from '../../../../lib/db';

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === 'DELETE') {
    try {
      await query('DELETE FROM appointments WHERE id = $1', [id]);
      res.status(200).json({ message: 'Appointment deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete appointment' });
    }
  }
}