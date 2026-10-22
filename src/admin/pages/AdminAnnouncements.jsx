import React, { useState, useEffect } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import { useAdminAuth } from '../context/AdminAuthContext';
import { store, subscribeToStore } from '../../services/storeService';

export default function AdminAnnouncements() {
  const { can } = useAdminAuth();

  const [announcements, setAnnouncements] = useState([]);
  const [editingAnn, setEditingAnn] = useState(null);
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [toast, setToast] = useState('');

  const loadData = () => {
    setAnnouncements(store.getAnnouncements());
  };

  useEffect(() => {
    loadData();
    const unsub = subscribeToStore(loadData);
    return () => unsub();
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 4000);
  };

  const handleTogglePublish = (ann) => {
    if (!can('manage_announcements')) return;
    const updated = { ...ann, published: !ann.published };
    store.saveAnnouncement(updated);
    showToast(`Announcement "${ann.title}" is now ${updated.published ? 'ACTIVE' : 'DRAFT'}.`);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!can('manage_announcements')) return;

    if (!editingAnn.title?.trim() || !editingAnn.message?.trim()) {
      alert('Title and Message are required.');
      return;
    }

    store.saveAnnouncement(editingAnn);
    showToast(`Announcement "${editingAnn.title}" saved.`);
    setEditingAnn(null);
  };

  const confirmDelete = () => {
    if (!can('manage_announcements') || !deleteCandidate) return;
    store.deleteAnnouncement(deleteCandidate.id);
    showToast('Announcement removed.');
    setDeleteCandidate(null);
  };

  return (
    <AdminLayout currentModule="announcements" moduleName="ANNOUNCEMENTS">
      <div className="admin-page-header">
        <div className="admin-page-title-group">
          <h1>BROADCAST & ANNOUNCEMENTS</h1>
          <p className="admin-page-subtitle">
            Publish studio production directives, milestone releases, and operational alerts.
          </p>
        </div>

        {can('manage_announcements') && (
          <div className="admin-header-actions">
            <button
              type="button"
              className="btn-primary"
              onClick={() =>
                setEditingAnn({
                  id: `ann-${Date.now()}`,
                  title: '',
                  message: '',
                  type: 'intel',
                  placement: 'sitewide-banner',
                  published: true,
                  startsAt: new Date().toISOString().split('T')[0],
                  endsAt: ''
                })
              }
            >
              + NEW DIRECTIVE
            </button>
          </div>
        )}
      </div>

      {toast && (
        <div className="submission-banner banner-success" style={{ marginBottom: '1.5rem', padding: '0.875rem 1.25rem' }}>
          <span>✔ {toast}</span>
        </div>
      )}

      {/* Active Announcement Banner Live Preview */}
      {announcements.find((a) => a.published) && (
        <div style={{ marginBottom: '2.5rem' }}>
          <span className="hud-font" style={{ fontSize: '0.625rem', color: 'var(--antique-gold)', letterSpacing: '0.2em', display: 'block', marginBottom: '8px' }}>
            ACTIVE SITEWIDE BROADCAST PREVIEW:
          </span>
          <div style={{ background: 'rgba(6, 59, 44, 0.45)', border: '1px solid var(--emerald-cyan)', padding: '0.875rem 1.5rem', borderRadius: '2px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div>
              <strong className="hud-font emerald-accent" style={{ fontSize: '0.75rem', marginRight: '10px' }}>
                [{announcements.find((a) => a.published).title}]
              </strong>
              <span style={{ fontSize: '0.8125rem', color: 'var(--silver)' }}>
                {announcements.find((a) => a.published).message}
              </span>
            </div>
            <span className="hud-tag active" style={{ fontSize: '0.5625rem' }}>BROADCASTING</span>
          </div>
        </div>
      )}

      {/* Announcements Table */}
      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>DIRECTIVE TITLE</th>
              <th>TYPE</th>
              <th>PLACEMENT</th>
              <th>ACTIVE DATES</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {announcements.map((ann) => (
              <tr key={ann.id}>
                <td>
                  <strong style={{ color: 'var(--text-primary)', display: 'block' }}>{ann.title}</strong>
                  <small style={{ color: 'var(--muted-text)', fontSize: '0.75rem' }}>{ann.message}</small>
                </td>
                <td>
                  <span className="hud-tag gold">{ann.type?.toUpperCase()}</span>
                </td>
                <td className="hud-font" style={{ fontSize: '0.75rem' }}>{ann.placement}</td>
                <td style={{ fontSize: '0.75rem', color: 'var(--silver)' }}>
                  {ann.startsAt || 'Immediate'} {ann.endsAt ? `→ ${ann.endsAt}` : ''}
                </td>
                <td>
                  <button
                    type="button"
                    className={`hud-tag ${ann.published !== false ? 'active' : 'gold'}`}
                    onClick={() => handleTogglePublish(ann)}
                  >
                    {ann.published !== false ? '● ACTIVE' : '○ DRAFT'}
                  </button>
                </td>
                <td>
                  <div className="table-actions-cell">
                    <button
                      type="button"
                      className="btn-action-icon"
                      onClick={() => setEditingAnn({ ...ann })}
                    >
                      EDIT
                    </button>
                    <button
                      type="button"
                      className="btn-action-icon btn-action-danger"
                      onClick={() => setDeleteCandidate(ann)}
                    >
                      DELETE
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Form Modal */}
      {editingAnn && (
        <div className="admin-modal-overlay" onClick={() => setEditingAnn(null)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-row">
              <h3 className="hud-font" style={{ color: 'var(--text-primary)', fontSize: '1.125rem' }}>
                DIRECTIVE CONFIGURATION
              </h3>
              <button className="modal-close-x" onClick={() => setEditingAnn(null)}>✕</button>
            </div>

            <form onSubmit={handleSave}>
              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label className="form-label hud-font">BROADCAST TITLE *</label>
                <input
                  type="text"
                  required
                  value={editingAnn.title}
                  onChange={(e) => setEditingAnn({ ...editingAnn, title: e.target.value })}
                  className="form-input"
                  placeholder="e.g. MILESTONE COMPLETED // LEVIATHAN CLOSED DEMO"
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label className="form-label hud-font">BROADCAST MESSAGE BODY *</label>
                <textarea
                  rows="3"
                  required
                  value={editingAnn.message}
                  onChange={(e) => setEditingAnn({ ...editingAnn, message: e.target.value })}
                  className="form-textarea"
                />
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label hud-font">DIRECTIVE TYPE</label>
                  <select
                    value={editingAnn.type}
                    onChange={(e) => setEditingAnn({ ...editingAnn, type: e.target.value })}
                    className="form-select"
                  >
                    <option value="intel">Studio Intel (Emerald)</option>
                    <option value="alert">Operational Alert (Gold)</option>
                    <option value="release">Milestone Release (Silver)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label hud-font">PLACEMENT</label>
                  <select
                    value={editingAnn.placement}
                    onChange={(e) => setEditingAnn({ ...editingAnn, placement: e.target.value })}
                    className="form-select"
                  >
                    <option value="sitewide-banner">Sitewide Header Banner</option>
                    <option value="home-topbar">Homepage Terminal Only</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label hud-font">START DATE</label>
                  <input
                    type="date"
                    value={editingAnn.startsAt || ''}
                    onChange={(e) => setEditingAnn({ ...editingAnn, startsAt: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label hud-font">EXPIRY DATE (OPTIONAL)</label>
                  <input
                    type="date"
                    value={editingAnn.endsAt || ''}
                    onChange={(e) => setEditingAnn({ ...editingAnn, endsAt: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group" style={{ margin: '1.5rem 0' }}>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={editingAnn.published !== false}
                    onChange={(e) => setEditingAnn({ ...editingAnn, published: e.target.checked })}
                    className="form-checkbox"
                  />
                  <span className="checkbox-custom" />
                  <span className="checkbox-text">Activate broadcast across target placement</span>
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button type="button" className="btn-secondary" onClick={() => setEditingAnn(null)}>CANCEL</button>
                <button type="submit" className="btn-primary">SAVE DIRECTIVE</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteCandidate && (
        <div className="admin-modal-overlay" onClick={() => setDeleteCandidate(null)}>
          <div className="admin-modal-box" style={{ maxWidth: '440px' }} onClick={(e) => e.stopPropagation()}>
            <h3 className="hud-font" style={{ color: '#ef4444', marginBottom: '1rem' }}>DELETE DIRECTIVE</h3>
            <p style={{ color: 'var(--silver)', marginBottom: '1.5rem' }}>
              Remove broadcast "{deleteCandidate.title}"?
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button className="btn-secondary" onClick={() => setDeleteCandidate(null)}>ABORT</button>
              <button className="btn-primary" style={{ background: '#ef4444', borderColor: '#ef4444' }} onClick={confirmDelete}>
                DELETE
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
