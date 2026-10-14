import React from 'react';

export default function PlacementHero({ onAddDrive }) {
  return (
    <div className="placement-hero-card">
      <div className="hero-content">
        <div className="hero-badge">
          <span className="hero-badge-dot"></span>
          <span>CAMPUS PLACEMENT PREPARATION SPRINT 2026</span>
        </div>
        <h1 className="hero-title">
          Build Your Foundation, Master DSA & <span className="highlight-text">Land Your Dream Tech Offer</span>
        </h1>
        <p className="hero-subtitle">
          Track high-tier product & service company drives, benchmark your DSA problem counts across LeetCode & GFG, and revise core CS fundamentals in one unified dashboard.
        </p>

        <div className="hero-metrics">
          <div className="hero-metric-item">
            <span className="metric-val">300+</span>
            <span className="metric-label">Target Problems</span>
          </div>
          <div className="hero-metric-sep"></div>
          <div className="hero-metric-item">
            <span className="metric-val">4 Core CS</span>
            <span className="metric-label">DSA • DBMS • OS • CN</span>
          </div>
          <div className="hero-metric-sep"></div>
          <div className="hero-metric-item">
            <span className="metric-val">20+ LPA</span>
            <span className="metric-label">Target Tier-1 CTC</span>
          </div>
        </div>

        <div className="hero-actions">
          <button className="btn-primary hero-btn" onClick={onAddDrive}>
            <span>+ Track New Company Drive</span>
          </button>
          <a href="#drives-table" className="btn-secondary hero-btn-secondary">
            <span>View Ongoing Drives ↓</span>
          </a>
        </div>
      </div>

      <div className="hero-illustration">
        <svg viewBox="0 0 460 300" className="hero-svg" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="bg-glow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1f293d" stopOpacity="0.8"/>
              <stop offset="100%" stopColor="#161b22" stopOpacity="0.9"/>
            </linearGradient>
            <linearGradient id="screen-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0d1117"/>
              <stop offset="100%" stopColor="#161b22"/>
            </linearGradient>
            <linearGradient id="accent-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#58a6ff"/>
              <stop offset="100%" stopColor="#7c3aed"/>
            </linearGradient>
            <linearGradient id="gold-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f6e05e"/>
              <stop offset="100%" stopColor="#d69e2e"/>
            </linearGradient>
          </defs>

          {/* Background decorative glow circle */}
          <circle cx="230" cy="150" r="130" fill="url(#accent-grad)" opacity="0.12" filter="blur(30px)" />

          {/* Laptop Base & Body */}
          <rect x="70" y="70" width="280" height="170" rx="14" fill="#21262d" stroke="#30363d" strokeWidth="2" />
          <rect x="80" y="80" width="260" height="150" rx="8" fill="url(#screen-grad)" />

          {/* Window header dots */}
          <circle cx="96" cy="94" r="4" fill="#f85149" />
          <circle cx="108" cy="94" r="4" fill="#d29922" />
          <circle cx="120" cy="94" r="4" fill="#3fb950" />
          <line x1="80" y1="106" x2="340" y2="106" stroke="#30363d" strokeWidth="1" />

          {/* Code IDE editor lines */}
          <rect x="96" y="118" width="60" height="7" rx="3" fill="#58a6ff" opacity="0.8" />
          <rect x="162" y="118" width="80" height="7" rx="3" fill="#7c3aed" opacity="0.8" />
          
          <rect x="110" y="132" width="100" height="6" rx="3" fill="#8b949e" opacity="0.6" />
          <rect x="216" y="132" width="40" height="6" rx="3" fill="#3fb950" opacity="0.8" />
          
          <rect x="124" y="146" width="130" height="6" rx="3" fill="#58a6ff" opacity="0.7" />
          <rect x="124" y="160" width="85" height="6" rx="3" fill="#e6edf3" opacity="0.7" />
          <rect x="215" y="160" width="50" height="6" rx="3" fill="#d29922" opacity="0.8" />
          
          <rect x="110" y="174" width="70" height="6" rx="3" fill="#8b949e" opacity="0.6" />
          <rect x="96" y="188" width="45" height="6" rx="3" fill="#58a6ff" opacity="0.8" />

          {/* Laptop Stand / Keyboard Tray */}
          <path d="M40 240 L380 240 L360 252 L60 252 Z" fill="#30363d" />
          <rect x="180" y="244" width="60" height="4" rx="2" fill="#21262d" />

          {/* Floating Element 1: Offer Letter Badge */}
          <g transform="translate(280, 50)">
            <rect width="140" height="85" rx="10" fill="url(#bg-glow)" stroke="#3fb950" strokeWidth="1.5" />
            <circle cx="28" cy="28" r="14" fill="#3fb950" opacity="0.2" />
            <text x="28" y="34" fontSize="16" textAnchor="middle" fill="#3fb950">✓</text>
            <text x="50" y="26" fontSize="11" fontWeight="bold" fill="#ffffff">OFFER LETTER</text>
            <text x="50" y="40" fontSize="10" fill="#3fb950">Selected • SDE-1</text>
            <rect x="14" y="56" width="112" height="4" rx="2" fill="#30363d" />
            <rect x="14" y="66" width="70" height="4" rx="2" fill="#58a6ff" />
          </g>

          {/* Floating Element 2: DSA Mastered Pill */}
          <g transform="translate(30, 160)">
            <rect width="120" height="65" rx="10" fill="url(#bg-glow)" stroke="#58a6ff" strokeWidth="1.5" />
            <circle cx="24" cy="24" r="10" fill="#58a6ff" opacity="0.2" />
            <text x="24" y="29" fontSize="12" textAnchor="middle" fill="#58a6ff">💻</text>
            <text x="42" y="26" fontSize="11" fontWeight="bold" fill="#ffffff">LeetCode</text>
            <text x="42" y="40" fontSize="10" fill="#8b949e">250+ Solved</text>
            <rect x="14" y="48" width="92" height="4" rx="2" fill="#30363d" />
            <rect x="14" y="48" width="65" height="4" rx="2" fill="#3fb950" />
          </g>

          {/* Floating Element 3: Graduation & Career Rocket */}
          <g transform="translate(320, 165)">
            <rect width="115" height="70" rx="10" fill="url(#bg-glow)" stroke="#7c3aed" strokeWidth="1.5" />
            <circle cx="26" cy="26" r="12" fill="#7c3aed" opacity="0.2" />
            <text x="26" y="32" fontSize="14" textAnchor="middle">🚀</text>
            <text x="46" y="26" fontSize="11" fontWeight="bold" fill="#ffffff">Day-1 Drive</text>
            <text x="46" y="40" fontSize="10" fill="#a78bfa">Top Tier Tech</text>
            <rect x="14" y="52" width="88" height="5" rx="2.5" fill="url(#accent-grad)" />
          </g>

          {/* Floating Golden Trophy Star */}
          <g transform="translate(45, 60)">
            <circle cx="16" cy="16" r="16" fill="url(#gold-grad)" />
            <text x="16" y="21" fontSize="14" textAnchor="middle" fill="#000">★</text>
          </g>
        </svg>
      </div>
    </div>
  );
}
