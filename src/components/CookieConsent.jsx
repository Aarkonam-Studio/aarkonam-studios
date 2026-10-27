import React, { useState, useEffect } from 'react';
import { Link } from '../context/RouterContext';

export default function CookieConsent() {
  const [consentState, setConsentState] = useState(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem('ark_cookie_consent');
      if (stored) {
        const parsed = JSON.parse(stored);
        setConsentState(parsed);
        setAnalyticsEnabled(Boolean(parsed.analytics));
      } else {
        // Delay slightly for smooth page entrance
        const timer = setTimeout(() => setShowBanner(true), 800);
        return () => clearTimeout(timer);
      }
    } catch {
      setShowBanner(true);
    }

    // Listen for custom event from footer or privacy policy
    const handleOpenPreferences = () => {
      setShowModal(true);
    };

    window.addEventListener('open-cookie-preferences', handleOpenPreferences);
    return () => {
      window.removeEventListener('open-cookie-preferences', handleOpenPreferences);
    };
  }, []);

  // Handle escape key to close preferences modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && showModal) {
        setShowModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showModal]);

  const saveConsent = (analytics) => {
    const consent = {
      necessary: true,
      analytics: Boolean(analytics),
      timestamp: new Date().toISOString(),
      version: '1.0'
    };

    try {
      localStorage.setItem('ark_cookie_consent', JSON.stringify(consent));
    } catch {}

    setConsentState(consent);
    setAnalyticsEnabled(Boolean(analytics));
    setShowBanner(false);
    setShowModal(false);

    // Dispatch event so any tracking services can initialize or dismantle
    window.dispatchEvent(new CustomEvent('ark-consent-updated', { detail: consent }));
  };

  const handleAcceptAll = () => saveConsent(true);
  const handleNecessaryOnly = () => saveConsent(false);
  const handleSaveCustom = () => saveConsent(analyticsEnabled);

  return (
    <>
      {/* Floating Bottom Banner */}
      {showBanner && !showModal && (
        <aside
          className="cookie-banner-overlay"
          aria-label="Cookie consent banner"
          role="region"
        >
          <div className="cookie-banner-card">
            <div className="cookie-banner-text">
              <div className="cookie-banner-badge">
                <span className="hud-font">PRIVACY & TELEMETRY</span>
                <span>//</span>
                <span>STRICT DATA DISCIPLINE</span>
              </div>
              <h3 className="cookie-banner-heading">
                We value your privacy & digital sovereignty
              </h3>
              <p className="cookie-banner-desc">
                Aarkonam Studios uses essential storage for security, session verification, and anti-spam protocols. We do not use third-party advertising cookies or cross-site data brokers. You may optionally enable anonymized telemetry to help us optimize game engine performance. Read our{' '}
                <Link to="/cookies">Cookie Policy</Link> and{' '}
                <Link to="/privacy">Privacy Policy</Link>.
              </p>
            </div>

            <div className="cookie-banner-actions">
              <button
                type="button"
                className="btn-cookie-necessary"
                onClick={handleNecessaryOnly}
              >
                NECESSARY ONLY
              </button>
              <button
                type="button"
                className="btn-cookie-accept"
                onClick={handleAcceptAll}
              >
                ACCEPT ALL
              </button>
              <button
                type="button"
                className="btn-cookie-customize"
                onClick={() => setShowModal(true)}
              >
                CUSTOMIZE
              </button>
            </div>
          </div>
        </aside>
      )}

      {/* Modal Preferences Drawer */}
      {showModal && (
        <div
          className="cookie-modal-backdrop"
          onClick={() => setShowModal(false)}
          role="presentation"
        >
          <div
            className="cookie-modal-box"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-modal-title"
          >
            <div className="cookie-modal-header">
              <div>
                <span className="hud-tag gold">DATA PREFERENCES</span>
                <h3 id="cookie-modal-title" className="cookie-modal-title">
                  Cookie & Telemetry Settings
                </h3>
              </div>
              <button
                type="button"
                className="cookie-modal-close"
                onClick={() => setShowModal(false)}
                aria-label="Close cookie preferences"
              >
                ✕
              </button>
            </div>

            {/* Essential Category (Locked) */}
            <div className="cookie-category-card">
              <div className="cookie-category-top">
                <span className="cookie-category-name">
                  01 // STRICTLY NECESSARY STORAGE
                </span>
                <span className="cookie-status-tag locked">REQUIRED / ACTIVE</span>
              </div>
              <p className="cookie-category-desc">
                Essential for website security, anti-abuse form rate-limiting, CSRF protection, and storing your consent preferences. These cannot be disabled as the site cannot function safely without them.
              </p>
            </div>

            {/* Analytics Category (Toggleable) */}
            <div className="cookie-category-card">
              <div className="cookie-category-top">
                <span className="cookie-category-name">
                  02 // ANONYMOUS ENGINE TELEMETRY
                </span>
                <label className="cookie-toggle-label" htmlFor="analytics-toggle">
                  <input
                    type="checkbox"
                    id="analytics-toggle"
                    checked={analyticsEnabled}
                    onChange={(e) => setAnalyticsEnabled(e.target.checked)}
                  />
                  <span className="cookie-toggle-slider" />
                </label>
              </div>
              <p className="cookie-category-desc">
                Helps our engineering team measure real-time WebGL/Shader render frame rates, load times, and interface responsiveness across devices. Completely anonymized; no personal identification or cross-site tracking.
              </p>
            </div>

            {/* Zero Ad Cookies Assurance */}
            <div className="cookie-category-card" style={{ borderStyle: 'dashed' }}>
              <div className="cookie-category-top">
                <span className="cookie-category-name" style={{ color: 'var(--muted-text)' }}>
                  03 // TARGETING & ADVERTISING TRACKERS
                </span>
                <span className="hud-tag" style={{ color: 'var(--muted-text)' }}>NOT DEPLOYED</span>
              </div>
              <p className="cookie-category-desc">
                Aarkonam Studios deploys zero commercial advertising trackers, retargeting pixels, or data broker cookies. We never sell or monetize visitor browsing data.
              </p>
            </div>

            <div className="cookie-modal-footer">
              <button
                type="button"
                className="btn-cookie-necessary"
                onClick={handleNecessaryOnly}
              >
                REJECT NON-ESSENTIAL
              </button>
              <button
                type="button"
                className="btn-cookie-accept"
                onClick={handleSaveCustom}
              >
                SAVE PREFERENCES
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
