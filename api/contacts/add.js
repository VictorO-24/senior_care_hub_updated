import { query } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, phone, email } = req.body;
    try {
      await query('INSERT INTO emergency_contacts (name, phone, email) VALUES ($1, $2, $3)', [name, phone, email]);
      res.status(200).json({ message: 'Contact added successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add contact' });
    }
  }
}
