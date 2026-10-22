import React, { useState, useEffect } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import { useAdminAuth } from '../context/AdminAuthContext';
import { store, subscribeToStore } from '../../services/storeService';
import ProjectCard from '../../components/ProjectCard';

export default function AdminProjects() {
  const { can } = useAdminAuth();

  const [projects, setProjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('ALL');
  const [previewProject, setPreviewProject] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [deleteCandidate, setDeleteCandidate] = useState(null);
  const [toast, setToast] = useState('');

  const loadData = () => {
    setProjects(store.getProjects());
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

  const filteredProjects = projects.filter((p) => {
    const matchesSearch =
      p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'ALL' || p.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const handleTogglePublish = (project) => {
    if (!can('publish_content')) return;
    const updated = { ...project, published: !project.published };
    store.saveProject(updated);
    showToast(`"${project.title}" is now ${updated.published ? 'PUBLISHED' : 'DRAFT'}.`);
  };

  const handleSave = (e) => {
    e.preventDefault();
    if (!can('edit_content')) return;

    if (!editingProject.title?.trim() || !editingProject.id?.trim()) {
      alert('Title and ID are required.');
      return;
    }

    // Parse tech stack comma string if needed
    let techStack = editingProject.techStack || [];
    if (typeof techStack === 'string') {
      techStack = techStack.split(',').map((s) => s.trim()).filter(Boolean);
    }

    const payload = {
      ...editingProject,
      techStack
    };

    store.saveProject(payload);
    showToast(`Project "${payload.title}" saved successfully.`);
    setEditingProject(null);
  };

  const confirmDelete = () => {
    if (!can('delete_content') || !deleteCandidate) return;
    store.deleteProject(deleteCandidate.id);
    showToast(`Project "${deleteCandidate.title}" purged.`);
    setDeleteCandidate(null);
  };

  return (
    <AdminLayout currentModule="projects" moduleName="PROJECTS MANAGEMENT">
      <div className="admin-page-header">
        <div className="admin-page-title-group">
          <h1>APPLIED SYSTEMS & RESEARCH</h1>
          <p className="admin-page-subtitle">
            Manage real-time world engines, autonomous AI behavioral architectures, and shader tools.
          </p>
        </div>

        {can('edit_content') && (
          <div className="admin-header-actions">
            <button
              type="button"
              className="btn-primary"
              onClick={() =>
                setEditingProject({
                  id: `proj-${Date.now()}`,
                  title: '',
                  category: 'ENGINE & TOOLS',
                  status: 'In Active Development',
                  scope: 'Core Technology Research',
                  metric: '60 FPS Target',
                  image: '/images/game-neo-aarkonam-dusk.jpg',
                  description: '',
                  techStack: ['WebGPU', 'C++', 'Vulkan'],
                  features: ['Procedural generation', 'Real-time simulation'],
                  published: true
                })
              }
            >
              + REGISTER PROJECT
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
            placeholder="Search projects..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="table-search-input"
          />

          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="table-filter-select"
          >
            <option value="ALL">ALL CATEGORIES</option>
            <option value="ENGINE & TOOLS">ENGINE & TOOLS</option>
            <option value="AI / AUTOMATION">AI / AUTOMATION</option>
            <option value="SYSTEMS & SOFTWARE">SYSTEMS & SOFTWARE</option>
          </select>
        </div>

        <table className="admin-table">
          <thead>
            <tr>
              <th>PROJECT TITLE</th>
              <th>CATEGORY</th>
              <th>BENCHMARK METRIC</th>
              <th>STATUS</th>
              <th>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {filteredProjects.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', color: 'var(--muted-text)', padding: '3rem' }}>
                  No projects matching filter criteria.
                </td>
              </tr>
            ) : (
              filteredProjects.map((proj) => (
                <tr key={proj.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img
                        src={proj.image}
                        alt=""
                        style={{ width: '48px', height: '32px', objectFit: 'cover', borderRadius: '2px' }}
                      />
                      <div>
                        <strong style={{ color: 'var(--text-primary)', display: 'block' }}>{proj.title}</strong>
                        <small className="hud-font" style={{ color: 'var(--muted-text)', fontSize: '0.625rem' }}>
                          ID: {proj.id}
                        </small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="hud-tag gold">{proj.category}</span>
                  </td>
                  <td className="hud-font emerald-accent" style={{ fontSize: '0.75rem' }}>
                    {proj.metric || 'N/A'}
                  </td>
                  <td>
                    <button
                      type="button"
                      className={`hud-tag ${proj.published !== false ? 'active' : 'gold'}`}
                      style={{ cursor: can('publish_content') ? 'pointer' : 'default' }}
                      onClick={() => handleTogglePublish(proj)}
                    >
                      {proj.published !== false ? '● PUBLISHED' : '○ DRAFT'}
                    </button>
                  </td>
                  <td>
                    <div className="table-actions-cell">
                      <button
                        type="button"
                        className="btn-action-icon"
                        onClick={() => setPreviewProject(proj)}
                      >
                        PREVIEW
                      </button>

                      {can('edit_content') && (
                        <button
                          type="button"
                          className="btn-action-icon"
                          onClick={() =>
                            setEditingProject({
                              ...proj,
                              techStack: Array.isArray(proj.techStack) ? proj.techStack.join(', ') : proj.techStack
                            })
                          }
                        >
                          EDIT
                        </button>
                      )}

                      {can('delete_content') && (
                        <button
                          type="button"
                          className="btn-action-icon btn-action-danger"
                          onClick={() => setDeleteCandidate(proj)}
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

      {/* Edit Form Modal */}
      {editingProject && (
        <div className="admin-modal-overlay" onClick={() => setEditingProject(null)}>
          <div className="admin-modal-box" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header-row">
              <h3 className="hud-font" style={{ color: 'var(--text-primary)', fontSize: '1.125rem' }}>
                EDIT PROJECT: {editingProject.title || 'NEW SYSTEM'}
              </h3>
              <button
                type="button"
                className="modal-close-x"
                onClick={() => setEditingProject(null)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSave}>
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label hud-font">PROJECT TITLE *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label hud-font">IDENTIFIER (SLUG) *</label>
                  <input
                    type="text"
                    required
                    value={editingProject.id}
                    onChange={(e) => setEditingProject({ ...editingProject, id: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label hud-font">CATEGORY</label>
                  <select
                    value={editingProject.category}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value })}
                    className="form-select"
                  >
                    <option value="ENGINE & TOOLS">ENGINE & TOOLS</option>
                    <option value="AI / AUTOMATION">AI / AUTOMATION</option>
                    <option value="SYSTEMS & SOFTWARE">SYSTEMS & SOFTWARE</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label hud-font">BENCHMARK / METRIC</label>
                  <input
                    type="text"
                    value={editingProject.metric || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, metric: e.target.value })}
                    className="form-input"
                    placeholder="e.g. 1.2M Concurrent Vectors"
                  />
                </div>

                <div className="form-group full-width">
                  <label className="form-label hud-font">TECH STACK (COMMA SEPARATED)</label>
                  <input
                    type="text"
                    value={editingProject.techStack || ''}
                    onChange={(e) => setEditingProject({ ...editingProject, techStack: e.target.value })}
                    className="form-input"
                    placeholder="WebGPU, Vulkan, C++, Compute Shaders"
                  />
                </div>
              </div>

              <div className="form-group" style={{ marginBottom: '1.25rem' }}>
                <label className="form-label hud-font">TECHNICAL DESCRIPTION</label>
                <textarea
                  rows="4"
                  value={editingProject.description || ''}
                  onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                  className="form-textarea"
                />
              </div>

              <div className="form-group" style={{ marginBottom: '1.5rem' }}>
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={editingProject.published !== false}
                    onChange={(e) => setEditingProject({ ...editingProject, published: e.target.checked })}
                    className="form-checkbox"
                  />
                  <span className="checkbox-custom" />
                  <span className="checkbox-text">Publish publicly in Projects catalog</span>
                </label>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button
                  type="button"
                  className="btn-secondary"
                  onClick={() => setEditingProject(null)}
                >
                  CANCEL
                </button>
                <button type="submit" className="btn-primary">
                  SAVE SYSTEM
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteCandidate && (
        <div className="admin-modal-overlay" onClick={() => setDeleteCandidate(null)}>
          <div className="admin-modal-box" style={{ maxWidth: '480px' }} onClick={(e) => e.stopPropagation()}>
            <h3 className="hud-font" style={{ color: '#ef4444', marginBottom: '1rem' }}>
              CONFIRM SYSTEM PURGE
            </h3>
            <p style={{ color: 'var(--silver)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
              Permanently delete <strong>"{deleteCandidate.title}"</strong>?
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

      {/* Preview Modal */}
      {previewProject && (
        <div className="admin-modal-overlay" onClick={() => setPreviewProject(null)}>
          <div className="admin-modal-box" style={{ maxWidth: '580px', padding: '1rem' }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5rem 1rem' }}>
              <span className="hud-font gold-accent">CARD PREVIEW</span>
              <button className="modal-close-x" onClick={() => setPreviewProject(null)}>✕</button>
            </div>
            <ProjectCard project={previewProject} />
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
