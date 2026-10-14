import React, { useState } from 'react';
import StudentProfileModal from './StudentProfileModal';

export default function TopHeader({ onGoToLanding }) {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <>
      <header className="top-header-bar">
        {/* TOP LEFT: Project Logo */}
        <div className="top-left-logo" onClick={onGoToLanding} title="Click to go to Main Landing & Drive Alerts page">
          <div className="logo-icon-container">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="url(#logo-grad)" stroke="#58a6ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="#58a6ff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="#7c3aed" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="logo-grad" x1="2" y1="2" x2="22" y2="12" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#58a6ff" stopOpacity="0.4"/>
                  <stop offset="1" stopColor="#7c3aed" stopOpacity="0.4"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="logo-text">
            <span className="logo-title">CAMPUS PREP PORTAL</span>
            <span className="logo-subtitle">CAREER & DRIVE TRACKER</span>
          </div>
        </div>

        {/* TOP CENTER: Live Season Status & Landing Link */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {onGoToLanding && (
            <button className="btn-secondary btn-sm" onClick={onGoToLanding} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>🔔</span>
              <span>Live Drive Alerts</span>
            </button>
          )}
          <div className="top-center-banner">
            <span className="live-dot"></span>
            <span>Placement Season 2026 Active • Phase 1 Drives</span>
          </div>
        </div>

        {/* TOP RIGHT: Student Profile */}
        <div className="top-right-profile" onClick={() => setProfileOpen(true)} title="Click to view/edit student profile">
          <div className="student-avatar">
            <span>CS</span>
            <span className="status-indicator"></span>
          </div>
          <div className="student-info">
            <div className="student-name-row">
              <span className="student-name">Chirag Sharma</span>
              <span className="student-badge">CSE '26</span>
            </div>
            <span className="student-target">🎯 SDE-1 • 8.85 CGPA</span>
          </div>
          <span className="dropdown-arrow">▾</span>
        </div>
      </header>

      <StudentProfileModal isOpen={profileOpen} onClose={() => setProfileOpen(false)} />
    </>
  );
}
