import React, { useState, useEffect } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useRouter } from '../../context/RouterContext';
import { sanitizePlainText } from '../../services/securityService';
import '../styles/admin.css';

export default function AdminLogin() {
  const { login, isAuthenticated, loading } = useAdminAuth();
  const { navigate } = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // If already authenticated, redirect to /admin
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const cleanEmail = sanitizePlainText(email, 120);
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      setError('Operator email and clearance passkey are required.');
      return;
    }

    try {
      await login(cleanEmail, cleanPassword);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Transmission clearance rejected.');
    }
  };

  return (
    <div className="login-screen-wrapper">
      <div className="ambient-grain" aria-hidden="true" />
      <div className="ambient-vignette" aria-hidden="true" />

      <div className="login-panel-box">
        <div className="login-panel-header">
          <img
            src="/icons/aarkonam-emblem.png"
            alt="Aarkonam Directorate Seal"
            className="login-emblem-img"
          />
          <h1 className="login-title hud-font">ADMIN CONTROL CENTER</h1>
          <p className="login-subtitle">SECURE TERMINAL // AUTHORIZED OPERATORS ONLY</p>
        </div>

        {error && (
          <div className="login-alert-box" role="alert">
            <span className="alert-x">⚠</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form" noValidate>
          <div className="form-group" style={{ marginBottom: '1.25rem' }}>
            <label className="form-label hud-font" htmlFor="admin-email">
              OPERATOR CREDENTIAL (EMAIL)
            </label>
            <input
              id="admin-email"
              type="email"
              value={email}
              maxLength={120}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="operator@aarkonam.internal"
              className="form-input"
              autoComplete="username"
              required
              aria-required="true"
            />
          </div>

          <div className="form-group" style={{ marginBottom: '1.75rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="form-label hud-font" htmlFor="admin-password">
                SECURITY CLEARANCE PASSKEY
              </label>
              <button
                type="button"
                className="btn-toggle-pass hud-font"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? 'HIDE' : 'SHOW'}
              </button>
            </div>
            <input
              id="admin-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              maxLength={128}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••••••"
              className="form-input"
              autoComplete="current-password"
              required
              aria-required="true"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ width: '100%', padding: '0.875rem' }}
          >
            {loading ? 'AUTHENTICATING CLEARANCE...' : 'COMMENCE OPERATOR SESSION ›'}
          </button>
        </form>

        <div className="security-notice-row" style={{ marginTop: '1.5rem', textAlign: 'center' }}>
          <p style={{ fontSize: '0.6875rem', color: 'var(--muted-text)', letterSpacing: '0.08em', margin: 0 }}>
            🔒 256-bit Salted Cryptographic Verification · Failed attempts throttled by Terminal Security Shield.
          </p>
        </div>

        <div className="login-footer-row" style={{ marginTop: '1.5rem' }}>
          <button
            type="button"
            className="link-return-public"
            onClick={() => navigate('/')}
          >
            ← Return to Public Headquarters
          </button>
        </div>
      </div>
    </div>
  );
}
