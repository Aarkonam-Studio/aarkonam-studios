import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { store } from '../../services/storeService';

const AdminAuthContext = createContext(null);
const SESSION_STORAGE_KEY = 'ark_admin_session_token';

// Preset demonstration credentials for authorized studio personnel
// In enterprise deployment, authentication delegates to Firebase Auth or Identity Provider.
const AUTHORIZED_CREDENTIALS = {
  'director@aarkonam.internal': {
    role: 'owner',
    name: 'Safin Mulani',
    title: 'Chief Executive Officer',
    hash: 'ark-noir-director-2026'
  },
  'cto@aarkonam.internal': {
    role: 'admin',
    name: 'Mohd Sumair',
    title: 'Chief Technology Officer',
    hash: 'ark-noir-systems-2026'
  },
  'finance@aarkonam.internal': {
    role: 'editor',
    name: 'Adeba Firdous',
    title: 'Chief Financial Officer',
    hash: 'ark-noir-finance-2026'
  },
  'auditor@aarkonam.internal': {
    role: 'viewer',
    name: 'Security Auditor',
    title: 'Compliance Reviewer',
    hash: 'ark-noir-audit-2026'
  }
};

export function AdminAuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    if (typeof window === 'undefined') return null;
    try {
      const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  // Synchronize with store updates if user's role is modified
  useEffect(() => {
    if (!currentUser) return;
    const users = store.getUsers();
    const liveRecord = users.find((u) => u.email === currentUser.email);
    if (liveRecord && liveRecord.role !== currentUser.role) {
      const updated = { ...currentUser, role: liveRecord.role };
      setCurrentUser(updated);
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(updated));
    }
  }, [currentUser]);

  const login = useCallback(async (email, password) => {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 600)); // Controlled latency

    const cleanEmail = email.trim().toLowerCase();
    const cred = AUTHORIZED_CREDENTIALS[cleanEmail];

    // Check credentials against authorized registry
    if (!cred || password !== cred.hash) {
      setLoading(false);
      store.logAudit('AUTH_FAILURE', 'SECURITY', cleanEmail, 'Failed authorization attempt from terminal.');
      throw new Error('Access Denied: Invalid transmission credentials or unlisted operator.');
    }

    // Verify user is not disabled in store
    const users = store.getUsers();
    const userRecord = users.find((u) => u.email.toLowerCase() === cleanEmail);
    if (userRecord && userRecord.active === false) {
      setLoading(false);
      store.logAudit('AUTH_BLOCKED', 'SECURITY', cleanEmail, 'Attempted login by deactivated account.');
      throw new Error('Operator account has been suspended by the Director.');
    }

    const sessionPayload = {
      id: userRecord?.id || `usr-${Date.now()}`,
      email: cleanEmail,
      name: cred.name,
      role: userRecord?.role || cred.role,
      title: cred.title,
      sessionIssued: new Date().toISOString()
    };

    setCurrentUser(sessionPayload);
    try {
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionPayload));
    } catch (e) {
      console.error('[Aarkonam Auth] Session storage error:', e);
    }

    store.logAudit('AUTH_SUCCESS', 'SECURITY', cleanEmail, `Operator ${cred.name} (${sessionPayload.role}) authenticated.`, cred.name);
    setLoading(false);
    return sessionPayload;
  }, []);

  const logout = useCallback(() => {
    if (currentUser) {
      store.logAudit('AUTH_LOGOUT', 'SECURITY', currentUser.email, `Operator ${currentUser.name} logged out.`, currentUser.name);
    }
    setCurrentUser(null);
    try {
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
    } catch {}
  }, [currentUser]);

  // Role-Based Authorization Policy
  const can = useCallback(
    (action) => {
      if (!currentUser) return false;
      const { role } = currentUser;

      switch (action) {
        // Owner only
        case 'manage_users':
        case 'manage_security':
        case 'clear_audit':
          return role === 'owner';

        // Owner and Admin
        case 'manage_enquiries':
        case 'manage_contact':
        case 'manage_seo':
        case 'manage_announcements':
          return role === 'owner' || role === 'admin';

        // Owner, Admin, and Editor
        case 'edit_content':
        case 'publish_content':
        case 'delete_content':
        case 'upload_media':
          return role === 'owner' || role === 'admin' || role === 'editor';

        // Viewer (Read-only permitted data)
        case 'view_dashboard':
        case 'view_content':
          return true;

        default:
          return false;
      }
    },
    [currentUser]
  );

  return (
    <AdminAuthContext.Provider
      value={{
        user: currentUser,
        isAuthenticated: Boolean(currentUser),
        role: currentUser?.role || 'anonymous',
        can,
        login,
        logout,
        loading
      }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
}

export function useAdminAuth() {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error('useAdminAuth must be used within an AdminAuthProvider');
  }
  return context;
}
