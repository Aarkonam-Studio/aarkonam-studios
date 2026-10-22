import React, { useState, useEffect } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import { useAdminAuth } from '../context/AdminAuthContext';
import { store, subscribeToStore } from '../../services/storeService';

export default function AdminMedia() {
  const { can } = useAdminAuth();

  const [media, setMedia] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [toast, setToast] = useState('');

  // Upload simulation state
  const [uploadName, setUploadName] = useState('');
  const [uploadCategory, setUploadCategory] = useState('Environments');
  const [uploadPath, setUploadPath] = useState('');

  const loadData = () => {
    setMedia(store.getMedia());
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

  const filteredMedia = media.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.alt?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'ALL' || m.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleCopyPath = (path) => {
    navigator.clipboard?.writeText(path);
    showToast(`Path "${path}" copied to clipboard!`);
  };

  const handleRegisterAsset = (e) => {
    e.preventDefault();
    if (!can('upload_media')) return;

    if (!uploadName.trim() || !uploadPath.trim()) {
      alert('Asset filename and path are required.');
      return;
    }

    store.addMedia({
      name: uploadName.trim(),
      path: uploadPath.trim(),
      category: uploadCategory,
      type: uploadName.endsWith('.png') ? 'image/png' : 'image/jpeg',
      size: '450 KB',
      dimensions: '1920 × 1080',
      alt: uploadName
    });

    setUploadName('');
    setUploadPath('');
    showToast(`Asset "${uploadName}" registered into library.`);
  };

  const confirmDelete = () => {
    if (!can('delete_content') || !deleteCandidate) return;
    store.deleteMedia(deleteCandidate.id);
    if (selectedAsset?.id === deleteCandidate.id) setSelectedAsset(null);
    showToast(`Asset "${deleteCandidate.name}" removed from library.`);
    setDeleteCandidate(null);
  };

  return (
    <AdminLayout currentModule="media" moduleName="MEDIA LIBRARY">
      <div className="admin-page-header">
        <div className="admin-page-title-group">
          <h1>CINEMATIC MEDIA LIBRARY</h1>
          <p className="admin-page-subtitle">
            Manage high-resolution studio artwork, official branding assets, and environments.
          </p>
        </div>
      </div>

      {toast && (
        <div className="submission-banner banner-success" style={{ marginBottom: '1.5rem', padding: '0.875rem 1.25rem' }}>
          <span>✔ {toast}</span>
        </div>
      )}

      {/* Asset Registration Box */}
      {can('upload_media') && (
        <div className="contact-form-container" style={{ padding: '1.5rem', marginBottom: '2rem' }}>
          <h4 className="hud-font" style={{ fontSize: '0.75rem', letterSpacing: '0.18em', color: 'var(--antique-gold)', marginBottom: '1rem' }}>
            + REGISTER STUDIO MEDIA ASSET
          </h4>
          <form onSubmit={handleRegisterAsset} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.5fr 1fr auto', gap: '12px', alignItems: 'flex-end' }}>
            <div>
              <label className="form-label hud-font" style={{ fontSize: '0.625rem' }}>ASSET FILENAME</label>
              <input
                type="text"
                placeholder="e.g. game-trailer-poster.jpg"
                value={uploadName}
                onChange={(e) => setUploadName(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div>
              <label className="form-label hud-font" style={{ fontSize: '0.625rem' }}>INTERNAL URL / PATH</label>
              <input
                type="text"
                placeholder="/images/game-poster.jpg"
                value={uploadPath}
                onChange={(e) => setUploadPath(e.target.value)}
                className="form-input"
                required
              />
            </div>
            <div>
              <label className="form-label hud-font" style={{ fontSize: '0.625rem' }}>CATEGORY</label>
              <select
                value={uploadCategory}
                onChange={(e) => setUploadCategory(e.target.value)}
                className="form-select"
              >
                <option value="Environments">Environments</option>
                <option value="Realms">Realms & Games</option>
                <option value="Branding">Branding & Seals</option>
                <option value="Systems">Systems & Research</option>
              </select>
            </div>
            <button type="submit" className="btn-primary" style={{ padding: '0.75rem 1.25rem' }}>
              REGISTER
            </button>
          </form>
        </div>
      )}

      {/* Toolbar */}
      <div className="table-toolbar" style={{ borderRadius: '2px 2px 0 0', background: 'rgba(7,18,15,0.7)', border: '1px solid var(--border-emerald)', borderBottom: 'none' }}>
        <input
          type="text"
          placeholder="Search media by filename or tag..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="table-search-input"
        />

        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="table-filter-select"
        >
          <option value="ALL">ALL CATEGORIES</option>
          <option value="Branding">Branding</option>
          <option value="Environments">Environments</option>
          <option value="Realms">Realms</option>
          <option value="Systems">Systems</option>
        </select>
      </div>

      {/* Media Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
          gap: '1.5rem',
          background: 'var(--surface-panel)',
          border: '1px solid var(--border-emerald)',
          padding: '1.5rem',
          borderRadius: '0 0 2px 2px'
        }}
      >
        {filteredMedia.map((asset) => (
          <div
            key={asset.id}
            style={{
              background: 'rgba(5,7,6,0.7)',
              border: '1px solid var(--border-faint)',
              borderRadius: '2px',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            <div
              style={{
                height: '140px',
                background: 'var(--void-black)',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
              onClick={() => setSelectedAsset(asset)}
            >
              <img
                src={asset.path}
                alt={asset.alt || asset.name}
                style={{ width: '100%', height: '100%', objectFit: asset.category === 'Branding' ? 'contain' : 'cover' }}
              />
              <span className="hud-tag gold" style={{ position: 'absolute', top: '8px', left: '8px', fontSize: '0.5625rem' }}>
                {asset.category}
              </span>
            </div>

            <div style={{ padding: '0.875rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
              <strong style={{ fontSize: '0.8125rem', color: 'var(--text-primary)', wordBreak: 'break-all', marginBottom: '4px' }}>
                {asset.name}
              </strong>
              <small style={{ color: 'var(--muted-text)', fontSize: '0.6875rem' }}>
                {asset.dimensions} · {asset.size}
              </small>

              <div style={{ display: 'flex', gap: '6px', marginTop: '1rem' }}>
                <button
                  type="button"
                  className="btn-action-icon"
                  style={{ flex: 1, textAlign: 'center' }}
                  onClick={() => handleCopyPath(asset.path)}
                >
                  COPY URL
                </button>
                {can('delete_content') && (
                  <button
                    type="button"
                    className="btn-action-icon btn-action-danger"
                    onClick={() => setDeleteCandidate(asset)}
                  >
                    PURGE
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Asset Preview Modal */}
      {selectedAsset && (
        <div className="admin-modal-overlay" onClick={() => setSelectedAsset(null)}>
          <div className="admin-modal-box" style={{ maxWidth: '720px' }} onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-row">
              <h3 className="hud-font" style={{ color: 'var(--text-primary)', fontSize: '1.125rem' }}>
                {selectedAsset.name}
              </h3>
              <button className="modal-close-x" onClick={() => setSelectedAsset(null)}>✕</button>
            </div>

            <div style={{ background: 'var(--void-black)', textAlign: 'center', padding: '1rem', marginBottom: '1.5rem', maxHeight: '380px', overflow: 'hidden' }}>
              <img
                src={selectedAsset.path}
                alt={selectedAsset.name}
                style={{ maxWidth: '100%', maxHeight: '340px', objectFit: 'contain', margin: '0 auto' }}
              />
            </div>

            <div className="form-grid">
              <div className="spec-row">
                <span className="spec-label">FILE PATH</span>
                <span className="spec-val emerald-accent">{selectedAsset.path}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">DIMENSIONS</span>
                <span className="spec-val">{selectedAsset.dimensions}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">FILE SIZE</span>
                <span className="spec-val">{selectedAsset.size}</span>
              </div>
              <div className="spec-row">
                <span className="spec-label">MIME TYPE</span>
                <span className="spec-val">{selectedAsset.type}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteCandidate && (
        <div className="admin-modal-overlay" onClick={() => setDeleteCandidate(null)}>
          <div className="admin-modal-box" style={{ maxWidth: '440px' }} onClick={(e) => e.stopPropagation()}>
            <h3 className="hud-font" style={{ color: '#ef4444', marginBottom: '1rem' }}>
              CONFIRM MEDIA PURGE
            </h3>
            <p style={{ color: 'var(--silver)', marginBottom: '1.5rem' }}>
              Are you sure you want to delete <strong>{deleteCandidate.name}</strong>? Ensure it is not active on published games or homepage.
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
