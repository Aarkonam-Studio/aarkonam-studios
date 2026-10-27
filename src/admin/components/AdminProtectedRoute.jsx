import React, { useEffect } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useRouter } from '../../context/RouterContext';
import { store } from '../../services/storeService';
import AdminLayout from '../layouts/AdminLayout';

export default function AdminProtectedRoute({ children, requiredPermission = 'view_dashboard', moduleName = 'SECURITY TERMINAL' }) {
  const { user, isAuthenticated, can, logout } = useAdminAuth();
  const { navigate, currentPath } = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  if (!isAuthenticated) {
    return (
      <div className="login-screen-wrapper">
        <div className="login-panel-box" style={{ textAlign: 'center', padding: '3rem 2rem' }}>
          <div className="spinner" style={{ margin: '0 auto 1.5rem auto' }} />
          <h2 className="hud-font" style={{ color: 'var(--text-primary)', fontSize: '1.125rem' }}>
            VERIFYING OPERATOR CLEARANCE...
          </h2>
          <p style={{ color: 'var(--silver)', fontSize: '0.8125rem', marginTop: '0.5rem' }}>
            Redirecting to security sign-in terminal.
          </p>
        </div>
      </div>
    );
  }

  // Check role-based permission
  const hasPermission = can(requiredPermission);

  if (!hasPermission) {
    // Audit unauthorized route access attempt
    store.logAudit(
      'UNAUTHORIZED_ROUTE_ATTEMPT',
      'SECURITY',
      user?.email || 'unknown',
      `Operator rank ${user?.role?.toUpperCase()} attempted unauthorized access to route: ${currentPath} (Requires: ${requiredPermission}).`,
      user?.name
    );

    return (
      <AdminLayout currentModule="restricted" moduleName={moduleName}>
        <div className="permission-denied-card">
          <div className="denied-icon">🛡</div>
          <h2 className="denied-title hud-font">CLEARANCE RESTRICTED // ACCESS DENIED</h2>
          <p className="denied-text">
            Your current operator clearance level (<strong>{user?.role?.toUpperCase()}</strong>) does not hold authorization to access the <strong>{moduleName}</strong> module.
          </p>
          <p style={{ fontSize: '0.75rem', color: 'var(--muted-text)', marginTop: '0.75rem' }}>
            This event has been logged to the immutable security audit stream. If you require escalated clearance, contact a Studio Owner.
          </p>
        </div>
      </AdminLayout>
    );
  }

  return children;
}
