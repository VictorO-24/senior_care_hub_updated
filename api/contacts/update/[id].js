import { query } from '../../../../lib/db';

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === 'PUT') {
    const { name, phone, email } = req.body;
    try {
      await query('UPDATE emergency_contacts SET name = $1, phone = $2, email = $3 WHERE id = $4', [name, phone, email, id]);
      res.status(200).json({ message: 'Contact updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update contact' });
    }
  }
}
