import React, { useState, useEffect } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import { useAdminAuth } from '../context/AdminAuthContext';
import { store, subscribeToStore } from '../../services/storeService';

export default function AdminHomepage() {
  const { can } = useAdminAuth();

  const [homepage, setHomepage] = useState(store.getHomepage());
  const [games, setGames] = useState([]);
  const [projects, setProjects] = useState([]);
  const [toast, setToast] = useState('');

  const refresh = () => {
    setHomepage(store.getHomepage());
    setGames(store.getGames());
    setProjects(store.getProjects());
  };

  useEffect(() => {
    refresh();
    const unsub = subscribeToStore(refresh);
    return () => unsub();
  }, []);

  const handleSave = (e) => {
    e.preventDefault();
    if (!can('edit_content')) return;

    store.saveHomepage(homepage);
    setToast('Homepage terminal configuration published successfully.');
    setTimeout(() => setToast(''), 4000);
  };

  return (
    <AdminLayout currentModule="homepage" moduleName="HOMEPAGE TERMINAL">
      <div className="admin-page-header">
        <div className="admin-page-title-group">
          <h1>HOMEPAGE TERMINAL CONFIGURATION</h1>
          <p className="admin-page-subtitle">
            Configure the signature cinematic game menu, focal typography, and background environment.
          </p>
        </div>

        {can('edit_content') && (
          <div className="admin-header-actions">
            <button type="button" className="btn-primary" onClick={handleSave}>
              PUBLISH TERMINAL CHANGES
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
        {/* Form Controls */}
        <div className="contact-form-container" style={{ padding: '2rem' }}>
          <form onSubmit={handleSave}>
            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <label className="form-label hud-font">CENTRAL TITLE</label>
              <input
                type="text"
                value={homepage.heroTitle}
                onChange={(e) => setHomepage({ ...homepage, heroTitle: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <label className="form-label hud-font">SUBTITLE / TRACKING</label>
              <input
                type="text"
                value={homepage.heroSubtitle}
                onChange={(e) => setHomepage({ ...homepage, heroSubtitle: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <label className="form-label hud-font">STUDIO TAGLINE</label>
              <input
                type="text"
                value={homepage.heroTagline}
                onChange={(e) => setHomepage({ ...homepage, heroTagline: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <label className="form-label hud-font">DESCRIPTIVE CREDO</label>
              <input
                type="text"
                value={homepage.heroSubnote}
                onChange={(e) => setHomepage({ ...homepage, heroSubnote: e.target.value })}
                className="form-input"
              />
            </div>

            <div className="form-group" style={{ marginBottom: '1.25rem' }}>
              <label className="form-label hud-font">BACKGROUND SCENE PATH</label>
              <select
                value={homepage.backgroundImage}
                onChange={(e) => setHomepage({ ...homepage, backgroundImage: e.target.value })}
                className="form-select"
              >
                <option value="/images/home-background.png">Neo-Aarkonam Metropolis (Default)</option>
                <option value="/images/studio-grand-archive.png">The Grand Emerald Archives</option>
                <option value="/images/game-emerald-flagship.jpg">Leviathan Flagship Seas</option>
                <option value="/images/game-gothic-citadel.jpg">Sanctum of the Void</option>
                <option value="/images/game-coastal-metropolis.jpg">Aetheria Coastal Skyline</option>
                <option value="/images/game-neo-aarkonam-dusk.jpg">World Engine Metropolis Dusk</option>
              </select>
            </div>

            <div className="form-grid">
              <div className="form-group">
                <label className="form-label hud-font">FEATURED GAME LINK</label>
                <select
                  value={homepage.featuredGameId || ''}
                  onChange={(e) => setHomepage({ ...homepage, featuredGameId: e.target.value })}
                  className="form-select"
                >
                  {games.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label className="form-label hud-font">RADAR COORDINATES</label>
                <input
                  type="text"
                  value={homepage.radarCoordinates || ''}
                  onChange={(e) => setHomepage({ ...homepage, radarCoordinates: e.target.value })}
                  className="form-input"
                />
              </div>
            </div>

            {can('edit_content') && (
              <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
                <button type="submit" className="btn-primary">
                  PUBLISH UPDATES
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Live Simulator Preview */}
        <div>
          <h3 className="hud-font" style={{ fontSize: '0.8125rem', letterSpacing: '0.18em', color: 'var(--silver)', marginBottom: '1rem' }}>
            TERMINAL COMPOSITION SIMULATOR
          </h3>

          <div
            style={{
              position: 'relative',
              aspectRatio: '16 / 10',
              borderRadius: '2px',
              overflow: 'hidden',
              border: '1px solid var(--border-emerald)',
              background: `url(${homepage.backgroundImage}) center/cover no-repeat`,
              boxShadow: '0 12px 32px rgba(0,0,0,0.6)'
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(180deg, rgba(5,7,6,0.6) 0%, rgba(5,7,6,0.85) 100%)'
              }}
            />

            <div
              style={{
                position: 'absolute',
                inset: 0,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                padding: '1.5rem'
              }}
            >
              <small className="hud-font" style={{ color: 'var(--antique-gold)', fontSize: '0.5625rem', letterSpacing: '0.2em' }}>
                {homepage.heroEyebrow}
              </small>
              <h2 style={{ fontSize: '1.75rem', letterSpacing: '0.24em', margin: '6px 0 2px', color: 'var(--text-primary)' }}>
                {homepage.heroTitle}
              </h2>
              <p className="hud-font" style={{ fontSize: '0.6875rem', letterSpacing: '0.4em', color: 'var(--silver)', margin: 0 }}>
                {homepage.heroSubtitle}
              </p>
              <div style={{ width: '40px', height: '1px', background: 'var(--emerald-cyan)', margin: '10px 0' }} />
              <p style={{ fontSize: '0.625rem', letterSpacing: '0.25em', color: 'var(--text-primary)', margin: 0 }}>
                {homepage.heroTagline}
              </p>
            </div>
          </div>

          <div style={{ marginTop: '1.5rem', padding: '1rem', background: 'rgba(6,59,44,0.15)', border: '1px solid var(--border-emerald)' }}>
            <span className="hud-font emerald-accent" style={{ fontSize: '0.6875rem' }}>INTEGRITY ASSURANCE</span>
            <p style={{ fontSize: '0.75rem', color: 'var(--muted-text)', margin: '4px 0 0', lineHeight: '1.5' }}>
              The public homepage includes fallback defaults. Even if a background asset or title is empty, the terminal uses safe defaults to maintain unbroken uptime.
            </p>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
