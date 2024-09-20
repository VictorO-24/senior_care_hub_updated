import { query } from '../../../../lib/db';

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === 'PUT') {
    const { name, dueDate } = req.body;
    try {
      await query('UPDATE tasks SET name = $1, due_date = $2 WHERE id = $3', [name, dueDate, id]);
      res.status(200).json({ message: 'Task updated successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Failed to update task' });
    }
  }
}
