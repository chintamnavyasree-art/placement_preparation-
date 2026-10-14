import React, { useState } from 'react';

export default function HelpModal({ isOpen, onClose }) {
  const [activeTopic, setActiveTopic] = useState('getting-started');

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal help-modal" onClick={e => e.stopPropagation()} style={{ width: '700px', maxHeight: '85vh', display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontSize: '24px' }}>💡</span>
            <div>
              <h3 style={{ margin: 0 }}>Placement Preparation Help Center</h3>
              <p style={{ margin: 0, color: 'var(--text2)', fontSize: '12px' }}>Guidelines, Syllabi Roadmaps, FAQs, and portal assistance</p>
            </div>
          </div>
          <button className="btn-secondary btn-sm" onClick={onClose}>✕</button>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
          <button
            className={`btn-secondary btn-sm ${activeTopic === 'getting-started' ? 'btn-primary' : ''}`}
            onClick={() => setActiveTopic('getting-started')}
          >
            🚀 Portal Guide
          </button>
          <button
            className={`btn-secondary btn-sm ${activeTopic === 'aptitude-guide' ? 'btn-primary' : ''}`}
            onClick={() => setActiveTopic('aptitude-guide')}
          >
            🧮 Aptitude & Reasoning
          </button>
          <button
            className={`btn-secondary btn-sm ${activeTopic === 'dsa-roadmap' ? 'btn-primary' : ''}`}
            onClick={() => setActiveTopic('dsa-roadmap')}
          >
            💻 DSA Strategy
          </button>
          <button
            className={`btn-secondary btn-sm ${activeTopic === 'interview-tips' ? 'btn-primary' : ''}`}
            onClick={() => setActiveTopic('interview-tips')}
          >
            🎯 Interview Tips
          </button>
          <button
            className={`btn-secondary btn-sm ${activeTopic === 'faq' ? 'btn-primary' : ''}`}
            onClick={() => setActiveTopic('faq')}
          >
            ❓ FAQs
          </button>
        </div>

        <div style={{ flex: 1, overflowY: 'auto', paddingRight: '6px', fontSize: '13px', lineHeight: 1.6, color: 'var(--text)' }}>
          {activeTopic === 'getting-started' && (
            <div>
              <h4 style={{ color: 'var(--accent)', marginBottom: '8px' }}>How to maximize your preparation portal:</h4>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <li><strong>Drive Tracker:</strong> Add target companies, track round progression (Applied ➔ OA ➔ Interview ➔ Selected), and log interview notes.</li>
                <li><strong>Syllabus Checklist:</strong> Track all 10 subjects including Quantitative Aptitude, Logical Reasoning, Verbal, Core CS, System Design, and Web Dev. Click any topic to cycle status (<em>Not Started ➔ In Progress ➔ Mastered</em>).</li>
                <li><strong>Coding Progress:</strong> Update your problem tallies daily using the <code>+</code> / <code>−</code> controls for LeetCode and GFG across Easy, Medium, and Hard.</li>
                <li><strong>Notes Hub:</strong> Keep short revision notes for System Design, ACID properties, OS threading, and company-specific question archives.</li>
              </ul>
            </div>
          )}

          {activeTopic === 'aptitude-guide' && (
            <div>
              <h4 style={{ color: 'var(--accent)', marginBottom: '8px' }}>Aptitude & Reasoning Online Assessment (OA) Playbook:</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div style={{ padding: '10px', background: 'var(--bg)', borderRadius: '6px', border: '1px solid var(--border)' }}>
                  <strong style={{ color: '#38bdf8' }}>1. Quantitative Aptitude (Speed & Accuracy)</strong>
                  <p style={{ margin: '4px 0 0', color: 'var(--text2)', fontSize: '12px' }}>
                    Focus on Percentages, Profit & Loss, Ratios, Speed-Time-Distance, and Work-Time. Master standard shortcut formulas and Vedic math shortcuts for rapid 60-second problem solving.
                  </p>
                </div>
                <div style={{ padding: '10px', background: 'var(--bg)', borderRadius: '6px', border: '1px solid var(--border)' }}>
                  <strong style={{ color: '#a855f7' }}>2. Logical Reasoning (Diagrammatic Logic)</strong>
                  <p style={{ margin: '4px 0 0', color: 'var(--text2)', fontSize: '12px' }}>
                    Always draw family trees for Blood Relations (<code>+</code> for male, <code>−</code> for female, <code>=</code> for married). For Circular Seating, note if faces point toward or away from the center.
                  </p>
                </div>
                <div style={{ padding: '10px', background: 'var(--bg)', borderRadius: '6px', border: '1px solid var(--border)' }}>
                  <strong style={{ color: '#ec4899' }}>3. Verbal & Reading Comprehension</strong>
                  <p style={{ margin: '4px 0 0', color: 'var(--text2)', fontSize: '12px' }}>
                    Skim the questions first before diving into lengthy reading passages to identify targeted answers quickly. Review common subject-verb agreement and modifier error rules.
                  </p>
                </div>
              </div>
            </div>
          )}

          {activeTopic === 'dsa-roadmap' && (
            <div>
              <h4 style={{ color: 'var(--accent)', marginBottom: '8px' }}>Recommended Placement DSA Roadmap:</h4>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div style={{ padding: '10px', background: 'var(--bg)', borderRadius: '6px', border: '1px solid var(--border)' }}>
                  <strong style={{ color: 'var(--green)' }}>Phase 1: Foundations</strong>
                  <p style={{ margin: '4px 0 0', color: 'var(--text2)', fontSize: '12px' }}>Arrays, Two Pointers, Sliding Window, Strings, HashMaps, Linked Lists, Stacks & Queues.</p>
                </div>
                <div style={{ padding: '10px', background: 'var(--bg)', borderRadius: '6px', border: '1px solid var(--border)' }}>
                  <strong style={{ color: 'var(--yellow)' }}>Phase 2: Core Non-Linear</strong>
                  <p style={{ margin: '4px 0 0', color: 'var(--text2)', fontSize: '12px' }}>Binary Search, Recursion & Backtracking, Binary Trees, BST, Heaps & Priority Queues.</p>
                </div>
                <div style={{ padding: '10px', background: 'var(--bg)', borderRadius: '6px', border: '1px solid var(--border)' }}>
                  <strong style={{ color: 'var(--accent)' }}>Phase 3: Advanced Graphs & DP</strong>
                  <p style={{ margin: '4px 0 0', color: 'var(--text2)', fontSize: '12px' }}>BFS, DFS, Dijkstra, Topo Sort, 1D & 2D Dynamic Programming (Knapsack, LCS, LIS).</p>
                </div>
                <div style={{ padding: '10px', background: 'var(--bg)', borderRadius: '6px', border: '1px solid var(--border)' }}>
                  <strong style={{ color: 'var(--red)' }}>Phase 4: OA & Mock Drills</strong>
                  <p style={{ margin: '4px 0 0', color: 'var(--text2)', fontSize: '12px' }}>Timed mock contests, company tags on LeetCode/GFG, speed debugging.</p>
                </div>
              </div>
            </div>
          )}

          {activeTopic === 'interview-tips' && (
            <div>
              <h4 style={{ color: 'var(--accent)', marginBottom: '8px' }}>Technical & HR Interview Tips:</h4>
              <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                <li><strong>Think Out Loud:</strong> Never code in silence. State your brute force first, analyze time/space, then optimize.</li>
                <li><strong>Check Edge Cases:</strong> Empty array, null nodes, duplicates, integer overflow, extreme bounds.</li>
                <li><strong>Core CS Counts:</strong> Be prepared to explain transactions, indexing, paging vs segmentation, TCP 3-way handshake, and OOPs pillars.</li>
                <li><strong>STAR Technique for HR:</strong> Situation, Task, Action, Result for behavioral and situational questions.</li>
              </ul>
            </div>
          )}

          {activeTopic === 'faq' && (
            <div>
              <h4 style={{ color: 'var(--accent)', marginBottom: '8px' }}>Frequently Asked Questions:</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div>
                  <strong>Q: How do I persist data to MySQL?</strong>
                  <p style={{ margin: '2px 0 0', color: 'var(--text2)', fontSize: '12px' }}>Ensure MySQL is running on port 3306 and import <code>schema.sql</code>. If MySQL is offline, the portal automatically uses transparent in-memory persistence during your session.</p>
                </div>
                <div>
                  <strong>Q: Can I add new subjects or custom topics?</strong>
                  <p style={{ margin: '2px 0 0', color: 'var(--text2)', fontSize: '12px' }}>Yes! Click "+ Add Topic" in the Syllabus tab. You can select any existing subject or create custom topics.</p>
                </div>
                <div>
                  <strong>Q: Need Training & Placement support?</strong>
                  <p style={{ margin: '2px 0 0', color: 'var(--text2)', fontSize: '12px' }}>Contact your college T&P cell representative or email placement-cell@college.edu.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer" style={{ marginTop: '16px', borderTop: '1px solid var(--border)', paddingTop: '12px' }}>
          <button className="btn-primary" onClick={onClose}>Close Help</button>
        </div>
      </div>
    </div>
  );
}
