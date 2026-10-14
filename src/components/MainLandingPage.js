import React, { useState } from 'react';
import StudentProfileModal from './StudentProfileModal';
import HelpModal from './HelpModal';

// Pleasant, calm and inspiring single blue theme picture (Corporate Career Heights)
const HERO_BLUE_IMAGE = 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80';

export default function MainLandingPage({ onEnterDashboard }) {
  const [profileOpen, setProfileOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <div className="landing-viewport-clean">
      {/* ── TOP HEADER: Logo (Top-Left) & Student Profile (Top-Right) ── */}
      <header className="clean-landing-header">
        {/* Top-Left: Project Logo */}
        <div className="top-left-logo" onClick={() => {}} title="Campus Placement Preparation Portal">
          <div className="logo-icon-container-bright">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="url(#logo-glow-bright)" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17L12 22L22 17" stroke="#38bdf8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 12L12 17L22 12" stroke="#a855f7" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              <defs>
                <linearGradient id="logo-glow-bright" x1="2" y1="2" x2="22" y2="12" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#38bdf8" stopOpacity="0.85"/>
                  <stop offset="1" stopColor="#a855f7" stopOpacity="0.85"/>
                </linearGradient>
              </defs>
            </svg>
          </div>
          <div className="logo-text">
            <span className="logo-title-bright">CAMPUS PREP PORTAL</span>
            <span className="logo-subtitle-bright">CAREER LAUNCHPAD 2026</span>
          </div>
        </div>

        {/* Top-Right: Student Profile */}
        <div className="top-right-profile-bright" onClick={() => setProfileOpen(true)} title="Click to view student profile">
          <div className="student-avatar-bright">
            <span>CS</span>
            <span className="status-indicator-bright"></span>
          </div>
          <div className="student-info">
            <div className="student-name-row">
              <span className="student-name-bright">Chirag Sharma</span>
              <span className="student-badge-bright">CSE '26</span>
            </div>
            <span className="student-target-bright">🎯 Target: SDE-1 • 8.85 CGPA</span>
          </div>
          <span className="dropdown-arrow-bright">▾</span>
        </div>
      </header>

      {/* ── CENTER STAGE: SINGLE PLEASANT & CALM INSPIRING BLUE PICTURE & PROJECT NAME ── */}
      <main className="clean-hero-center">
        <div className="bright-hero-card">
          {/* Visual Showcase: The Single Pleasant, Calm & Inspiring Blue Picture */}
          <div className="bright-image-wrapper">
            <img
              src={HERO_BLUE_IMAGE}
              alt="Calm, pleasant and inspiring blue theme - corporate campus placement heights"
              className="bright-feature-image"
            />
            <div className="bright-image-overlay">
              <div className="bright-tag-badge">
                <span className="bright-dot"></span>
                <span>CAMPUS PLACEMENT & CAREER ACCELERATOR</span>
              </div>
              <div className="single-picture-caption">
                <span className="caption-heading">Reach Your Dream Career Heights</span>
                <span className="caption-subtext">Calm, structured preparation for Tier-1 product companies & 20+ LPA CTC sprints</span>
              </div>
            </div>
          </div>

          {/* Project Name & Hero Callout */}
          <div className="bright-content-body">
            <div className="project-emblem-badge">
              <span style={{ fontSize: '18px' }}>🎯</span>
              <span>OFFICIAL STUDENT PORTAL</span>
            </div>

            <h1 className="project-name-heading">
              Personal Placement Preparation Portal
            </h1>

            <p className="project-tagline-text">
              Master Data Structures & Algorithms, benchmark coding problems across LeetCode & GeeksforGeeks, revise core CS fundamentals (DBMS, OS, Computer Networks), and manage on-campus & off-campus hiring drives with peace of mind.
            </p>

            {/* Quick Readiness Metrics */}
            <div className="bright-metrics-row">
              <div className="bright-metric-box">
                <span className="bright-metric-num">300+</span>
                <span className="bright-metric-lbl">Target Problems</span>
              </div>
              <div className="bright-metric-box">
                <span className="bright-metric-num">4 Core</span>
                <span className="bright-metric-lbl">CS Subjects Ready</span>
              </div>
              <div className="bright-metric-box">
                <span className="bright-metric-num">20+ LPA</span>
                <span className="bright-metric-lbl">Dream CTC Sprint</span>
              </div>
              <div className="bright-metric-box">
                <span className="bright-metric-num">100%</span>
                <span className="bright-metric-lbl">Placement Ready</span>
              </div>
            </div>

            {/* Enter Dashboard Actions */}
            <div className="bright-actions-row">
              <button className="enter-dashboard-btn" onClick={() => onEnterDashboard('home')}>
                <span>🚀 Enter Student Dashboard</span>
              </button>
              <button className="enter-drives-btn" onClick={() => onEnterDashboard('drives')}>
                <span>🏢 Placement Drives Tracker</span>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* ── BOTTOM BAR & GET HELP ? OPTION ── */}
      <footer className="clean-landing-footer">
        <div className="footer-status-text">
          <span>🎯 Campus Hiring Season Active • Phase-1 Drives Ongoing</span>
        </div>

        {/* Floating / Bottom Get Help ? Option */}
        <button
          className="get-help-bottom-btn"
          onClick={() => setHelpOpen(true)}
          title="Get Placement Guidance & FAQs"
        >
          <span className="get-help-question-mark">?</span>
          <span>Get Help ?</span>
        </button>
      </footer>

      {/* ── MODALS ── */}
      <StudentProfileModal isOpen={profileOpen} onClose={() => setProfileOpen(false)} />
      <HelpModal isOpen={helpOpen} onClose={() => setHelpOpen(false)} />
    </div>
  );
}
