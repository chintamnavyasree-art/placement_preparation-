import React, { useEffect, useState } from 'react';
import { getDrives, createDrive, updateDrive, deleteDrive, DEFAULT_DRIVES } from '../api/api';
import PlacementHero from './PlacementHero';

const STATUSES = ['Wishlist','Applied','OA Completed','Interview','Selected','Rejected'];

const statusClass = s => ({
  'Wishlist':'wishlist','Applied':'applied','OA Completed':'oa',
  'Interview':'interview','Selected':'selected','Rejected':'rejected'
})[s] || 'wishlist';

const EMPTY = { company:'', role:'', package:'', status:'Wishlist', interview_date:'', notes:'' };

export default function PlacementTracker() {
  const [drives,  setDrives]  = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');
  const [modal,   setModal]   = useState(false);
  const [editing, setEditing] = useState(null);
  const [form,    setForm]    = useState(EMPTY);
  const [saving,  setSaving]  = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const { data } = await getDrives();
      setDrives(Array.isArray(data) && data.length > 0 ? data : (DEFAULT_DRIVES || []));
    } catch {
      setError('Failed to load drives.');
      setDrives(DEFAULT_DRIVES || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openAdd = () => { setEditing(null); setForm(EMPTY); setModal(true); };
  const openEdit = d => { setEditing(d.id); setForm({ company:d.company, role:d.role, package:d.package||'', status:d.status, interview_date:d.interview_date?d.interview_date.slice(0,10):'', notes:d.notes||'' }); setModal(true); };
  const closeModal = () => { setModal(false); setEditing(null); };

  const handleSave = async () => {
    if (!form.company || !form.role) return setError('Company and Role are required.');
    setSaving(true); setError('');
    try {
      if (editing) await updateDrive(editing, form);
      else         await createDrive(form);
      await load(); closeModal();
    } catch { setError('Save failed. Please try again.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this drive entry?')) return;
    try { await deleteDrive(id); await load(); }
    catch { setError('Delete failed.'); }
  };

  const handleStatusChange = async (d, newStatus) => {
    try { await updateDrive(d.id, { ...d, status: newStatus }); await load(); }
    catch { setError('Status update failed.'); }
  };

  const safeDrives = Array.isArray(drives) ? drives : [];
  const statusCounts = STATUSES.reduce((acc,s) => ({ ...acc, [s]: safeDrives.filter(d=>d.status===s).length }), {});

  return (
    <div>
      <div className="page-header">
        <h2>🏢 Placement Drive Tracker</h2>
        <p>Track companies, roles, and application status</p>
      </div>

      <PlacementHero onAddDrive={openAdd} />

      <div className="stats-row">
        {[{l:'Total',v:drives.length,c:'stat-total'},{l:'Wishlist',v:statusCounts['Wishlist']||0,c:''},
          {l:'Applied',v:statusCounts['Applied']||0,c:''},{l:'Interviews',v:statusCounts['Interview']||0,c:'stat-medium'},
          {l:'Selected',v:statusCounts['Selected']||0,c:'stat-easy'},{l:'Rejected',v:statusCounts['Rejected']||0,c:'stat-hard'}]
        .map(({l,v,c}) => (
          <div key={l} className={`stat-card ${c}`}>
            <div className="stat-num">{v}</div>
            <div className="stat-label">{l}</div>
          </div>
        ))}
      </div>

      {error && <div className="error-msg">{error}</div>}

      <div className="card">
        <div className="toolbar">
          <span style={{fontWeight:600}}>All Drives ({drives.length})</span>
          <button className="btn-primary" onClick={openAdd}>+ Add Drive</button>
        </div>

        {loading ? <div className="loading">Loading...</div> : drives.length === 0 ? (
          <div className="empty-state"><div className="empty-icon">🏢</div><p>No drives tracked yet. Add your first one!</p></div>
        ) : (
          <div style={{overflowX:'auto'}}>
            <table>
              <thead><tr><th>Company</th><th>Role</th><th>Package</th><th>Status</th><th>Interview Date</th><th>Notes</th><th>Actions</th></tr></thead>
              <tbody>
                {drives.map(d => (
                  <tr key={d.id}>
                    <td><strong>{d.company}</strong></td>
                    <td>{d.role}</td>
                    <td>{d.package || '—'}</td>
                    <td>
                      <select
                        value={d.status}
                        onChange={e => handleStatusChange(d, e.target.value)}
                        className={`badge badge-${statusClass(d.status)}`}
                        style={{padding:'4px 8px',fontSize:'12px',border:'1px solid var(--border)',cursor:'pointer'}}
                      >
                        {STATUSES.map(s => <option key={s} style={{background:'var(--bg2)',color:'var(--text)'}}>{s}</option>)}
                      </select>
                    </td>
                    <td>{d.interview_date ? new Date(d.interview_date).toLocaleDateString('en-IN') : '—'}</td>
                    <td style={{maxWidth:'180px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap',color:'var(--text2)'}}>{d.notes || '—'}</td>
                    <td>
                      <div style={{display:'flex',gap:'6px'}}>
                        <button className="btn-secondary btn-sm" onClick={() => openEdit(d)}>✏️</button>
                        <button className="btn-danger btn-sm" onClick={() => handleDelete(d.id)}>🗑️</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modal && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal" onClick={e => e.stopPropagation()}>
            <h3>{editing ? 'Edit Drive' : 'Add New Drive'}</h3>
            {error && <div className="error-msg">{error}</div>}
            <div className="form-grid">
              <div className="form-group">
                <label>Company *</label>
                <input value={form.company} onChange={e=>setForm({...form,company:e.target.value})} placeholder="e.g. Google" />
              </div>
              <div className="form-group">
                <label>Role *</label>
                <input value={form.role} onChange={e=>setForm({...form,role:e.target.value})} placeholder="e.g. SDE-1" />
              </div>
              <div className="form-group">
                <label>Package</label>
                <input value={form.package} onChange={e=>setForm({...form,package:e.target.value})} placeholder="e.g. 24 LPA" />
              </div>
              <div className="form-group">
                <label>Status</label>
                <select value={form.status} onChange={e=>setForm({...form,status:e.target.value})}>
                  {STATUSES.map(s=><option key={s}>{s}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Interview Date</label>
                <input type="date" value={form.interview_date} onChange={e=>setForm({...form,interview_date:e.target.value})} />
              </div>
              <div className="form-group full">
                <label>Notes</label>
                <textarea rows={3} value={form.notes} onChange={e=>setForm({...form,notes:e.target.value})} placeholder="Any notes about this drive..." />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={closeModal}>Cancel</button>
              <button className="btn-primary" onClick={handleSave} disabled={saving}>{saving ? 'Saving...' : 'Save'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
