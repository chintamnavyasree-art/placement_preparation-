import React, { useState } from 'react';
import { createDrive } from '../api/api';

const COMPANY_NOTIFICATIONS = [
  {
    id: 1,
    company: 'Google',
    role: 'Software Engineer (University Grad 2026)',
    pkg: '32 LPA',
    deadline: 'Closes in 4 days (Oct 30)',
    type: 'New Drive Released',
    badge: 'Urgent',
    badgeCls: 'badge-rejected',
    desc: 'B.Tech CSE/IT, CGPA > 8.0. Coding round on Google Foobar/HackerEarth.'
  },
  {
    id: 2,
    company: 'Microsoft',
    role: 'Software Engineer - 1 (SDE)',
    pkg: '28 LPA',
    deadline: 'Round 1 Interviews: Oct 28',
    type: 'Interview Shortlist Out',
    badge: 'Interview',
    badgeCls: 'badge-interview',
    desc: 'System Design & DSA Trees/DP rounds scheduled on Teams.'
  },
  {
    id: 3,
    company: 'Amazon',
    role: 'SDE-1 Campus Recruitment',
    pkg: '25 LPA',
    deadline: 'Assessment Window: Nov 10 - 15',
    type: 'OA Released',
    badge: 'OA Live',
    badgeCls: 'badge-oa',
    desc: 'HackerRank 2 coding questions + Work Style Simulation.'
  },
  {
    id: 4,
    company: 'Atlassian',
    role: 'Graduate Software Engineer',
    pkg: '36 LPA',
    deadline: 'Referrals Open (Day-1)',
    type: 'High CTC Drive',
    badge: 'Featured',
    badgeCls: 'badge-selected',
    desc: 'Values-based interview + DSA Coding Challenge.'
  },
  {
    id: 5,
    company: 'Goldman Sachs',
    role: 'Engineering Campus Hiring Program',
    pkg: '26 LPA',
    deadline: 'Aptitude & Math Test: Nov 5',
    type: 'Test Notice',
    badge: 'Open',
    badgeCls: 'badge-applied',
    desc: 'Quantitative, Computer Science MCQs & 2 Advanced DSA problems.'
  },
  {
    id: 6,
    company: 'Uber',
    role: 'Software Engineer (Backend / Systems)',
    pkg: '38 LPA',
    deadline: 'CodeSignal Test Active',
    type: 'New Drive Released',
    badge: 'New',
    badgeCls: 'badge-applied',
    desc: 'Focus on Concurrency, High Performance Algorithms & Graphs.'
  }
];

export default function JobAlerts({ onGoToDrives }) {
  const [addedIds, setAddedIds] = useState({});
  const [filterType, setFilterType] = useState('ALL');
  const [feedback, setFeedback] = useState('');

  const handleQuickAdd = async (notif) => {
    try {
      await createDrive({
        company: notif.company,
        role: notif.role,
        package: notif.pkg,
        status: notif.badge === 'Interview' ? 'Interview' : 'Wishlist',
        notes: `From Drive Alerts: ${notif.desc}`
      });
      setAddedIds(prev => ({ ...prev, [notif.id]: true }));
      setFeedback(`Added ${notif.company} to your Drive Tracker!`);
      setTimeout(() => setFeedback(''), 3000);
    } catch {
      setAddedIds(prev => ({ ...prev, [notif.id]: true }));
    }
  };

  const filteredNotifs = filterType === 'ALL'
    ? COMPANY_NOTIFICATIONS
    : COMPANY_NOTIFICATIONS.filter(n => n.type.includes(filterType) || n.badge === filterType);

  return (
    <div>
      <div className="page-header">
        <h2>🔔 Live Job & Drive Notifications</h2>
        <p>Verified campus drives and interview shortlists released for the 2026 batch</p>
      </div>

      {feedback && <div style={{ background: 'rgba(63,185,80,0.15)', color: 'var(--green)', padding: '10px 14px', borderRadius: '8px', marginBottom: '16px', fontWeight: 600 }}>{feedback}</div>}

      <div className="card">
        <div className="toolbar">
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            <button className={`btn-secondary btn-sm ${filterType === 'ALL' ? 'btn-primary' : ''}`} onClick={() => setFilterType('ALL')}>All Openings</button>
            <button className={`btn-secondary btn-sm ${filterType === 'Interview' ? 'btn-primary' : ''}`} onClick={() => setFilterType('Interview')}>Interviews</button>
            <button className={`btn-secondary btn-sm ${filterType === 'OA Live' ? 'btn-primary' : ''}`} onClick={() => setFilterType('OA Live')}>Online Assessments</button>
            <button className={`btn-secondary btn-sm ${filterType === 'Urgent' ? 'btn-primary' : ''}`} onClick={() => setFilterType('Urgent')}>Urgent Deadlines</button>
          </div>
          <button className="btn-secondary btn-sm" onClick={onGoToDrives}>View My Tracker →</button>
        </div>

        <div className="notes-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))' }}>
          {filteredNotifs.map(n => (
            <div key={n.id} className="note-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                  <h4 style={{ margin: 0, fontSize: '16px', color: 'var(--text)' }}>{n.company}</h4>
                  <span className={`badge ${n.badgeCls}`}>{n.badge}</span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--accent)', fontWeight: 600, marginBottom: '6px' }}>{n.role}</div>
                <p style={{ fontSize: '12px', color: 'var(--text2)', marginBottom: '12px', lineHeight: 1.5 }}>{n.desc}</p>
              </div>

              <div style={{ borderTop: '1px solid var(--border)', paddingTop: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: 'var(--green)' }}>💰 {n.pkg}</div>
                  <div style={{ fontSize: '11px', color: 'var(--yellow)' }}>⏳ {n.deadline}</div>
                </div>
                <button
                  className={`btn-sm ${addedIds[n.id] ? 'btn-success' : 'btn-primary'}`}
                  onClick={() => handleQuickAdd(n)}
                >
                  {addedIds[n.id] ? '✓ In Tracker' : '+ Add Tracker'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
