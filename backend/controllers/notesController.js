const pool = require('../config/db');

exports.getAllNotes = async (req, res, next) => {
  try {
    const { category } = req.query;
    let query = 'SELECT * FROM interview_notes';
    const params = [];
    if (category) { query += ' WHERE category = ?'; params.push(category); }
    query += ' ORDER BY created_at DESC';
    const [rows] = await pool.query(query, params);
    res.json(rows);
  } catch (err) { next(err); }
};

exports.createNote = async (req, res, next) => {
  try {
    const { title, content, category } = req.body;
    if (!title || !content) return res.status(400).json({ error: 'title and content are required' });
    const [result] = await pool.query(
      'INSERT INTO interview_notes (title, content, category) VALUES (?, ?, ?)',
      [title, content, category || 'General']
    );
    const [rows] = await pool.query('SELECT * FROM interview_notes WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) { next(err); }
};

exports.deleteNote = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM interview_notes WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Note not found' });
    res.json({ message: 'Note deleted successfully' });
  } catch (err) { next(err); }
};
