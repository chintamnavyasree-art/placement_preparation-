import React, { useEffect, useState, useMemo } from 'react';
import { getTopics, createTopic, updateTopic, deleteTopic, DEFAULT_TOPICS } from '../api/api';

const STATUSES = ['Not Started', 'In Progress', 'Mastered'];

export const SUBJECT_METADATA = {
  'Quantitative Aptitude': {
    icon: '🧮',
    color: '#38bdf8',
    category: 'Aptitude & OA',
    desc: 'Numerical ability, arithmetic, probability & data interpretation for online assessments'
  },
  'Logical Reasoning': {
    icon: '🧩',
    color: '#a855f7',
    category: 'Aptitude & OA',
    desc: 'Deductive logic, blood relations, seating arrangements, syllogisms & puzzles'
  },
  'Verbal Ability': {
    icon: '🗣️',
    color: '#ec4899',
    category: 'Aptitude & OA',
    desc: 'Reading comprehension, sentence correction, vocabulary & HR behavioral STAR framework'
  },
  'DSA': {
    icon: '🌳',
    color: '#10b981',
    category: 'Core Technical',
    desc: 'Data Structures, algorithmic paradigms (DP, Graphs, Trees, Heaps) & coding rounds'
  },
  'DBMS': {
    icon: '🗄️',
    color: '#f59e0b',
    category: 'Core CS',
    desc: 'Relational modeling, SQL queries, normalization, ACID transactions & B+ trees'
  },
  'OS': {
    icon: '⚙️',
    color: '#6366f1',
    category: 'Core CS',
    desc: 'Processes, threads, CPU scheduling, deadlocks, paging & virtual memory'
  },
  'CN': {
    icon: '🌐',
    color: '#06b6d4',
    category: 'Core CS',
    desc: 'OSI/TCP-IP models, IP addressing, TCP/UDP, DNS, HTTP/HTTPS & routing'
  },
  'OOPs': {
    icon: '📦',
    color: '#8b5cf6',
    category: 'Core CS',
    desc: '4 Pillars of OOP, polymorphism, virtual functions, SOLID principles & design patterns'
  },
  'System Design': {
    icon: '🏗️',
    color: '#f43f5e',
    category: 'Advanced Technical',
    desc: 'High-Level & Low-Level Design, scaling, caching, message queues & CAP theorem'
  },
  'Web Development': {
    icon: '💻',
    color: '#0ea5e9',
    category: 'Full-Stack',
    desc: 'HTML/CSS layouts, JavaScript ES6+, React.js hooks, REST APIs & JWT auth'
  }
};

const ALL_SUBJECTS = Object.keys(SUBJECT_METADATA);

const statusCls = s => ({
  'Not Started': 'status-not',
  'In Progress': 'status-prog',
  'Mastered': 'status-done'
})[s] || 'status-not';

const nextStatus = s => STATUSES[(STATUSES.indexOf(s) + 1) % STATUSES.length];

const EMPTY_FORM = { subject: 'Quantitative Aptitude', topic: '', status: 'Not Started' };

export default function SyllabusChecklist() {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState({});
  const [form, setForm] = useState(EMPTY_FORM);
  const [adding, setAdding] = useState(false);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  const load = async () => {
    try {
      setLoading(true);
      const { data } = await getTopics();
      const validList = Array.isArray(data) && data.length > 0 ? data : (DEFAULT_TOPICS || []);
      setTopics(validList);
      // Auto-expand all subjects by default for convenience
      const initialExpanded = {};
      validList.forEach(t => {
        if (t && t.subject) initialExpanded[t.subject] = true;
      });
      setExpanded(initialExpanded);
    } catch {
      setError('Failed to load syllabus topics.');
      setTopics(DEFAULT_TOPICS || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const toggle = subj => setExpanded(e => ({
    ...e,
    [subj]: e[subj] === false ? true : false
  }));

  const toggleAll = expand => {
    const nextState = {};
    Object.keys(grouped).forEach(k => { nextState[k] = expand; });
    setExpanded(nextState);
  };

  const cycleStatus = async t => {
    const updated = nextStatus(t.status);
    try {
      await updateTopic(t.id, { subject: t.subject, topic: t.topic, status: updated });
      setTopics(prev => prev.map(item => item.id === t.id ? { ...item, status: updated } : item));
    } catch {
      setError('Update failed.');
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this topic from the syllabus checklist?')) return;
    try {
      await deleteTopic(id);
      setTopics(prev => prev.filter(t => t.id !== id));
    } catch {
      setError('Delete failed.');
    }
  };

  const handleAdd = async () => {
    if (!form.topic.trim()) return setError('Topic title is required.');
    setSaving(true);
    setError('');
    try {
      const { data: newTopic } = await createTopic(form);
      setTopics(prev => [...prev, newTopic]);
      setForm(EMPTY_FORM);
      setAdding(false);
      setExpanded(prev => ({ ...prev, [form.subject]: true }));
    } catch {
      setError('Failed to add topic.');
    } finally {
      setSaving(false);
    }
  };

  // Filter topics
  const filteredTopics = useMemo(() => {
    return topics.filter(t => {
      const matchSubject = selectedSubject === 'ALL' || t.subject === selectedSubject;
      const matchStatus = statusFilter === 'ALL' || t.status === statusFilter;
      const matchSearch = !search.trim() ||
        t.topic.toLowerCase().includes(search.toLowerCase()) ||
        t.subject.toLowerCase().includes(search.toLowerCase());
      return matchSubject && matchStatus && matchSearch;
    });
  }, [topics, selectedSubject, statusFilter, search]);

  // Group topics by subject in preferred order
  const grouped = useMemo(() => {
    const order = ALL_SUBJECTS;
    const map = {};
    order.forEach(s => { map[s] = []; });
    // Also handle custom/other subjects
    filteredTopics.forEach(t => {
      if (!map[t.subject]) map[t.subject] = [];
      map[t.subject].push(t);
    });
    // Remove empty groups if filtering
    Object.keys(map).forEach(key => {
      if (map[key].length === 0) delete map[key];
    });
    return map;
  }, [filteredTopics]);

  const totalTopics = topics.length;
  const masteredCount = topics.filter(t => t.status === 'Mastered').length;
  const inProgressCount = topics.filter(t => t.status === 'In Progress').length;
  const notStartedCount = topics.filter(t => t.status === 'Not Started').length;
  const overallPct = totalTopics > 0 ? Math.round((masteredCount / totalTopics) * 100) : 0;

  return (
    <div className="syllabus-container">
      {/* ── HEADER ── */}
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '16px' }}>
          <div>
            <h2>📚 Comprehensive Placement Syllabus</h2>
            <p>
              Master Quantitative Aptitude, Logical Reasoning, Verbal Ability, Core CS & Advanced Technical subjects.
            </p>
          </div>
          <div className="syllabus-overall-badge">
            <span className="syllabus-overall-pct">{overallPct}%</span>
            <span className="syllabus-overall-lbl">Mastery Level</span>
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className="syllabus-progress-container" title={`${masteredCount} of ${totalTopics} mastered`}>
          <div
            className="syllabus-progress-bar-fill"
            style={{ width: `${overallPct}%` }}
          />
        </div>
        <div className="syllabus-progress-legend">
          <span>✅ <strong>{masteredCount}</strong> Mastered</span>
          <span>⏳ <strong>{inProgressCount}</strong> In Progress</span>
          <span>💤 <strong>{notStartedCount}</strong> Not Started</span>
          <span>📖 <strong>{totalTopics}</strong> Total Topics</span>
        </div>
      </div>

      {error && <div className="error-msg">{error}</div>}

      {/* ── SUBJECT FILTER BAR (SCROLLABLE PILLS) ── */}
      <div className="subject-filter-scroll">
        <button
          className={`subject-pill-btn ${selectedSubject === 'ALL' ? 'active' : ''}`}
          onClick={() => setSelectedSubject('ALL')}
        >
          <span>🎯 All Subjects</span>
          <span className="pill-count">({totalTopics})</span>
        </button>

        {ALL_SUBJECTS.map(subj => {
          const meta = SUBJECT_METADATA[subj] || { icon: '📘', color: '#58a6ff' };
          const count = topics.filter(t => t.subject === subj).length;
          const masteredSubj = topics.filter(t => t.subject === subj && t.status === 'Mastered').length;
          return (
            <button
              key={subj}
              className={`subject-pill-btn ${selectedSubject === subj ? 'active' : ''}`}
              onClick={() => setSelectedSubject(subj)}
              style={selectedSubject === subj ? { borderColor: meta.color, background: `${meta.color}22` } : {}}
            >
              <span>{meta.icon} {subj}</span>
              <span className="pill-count" style={{ color: meta.color }}>
                {masteredSubj}/{count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── TOOLBAR: Search, Status Filter, Expand/Collapse, Add Topic ── */}
      <div className="card" style={{ padding: '16px 20px', marginBottom: '16px' }}>
        <div className="syllabus-toolbar-row">
          {/* Search Box */}
          <div className="syllabus-search-box">
            <span style={{ fontSize: '15px' }}>🔍</span>
            <input
              type="text"
              placeholder="Search any topic, algorithm, or concept (e.g. Trees, SQL, Permutation, ACID)..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="syllabus-search-input"
            />
            {search && (
              <button className="clear-search-btn" onClick={() => setSearch('')}>✕</button>
            )}
          </div>

          {/* Controls: Status filter & Actions */}
          <div className="syllabus-controls-right">
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="syllabus-status-select"
            >
              <option value="ALL">All Statuses</option>
              <option value="Mastered">Mastered Only</option>
              <option value="In Progress">In Progress Only</option>
              <option value="Not Started">Not Started Only</option>
            </select>

            <button className="btn-secondary btn-sm" onClick={() => toggleAll(true)} title="Expand all subject folders">
              📂 Expand All
            </button>
            <button className="btn-secondary btn-sm" onClick={() => toggleAll(false)} title="Collapse all subject folders">
              📁 Collapse All
            </button>
            <button className="btn-primary" onClick={() => setAdding(!adding)}>
              + Add Topic
            </button>
          </div>
        </div>

        {/* Add Topic Inline Drawer */}
        {adding && (
          <div className="add-topic-drawer">
            <h4 style={{ marginBottom: '12px', fontSize: '14px', color: 'var(--accent)' }}>
              ➕ Add New Syllabus Topic
            </h4>
            <div className="form-grid">
              <div className="form-group">
                <label>Target Subject Category</label>
                <select
                  value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                >
                  {ALL_SUBJECTS.map(s => (
                    <option key={s} value={s}>
                      {SUBJECT_METADATA[s]?.icon} {s} ({SUBJECT_METADATA[s]?.category})
                    </option>
                  ))}
                  <option value="Other">📘 Other / Custom</option>
                </select>
              </div>
              <div className="form-group">
                <label>Topic / Concept Title *</label>
                <input
                  value={form.topic}
                  onChange={e => setForm({ ...form, topic: e.target.value })}
                  placeholder="e.g. Bellman-Ford Algorithm, SQL Window Functions..."
                />
              </div>
              <div className="form-group">
                <label>Initial Status</label>
                <select
                  value={form.status}
                  onChange={e => setForm({ ...form, status: e.target.value })}
                >
                  {STATUSES.map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '8px', marginTop: '14px', justifyContent: 'flex-end' }}>
              <button className="btn-secondary" onClick={() => setAdding(false)}>Cancel</button>
              <button className="btn-primary" onClick={handleAdd} disabled={saving}>
                {saving ? 'Adding...' : 'Save Topic'}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ── TOPICS ACCORDION GROUPS ── */}
      {loading ? (
        <div className="loading">Loading syllabus checklist...</div>
      ) : Object.keys(grouped).length === 0 ? (
        <div className="card">
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <p style={{ fontWeight: 600, fontSize: '16px' }}>No matching topics found</p>
            <p style={{ fontSize: '13px', marginTop: '4px' }}>
              Try adjusting your search query or subject/status filters.
            </p>
            <button
              className="btn-secondary btn-sm"
              style={{ marginTop: '14px' }}
              onClick={() => { setSearch(''); setSelectedSubject('ALL'); setStatusFilter('ALL'); }}
            >
              Reset Filters
            </button>
          </div>
        </div>
      ) : (
        <div className="syllabus-groups-wrapper">
          {Object.entries(grouped).map(([subj, ts]) => {
            const meta = SUBJECT_METADATA[subj] || { icon: '📘', color: '#38bdf8', category: 'General', desc: '' };
            const done = ts.filter(t => t.status === 'Mastered').length;
            const inProg = ts.filter(t => t.status === 'In Progress').length;
            const pct = ts.length > 0 ? Math.round((done / ts.length) * 100) : 0;
            const isExpanded = expanded[subj] !== false;

            return (
              <div key={subj} className="subject-group-card">
                {/* Subject Header */}
                <div
                  className={`subject-header-v2 ${isExpanded ? 'open' : ''}`}
                  onClick={() => toggle(subj)}
                >
                  <div className="subject-header-left">
                    <span className="subject-icon-avatar" style={{ background: `${meta.color}25`, color: meta.color, borderColor: `${meta.color}50` }}>
                      {meta.icon}
                    </span>
                    <div>
                      <div className="subject-title-row">
                        <h3>{subj}</h3>
                        <span className="subject-category-tag" style={{ color: meta.color, borderColor: `${meta.color}40`, background: `${meta.color}15` }}>
                          {meta.category}
                        </span>
                      </div>
                      <p className="subject-desc-subtext">{meta.desc}</p>
                    </div>
                  </div>

                  <div className="subject-header-right">
                    <div className="subject-mini-meter">
                      <div className="meter-labels">
                        <span><strong>{done}</strong>/{ts.length} Mastered{inProg > 0 ? ` (${inProg} in progress)` : ''}</span>
                        <span style={{ color: pct === 100 ? 'var(--green)' : 'var(--text2)' }}>{pct}%</span>
                      </div>
                      <div className="meter-bar-track">
                        <div
                          className="meter-bar-fill"
                          style={{ width: `${pct}%`, background: pct === 100 ? 'var(--green)' : meta.color }}
                        />
                      </div>
                    </div>
                    <span className="accordion-arrow">{isExpanded ? '▲' : '▼'}</span>
                  </div>
                </div>

                {/* Topics List Table */}
                {isExpanded && (
                  <div className="topics-list-v2">
                    {ts.map((t, idx) => (
                      <div key={t.id} className="topic-row-v2">
                        <div className="topic-name-col">
                          <span className="topic-num-badge">#{idx + 1}</span>
                          <span className="topic-name-text">{t.topic}</span>
                        </div>

                        <div className="topic-actions-col">
                          <button
                            className={`topic-status-btn ${statusCls(t.status)}`}
                            onClick={() => cycleStatus(t)}
                            title="Click to cycle status (Not Started → In Progress → Mastered)"
                          >
                            <span className="status-cycle-indicator">●</span>
                            <span>{t.status}</span>
                          </button>
                          <button
                            className="btn-danger btn-sm"
                            onClick={() => handleDelete(t.id)}
                            title="Delete this topic"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
