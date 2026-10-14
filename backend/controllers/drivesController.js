const pool = require('../config/db');

exports.getAllDrives = async (_req, res, next) => {
  try {
    const [rows] = await pool.query('SELECT * FROM drives ORDER BY created_at DESC');
    res.json(rows);
  } catch (err) { next(err); }
};

exports.createDrive = async (req, res, next) => {
  try {
    const { company, role, package: pkg, status, interview_date, notes } = req.body;
    if (!company || !role) return res.status(400).json({ error: 'company and role are required' });
    const [result] = await pool.query(
      'INSERT INTO drives (company, role, package, status, interview_date, notes) VALUES (?, ?, ?, ?, ?, ?)',
      [company, role, pkg || null, status || 'Wishlist', interview_date || null, notes || null]
    );
    const [rows] = await pool.query('SELECT * FROM drives WHERE id = ?', [result.insertId]);
    res.status(201).json(rows[0]);
  } catch (err) { next(err); }
};

exports.updateDrive = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { company, role, package: pkg, status, interview_date, notes } = req.body;
    const [result] = await pool.query(
      'UPDATE drives SET company=?, role=?, package=?, status=?, interview_date=?, notes=? WHERE id=?',
      [company, role, pkg || null, status, interview_date || null, notes || null, id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Drive not found' });
    const [rows] = await pool.query('SELECT * FROM drives WHERE id = ?', [id]);
    res.json(rows[0]);
  } catch (err) { next(err); }
};

exports.deleteDrive = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query('DELETE FROM drives WHERE id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: 'Drive not found' });
    res.json({ message: 'Drive deleted successfully' });
  } catch (err) { next(err); }
};
