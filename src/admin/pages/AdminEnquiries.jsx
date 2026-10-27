import React, { useState, useEffect } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import { useAdminAuth } from '../context/AdminAuthContext';
import { store, subscribeToStore } from '../../services/storeService';

export default function AdminEnquiries() {
  const { can, user } = useAdminAuth();

  const [enquiries, setEnquiries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [newNote, setNewNote] = useState('');
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [toast, setToast] = useState('');

  const loadData = () => {
    setEnquiries(store.getEnquiries());
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

  // Permission Guard
  if (!can('manage_enquiries')) {
    return (
      <AdminLayout currentModule="enquiries" moduleName="TRANSMISSIONS">
        <div className="permission-denied-card">
          <div className="denied-icon">🔒</div>
          <h2 className="denied-title hud-font">CLEARANCE RESTRICTED</h2>
          <p className="denied-text">
            Client inquiries contain confidential NDA materials and communications. Your operator clearance level ({user?.role?.toUpperCase()}) does not authorize access to transmission records.
          </p>
        </div>
      </AdminLayout>
    );
  }

  const filteredEnquiries = enquiries.filter((e) => {
    const matchesSearch =
      e.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.organization?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'ALL' || e.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleUpdateStatus = (id, newStatus) => {
    const updated = store.updateEnquiryStatus(id, newStatus);
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry({ ...updated });
    }
    showToast(`Transmission ${id} status updated to ${newStatus.toUpperCase()}.`);
  };

  const handleAddNote = (e) => {
    e.preventDefault();
    if (!newNote.trim() || !selectedEnquiry) return;
    const updated = store.updateEnquiryStatus(selectedEnquiry.id, selectedEnquiry.status, newNote);
    setSelectedEnquiry({ ...updated });
    setNewNote('');
    showToast('Executive note added to transmission record.');
  };

  const confirmDelete = () => {
    if (!deleteCandidate) return;
    store.deleteEnquiry(deleteCandidate.id);
    if (selectedEnquiry?.id === deleteCandidate.id) {
      setSelectedEnquiry(null);
    }
    showToast(`Transmission ${deleteCandidate.id} purged.`);
    setDeleteCandidate(null);
  };

  return (
    <AdminLayout currentModule="enquiries" moduleName="ENQUIRIES & TRANSMISSIONS">
      <div className="admin-page-header">
        <div className="admin-page-title-group">
          <h1>TRANSMISSION RELAY & INQUIRIES</h1>
          <p className="admin-page-subtitle">
            Private communications pipeline, project briefs, licensing inquiries, and publishing pitches.
          </p>
        </div>
      </div>

      {toast && (
        <div className="submission-banner banner-success" style={{ marginBottom: '1.5rem', padding: '0.875rem 1.25rem' }}>
          <span>✔ {toast}</span>
        </div>
      )}

      {/* Toolbar */}
      <div className="admin-table-container">
        <div className="table-toolbar">
          <input
            type="text"
            placeholder="Search by ID, name, email or org..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="table-search-input"
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="table-filter-select"
          >
            <option value="ALL">ALL STATUSES</option>
            <option value="new">NEW / UNREAD</option>
            <option value="in-review">IN REVIEW</option>
            <option value="contacted">CONTACTED</option>
            <option value="in-progress">IN PROGRESS</option>
            <option value="completed">COMPLETED</option>
            <option value="archived">ARCHIVED</option>
          </select>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>DISPATCH ID</th>
              <th>CLIENT / SENDER</th>
              <th>CLASSIFICATION</th>
              <th>BUDGET</th>
              <th>DATE</th>
              <th>EMAIL RELAY</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredEnquiries.length === 0 ? (
              <tr>
                <td colSpan="8" style={{ textAlign: 'center', color: 'var(--muted-text)', padding: '3rem' }}>
                  No transmission records matching current filter.
                </td>
              </tr>
            ) : (
              filteredEnquiries.map((enq) => (
                <tr key={enq.id}>
                  <td className="hud-font emerald-accent">{enq.id}</td>
                  <td>
                    <strong style={{ color: 'var(--text-primary)', display: 'block' }}>{enq.name}</strong>
                    <span style={{ fontSize: '0.75rem', color: 'var(--muted-text)' }}>
                      {enq.organization ? `${enq.organization} · ` : ''}{enq.email}
                    </span>
                  </td>
                  <td style={{ fontSize: '0.8125rem' }}>{enq.inquiryType}</td>
                  <td className="hud-font gold-accent" style={{ fontSize: '0.75rem' }}>
                    {enq.budgetRange}
                  </td>
                  <td style={{ fontSize: '0.75rem', color: 'var(--muted-text)' }}>
                    {new Date(enq.timestamp).toLocaleDateString()}
                  </td>
                  <td>
                    {enq.emailStatus === 'sent' ? (
                      <span className="hud-tag active" title="Email delivered to studio inbox">
                        DELIVERED
                      </span>
                    ) : enq.emailStatus === 'delivery-failed' ? (
                      <span
                        className="hud-tag"
                        style={{ borderColor: '#ef4444', color: '#ef4444' }}
                        title={enq.emailMetadata?.error || 'Email delivery failed'}
                      >
                        FAILED
                      </span>
                    ) : enq.emailStatus === 'endpoint-forwarded' ? (
                      <span className="hud-tag active" title="Forwarded via webhook">
                        FORWARDED
                      </span>
                    ) : enq.emailStatus === 'sandbox-pending-emailjs' ? (
                      <span className="hud-tag gold" title="Saved locally; EmailJS keys not configured in environment">
                        SANDBOX
                      </span>
                    ) : (
                      <span className="hud-tag" style={{ color: 'var(--muted-text)' }}>
                        {enq.emailStatus?.toUpperCase() || 'STORED'}
                      </span>
                    )}
                  </td>
                  <td>
                    <span className={`hud-tag ${enq.status === 'new' ? 'gold' : 'active'}`}>
                      {enq.status?.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <div className="table-actions-cell">
                      <button
                        type="button"
                        className="btn-action-icon"
                        onClick={() => setSelectedEnquiry(enq)}
                      >
                        INSPECT
                      </button>
                      <button
                        type="button"
                        className="btn-action-icon btn-action-danger"
                        onClick={() => setDeleteCandidate(enq)}
                      >
                        PURGE
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Inquiry Detail Inspector Modal */}
      {selectedEnquiry && (
        <div className="admin-modal-overlay" onClick={() => setSelectedEnquiry(null)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-row">
              <div>
                <span className="hud-tag gold">DISPATCH RECORD</span>
                <h3 className="hud-font" style={{ color: 'var(--text-primary)', fontSize: '1.25rem', marginTop: '4px' }}>
                  {selectedEnquiry.id} // {selectedEnquiry.projectTitle || selectedEnquiry.inquiryType}
                </h3>
              </div>
              <button className="modal-close-x" onClick={() => setSelectedEnquiry(null)}>✕</button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
              <div>
                <h4 className="hud-font" style={{ fontSize: '0.6875rem', letterSpacing: '0.18em', color: 'var(--antique-gold)', marginBottom: '0.5rem' }}>
                  PROJECT BRIEF & MESSAGE
                </h4>
                <div style={{ background: 'rgba(5,7,6,0.6)', border: '1px solid var(--border-emerald)', padding: '1.25rem', borderRadius: '2px', lineHeight: '1.7', color: 'var(--silver)' }}>
                  {selectedEnquiry.message}
                </div>

                {/* Internal Executive Notes */}
                <div style={{ marginTop: '1.5rem' }}>
                  <h4 className="hud-font" style={{ fontSize: '0.6875rem', letterSpacing: '0.18em', color: 'var(--silver)', marginBottom: '0.5rem' }}>
                    EXECUTIVE AUDIT NOTES
                  </h4>

                  {selectedEnquiry.notes?.length > 0 ? (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '1rem' }}>
                      {selectedEnquiry.notes.map((n, idx) => (
                        <div key={idx} style={{ background: 'rgba(6,59,44,0.2)', padding: '6px 10px', fontSize: '0.75rem', color: 'var(--silver)', borderRadius: '2px' }}>
                          {n}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={{ fontSize: '0.75rem', color: 'var(--muted-text)', marginBottom: '1rem' }}>No internal notes attached.</p>
                  )}

                  <form onSubmit={handleAddNote} style={{ display: 'flex', gap: '8px' }}>
                    <input
                      type="text"
                      placeholder="Add an internal note..."
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      className="form-input"
                      style={{ fontSize: '0.8125rem' }}
                    />
                    <button type="submit" className="btn-secondary" style={{ padding: '0 1rem' }}>
                      APPEND
                    </button>
                  </form>
                </div>
              </div>

              {/* Sidebar Metadata */}
              <div style={{ background: 'rgba(7,18,15,0.7)', border: '1px solid var(--border-faint)', padding: '1.25rem', borderRadius: '2px' }}>
                <h4 className="hud-font" style={{ fontSize: '0.6875rem', color: 'var(--antique-gold)', marginBottom: '1rem' }}>
                  TRANSMISSION INTEL
                </h4>

                <div className="spec-row">
                  <span className="spec-label">SENDER</span>
                  <span className="spec-val">{selectedEnquiry.name}</span>
                </div>

                <div className="spec-row">
                  <span className="spec-label">EMAIL ADDRESS</span>
                  <a href={`mailto:${selectedEnquiry.email}`} className="spec-val emerald-accent" style={{ textDecoration: 'underline' }}>
                    {selectedEnquiry.email} ↗
                  </a>
                </div>

                <div className="spec-row">
                  <span className="spec-label">ORGANIZATION</span>
                  <span className="spec-val">{selectedEnquiry.organization || 'Independent'}</span>
                </div>

                <div className="spec-row">
                  <span className="spec-label">BUDGET ENVELOPE</span>
                  <span className="spec-val gold-accent">{selectedEnquiry.budgetRange}</span>
                </div>

                <div className="spec-row">
                  <span className="spec-label">REGISTERED AT</span>
                  <span className="spec-val">{new Date(selectedEnquiry.timestamp).toLocaleString()}</span>
                </div>

                <div className="spec-row">
                  <span className="spec-label">EMAIL RELAY</span>
                  <span className="spec-val">
                    {selectedEnquiry.emailStatus === 'sent' && (
                      <span className="emerald-accent">✔ Delivered via EmailJS</span>
                    )}
                    {selectedEnquiry.emailStatus === 'delivery-failed' && (
                      <span style={{ color: '#ef4444' }}>
                        ⚠ Delivery Failed {selectedEnquiry.emailMetadata?.error ? `(${selectedEnquiry.emailMetadata.error})` : ''}
                      </span>
                    )}
                    {selectedEnquiry.emailStatus === 'sandbox-pending-emailjs' && (
                      <span className="gold-accent">Sandbox (EmailJS unconfigured)</span>
                    )}
                    {selectedEnquiry.emailStatus === 'endpoint-forwarded' && (
                      <span className="emerald-accent">Forwarded to Webhook</span>
                    )}
                    {!['sent', 'delivery-failed', 'sandbox-pending-emailjs', 'endpoint-forwarded'].includes(selectedEnquiry.emailStatus) && (
                      <span>{selectedEnquiry.emailStatus || 'Stored locally'}</span>
                    )}
                  </span>
                </div>

                <div className="spec-row">
                  <span className="spec-label">ORIGIN CHANNEL</span>
                  <span className="spec-val">{selectedEnquiry.clientOrigin || 'direct'}</span>
                </div>

                <div style={{ marginTop: '1.5rem' }}>
                  <label className="form-label hud-font">DISPATCH STATUS</label>
                  <select
                    value={selectedEnquiry.status}
                    onChange={(e) => handleUpdateStatus(selectedEnquiry.id, e.target.value)}
                    className="form-select"
                  >
                    <option value="new">NEW</option>
                    <option value="in-review">IN REVIEW</option>
                    <option value="contacted">CONTACTED</option>
                    <option value="in-progress">IN PROGRESS</option>
                    <option value="completed">COMPLETED</option>
                    <option value="archived">ARCHIVED</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteCandidate && (
        <div className="admin-modal-overlay" onClick={() => setDeleteCandidate(null)}>
          <div className="admin-modal-box" style={{ maxWidth: '460px' }} onClick={(e) => e.stopPropagation()}>
            <h3 className="hud-font" style={{ color: '#ef4444', marginBottom: '1rem' }}>
              PURGE TRANSMISSION
            </h3>
            <p style={{ color: 'var(--silver)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              Permanently purge dispatch <strong>{deleteCandidate.id}</strong> from {deleteCandidate.name}?
            </p>
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button className="btn-secondary" onClick={() => setDeleteCandidate(null)}>ABORT</button>
              <button className="btn-primary" style={{ background: '#ef4444', borderColor: '#ef4444' }} onClick={confirmDelete}>
                PURGE
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
