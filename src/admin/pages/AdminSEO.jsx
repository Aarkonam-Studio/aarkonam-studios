import React, { useState } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import { useAdminAuth } from '../context/AdminAuthContext';
import { store } from '../../services/storeService';

export default function AdminSEO() {
  const { can } = useAdminAuth();

  const [seo, setSeo] = useState(store.getSEO());
  const [toast, setToast] = useState('');

  const handleSave = (e) => {
    e.preventDefault();
    if (!can('manage_seo')) return;

    store.saveSEO(seo);
    setToast('Search & Social metadata directives updated.');
    setTimeout(() => setToast(''), 4000);
  };

  return (
    <AdminLayout currentModule="seo" moduleName="SEO DIRECTIVES">
      <div className="admin-page-header">
        <div className="admin-page-title-group">
          <h1>SEARCH ENGINE & METADATA DIRECTIVES</h1>
          <p className="admin-page-subtitle">
            Configure canonical indexing, OpenGraph card metadata, robots directives, and crawler rules.
          </p>
        </div>

        {can('manage_seo') && (
          <div className="admin-header-actions">
            <button type="button" className="btn-primary" onClick={handleSave}>
              SAVE METADATA
            </button>
          </div>
        )}
      </div>

      {toast && (
        <div className="submission-banner banner-success" style={{ marginBottom: '1.5rem', padding: '0.875rem 1.25rem' }}>
          <span>✔ {toast}</span>
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '2.5rem' }}>
        <div className="contact-form-container" style={{ padding: '2rem' }}>
          <form onSubmit={handleSave}>
            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <label className="form-label hud-font">GLOBAL SITE TITLE</label>
              <input
                type="text"
                value={seo.siteTitle}
                onChange={(e) => setSeo({ ...seo, siteTitle: e.target.value })}
                className="form-input"
                required
              />
            </div>

            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <label className="form-label hud-font">META DESCRIPTION</label>
              <textarea
                rows="3"
                value={seo.siteDescription}
                onChange={(e) => setSeo({ ...seo, siteDescription: e.target.value })}
                className="form-textarea"
                required
              />
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label hud-font">CANONICAL DOMAIN</label>
                <input
                  type="text"
                  value={seo.canonicalDomain}
                  onChange={(e) => setSeo({ ...seo, canonicalDomain: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label hud-font">ROBOTS CRAWLER DIRECTIVE</label>
                <select
                  value={seo.robots}
                  onChange={(e) => setSeo({ ...seo, robots: e.target.value })}
                  className="form-select"
                >
                  <option value="index, follow">index, follow (Default / Public)</option>
                  <option value="noindex, follow">noindex, follow</option>
                  <option value="noindex, nofollow">noindex, nofollow (Strict Sandbox)</option>
                </select>
              </div>

              <div className="form-group">
                <label className="form-label hud-font">OPENGRAPH HERO IMAGE</label>
                <input
                  type="text"
                  value={seo.ogImage}
                  onChange={(e) => setSeo({ ...seo, ogImage: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label className="form-label hud-font">TWITTER / X HANDLE</label>
                <input
                  type="text"
                  value={seo.twitterHandle}
                  onChange={(e) => setSeo({ ...seo, twitterHandle: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>

            {can('manage_seo') && (
              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" className="btn-primary">
                  SAVE METADATA
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Live Search Snippet Simulator */}
        <div>
          <h3 className="hud-font" style={{ fontSize: '0.8125rem', letterSpacing: '0.18em', color: 'var(--silver)', marginBottom: '1rem' }}>
            SEARCH RESULT PREVIEW SIMULATOR
          </h3>

          <div style={{ background: '#202124', padding: '1.5rem', borderRadius: '4px', border: '1px solid #3c4043', marginBottom: '2rem' }}>
            <span style={{ fontSize: '0.75rem', color: '#bdc1c6' }}>{seo.canonicalDomain}</span>
            <h4 style={{ color: '#8ab4f8', fontSize: '1.125rem', margin: '4px 0 6px', fontWeight: '400' }}>
              {seo.siteTitle}
            </h4>
            <p style={{ color: '#bdc1c6', fontSize: '0.8125rem', lineHeight: '1.5', margin: 0 }}>
              {seo.siteDescription}
            </p>
          </div>

          <h3 className="hud-font" style={{ fontSize: '0.8125rem', letterSpacing: '0.18em', color: 'var(--silver)', marginBottom: '1rem' }}>
            SOCIAL CARD SIMULATOR (OPENGRAPH)
          </h3>

          <div style={{ background: 'var(--surface-panel)', border: '1px solid var(--border-emerald)', borderRadius: '2px', overflow: 'hidden' }}>
            <img
              src={seo.ogImage}
              alt=""
              style={{ width: '100%', height: '140px', objectFit: 'cover' }}
            />
            <div style={{ padding: '1rem' }}>
              <span className="hud-font" style={{ fontSize: '0.625rem', color: 'var(--antique-gold)' }}>AARKONAMSTUDIOS.COM</span>
              <h4 style={{ fontSize: '0.9375rem', color: 'var(--text-primary)', margin: '4px 0' }}>{seo.siteTitle}</h4>
              <p style={{ fontSize: '0.75rem', color: 'var(--muted-text)', margin: 0, lineClamp: 2 }}>{seo.siteDescription}</p>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
