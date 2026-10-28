import React, { useEffect, useState } from 'react';
import { getNotes, createNote, deleteNote, DEFAULT_NOTES } from '../api/api';

const EMPTY = { title:'', content:'', category:'General' };

export default function NotesHub() {
  const [notes,   setNotes]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');
  const [modal,   setModal]   = useState(false);
  const [form,    setForm]    = useState(EMPTY);
  const [saving,  setSaving]  = useState(false);
  const [filter,  setFilter]  = useState('');

  const load = async (cat) => {
    try {
      setLoading(true);
      const { data } = await getNotes(cat);
      setNotes(Array.isArray(data) && data.length > 0 ? data : (DEFAULT_NOTES || []));
    } catch {
      setError('Failed to load notes.');
      setNotes(DEFAULT_NOTES || []);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => { load(); }, []);

  const safeNotes = Array.isArray(notes) ? notes : [];
  const categories = [...new Set(safeNotes.map(n=>n.category).filter(Boolean))];

  const handleFilter = cat => { setFilter(cat); load(cat||undefined); };

  const handleSave = async () => {
    if (!form.title || !form.content) return setError('Title and content are required.');
    setSaving(true); setError('');
    try { await createNote(form); await load(filter||undefined); setModal(false); setForm(EMPTY); }
    catch { setError('Save failed.'); }
    finally { setSaving(false); }
  };

  const handleDelete = async id => {
    if (!window.confirm('Delete this note?')) return;
    try { await deleteNote(id); await load(filter||undefined); }
    catch { setError('Delete failed.'); }
  };

  const fmt = d => new Date(d).toLocaleDateString('en-IN', { day:'2-digit', month:'short', year:'numeric' });

  return (
    <div>
      <div className="page-header">
        <h2>📝 Interview Notes Hub</h2>
        <p>Personal revision notes by topic or company</p>
      </div>

      {error && <div className="error-msg">{error}</div>}

      <div className="toolbar">
        <div style={{display:'flex',gap:'8px',flexWrap:'wrap'}}>
          <button className={`btn-secondary btn-sm ${!filter?'btn-primary':''}`} onClick={()=>handleFilter('')}>All</button>
          {categories.map(c=>(
            <button key={c} className={`btn-secondary btn-sm ${filter===c?'btn-primary':''}`} onClick={()=>handleFilter(c)}>{c}</button>
          ))}
        </div>
        <button className="btn-primary" onClick={()=>{setModal(true);setError('');}}>+ New Note</button>
      </div>

      {loading ? <div className="loading">Loading...</div> : notes.length === 0 ? (
        <div className="empty-state"><div className="empty-icon">📝</div><p>No notes yet. Create your first revision note!</p></div>
      ) : (
        <div className="notes-grid">
          {notes.map(n => (
            <div key={n.id} className="note-card">
              <h4>{n.title}</h4>
              <p>{n.content.length>200 ? n.content.slice(0,200)+'…' : n.content}</p>
              <div className="note-meta">
                <span className="note-category">{n.category}</span>
                <span className="note-date">{fmt(n.created_at)}</span>
              </div>
              <button className="btn-danger btn-sm" style={{position:'absolute',top:'12px',right:'12px'}} onClick={()=>handleDelete(n.id)}>🗑️</button>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <div className="modal-overlay" onClick={()=>setModal(false)}>
          <div className="modal" onClick={e=>e.stopPropagation()}>
            <h3>📝 New Note</h3>
            {error && <div className="error-msg">{error}</div>}
            <div className="form-grid">
              <div className="form-group">
                <label>Title *</label>
                <input value={form.title} onChange={e=>setForm({...form,title:e.target.value})} placeholder="e.g. System Design Tips" />
              </div>
              <div className="form-group">
                <label>Category</label>
                <input value={form.category} onChange={e=>setForm({...form,category:e.target.value})} placeholder="e.g. Google, DSA" />
              </div>
              <div className="form-group full">
                <label>Content *</label>
                <textarea rows={8} value={form.content} onChange={e=>setForm({...form,content:e.target.value})} placeholder="Write your revision notes here..." style={{resize:'vertical'}} />
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-secondary" onClick={()=>setModal(false)}>Cancel</button>
              <button className="btn-primary" onClick={handleSave} disabled={saving}>{saving?'Saving...':'Save Note'}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
