import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useRouter } from '../../context/RouterContext';
import { store, subscribeToStore } from '../../services/storeService';
import '../styles/admin.css';

export default function AdminLayout({ children, currentModule = 'dashboard', moduleName = 'DASHBOARD' }) {
  const { user, isAuthenticated, logout, can } = useAdminAuth();
  const { navigate, currentPath } = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [clockTime, setClockTime] = useState('--:--');
  const [newEnquiryCount, setNewEnquiryCount] = useState(0);

  // Guard: if not authenticated, redirect to login
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  // Real-time clock and inquiries counter
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setClockTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false })
      );
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);

    const updateCounts = () => {
      const list = store.getEnquiries();
      const unread = list.filter((e) => e.status === 'new').length;
      setNewEnquiryCount(unread);
    };
    updateCounts();
    const unsub = subscribeToStore(updateCounts);

    return () => {
      clearInterval(timer);
      unsub();
    };
  }, []);

  const navItems = [
    { id: 'dashboard', label: '00 // DASHBOARD', path: '/admin', permission: 'view_dashboard' },
    { id: 'games', label: '01 // GAMES', path: '/admin/games', permission: 'view_content' },
    { id: 'projects', label: '02 // PROJECTS', path: '/admin/projects', permission: 'view_content' },
    { id: 'homepage', label: '03 // HOMEPAGE', path: '/admin/homepage', permission: 'view_content' },
    { id: 'team', label: '04 // TEAM', path: '/admin/team', permission: 'view_content' },
    { id: 'enquiries', label: '05 // ENQUIRIES', path: '/admin/enquiries', permission: 'manage_enquiries', badge: newEnquiryCount },
    { id: 'media', label: '06 // MEDIA LIBRARY', path: '/admin/media', permission: 'view_content' },
    { id: 'contact', label: '07 // CONTACT INFO', path: '/admin/contact', permission: 'manage_contact' },
    { id: 'seo', label: '08 // SEO DIRECTIVES', path: '/admin/seo', permission: 'manage_seo' },
    { id: 'announcements', label: '09 // ANNOUNCEMENTS', path: '/admin/announcements', permission: 'manage_announcements' },
    { id: 'users', label: '10 // ACCESS & ROLES', path: '/admin/users', permission: 'manage_users' },
    { id: 'settings', label: '11 // SYSTEM CORE', path: '/admin/settings', permission: 'view_dashboard' }
  ];

  if (!isAuthenticated) return null;

  return (
    <div className="admin-viewport">
      {/* Sidebar Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="mobile-drawer-overlay drawer-visible"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main Admin Sidebar */}
      <aside className={`admin-sidebar ${sidebarOpen ? 'sidebar-open' : ''}`}>
        <div className="sidebar-header">
          <div className="sidebar-brand">
            <img
              src="/icons/aarkonam-emblem.png"
              alt="Aarkonam Directorate"
              className="sidebar-emblem"
            />
            <span className="sidebar-brand-text">AARKONAM CMS</span>
          </div>
          <span className="sidebar-badge">{user?.role?.toUpperCase()}</span>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-title">CONTROL CENTER</div>
          {navItems.map((item) => {
            const hasAccess = can(item.permission);
            if (!hasAccess && item.permission === 'manage_users') return null;

            const isActive = currentPath === item.path || (item.path !== '/admin' && currentPath.startsWith(item.path));
            return (
              <button
                key={item.id}
                type="button"
                className={`admin-nav-item ${isActive ? 'active' : ''}`}
                onClick={() => {
                  setSidebarOpen(false);
                  navigate(item.path);
                }}
              >
                <span>{item.label}</span>
                {item.badge > 0 && <span className="nav-badge-pill">{item.badge}</span>}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-footer">
          <div className="user-mini-profile">
            <span className="user-name-label">{user?.name}</span>
            <span className="user-role-badge">{user?.title}</span>
          </div>
          <button
            type="button"
            className="btn-sidebar-logout"
            onClick={logout}
            title="Terminate operator session"
          >
            DISCONNECT
          </button>
        </div>
      </aside>

      {/* Main Content Column */}
      <div className="admin-main">
        <header className="admin-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <button
              type="button"
              className="admin-mobile-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle admin navigation"
            >
              ☰
            </button>
            <div className="admin-breadcrumbs">
              <span>ADMIN TERMINAL</span>
              <span className="breadcrumb-sep">/</span>
              <span className="breadcrumb-current">{moduleName}</span>
            </div>
          </div>

          <div className="topbar-actions">
            <span className="topbar-clock hud-font">{clockTime}</span>
            <button
              type="button"
              className="public-portal-link"
              onClick={() => navigate('/')}
            >
              <span>VIEW PUBLIC PORTAL</span>
              <span>↗</span>
            </button>
          </div>
        </header>

        <main className="admin-page-content">{children}</main>
      </div>
    </div>
  );
}
