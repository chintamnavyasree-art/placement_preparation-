const pool = require('../config/db');

exports.getAllCoding = async (_req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM coding_progress ORDER BY platform, FIELD(difficulty,"Easy","Medium","Hard")');
    res.json(rows);
  } catch (err) { next(err); }
};

exports.createCoding = async (req, res, next) => {
  try {
    const { platform, difficulty, count } = req.body;
    if (!platform || !difficulty) return res.status(400).json({ error: 'platform and difficulty are required' });
    const [result] = await pool.query(
      'INSERT INTO coding_progress (platform, difficulty, count) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE count=VALUES(count)',
      [platform, difficulty, count || 0]
    );
    const [rows] = await pool.query('SELECT * FROM coding_progress WHERE platform=? AND difficulty=?', [platform, difficulty]);
    res.status(201).json(rows[0]);
  } catch (err) { next(err); }
};

exports.updateCoding = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { count } = req.body;
    if (count === undefined) return res.status(400).json({ error: 'count is required' });
    const [result] = await pool.query('UPDATE coding_progress SET count=? WHERE id=?', [count, id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Entry not found' });
    const [rows] = await pool.query('SELECT * FROM coding_progress WHERE id = ?', [id]);
    res.json(rows[0]);
  } catch (err) { next(err); }
};

exports.deleteCoding = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM coding_progress WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Entry not found' });
    res.json({ message: 'Entry deleted successfully' });
  } catch (err) { next(err); }
};
