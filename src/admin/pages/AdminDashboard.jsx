import React, { useState, useEffect } from 'react';
import AdminLayout from '../layouts/AdminLayout';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useRouter } from '../../context/RouterContext';
import { store, subscribeToStore } from '../../services/storeService';

export default function AdminDashboard() {
  const { user } = useAdminAuth();
  const { navigate } = useRouter();

  const [stats, setStats] = useState({
    publishedGames: 0,
    totalGames: 0,
    publishedProjects: 0,
    totalProjects: 0,
    unreadEnquiries: 0,
    totalEnquiries: 0,
    teamProfiles: 0,
    mediaAssets: 0
  });

  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [recentAuditLogs, setRecentAuditLogs] = useState([]);

  const refreshData = () => {
    const games = store.getGames();
    const projects = store.getProjects();
    const enquiries = store.getEnquiries();
    const team = store.getTeam();
    const media = store.getMedia();
    const logs = store.getAuditLogs();

    setStats({
      publishedGames: games.filter((g) => g.published !== false).length,
      totalGames: games.length,
      publishedProjects: projects.filter((p) => p.published !== false).length,
      totalProjects: projects.length,
      unreadEnquiries: enquiries.filter((e) => e.status === 'new').length,
      totalEnquiries: enquiries.length,
      teamProfiles: team.length,
      mediaAssets: media.length
    });

    setRecentEnquiries(enquiries.slice(0, 5));
    setRecentAuditLogs(logs.slice(0, 6));
  };

  useEffect(() => {
    refreshData();
    const unsub = subscribeToStore(refreshData);
    return () => unsub();
  }, []);

  return (
    <AdminLayout currentModule="dashboard" moduleName="DASHBOARD OVERVIEW">
      <div className="admin-page-header">
        <div className="admin-page-title-group">
          <div className="hud-tag gold" style={{ marginBottom: '6px' }}>
            OPERATOR CLEARANCE // {user?.role?.toUpperCase()}
          </div>
          <h1>SYSTEM TELEMETRY OVERVIEW</h1>
          <p className="admin-page-subtitle">
            Welcome back, {user?.name}. Studio real-time metrics and operational control streams.
          </p>
        </div>

        <div className="admin-header-actions">
          <button
            type="button"
            className="btn-primary"
            onClick={() => navigate('/admin/games')}
          >
            + REGISTER GAME
          </button>
        </div>
      </div>

      {/* Verified Live Metrics Grid */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="stat-label-row">
            <span>ACTIVE REALMS</span>
            <span className="hud-font">GAMES</span>
          </div>
          <div className="stat-num-val emerald-accent">{stats.publishedGames}</div>
          <p className="stat-subtext">
            {stats.totalGames} Total Registered ({stats.totalGames - stats.publishedGames} Drafts)
          </p>
        </div>

        <div className="admin-stat-card">
          <div className="stat-label-row">
            <span>APPLIED SYSTEMS</span>
            <span className="hud-font">PROJECTS</span>
          </div>
          <div className="stat-num-val emerald-accent">{stats.publishedProjects}</div>
          <p className="stat-subtext">
            {stats.totalProjects} Frameworks ({stats.totalProjects - stats.publishedProjects} Research Concept)
          </p>
        </div>

        <div className="admin-stat-card">
          <div className="stat-label-row">
            <span>TRANSMISSIONS</span>
            <span className="hud-font">ENQUIRIES</span>
          </div>
          <div className="stat-num-val gold-accent">{stats.unreadEnquiries}</div>
          <p className="stat-subtext">
            {stats.totalEnquiries} Total Submissions in Database
          </p>
        </div>

        <div className="admin-stat-card">
          <div className="stat-label-row">
            <span>MEDIA ASSETS</span>
            <span className="hud-font">ASSETS</span>
          </div>
          <div className="stat-num-val silver-text">{stats.mediaAssets}</div>
          <p className="stat-subtext">Optimized High-Res Assets Cataloged</p>
        </div>
      </div>

      {/* Quick Launchpad Actions */}
      <section style={{ marginBottom: '3rem' }}>
        <h3 className="hud-font" style={{ fontSize: '0.8125rem', letterSpacing: '0.2em', color: 'var(--antique-gold)', marginBottom: '1.25rem' }}>
          EXECUTIVE CONTROL LAUNCHPAD
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem' }}>
          <button
            type="button"
            className="admin-stat-card"
            style={{ textAlign: 'left', cursor: 'pointer' }}
            onClick={() => navigate('/admin/games')}
          >
            <span className="hud-font emerald-accent" style={{ fontSize: '0.75rem' }}>01 // GAMES</span>
            <h4 style={{ fontSize: '0.9375rem', marginTop: '6px', color: 'var(--text-primary)' }}>Manage Titles</h4>
            <small style={{ color: 'var(--muted-text)', fontSize: '0.6875rem' }}>Edit lore, specs & status</small>
          </button>

          <button
            type="button"
            className="admin-stat-card"
            style={{ textAlign: 'left', cursor: 'pointer' }}
            onClick={() => navigate('/admin/projects')}
          >
            <span className="hud-font emerald-accent" style={{ fontSize: '0.75rem' }}>02 // PROJECTS</span>
            <h4 style={{ fontSize: '0.9375rem', marginTop: '6px', color: 'var(--text-primary)' }}>Manage Systems</h4>
            <small style={{ color: 'var(--muted-text)', fontSize: '0.6875rem' }}>AI tools & engine pipelines</small>
          </button>

          <button
            type="button"
            className="admin-stat-card"
            style={{ textAlign: 'left', cursor: 'pointer' }}
            onClick={() => navigate('/admin/homepage')}
          >
            <span className="hud-font emerald-accent" style={{ fontSize: '0.75rem' }}>03 // HOMEPAGE</span>
            <h4 style={{ fontSize: '0.9375rem', marginTop: '6px', color: 'var(--text-primary)' }}>Terminal Hero</h4>
            <small style={{ color: 'var(--muted-text)', fontSize: '0.6875rem' }}>Background, title & banners</small>
          </button>

          <button
            type="button"
            className="admin-stat-card"
            style={{ textAlign: 'left', cursor: 'pointer' }}
            onClick={() => navigate('/admin/enquiries')}
          >
            <span className="hud-font gold-accent" style={{ fontSize: '0.75rem' }}>05 // ENQUIRIES</span>
            <h4 style={{ fontSize: '0.9375rem', marginTop: '6px', color: 'var(--text-primary)' }}>Transmission Relay</h4>
            <small style={{ color: 'var(--muted-text)', fontSize: '0.6875rem' }}>{stats.unreadEnquiries} unread dispatches</small>
          </button>
        </div>
      </section>

      {/* Two Column Section: Recent Inquiries & Activity Audit */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '2rem' }}>
        {/* Left: Recent Inquiries */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 className="hud-font" style={{ fontSize: '0.8125rem', letterSpacing: '0.18em', color: 'var(--silver)' }}>
              RECENT INQUIRIES & DISPATCHES
            </h3>
            <button
              type="button"
              className="hud-font"
              style={{ background: 'none', border: 'none', color: 'var(--emerald-cyan)', fontSize: '0.6875rem', cursor: 'pointer' }}
              onClick={() => navigate('/admin/enquiries')}
            >
              VIEW ALL DISPATCHES ›
            </button>
          </div>

          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>DISPATCH ID</th>
                  <th>ORIGIN</th>
                  <th>TYPE</th>
                  <th>STATUS</th>
                </tr>
              </thead>
              <tbody>
                {recentEnquiries.length === 0 ? (
                  <tr>
                    <td colSpan="4" style={{ textAlign: 'center', color: 'var(--muted-text)', padding: '2rem' }}>
                      No incoming transmissions registered.
                    </td>
                  </tr>
                ) : (
                  recentEnquiries.map((enq) => (
                    <tr key={enq.id} style={{ cursor: 'pointer' }} onClick={() => navigate('/admin/enquiries')}>
                      <td className="hud-font emerald-accent">{enq.id}</td>
                      <td>
                        <strong style={{ color: 'var(--text-primary)' }}>{enq.name}</strong>
                        <div style={{ fontSize: '0.75rem', color: 'var(--muted-text)' }}>{enq.organization || enq.email}</div>
                      </td>
                      <td style={{ fontSize: '0.8125rem' }}>{enq.inquiryType}</td>
                      <td>
                        <span className={`hud-tag ${enq.status === 'new' ? 'gold' : 'active'}`}>
                          {enq.status?.toUpperCase()}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Security & Operational Audit Log */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h3 className="hud-font" style={{ fontSize: '0.8125rem', letterSpacing: '0.18em', color: 'var(--silver)' }}>
              TERMINAL AUDIT TRAIL
            </h3>
            <span className="hud-tag" style={{ fontSize: '0.625rem' }}>ENCRYPTED LOG</span>
          </div>

          <div className="admin-table-container" style={{ padding: '1rem' }}>
            {recentAuditLogs.map((log) => (
              <div
                key={log.id}
                style={{
                  padding: '0.75rem 0',
                  borderBottom: '1px solid rgba(199, 205, 209, 0.08)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="hud-font emerald-accent" style={{ fontSize: '0.6875rem' }}>
                    {log.action}
                  </span>
                  <small style={{ color: 'var(--muted-text)', fontSize: '0.625rem' }}>
                    {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </small>
                </div>
                <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--silver)' }}>{log.details}</p>
                <small style={{ color: 'var(--antique-gold)', fontSize: '0.625rem' }}>By {log.actorName}</small>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
