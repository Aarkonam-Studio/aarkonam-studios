import React, { useState, useEffect } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import { useAdminAuth } from '../context/AdminAuthContext';
import { store, subscribeToStore } from '../../services/storeService';
import GameModal from '../../components/GameModal';

export default function AdminGames() {
  const { can } = useAdminAuth();

  const [games, setGames] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [previewGame, setPreviewGame] = useState(null);
  const [editingGame, setEditingGame] = useState(null);
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [toast, setToast] = useState('');

  const loadData = () => {
    setGames(store.getGames());
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

  const filteredGames = games.filter((g) => {
    const matchesSearch =
      g.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      g.genre.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filterStatus === 'ALL' ||
      (filterStatus === 'PUBLISHED' && g.published !== false) ||
      (filterStatus === 'DRAFT' && g.published === false);
    return matchesSearch && matchesFilter;
  });

  const handleTogglePublish = (game) => {
    if (!can('publish_content')) return;
    const updated = { ...game, published: !game.published };
    store.saveGame(updated);
    showToast(`"${game.title}" is now ${updated.published ? 'PUBLISHED' : 'DRAFT'}.`);
  };

  const handleSaveForm = (e) => {
    e.preventDefault();
    if (!can('edit_content')) return;

    if (!editingGame.title?.trim() || !editingGame.id?.trim()) {
      alert('Title and Unique ID are required.');
      return;
    }

    store.saveGame(editingGame);
    showToast(`Game "${editingGame.title}" saved successfully.`);
    setEditingGame(null);
  };

  const confirmDelete = () => {
    if (!can('delete_content') || !deleteCandidate) return;
    store.deleteGame(deleteCandidate.id);
    showToast(`Game "${deleteCandidate.title}" permanently removed.`);
    setDeleteCandidate(null);
  };

  return (
    <AdminLayout currentModule="games" moduleName="GAMES MANAGEMENT">
      <div className="admin-page-header">
        <div className="admin-page-title-group">
          <h1>REALMS & GAMES ARCHIVE</h1>
          <p className="admin-page-subtitle">
            Configure titles, lore excerpts, platform specifications, and publication states.
          </p>
        </div>

        {can('edit_content') && (
          <div className="admin-header-actions">
            <button
              type="button"
              className="btn-primary"
              onClick={() =>
                setEditingGame({
                  id: `game-${Date.now()}`,
                  title: '',
                  tagline: '',
                  genre: 'Dark Fantasy / Action RPG',
                  status: 'In Active Development',
                  platforms: ['PC', 'Next-Gen Platforms'],
                  image: '/images/game-emerald-flagship.jpg',
                  leadArtwork: '/images/game-emerald-flagship.jpg',
                  description: '',
                  features: ['Dynamic environmental simulation', 'Tactical combat mechanics'],
                  technicalHighlights: '4K HDR Lighting, custom shaders',
                  loreSnippet: '',
                  published: false,
                  featured: false
                })
              }
            >
              + NEW REALM TITLE
            </button>
          </div>
        )}
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
            placeholder="Search by title or genre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="table-search-input"
          />

          <div style={{ display: 'flex', gap: '10px' }}>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="table-filter-select"
            >
              <option value="ALL">ALL STATES</option>
              <option value="PUBLISHED">PUBLISHED ONLY</option>
              <option value="DRAFT">DRAFTS ONLY</option>
            </select>
          </div>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>REALM TITLE</th>
              <th>GENRE</th>
              <th>STATUS</th>
              <th>VISIBILITY</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredGames.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', color: 'var(--muted-text)', padding: '3rem' }}>
                  No game records matching search query.
                </td>
              </tr>
            ) : (
              filteredGames.map((game) => (
                <tr key={game.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img
                        src={game.image}
                        alt=""
                        style={{ width: '48px', height: '32px', objectFit: 'cover', borderRadius: '2px' }}
                      />
                      <div>
                        <strong style={{ color: 'var(--text-primary)', display: 'block' }}>{game.title}</strong>
                        <small className="hud-font" style={{ color: 'var(--antique-gold)', fontSize: '0.625rem' }}>
                          ID: {game.id} {game.featured ? '★ FEATURED' : ''}
                        </small>
                      </div>
                    </div>
                  </td>
                  <td>{game.genre}</td>
                  <td>
                    <span className="hud-tag active">{game.status}</span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className={`hud-tag ${game.published !== false ? 'active' : 'gold'}`}
                      style={{ cursor: can('publish_content') ? 'pointer' : 'default' }}
                      onClick={() => handleTogglePublish(game)}
                      title="Click to toggle published / draft state"
                    >
                      {game.published !== false ? '● PUBLISHED' : '○ DRAFT'}
                    </button>
                  </td>
                  <td>
                    <div className="table-actions-cell">
                      <button
                        type="button"
                        className="btn-action-icon"
                        onClick={() => setPreviewGame(game)}
                        title="Preview Public Modal"
                      >
                        PREVIEW
                      </button>

                      {can('edit_content') && (
                        <button
                          type="button"
                          className="btn-action-icon"
                          onClick={() => setEditingGame({ ...game })}
                          title="Edit Game"
                        >
                          EDIT
                        </button>
                      )}

                      {can('delete_content') && (
                        <button
                          type="button"
                          className="btn-action-icon btn-action-danger"
                          onClick={() => setDeleteCandidate(game)}
                          title="Delete Game"
                        >
                          DELETE
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Edit / Create Game Modal Form */}
      {editingGame && (
        <div className="admin-modal-overlay" onClick={() => setEditingGame(null)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-row">
              <h3 className="hud-font" style={{ color: 'var(--text-primary)', fontSize: '1.125rem' }}>
                {editingGame.id ? `EDIT RECORD: ${editingGame.title || 'NEW GAME'}` : 'REGISTER NEW GAME'}
              </h3>
              <button
                type="button"
                className="modal-close-x"
                onClick={() => setEditingGame(null)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveForm}>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label hud-font">TITLE *</label>
                  <input
                    type="text"
                    required
                    value={editingGame.title}
                    onChange={(e) => setEditingGame({ ...editingGame, title: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label hud-font">UNIQUE SLUG / ID *</label>
                  <input
                    type="text"
                    required
                    value={editingGame.id}
                    onChange={(e) => setEditingGame({ ...editingGame, id: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label hud-font">TAGLINE</label>
                  <input
                    type="text"
                    value={editingGame.tagline || ''}
                    onChange={(e) => setEditingGame({ ...editingGame, tagline: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label hud-font">GENRE</label>
                  <input
                    type="text"
                    value={editingGame.genre || ''}
                    onChange={(e) => setEditingGame({ ...editingGame, genre: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label hud-font">DEV STATUS</label>
                  <input
                    type="text"
                    value={editingGame.status || ''}
                    onChange={(e) => setEditingGame({ ...editingGame, status: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label hud-font">HERO IMAGE PATH</label>
                  <input
                    type="text"
                    value={editingGame.image || ''}
                    onChange={(e) =>
                      setEditingGame({
                        ...editingGame,
                        image: e.target.value,
                        leadArtwork: e.target.value
                      })
                    }
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label className="form-label hud-font">SYNOPSIS & DESCRIPTION</label>
                <textarea
                  rows="4"
                  value={editingGame.description || ''}
                  onChange={(e) => setEditingGame({ ...editingGame, description: e.target.value })}
                  className="form-textarea"
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label className="form-label hud-font">LORE EXCERPT / QUOTE</label>
                <textarea
                  rows="2"
                  value={editingGame.loreSnippet || ''}
                  onChange={(e) => setEditingGame({ ...editingGame, loreSnippet: e.target.value })}
                  className="form-textarea"
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={editingGame.published !== false}
                    onChange={(e) => setEditingGame({ ...editingGame, published: e.target.checked })}
                    className="form-checkbox"
                  />
                  <span className="checkbox-custom" />
                  <span className="checkbox-text">Publish publicly on the public Games page</span>
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setEditingGame(null)}
                >
                  CANCEL
                </button>
                <button type="submit" className="btn-primary">
                  SAVE REALM CHANGES
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteCandidate && (
        <div className="admin-modal-overlay" onClick={() => setDeleteCandidate(null)}>
          <div className="admin-modal-box" style={{ maxWidth: '480px' }} onClick={(e) => e.stopPropagation()}>
            <h3 className="hud-font" style={{ color: '#ef4444', marginBottom: '1rem' }}>
              CONFIRM REALM PURGE
            </h3>
            <p style={{ color: 'var(--silver)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              Are you sure you want to permanently delete <strong>"{deleteCandidate.title}"</strong>? This will remove the title from public catalog and admin database.
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
                PURGE RECORD
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Public Preview Modal */}
      {previewGame && (
        <GameModal game={previewGame} onClose={() => setPreviewGame(null)} />
      )}
    </AdminLayout>
  );
}
