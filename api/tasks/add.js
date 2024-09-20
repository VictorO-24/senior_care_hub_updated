import { query } from '../../../lib/db';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { name, dueDate } = req.body;
    try {
      await query('INSERT INTO tasks (name, due_date) VALUES ($1, $2)', [name, dueDate]);
      res.status(200).json({ message: 'Task added successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to add task' });
    }
  }
}
