import React, { useState } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import { useAdminAuth } from '../context/AdminAuthContext';
import { store } from '../../services/storeService';

export default function AdminContact() {
  const { can } = useAdminAuth();

  const [contact, setContact] = useState(store.getContact());
  const [toast, setToast] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    if (!can('manage_contact')) return;

    store.saveContact(contact);
    setToast('Studio contact directives updated successfully.');
    setTimeout(() => setToast(''), 4000);
  };

  return (
    <AdminLayout currentModule="contact" moduleName="CONTACT DIRECTIVES">
      <div className="admin-page-header">
        <div className="admin-page-title-group">
          <h1>PUBLIC CONTACT & TELEMETRY</h1>
          <p className="admin-page-subtitle">
            Configure transmission channels, operational base coordinates, and confidentiality protocols.
          </p>
        </div>

        {can('manage_contact') && (
          <div className="admin-header-actions">
            <button type="button" className="btn-primary" onClick={handleSave}>
              SAVE DIRECTIVES
            </button>
          </div>
        )}
      </div>

      {toast && (
        <div className="submission-banner banner-success" style={{ marginBottom: '1.5rem', padding: '0.875rem 1.25rem' }}>
          <span>✔ {toast}</span>
        </div>
      )}

      <div className="contact-form-container" style={{ maxWidth: '900px' }}>
        <form onSubmit={handleSave}>
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label hud-font">PUBLIC INQUIRY EMAIL</label>
              <input
                type="email"
                value={contact.publicEmail}
                onChange={(e) => setContact({ ...contact, publicEmail: e.target.value })}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label hud-font">EXECUTIVE / BUSINESS EMAIL</label>
              <input
                type="email"
                value={contact.businessEmail}
                onChange={(e) => setContact({ ...contact, businessEmail: e.target.value })}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label hud-font">HEADQUARTERS REGION</label>
              <input
                type="text"
                value={contact.headquarters}
                onChange={(e) => setContact({ ...contact, headquarters: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label hud-font">GEOGRAPHICAL COORDINATES</label>
              <input
                type="text"
                value={contact.coordinates}
                onChange={(e) => setContact({ ...contact, coordinates: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label hud-font">RESPONSE DISPATCH WINDOW</label>
              <input
                type="text"
                value={contact.responseWindow}
                onChange={(e) => setContact({ ...contact, responseWindow: e.target.value })}
                className="form-input"
                placeholder="24 — 48 Business Hours"
              />
            </div>

            <div className="form-group">
              <label className="form-label hud-font">SECURITY PROTOCOL</label>
              <input
                type="text"
                value={contact.encryptionStatus}
                onChange={(e) => setContact({ ...contact, encryptionStatus: e.target.value })}
                className="form-input"
                placeholder="TLS 1.3 / AES-256"
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: '1.5rem' }}>
            <label className="form-label hud-font">CONFIDENTIALITY & NDA PROTOCOL DIRECTIVE</label>
            <textarea
              rows="3"
              value={contact.inquiryNotice}
              onChange={(e) => setContact({ ...contact, inquiryNotice: e.target.value })}
              className="form-textarea"
            />
          </div>

          {can('manage_contact') && (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button type="submit" className="btn-primary">
                SAVE DIRECTIVES
              </button>
            </div>
          )}
        </form>
      </div>
    </AdminLayout>
  );
}
