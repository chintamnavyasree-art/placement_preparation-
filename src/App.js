import React, { useState } from 'react';
import './App.css';
import MainLandingPage   from './components/MainLandingPage';
import HomePage          from './components/HomePage';
import PlacementTracker  from './components/PlacementTracker';
import JobAlerts         from './components/JobAlerts';
import SyllabusChecklist from './components/SyllabusChecklist';
import CodingProgress    from './components/CodingProgress';
import NotesHub          from './components/NotesHub';
import TopHeader         from './components/TopHeader';
import HelpModal         from './components/HelpModal';

const TABS = [
  { id: 'home',     label: 'Dashboard Home',   icon: '🏠' },
  { id: 'drives',   label: 'Drive Tracker',    icon: '🏢' },
  { id: 'alerts',   label: 'Job Alerts',       icon: '🔔' },
  { id: 'syllabus', label: 'Syllabus',          icon: '📚' },
  { id: 'coding',   label: 'Coding Progress',   icon: '💻' },
  { id: 'notes',    label: 'Notes Hub',         icon: '📝' },
];

export default function App() {
  // 'landing' is the initial main page when opening the website
  const [view, setView] = useState('landing');
  const [tab, setTab]   = useState('home');
  const [helpOpen, setHelpOpen] = useState(false);

  const handleEnterDashboard = (targetTab = 'home') => {
    setTab(targetTab);
    setView('dashboard');
  };

  // If in Landing Page mode, render the clean Main Interface Page
  if (view === 'landing') {
    return (
      <MainLandingPage
        onEnterDashboard={handleEnterDashboard}
      />
    );
  }

  // Otherwise, render the Internal Student Prep Dashboard
  return (
    <div className="app-container">
      {/* ── TOP HEADER BAR: Top Left Logo & Top Right Student Profile ── */}
      <TopHeader onGoToLanding={() => setView('landing')} />

      <div className="app-layout">
        {/* ── SIDEBAR NAVIGATION ── */}
        <aside className="sidebar">
          <div className="sidebar-section-title">PORTAL MODULES</div>
          <nav>
            {TABS.map(t => (
              <button
                key={t.id}
                className={`nav-btn ${tab === t.id ? 'active' : ''}`}
                onClick={() => setTab(t.id)}
              >
                <span className="nav-icon">{t.icon}</span>
                {t.label}
              </button>
            ))}
          </nav>

          {/* Quick link back to Main Landing Page */}
          <div style={{ padding: '0 10px', marginBottom: '8px' }}>
            <button
              className="btn-secondary"
              onClick={() => setView('landing')}
              style={{
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '12px',
                padding: '8px 10px',
                background: 'rgba(88,166,255,0.08)',
                borderColor: 'rgba(88,166,255,0.3)',
                color: 'var(--accent)'
              }}
            >
              <span>🏠</span>
              <span>Main Portal Page</span>
            </button>
          </div>

          <div className="sidebar-prep-card">
            <span className="prep-icon">🔥</span>
            <div className="prep-text">
              <strong>14-Day Streak</strong>
              <p>Placement Sprint Active</p>
            </div>
          </div>

          {/* Bottom Help option in sidebar */}
          <div className="sidebar-footer">
            <button className="help-link-btn" onClick={() => setHelpOpen(true)}>
              <span className="help-icon">❓</span>
              <div className="help-text-group">
                <span className="help-label">Get Help ?</span>
                <span className="help-sub">Roadmap & FAQs</span>
              </div>
            </button>
          </div>
        </aside>

        {/* ── MAIN CONTENT ── */}
        <main className="main-content">
          {tab === 'home'     && <HomePage onNavigate={setTab} />}
          {tab === 'drives'   && <PlacementTracker />}
          {tab === 'alerts'   && <JobAlerts onGoToDrives={() => setTab('drives')} />}
          {tab === 'syllabus' && <SyllabusChecklist />}
          {tab === 'coding'   && <CodingProgress />}
          {tab === 'notes'    && <NotesHub />}
        </main>
      </div>

      {/* ── FLOATING BOTTOM "GET HELP ?" BUTTON ── */}
      <button
        className="floating-help-btn"
        onClick={() => setHelpOpen(true)}
        title="Get Help & Placement Guidance"
      >
        <span className="help-badge-q">?</span>
        <span>Get Help</span>
      </button>

      {/* ── HELP MODAL ── */}
      <HelpModal isOpen={helpOpen} onClose={() => setHelpOpen(false)} />
    </div>
  );
}