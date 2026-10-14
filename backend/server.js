require('dotenv').config();
const express = require('express');
const cors = require('cors');

const drivesRouter = require('./routes/drives');
const topicsRouter = require('./routes/topics');
const codingRouter = require('./routes/coding');
const notesRouter  = require('./routes/notes');

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──────────────────────────────────────────────
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

// ── Routes ──────────────────────────────────────────────────
app.use('/api/drives',  drivesRouter);
app.use('/api/topics',  topicsRouter);
app.use('/api/coding',  codingRouter);
app.use('/api/notes',   notesRouter);

// ── Health check ────────────────────────────────────────────
app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

// ── Global error handler ────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal server error', details: err.message });
});

app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
