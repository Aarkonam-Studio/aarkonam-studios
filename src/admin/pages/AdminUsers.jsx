import React, { useState, useEffect } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import { useAdminAuth } from '../context/AdminAuthContext';
import { store, subscribeToStore } from '../../services/storeService';

export default function AdminUsers() {
  const { can, user } = useAdminAuth();

  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [toast, setToast] = useState('');
  const [error, setError] = useState('');

  const loadData = () => {
    setUsers(store.getUsers());
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

  // Strict RBAC Guard: Owner only
  if (!can('manage_users')) {
    return (
      <AdminLayout currentModule="users" moduleName="OPERATOR ACCESS">
        <div className="permission-denied-card">
          <div className="denied-icon">🛡</div>
          <h2 className="denied-title hud-font">DIRECTOR CLEARANCE MANDATED</h2>
          <p className="denied-text">
            Security governance and administrative role provisioning is strictly restricted to Studio Owners. Your current rank ({user?.role?.toUpperCase()}) does not possess role alteration privileges.
          </p>
        </div>
      </AdminLayout>
    );
  }

  const handleSave = (e) => {
    e.preventDefault();
    setError('');

    try {
      store.saveUser(editingUser);
      showToast(`Operator "${editingUser.name}" saved successfully.`);
      setEditingUser(null);
    } catch (err) {
      setError(err.message || 'Operation halted.');
    }
  };

  const confirmDelete = () => {
    if (!deleteCandidate) return;
    try {
      store.deleteUser(deleteCandidate.id);
      showToast(`Operator ${deleteCandidate.name} purged.`);
      setDeleteCandidate(null);
    } catch (err) {
      alert(err.message);
      setDeleteCandidate(null);
    }
  };

  return (
    <AdminLayout currentModule="users" moduleName="ADMINISTRATOR ROLES & ACCESS">
      <div className="admin-page-header">
        <div className="admin-page-title-group">
          <h1>EXECUTIVE ACCESS & PERMISSION HIERARCHY</h1>
          <p className="admin-page-subtitle">
            Authorize studio personnel, provision role-based access control (RBAC), and govern security credentials.
          </p>
        </div>

        <div className="admin-header-actions">
          <button
            type="button"
            className="btn-primary"
            onClick={() =>
              setEditingUser({
                id: `usr-${Date.now()}`,
                name: '',
                email: '',
                role: 'editor',
                title: 'Production Associate',
                active: true
              })
            }
          >
            + PROVISION OPERATOR
          </button>
        </div>
      </div>

      {toast && (
        <div className="submission-banner banner-success" style={{ marginBottom: '1.5rem', padding: '0.875rem 1.25rem' }}>
          <span>✔ {toast}</span>
        </div>
      )}

      {/* Role Permission Matrix Card */}
      <div style={{ background: 'rgba(6,59,44,0.15)', border: '1px solid var(--border-emerald)', padding: '1.25rem 1.5rem', borderRadius: '2px', marginBottom: '2.5rem' }}>
        <h4 className="hud-font" style={{ fontSize: '0.6875rem', letterSpacing: '0.18em', color: 'var(--antique-gold)', marginBottom: '0.75rem' }}>
          ROLE CLEARANCE POLICY MATRIX
        </h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', fontSize: '0.75rem', color: 'var(--silver)' }}>
          <div>
            <strong className="hud-font gold-accent">OWNER:</strong>
            <p style={{ margin: '2px 0 0', color: 'var(--muted-text)', fontSize: '0.6875rem' }}>Full authority: RBAC management, audit purge, security directives.</p>
          </div>
          <div>
            <strong className="hud-font emerald-accent">ADMIN:</strong>
            <p style={{ margin: '2px 0 0', color: 'var(--muted-text)', fontSize: '0.6875rem' }}>Content publication, private inquiries, SEO, contact directives.</p>
          </div>
          <div>
            <strong className="hud-font silver-text">EDITOR:</strong>
            <p style={{ margin: '2px 0 0', color: 'var(--muted-text)', fontSize: '0.6875rem' }}>Draft & edit realms, projects, homepage, media assets.</p>
          </div>
          <div>
            <strong className="hud-font" style={{ color: '#7E878C' }}>VIEWER:</strong>
            <p style={{ margin: '2px 0 0', color: 'var(--muted-text)', fontSize: '0.6875rem' }}>Read-only telemetry and dashboard inspection.</p>
          </div>
        </div>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>OPERATOR</th>
              <th>CLEARANCE ROLE</th>
              <th>EXECUTIVE TITLE</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>
                  <strong style={{ color: 'var(--text-primary)', display: 'block' }}>{u.name}</strong>
                  <small style={{ color: 'var(--muted-text)', fontSize: '0.75rem' }}>{u.email}</small>
                </td>
                <td>
                  <span className={`hud-tag ${u.role === 'owner' ? 'gold' : u.role === 'admin' ? 'active' : ''}`}>
                    {u.role?.toUpperCase()}
                  </span>
                </td>
                <td style={{ fontSize: '0.8125rem' }}>{u.title}</td>
                <td>
                  <span className={`hud-tag ${u.active !== false ? 'active' : 'gold'}`}>
                    {u.active !== false ? 'ACTIVE' : 'SUSPENDED'}
                  </span>
                </td>
                <td>
                  <div className="table-actions-cell">
                    <button
                      type="button"
                      className="btn-action-icon"
                      onClick={() => setEditingUser({ ...u })}
                    >
                      MODIFY
                    </button>
                    {u.id !== user?.id && (
                      <button
                        type="button"
                        className="btn-action-icon btn-action-danger"
                        onClick={() => setDeleteCandidate(u)}
                      >
                        REVOKE
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Form Modal */}
      {editingUser && (
        <div className="admin-modal-overlay" onClick={() => setEditingUser(null)}>
          <div className="admin-modal-box" style={{ maxWidth: '540px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-row">
              <h3 className="hud-font" style={{ color: 'var(--text-primary)', fontSize: '1.125rem' }}>
                CONFIGURE OPERATOR ACCESS
              </h3>
              <button className="modal-close-x" onClick={() => setEditingUser(null)}>✕</button>
            </div>

            {error && (
              <div className="login-alert-box" style={{ marginBottom: '1.25rem' }}>
                <span>⚠ {error}</span>
              </div>
            )}

            <form onSubmit={handleSave}>
              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label className="form-label hud-font">FULL NAME *</label>
                <input
                  type="text"
                  required
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label className="form-label hud-font">CREDENTIAL EMAIL *</label>
                <input
                  type="email"
                  required
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label hud-font">CLEARANCE RANK *</label>
                  <select
                    value={editingUser.role}
                    onChange={(e) => setEditingUser({ ...editingUser, role: e.target.value })}
                    className="form-select"
                  >
                    <option value="owner">Owner (Full Governance)</option>
                    <option value="admin">Admin (Systems & Enquiries)</option>
                    <option value="editor">Editor (Content & Media)</option>
                    <option value="viewer">Viewer (Read-Only)</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label hud-font">TITLE</label>
                  <input
                    type="text"
                    value={editingUser.title}
                    onChange={(e) => setEditingUser({ ...editingUser, title: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group" style={{ margin: '1.5rem 0' }}>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={editingUser.active !== false}
                    onChange={(e) => setEditingUser({ ...editingUser, active: e.target.checked })}
                    className="form-checkbox"
                  />
                  <span className="checkbox-custom" />
                  <span className="checkbox-text">Operator account authorized and active</span>
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button type="button" className="btn-secondary" onClick={() => setEditingUser(null)}>CANCEL</button>
                <button type="submit" className="btn-primary">SAVE PRIVILEGES</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteCandidate && (
        <div className="admin-modal-overlay" onClick={() => setDeleteCandidate(null)}>
          <div className="admin-modal-box" style={{ maxWidth: '440px' }} onClick={(e) => e.stopPropagation()}>
            <h3 className="hud-font" style={{ color: '#ef4444', marginBottom: '1rem' }}>
              REVOKE ACCESS
            </h3>
            <p style={{ color: 'var(--silver)', marginBottom: '1.5rem' }}>
              Permanently revoke administrative access for <strong>{deleteCandidate.name} ({deleteCandidate.email})</strong>?
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button className="btn-secondary" onClick={() => setDeleteCandidate(null)}>ABORT</button>
              <button className="btn-primary" style={{ background: '#ef4444', borderColor: '#ef4444' }} onClick={confirmDelete}>
                REVOKE ACCESS
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
