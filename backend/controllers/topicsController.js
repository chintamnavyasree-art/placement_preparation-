const pool = require('../config/db');

exports.getAllTopics = async (_req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM prep_topics ORDER BY subject, id');
    res.json(rows);
  } catch (err) { next(err); }
};

exports.createTopic = async (req, res, next) => {
  try {
    const { subject, topic, status } = req.body;
    if (!subject || !topic) return res.status(400).json({ error: 'subject and topic are required' });
    const [result] = await pool.query(
      'INSERT INTO prep_topics (subject, topic, status) VALUES (?, ?, ?)',
      [subject, topic, status || 'Not Started']
    );
    const [rows] = await pool.query('SELECT * FROM prep_topics WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) { next(err); }
};

exports.updateTopic = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { subject, topic, status } = req.body;
    const [result] = await pool.query(
      'UPDATE prep_topics SET subject=?, topic=?, status=? WHERE id=?',
      [subject, topic, status, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Topic not found' });
    const [rows] = await pool.query('SELECT * FROM prep_topics WHERE id = ?', [id]);
    res.json(rows[0]);
  } catch (err) { next(err); }
};

exports.deleteTopic = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM prep_topics WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Topic not found' });
    res.json({ message: 'Topic deleted successfully' });
  } catch (err) { next(err); }
};
