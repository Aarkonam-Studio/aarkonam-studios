import React, { useState, useEffect } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import { useAdminAuth } from '../context/AdminAuthContext';
import { store, subscribeToStore } from '../../services/storeService';
import { firebaseDiagnostics } from '../../services/firebase';

export default function AdminSettings() {
  const { can, user } = useAdminAuth();

  const [logs, setLogs] = useState([]);
  const [logFilter, setLogFilter] = useState('ALL');
  const [toast, setToast] = useState('');

  const loadLogs = () => {
    setLogs(store.getAuditLogs());
  };

  useEffect(() => {
    loadLogs();
    const unsub = subscribeToStore(loadLogs);
    return () => unsub();
  }, []);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(''), 4000);
  };

  const filteredLogs = logs.filter((l) => {
    if (logFilter === 'ALL') return true;
    return l.entityType === logFilter || l.action.includes(logFilter);
  });

  const handleClearLogs = () => {
    if (!can('clear_audit')) return;
    if (confirm('Are you sure you want to clear the audit log stream?')) {
      store.clearAuditLogs();
      showToast('Audit stream cleared.');
    }
  };

  const handleExportBackup = () => {
    const backupData = {
      exportTimestamp: new Date().toISOString(),
      exportedBy: user?.name,
      games: store.getGames(),
      projects: store.getProjects(),
      team: store.getTeam(),
      enquiries: store.getEnquiries(),
      media: store.getMedia(),
      homepage: store.getHomepage(),
      contact: store.getContact(),
      seo: store.getSEO(),
      announcements: store.getAnnouncements(),
      users: store.getUsers()
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `aarkonam-cms-backup-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Encrypted JSON backup file downloaded.');
  };

  return (
    <AdminLayout currentModule="settings" moduleName="SYSTEM CORE & AUDIT">
      <div className="admin-page-header">
        <div className="admin-page-title-group">
          <h1>SYSTEM CORE & AUDIT GOVERNANCE</h1>
          <p className="admin-page-subtitle">
            Diagnostic environment inspection, Firebase connection telemetry, and immutable audit logs.
          </p>
        </div>

        <div className="admin-header-actions">
          <button type="button" className="btn-secondary" onClick={handleExportBackup}>
            EXPORT BACKUP (JSON)
          </button>
          {can('clear_audit') && (
            <button
              type="button"
              className="btn-action-icon btn-action-danger"
              style={{ padding: '0.625rem 1rem' }}
              onClick={handleClearLogs}
            >
              PURGE AUDIT LOGS
            </button>
          )}
        </div>
      </div>

      {toast && (
        <div className="submission-banner banner-success" style={{ marginBottom: '1.5rem', padding: '0.875rem 1.25rem' }}>
          <span>✔ {toast}</span>
        </div>
      )}

      {/* Diagnostics Panel */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '3rem' }}>
        <div className="contact-form-container" style={{ padding: '2rem' }}>
          <h3 className="hud-font" style={{ fontSize: '0.8125rem', letterSpacing: '0.18em', color: 'var(--antique-gold)', marginBottom: '1.25rem' }}>
            ENGINE RUNTIME TELEMETRY
          </h3>

          <div className="spec-row">
            <span className="spec-label">RUNTIME PLATFORM</span>
            <span className="spec-val">React 19 + Vite 8.3.4 (SPA Architecture)</span>
          </div>
          <div className="spec-row">
            <span className="spec-label">STORAGE PROTOCOL</span>
            <span className="spec-val emerald-accent">Unified Reactive Store with Local Mirroring</span>
          </div>
          <div className="spec-row">
            <span className="spec-label">SESSION SECURITY</span>
            <span className="spec-val">RBAC Token Authorization // Session Scope</span>
          </div>
          <div className="spec-row">
            <span className="spec-label">DATA ENCRYPTION</span>
            <span className="spec-val gold-accent">TLS 1.3 / In-Memory Isolation</span>
          </div>
        </div>

        <div className="contact-form-container" style={{ padding: '2rem' }}>
          <h3 className="hud-font" style={{ fontSize: '0.8125rem', letterSpacing: '0.18em', color: 'var(--antique-gold)', marginBottom: '1.25rem' }}>
            FIREBASE CLOUD INTEGRATION
          </h3>

          <div className="spec-row">
            <span className="spec-label">CONFIGURATION STATE</span>
            <span className={`spec-val ${firebaseDiagnostics.configured ? 'emerald-accent' : 'gold-accent'}`}>
              {firebaseDiagnostics.configured ? '● CLOUD PROJECT ATTACHED' : '○ SANDBOX MIRROR ACTIVE'}
            </span>
          </div>
          <div className="spec-row">
            <span className="spec-label">PROJECT ID</span>
            <span className="spec-val">{firebaseDiagnostics.projectId}</span>
          </div>
          <div className="spec-row">
            <span className="spec-label">SECURITY RULES</span>
            <span className="spec-val">Rules defined in firestore.rules & storage.rules</span>
          </div>
          <div className="spec-row">
            <span className="spec-label">STORAGE BUCKET</span>
            <span className="spec-val">{firebaseDiagnostics.storageBucket}</span>
          </div>
        </div>
      </div>

      {/* Audit Log Stream */}
      <div className="admin-table-container">
        <div className="table-toolbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span className="hud-font" style={{ fontSize: '0.75rem', color: 'var(--silver)' }}>
              AUDIT TRAIL ({filteredLogs.length} EVENTS)
            </span>
          </div>

          <select
            value={logFilter}
            onChange={(e) => setLogFilter(e.target.value)}
            className="table-filter-select"
          >
            <option value="ALL">ALL EVENT DOMAINS</option>
            <option value="SECURITY">SECURITY & AUTH</option>
            <option value="ENQUIRY">ENQUIRIES</option>
            <option value="MEDIA">MEDIA</option>
            <option value="HOMEPAGE">HOMEPAGE</option>
            <option value="USER">USER ROLES</option>
          </select>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>EVENT TIMESTAMP</th>
              <th>OPERATOR</th>
              <th>ACTION CLASSIFICATION</th>
              <th>DOMAIN</th>
              <th>EVENT DETAILS</th>
            </tr>
          </thead>
          <tbody>
            {filteredLogs.map((log) => (
              <tr key={log.id}>
                <td style={{ fontSize: '0.75rem', color: 'var(--muted-text)', whiteSpace: 'nowrap' }}>
                  {new Date(log.timestamp).toLocaleString()}
                </td>
                <td style={{ fontSize: '0.8125rem', color: 'var(--antique-gold)' }}>
                  {log.actorName}
                </td>
                <td>
                  <span className="hud-tag active" style={{ fontSize: '0.625rem' }}>
                    {log.action}
                  </span>
                </td>
                <td>
                  <span className="hud-tag gold" style={{ fontSize: '0.5625rem' }}>
                    {log.entityType}
                  </span>
                </td>
                <td style={{ fontSize: '0.8125rem', color: 'var(--silver)' }}>
                  {log.details}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
