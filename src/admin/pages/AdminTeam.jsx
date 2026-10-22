import React, { useState, useEffect } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import { useAdminAuth } from '../context/AdminAuthContext';
import { store, subscribeToStore } from '../../services/storeService';
import TeamCard from '../../components/TeamCard';

export default function AdminTeam() {
  const { can } = useAdminAuth();

  const [team, setTeam] = useState([]);
  const [editingMember, setEditingMember] = useState(null);
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [toast, setToast] = useState('');

  const loadData = () => {
    setTeam(store.getTeam());
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

  const handleSave = (e) => {
    e.preventDefault();
    if (!can('edit_content')) return;

    if (!editingMember.name?.trim() || !editingMember.role?.trim()) {
      alert('Name and Role are required.');
      return;
    }

    store.saveTeamMember(editingMember);
    showToast(`Team member "${editingMember.name}" saved.`);
    setEditingMember(null);
  };

  const confirmDelete = () => {
    if (!can('delete_content') || !deleteCandidate) return;
    store.deleteTeamMember(deleteCandidate.id);
    showToast(`Member profile "${deleteCandidate.name}" removed.`);
    setDeleteCandidate(null);
  };

  return (
    <AdminLayout currentModule="team" moduleName="TEAM MANAGEMENT">
      <div className="admin-page-header">
        <div className="admin-page-title-group">
          <h1>DIRECTORATE & TEAM ARCHIVE</h1>
          <p className="admin-page-subtitle">
            Manage executive council members, technical portfolios, and organizational taxonomy.
          </p>
        </div>

        {can('edit_content') && (
          <div className="admin-header-actions">
            <button
              type="button"
              className="btn-primary"
              onClick={() =>
                setEditingMember({
                  id: `team-${Date.now()}`,
                  name: '',
                  role: '',
                  designation: 'EXECUTIVE',
                  division: '',
                  focus: '',
                  emblemBadge: 'STUDIO',
                  published: true
                })
              }
            >
              + ADD TEAM PROFILE
            </button>
          </div>
        )}
      </div>

      {toast && (
        <div className="submission-banner banner-success" style={{ marginBottom: '1.5rem', padding: '0.875rem 1.25rem' }}>
          <span>✔ {toast}</span>
        </div>
      )}

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>OPERATOR NAME</th>
              <th>EXECUTIVE ROLE</th>
              <th>DIVISION</th>
              <th>BADGE</th>
              <th>VISIBILITY</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {team.map((m) => (
              <tr key={m.id}>
                <td>
                  <strong style={{ color: 'var(--text-primary)', display: 'block' }}>{m.name}</strong>
                  <small className="hud-font" style={{ color: 'var(--muted-text)', fontSize: '0.625rem' }}>
                    ID: {m.id}
                  </small>
                </td>
                <td className="gold-accent">{m.role}</td>
                <td>{m.division}</td>
                <td>
                  <span className="hud-tag gold">{m.emblemBadge || 'COUNCIL'}</span>
                </td>
                <td>
                  <span className={`hud-tag ${m.published !== false ? 'active' : 'gold'}`}>
                    {m.published !== false ? 'PUBLISHED' : 'DRAFT'}
                  </span>
                </td>
                <td>
                  <div className="table-actions-cell">
                    {can('edit_content') && (
                      <button
                        type="button"
                        className="btn-action-icon"
                        onClick={() => setEditingMember({ ...m })}
                      >
                        EDIT
                      </button>
                    )}

                    {can('delete_content') && (
                      <button
                        type="button"
                        className="btn-action-icon btn-action-danger"
                        onClick={() => setDeleteCandidate(m)}
                      >
                        DELETE
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      {editingMember && (
        <div className="admin-modal-overlay" onClick={() => setEditingMember(null)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-row">
              <h3 className="hud-font" style={{ color: 'var(--text-primary)', fontSize: '1.125rem' }}>
                EDIT MEMBER: {editingMember.name || 'NEW PROFILE'}
              </h3>
              <button className="modal-close-x" onClick={() => setEditingMember(null)}>✕</button>
            </div>

            <form onSubmit={handleSave}>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label hud-font">FULL NAME *</label>
                  <input
                    type="text"
                    required
                    value={editingMember.name}
                    onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label hud-font">EXECUTIVE ROLE *</label>
                  <input
                    type="text"
                    required
                    value={editingMember.role}
                    onChange={(e) => setEditingMember({ ...editingMember, role: e.target.value })}
                    className="form-input"
                    placeholder="e.g. Chief Executive Officer"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label hud-font">DESIGNATION</label>
                  <input
                    type="text"
                    value={editingMember.designation || ''}
                    onChange={(e) => setEditingMember({ ...editingMember, designation: e.target.value })}
                    className="form-input"
                    placeholder="e.g. CEO / FOUNDER"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label hud-font">SECTOR BADGE</label>
                  <input
                    type="text"
                    value={editingMember.emblemBadge || ''}
                    onChange={(e) => setEditingMember({ ...editingMember, emblemBadge: e.target.value })}
                    className="form-input"
                    placeholder="DIRECTORATE, SYSTEMS, GOVERNANCE"
                  />
                </div>

                <div className="form-group full-width">
                  <label className="form-label hud-font">EXECUTIVE PORTFOLIO / DIVISION</label>
                  <input
                    type="text"
                    value={editingMember.division || ''}
                    onChange={(e) => setEditingMember({ ...editingMember, division: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label className="form-label hud-font">FOCUS & MANDATE SUMMARY</label>
                <textarea
                  rows="3"
                  value={editingMember.focus || ''}
                  onChange={(e) => setEditingMember({ ...editingMember, focus: e.target.value })}
                  className="form-textarea"
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={editingMember.published !== false}
                    onChange={(e) => setEditingMember({ ...editingMember, published: e.target.checked })}
                    className="form-checkbox"
                  />
                  <span className="checkbox-custom" />
                  <span className="checkbox-text">Publish profile on public Team page</span>
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setEditingMember(null)}
                >
                  CANCEL
                </button>
                <button type="submit" className="btn-primary">
                  SAVE MEMBER PROFILE
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {deleteCandidate && (
        <div className="admin-modal-overlay" onClick={() => setDeleteCandidate(null)}>
          <div className="admin-modal-box" style={{ maxWidth: '460px' }} onClick={(e) => e.stopPropagation()}>
            <h3 className="hud-font" style={{ color: '#ef4444', marginBottom: '1rem' }}>
              CONFIRM PROFILE REMOVAL
            </h3>
            <p style={{ color: 'var(--silver)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              Remove <strong>"{deleteCandidate.name}"</strong> from team registry?
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button
                type="button"
                className="btn-secondary"
                onClick={() => setDeleteCandidate(null)}
              >
                ABORT
              </button>
              <button
                type="button"
                className="btn-primary"
                style={{ background: '#ef4444', borderColor: '#ef4444' }}
                onClick={confirmDelete}
              >
                PURGE
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
