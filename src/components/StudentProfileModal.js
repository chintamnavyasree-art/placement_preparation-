import React, { useState } from 'react';

export default function StudentProfileModal({ isOpen, onClose }) {
  const [profile, setProfile] = useState({
    name: 'Chirag Sharma',
    rollNo: '22CS0148',
    college: 'National Institute of Technology',
    branch: 'Computer Science & Engineering',
    batch: 'Batch of 2026',
    cgpa: '8.85',
    targetRole: 'Software Development Engineer (SDE-1)',
    targetCompanies: 'Google, Microsoft, Amazon, Atlassian',
    email: 'chirag.cs26@college.edu',
    github: 'github.com/chirag-sharma',
    linkedin: 'linkedin.com/in/chirag-prep'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [temp, setTemp] = useState(profile);

  if (!isOpen) return null;

  const handleSave = () => {
    setProfile(temp);
    setIsEditing(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal profile-modal" onClick={e => e.stopPropagation()} style={{ width: '560px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ margin: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>🎓</span> Student Placement Profile
          </h3>
          <button className="btn-secondary btn-sm" onClick={onClose}>✕</button>
        </div>

        <div style={{ display: 'flex', gap: '20px', alignItems: 'center', padding: '16px', background: 'var(--bg3)', borderRadius: '10px', marginBottom: '20px' }}>
          <div style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #7c3aed, #58a6ff)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#fff',
            boxShadow: '0 4px 12px rgba(88,166,255,0.3)',
            flexShrink: 0
          }}>
            CS
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <h4 style={{ margin: 0, fontSize: '18px', color: 'var(--text)' }}>{profile.name}</h4>
              <span className="badge badge-selected" style={{ fontSize: '10px' }}>Active Candidate</span>
            </div>
            <p style={{ margin: '4px 0 0', color: 'var(--text2)', fontSize: '13px' }}>
              {profile.branch} • {profile.batch}
            </p>
            <p style={{ margin: '2px 0 0', color: 'var(--accent)', fontSize: '12px', fontWeight: 600 }}>
              🎯 Target: {profile.targetRole}
            </p>
          </div>
        </div>

        {isEditing ? (
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name</label>
              <input value={temp.name} onChange={e => setTemp({ ...temp, name: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Roll / PRN No</label>
              <input value={temp.rollNo} onChange={e => setTemp({ ...temp, rollNo: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Current CGPA</label>
              <input value={temp.cgpa} onChange={e => setTemp({ ...temp, cgpa: e.target.value })} />
            </div>
            <div className="form-group">
              <label>Branch & Batch</label>
              <input value={temp.batch} onChange={e => setTemp({ ...temp, batch: e.target.value })} />
            </div>
            <div className="form-group full">
              <label>Target Dream Companies</label>
              <input value={temp.targetCompanies} onChange={e => setTemp({ ...temp, targetCompanies: e.target.value })} />
            </div>
            <div className="form-group full">
              <label>College / University</label>
              <input value={temp.college} onChange={e => setTemp({ ...temp, college: e.target.value })} />
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', fontSize: '13px' }}>
            <div style={{ padding: '12px', background: 'var(--bg)', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <span style={{ color: 'var(--text2)', fontSize: '11px', display: 'block' }}>College</span>
              <strong>{profile.college}</strong>
            </div>
            <div style={{ padding: '12px', background: 'var(--bg)', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <span style={{ color: 'var(--text2)', fontSize: '11px', display: 'block' }}>Current CGPA</span>
              <strong style={{ color: 'var(--green)', fontSize: '15px' }}>{profile.cgpa} / 10.0</strong>
            </div>
            <div style={{ padding: '12px', background: 'var(--bg)', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <span style={{ color: 'var(--text2)', fontSize: '11px', display: 'block' }}>Roll Number</span>
              <strong>{profile.rollNo}</strong>
            </div>
            <div style={{ padding: '12px', background: 'var(--bg)', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <span style={{ color: 'var(--text2)', fontSize: '11px', display: 'block' }}>Email ID</span>
              <strong>{profile.email}</strong>
            </div>
            <div style={{ gridColumn: '1 / -1', padding: '12px', background: 'var(--bg)', borderRadius: '8px', border: '1px solid var(--border)' }}>
              <span style={{ color: 'var(--text2)', fontSize: '11px', display: 'block' }}>Target Companies</span>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '6px' }}>
                {profile.targetCompanies.split(',').map(c => (
                  <span key={c} className="badge badge-applied">{c.trim()}</span>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="modal-footer" style={{ marginTop: '24px' }}>
          {isEditing ? (
            <>
              <button className="btn-secondary" onClick={() => setIsEditing(false)}>Cancel</button>
              <button className="btn-primary" onClick={handleSave}>Save Changes</button>
            </>
          ) : (
            <>
              <button className="btn-secondary" onClick={() => { setTemp(profile); setIsEditing(true); }}>Edit Profile</button>
              <button className="btn-primary" onClick={onClose}>Done</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
