import React, { useEffect, useState } from 'react';
import { getCoding, updateCoding, createCoding, deleteCoding } from '../api/api';

const PLATFORMS = ['LeetCode','GFG','CodeChef','HackerRank'];
const DIFFS     = ['Easy','Medium','Hard'];

export default function CodingProgress() {
  const [rows,    setRows]    = useState([]);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState('');
  const [adding,  setAdding]  = useState(false);
  const [form,    setForm]    = useState({ platform:'LeetCode', difficulty:'Easy', count:0 });

  const load = async () => {
    try { setLoading(true); const {data} = await getCoding(); setRows(data); }
    catch { setError('Failed to load.'); }
    finally { setLoading(false); }
  };
  useEffect(() => { load(); }, []);

  const adjust = async (row, delta) => {
    const newCount = Math.max(0, (row.count||0) + delta);
    try { await updateCoding(row.id, { count: newCount }); await load(); }
    catch { setError('Update failed.'); }
  };

  const handleAdd = async () => {
    try { await createCoding(form); await load(); setAdding(false); }
    catch { setError('Add failed.'); }
  };

  const handleDelete = async id => {
    if (!window.confirm('Remove this entry?')) return;
    try { await deleteCoding(id); await load(); }
    catch { setError('Delete failed.'); }
  };

  const grouped = rows.reduce((acc, r) => { if (!acc[r.platform]) acc[r.platform]=[]; acc[r.platform].push(r); return acc; }, {});
  const totals  = DIFFS.map(d => ({ d, v: rows.filter(r=>r.difficulty===d).reduce((s,r)=>s+r.count,0) }));
  const grand   = rows.reduce((s,r)=>s+r.count,0);

  return (
    <div>
      <div className="page-header">
        <h2>💻 Coding Progress Tracker</h2>
        <p>Live tally of problems solved across platforms</p>
      </div>

      {error && <div className="error-msg">{error}</div>}

      <div className="stats-row">
        {totals.map(({d,v}) => (
          <div key={d} className={`stat-card stat-${d.toLowerCase()}`}>
            <div className="stat-num">{v}</div>
            <div className="stat-label">{d}</div>
          </div>
        ))}
        <div className="stat-card stat-total">
          <div className="stat-num">{grand}</div>
          <div className="stat-label">Total</div>
        </div>
      </div>

      <div className="card">
        <div className="toolbar">
          <span style={{fontWeight:600}}>By Platform</span>
          <button className="btn-primary" onClick={()=>setAdding(!adding)}>+ Add Platform</button>
        </div>

        {adding && (
          <div style={{background:'var(--bg3)',border:'1px solid var(--border)',borderRadius:'8px',padding:'16px',marginBottom:'16px'}}>
            <div className="form-grid">
              <div className="form-group">
                <label>Platform</label>
                <select value={form.platform} onChange={e=>setForm({...form,platform:e.target.value})}>
                  {PLATFORMS.map(p=><option key={p}>{p}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Difficulty</label>
                <select value={form.difficulty} onChange={e=>setForm({...form,difficulty:e.target.value})}>
                  {DIFFS.map(d=><option key={d}>{d}</option>)}
                </select>
              </div>
              <div className="form-group">
                <label>Initial Count</label>
                <input type="number" min={0} value={form.count} onChange={e=>setForm({...form,count:parseInt(e.target.value)||0})} />
              </div>
            </div>
            <div style={{display:'flex',gap:'8px',marginTop:'12px'}}>
              <button className="btn-secondary" onClick={()=>setAdding(false)}>Cancel</button>
              <button className="btn-primary" onClick={handleAdd}>Add</button>
            </div>
          </div>
        )}

        {loading ? <div className="loading">Loading...</div> : (
          <div style={{overflowX:'auto'}}>
            <table>
              <thead><tr><th>Platform</th><th>Easy</th><th>Medium</th><th>Hard</th><th>Total</th></tr></thead>
              <tbody>
                {Object.entries(grouped).map(([plat, platRows]) => {
                  const byDiff = d => platRows.find(r=>r.difficulty===d);
                  const total  = platRows.reduce((s,r)=>s+r.count,0);
                  return (
                    <tr key={plat}>
                      <td><strong>{plat}</strong></td>
                      {DIFFS.map(d => {
                        const r = byDiff(d);
                        return (
                          <td key={d}>
                            {r ? (
                              <div className="count-editor">
                                <button onClick={()=>adjust(r,-1)}>−</button>
                                <span style={{color: d==='Easy'?'var(--green)':d==='Medium'?'var(--yellow)':'var(--red)'}}>{r.count}</span>
                                <button onClick={()=>adjust(r,+1)}>+</button>
                                <button className="btn-danger btn-sm" style={{marginLeft:'4px'}} onClick={()=>handleDelete(r.id)}>×</button>
                              </div>
                            ) : <span style={{color:'var(--text2)'}}>—</span>}
                          </td>
                        );
                      })}
                      <td><strong>{total}</strong></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
