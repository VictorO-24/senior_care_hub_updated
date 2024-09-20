// pages/api/medications/delete/[id].js
import { query } from '../../../../lib/db';

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === 'DELETE') {
    try {
      await query('DELETE FROM medications WHERE id = $1', [id]);
      res.status(200).json({ message: 'Medication deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete medication' });
    }
  } else {
    res.setHeader('Allow', ['DELETE']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
