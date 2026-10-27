import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { store } from '../../services/storeService';
import {
  verifyPassword,
  checkRateLimit,
  resetRateLimit,
  isSessionFresh,
  sanitizePlainText
} from '../../services/securityService';

const AdminAuthContext = createContext(null);
const SESSION_STORAGE_KEY = 'ark_admin_session_token';

// Cryptographically salted SHA-256 hashes for authorized studio personnel.
// In enterprise deployment, authentication delegates to Firebase Auth or Identity Provider.
const AUTHORIZED_CREDENTIALS = {
  'director@aarkonam.internal': {
    role: 'owner',
    name: 'Safin Mulani',
    title: 'Chief Executive Officer',
    salt: 'ark_salt_owner_9f81',
    passwordHash: 'b5ab0718bbba11c7712bc9da461f88e3c3253cae5c3bf7cfe12023cc1d5ea09e'
  },
  'cto@aarkonam.internal': {
    role: 'admin',
    name: 'Mohd Sumair',
    title: 'Chief Technology Officer',
    salt: 'ark_salt_admin_4a2c',
    passwordHash: '42dc876349df8de5d950db82e5609afab907d35210c7c8f61709eb1010df52b9'
  },
  'finance@aarkonam.internal': {
    role: 'editor',
    name: 'Adeba Firdous',
    title: 'Chief Financial Officer',
    salt: 'ark_salt_editor_7d1b',
    passwordHash: '2c162c25826a6d514427de8d82c535ee94e290b87d291a1e020addd1839c9cec'
  },
  'auditor@aarkonam.internal': {
    role: 'viewer',
    name: 'Security Auditor',
    title: 'Compliance Reviewer',
    salt: 'ark_salt_viewer_3e5f',
    passwordHash: '46e04e800da484a23c280b15a5e732a37bb0d4cea925699155360d122ac9e243'
  }
};

export function AdminAuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(() => {
    if (typeof window === 'undefined') return null;
    try {
      const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
      if (!stored) return null;
      const parsed = JSON.parse(stored);
      if (isSessionFresh(parsed)) {
        return parsed;
      }
      // Expired session
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
      return null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState(false);

  // Synchronize with store updates if user's role is modified or account deactivated
  useEffect(() => {
    if (!currentUser) return;
    const users = store.getUsers();
    const liveRecord = users.find((u) => u.email === currentUser.email);
    if (liveRecord) {
      if (liveRecord.active === false) {
        // Account deactivated while logged in: force immediate revocation
        store.logAudit('SESSION_REVOKED', 'SECURITY', currentUser.email, 'Active session terminated due to account deactivation.');
        setCurrentUser(null);
        sessionStorage.removeItem(SESSION_STORAGE_KEY);
        return;
      }
      if (liveRecord.role !== currentUser.role) {
        const updated = { ...currentUser, role: liveRecord.role };
        setCurrentUser(updated);
        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(updated));
      }
    }
  }, [currentUser]);

  const login = useCallback(async (email, password) => {
    setLoading(true);

    const cleanEmail = sanitizePlainText(email, 120).toLowerCase();

    // 1. Enforce brute-force rate limit: max 5 failed attempts per 5 minutes
    const rateLimit = checkRateLimit('admin_login', 5, 5 * 60 * 1000);
    if (!rateLimit.allowed) {
      setLoading(false);
      store.logAudit(
        'AUTH_BRUTE_FORCE_LOCKOUT',
        'SECURITY',
        cleanEmail,
        `Terminal locked out after excessive authentication attempts. Retry in ${rateLimit.retryAfterSeconds}s.`
      );
      throw new Error(
        `Clearance terminal locked due to repeated failures. Please wait ${rateLimit.retryAfterSeconds} seconds before re-attempting.`
      );
    }

    // Controlled latency to mitigate timing side-channels
    await new Promise((resolve) => setTimeout(resolve, 450));

    const cred = AUTHORIZED_CREDENTIALS[cleanEmail];

    // Cryptographic verification of salted hash
    const isValid = cred ? await verifyPassword(password, cred.salt, cred.passwordHash) : false;

    if (!isValid) {
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

    // Reset rate limiter on successful authentication
    resetRateLimit('admin_login');

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

    store.logAudit(
      'AUTH_SUCCESS',
      'SECURITY',
      cleanEmail,
      `Operator ${cred.name} (${sessionPayload.role}) authenticated via salted cryptographic hash.`,
      cred.name
    );
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
