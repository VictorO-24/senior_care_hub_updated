// pages/api/medications/update/[id].js
import { query } from '../../../../lib/db';

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === 'PUT') {
    const { name, dosage, frequency } = req.body;
    try {
      await query(
        'UPDATE medications SET name = $1, dosage = $2, frequency = $3 WHERE id = $4',
        [name, dosage, frequency, id]
      );
      res.status(200).json({ message: 'Medication updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update medication' });
    }
  } else {
    res.setHeader('Allow', ['PUT']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
