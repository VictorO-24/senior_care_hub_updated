// pages/api/medications/add.js
import { query } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, dosage, frequency } = req.body;
    try {
      await query(
        'INSERT INTO medications (name, dosage, frequency) VALUES ($1, $2, $3)',
        [name, dosage, frequency]
      );
      res.status(200).json({ message: 'Medication added successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add medication' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
