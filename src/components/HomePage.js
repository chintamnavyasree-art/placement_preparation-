import React, { useEffect, useState } from 'react';
import PlacementHero from './PlacementHero';
import { getDrives, getTopics, getCoding, getNotes } from '../api/api';

export default function HomePage({ onNavigate }) {
  const [stats, setStats] = useState({
    drivesCount: 0,
    interviewsCount: 0,
    topicsCount: 0,
    masteredTopics: 0,
    totalProblems: 0,
    notesCount: 0,
    upcomingDrives: []
  });

  const [dailyTasks, setDailyTasks] = useState([
    { id: 1, text: 'Solve 2 Medium problems on LeetCode (Trees / Graphs)', done: true },
    { id: 2, text: 'Revise DBMS Normalization & Indexing (B+ Trees)', done: true },
    { id: 3, text: 'Review Operating Systems: Paging vs Virtual Memory', done: false },
    { id: 4, text: 'Practice 1 Mock System Design / STAR behavioral story', done: false }
  ]);

  useEffect(() => {
    async function loadOverview() {
      try {
        const [drivesRes, topicsRes, codingRes, notesRes] = await Promise.allSettled([
          getDrives(),
          getTopics(),
          getCoding(),
          getNotes()
        ]);

        const drives = drivesRes.status === 'fulfilled' ? drivesRes.value.data : [];
        const topics = topicsRes.status === 'fulfilled' ? topicsRes.value.data : [];
        const coding = codingRes.status === 'fulfilled' ? codingRes.value.data : [];
        const notes = notesRes.status === 'fulfilled' ? notesRes.value.data : [];

        const interviews = drives.filter(d => d.status === 'Interview' || d.status === 'Selected').length;
        const mastered = topics.filter(t => t.status === 'Mastered').length;
        const totalCode = coding.reduce((acc, c) => acc + (c.count || 0), 0);
        const upcoming = drives.filter(d => d.interview_date).slice(0, 3);

        setStats({
          drivesCount: drives.length,
          interviewsCount: interviews,
          topicsCount: topics.length,
          masteredTopics: mastered,
          totalProblems: totalCode,
          notesCount: notes.length,
          upcomingDrives: upcoming
        });
      } catch (err) {
        console.error('Failed to load dashboard summary', err);
      }
    }
    loadOverview();
  }, []);

  const toggleTask = id => {
    setDailyTasks(tasks =>
      tasks.map(t => (t.id === id ? { ...t, done: !t.done } : t))
    );
  };

  const completedTasks = dailyTasks.filter(t => t.done).length;
  const syllabusPct = stats.topicsCount > 0 ? Math.round((stats.masteredTopics / stats.topicsCount) * 100) : 65;

  return (
    <div className="home-dashboard">
      {/* ── WELCOME BANNER ── */}
      <div className="home-welcome-header">
        <div>
          <h2>Welcome back, Chirag! 👋</h2>
          <p>Here is your placement preparation command center for the 2026 hiring season.</p>
        </div>
        <div className="readiness-pill">
          <span className="readiness-label">Placement Readiness</span>
          <span className="readiness-value">{syllabusPct}% Ready</span>
        </div>
      </div>

      {/* ── PLACEMENT HERO PICTURE & BANNER ── */}
      <PlacementHero onAddDrive={() => onNavigate('drives')} />

      {/* ── HIGH-LEVEL SNAPSHOT CARDS ── */}
      <div className="snapshot-grid">
        <div className="snapshot-card" onClick={() => onNavigate('drives')}>
          <div className="snapshot-icon" style={{ background: 'rgba(88,166,255,0.15)', color: 'var(--accent)' }}>🏢</div>
          <div className="snapshot-info">
            <span className="snapshot-num">{stats.drivesCount || 4}</span>
            <span className="snapshot-title">Tracked Drives</span>
            <span className="snapshot-sub">{stats.interviewsCount || 1} Interview Scheduled</span>
          </div>
        </div>

        <div className="snapshot-card" onClick={() => onNavigate('syllabus')}>
          <div className="snapshot-icon" style={{ background: 'rgba(63,185,80,0.15)', color: 'var(--green)' }}>📚</div>
          <div className="snapshot-info">
            <span className="snapshot-num">{stats.masteredTopics || 11}/{stats.topicsCount || 17}</span>
            <span className="snapshot-title">Topics Mastered</span>
            <span className="snapshot-sub">{syllabusPct}% Core CS Complete</span>
          </div>
        </div>

        <div className="snapshot-card" onClick={() => onNavigate('coding')}>
          <div className="snapshot-icon" style={{ background: 'rgba(210,153,34,0.15)', color: 'var(--yellow)' }}>💻</div>
          <div className="snapshot-info">
            <span className="snapshot-num">{stats.totalProblems || 411}</span>
            <span className="snapshot-title">Problems Solved</span>
            <span className="snapshot-sub">LeetCode & GFG Tallies</span>
          </div>
        </div>

        <div className="snapshot-card" onClick={() => onNavigate('notes')}>
          <div className="snapshot-icon" style={{ background: 'rgba(124,58,237,0.15)', color: '#a78bfa' }}>📝</div>
          <div className="snapshot-info">
            <span className="snapshot-num">{stats.notesCount || 3}</span>
            <span className="snapshot-title">Revision Notes</span>
            <span className="snapshot-sub">Company & Topic Archives</span>
          </div>
        </div>
      </div>

      {/* ── TWO-COLUMN DASHBOARD SECTION: UPCOMING & DAILY SPRINT ── */}
      <div className="home-dual-grid">
        {/* Left Column: Upcoming Interview Dates */}
        <div className="card">
          <div className="toolbar" style={{ marginBottom: '12px' }}>
            <span style={{ fontWeight: 700, fontSize: '15px' }}>📅 Upcoming Interviews & Deadlines</span>
            <button className="btn-secondary btn-sm" onClick={() => onNavigate('drives')}>Manage →</button>
          </div>
          
          <div className="timeline-list">
            <div className="timeline-item">
              <div className="timeline-badge" style={{ background: 'rgba(124,58,237,0.2)', color: '#a78bfa' }}>Oct 28</div>
              <div className="timeline-content">
                <strong>Microsoft — SDE-1</strong>
                <p>Round 1 Technical & System Design (Virtual Teams Interview)</p>
              </div>
              <span className="badge badge-interview">Interview</span>
            </div>

            <div className="timeline-item">
              <div className="timeline-badge" style={{ background: 'rgba(88,166,255,0.2)', color: 'var(--accent)' }}>Nov 20</div>
              <div className="timeline-content">
                <strong>Google — Software Engineer</strong>
                <p>Online Coding Assessment Window opens (90 mins, 2 problems)</p>
              </div>
              <span className="badge badge-applied">Applied</span>
            </div>

            <div className="timeline-item">
              <div className="timeline-badge" style={{ background: 'rgba(210,153,34,0.2)', color: 'var(--yellow)' }}>Nov 25</div>
              <div className="timeline-content">
                <strong>Amazon — SDE-1</strong>
                <p>OA Part 2 Behavioral & Work Style Simulation result review</p>
              </div>
              <span className="badge badge-oa">OA Completed</span>
            </div>
          </div>
        </div>

        {/* Right Column: Daily Placement Sprint Tasks */}
        <div className="card">
          <div className="toolbar" style={{ marginBottom: '12px' }}>
            <div>
              <span style={{ fontWeight: 700, fontSize: '15px' }}>⚡ Today's Placement Sprint</span>
              <p style={{ fontSize: '12px', color: 'var(--text2)', margin: '2px 0 0' }}>
                {completedTasks}/{dailyTasks.length} tasks completed today
              </p>
            </div>
            <span className="badge badge-selected">{completedTasks === dailyTasks.length ? 'All Done! 🎉' : 'In Progress'}</span>
          </div>

          <div className="tasks-list">
            {dailyTasks.map(task => (
              <div
                key={task.id}
                className={`task-row ${task.done ? 'task-done' : ''}`}
                onClick={() => toggleTask(task.id)}
              >
                <input
                  type="checkbox"
                  checked={task.done}
                  onChange={() => toggleTask(task.id)}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <span className="task-text">{task.text}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '16px', display: 'flex', gap: '8px' }}>
            <button className="btn-secondary btn-sm" style={{ flex: 1 }} onClick={() => onNavigate('coding')}>
              💻 Open LeetCode Tracker
            </button>
            <button className="btn-secondary btn-sm" style={{ flex: 1 }} onClick={() => onNavigate('syllabus')}>
              📚 Revise Syllabus
            </button>
          </div>
        </div>
      </div>

      {/* ── QUICK MODULE ACCESS BAR ── */}
      <div className="card quick-access-card">
        <h3 style={{ fontSize: '16px', marginBottom: '14px' }}>🚀 Quick Navigation</h3>
        <div className="quick-access-grid">
          <button className="quick-btn" onClick={() => onNavigate('drives')}>
            <span className="quick-icon">🏢</span>
            <strong>Placement Drives</strong>
            <span>Add or manage target companies</span>
          </button>
          <button className="quick-btn" onClick={() => onNavigate('syllabus')}>
            <span className="quick-icon">📚</span>
            <strong>Syllabus Checklist</strong>
            <span>Check off DSA, DBMS, OS & CN</span>
          </button>
          <button className="quick-btn" onClick={() => onNavigate('coding')}>
            <span className="quick-icon">💻</span>
            <strong>Coding Progress</strong>
            <span>Update LeetCode / GFG tallies</span>
          </button>
          <button className="quick-btn" onClick={() => onNavigate('notes')}>
            <span className="quick-icon">📝</span>
            <strong>Interview Notes</strong>
            <span>Review revision cheatsheets</span>
          </button>
        </div>
      </div>
    </div>
  );
}
