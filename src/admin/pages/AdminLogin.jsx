import React, { useState } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useRouter } from '../../context/RouterContext';
import '../styles/admin.css';

export default function AdminLogin() {
  const { login, isAuthenticated, loading } = useAdminAuth();
  const { navigate } = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // If already authenticated, redirect to /admin
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Operator email and clearance passkey are required.');
      return;
    }

    try {
      await login(email, password);
      navigate('/admin');
    } catch (err) {
      setError(err.message || 'Transmission clearance rejected.');
    }
  };

  const setDemoProfile = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
    setError('');
  };

  return (
    <div className="login-screen-wrapper">
      <div className="ambient-grain" aria-hidden="true" />
      <div className="ambient-vignette" aria-hidden="true" />

      <div className="login-panel-box">
        <div className="login-panel-header">
          <img
            src="/icons/aarkonam-emblem.png"
            alt="Aarkonam Directorate"
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

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group" style={{ marginBottom: '1.25rem' }}>
            <label className="form-label hud-font" htmlFor="admin-email">
              OPERATOR CREDENTIAL (EMAIL)
            </label>
            <input
              id="admin-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="director@aarkonam.internal"
              className="form-input"
              autoComplete="username"
              required
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
              >
                {showPassword ? 'HIDE' : 'SHOW'}
              </button>
            </div>
            <input
              id="admin-password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••••••"
              className="form-input"
              autoComplete="current-password"
              required
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

        {/* Development Quick Role Dispatch */}
        <div className="login-role-dispatch">
          <p className="dispatch-title hud-font">TEST OPERATOR PROFILES (CLICK TO LOAD)</p>
          <div className="dispatch-buttons-grid">
            <button
              type="button"
              className="role-dispatch-btn"
              onClick={() => setDemoProfile('director@aarkonam.internal', 'ark-noir-director-2026')}
            >
              <span className="role-btn-title">Safin Mulani (Owner)</span>
              <small className="role-btn-sub">Full System Authority</small>
            </button>
            <button
              type="button"
              className="role-dispatch-btn"
              onClick={() => setDemoProfile('cto@aarkonam.internal', 'ark-noir-systems-2026')}
            >
              <span className="role-btn-title">Mohd Sumair (Admin)</span>
              <small className="role-btn-sub">Systems, Content & Enquiries</small>
            </button>
            <button
              type="button"
              className="role-dispatch-btn"
              onClick={() => setDemoProfile('finance@aarkonam.internal', 'ark-noir-finance-2026')}
            >
              <span className="role-btn-title">Adeba Firdous (Editor)</span>
              <small className="role-btn-sub">Content & Media Editing</small>
            </button>
            <button
              type="button"
              className="role-dispatch-btn"
              onClick={() => setDemoProfile('auditor@aarkonam.internal', 'ark-noir-audit-2026')}
            >
              <span className="role-btn-title">Auditor (Viewer)</span>
              <small className="role-btn-sub">Read-Only Telemetry</small>
            </button>
          </div>
        </div>

        <div className="login-footer-row">
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
