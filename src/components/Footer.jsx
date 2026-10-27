import React from 'react';
import { Link } from '../context/RouterContext';

export default function Footer() {
  const triggerCookieModal = (e) => {
    e.preventDefault();
    window.dispatchEvent(new Event('open-cookie-preferences'));
  };

  return (
    <footer className="site-footer">
      <div className="footer-top-rule">
        <span className="rule-diamond" />
      </div>

      <div className="content-wrapper footer-content">
        <div className="footer-grid">
          {/* Brand & Manifesto Column */}
          <div className="footer-brand-col">
            <Link to="/" className="footer-logo-link" aria-label="Aarkonam Studios Home">
              <img
                src="/images/aarkonam-wordmark.png"
                alt="Aarkonam Studios Wordmark"
                className="footer-wordmark"
              />
            </Link>
            <p className="footer-tagline">
              BUILDING WORLDS BEYOND THE SCREEN
            </p>
            <p className="footer-bio">
              Independent game development, interactive simulation, and next-generation creative technology studio based in India.
            </p>
            <div className="footer-hud-seal">
              <img
                src="/icons/aarkonam-emblem.png"
                alt="Official Emblem - Authorized Production Entity"
                className="footer-emblem-badge"
              />
              <div className="seal-text">
                <span className="hud-font">AARKONAM SEAL</span>
                <small>AUTHORIZED PRODUCTION ENTITY</small>
              </div>
            </div>
            <p style={{ fontSize: '0.6875rem', color: 'var(--muted-text)', marginTop: '1rem', lineHeight: '1.5' }}>
              Headquartered in Pune, Maharashtra, India · Global Remote Development Directorate
            </p>
          </div>

          {/* Navigation Links Column */}
          <div className="footer-col">
            <h4 className="footer-heading hud-font">DIRECTORY</h4>
            <ul className="footer-links">
              <li><Link to="/">00 // Home Experience</Link></li>
              <li><Link to="/studio">01 // Studio Profile</Link></li>
              <li><Link to="/games">02 // Active Games</Link></li>
              <li><Link to="/projects">03 // Research &amp; Tools</Link></li>
              <li><Link to="/team">04 // Leadership</Link></li>
              <li><Link to="/contact">05 // Contact &amp; Inquiries</Link></li>
            </ul>
          </div>

          {/* Featured Works Column */}
          <div className="footer-col">
            <h4 className="footer-heading hud-font">STUDIO REALMS</h4>
            <ul className="footer-links">
              <li><Link to="/games">Leviathan: Emerald Odyssey</Link></li>
              <li><Link to="/games">Sanctum of the Void</Link></li>
              <li><Link to="/games">Aetheria: Neon Horizons</Link></li>
              <li><Link to="/projects">Aarkonam World Engine</Link></li>
              <li><Link to="/projects">Sentinel Neural Framework</Link></li>
            </ul>
          </div>

          {/* Coordinates & Transmission Column */}
          <div className="footer-col">
            <h4 className="footer-heading hud-font">TRANSMISSION</h4>
            <div className="telemetry-box">
              <div className="telemetry-row">
                <span className="telemetry-label">REGION</span>
                <span className="telemetry-val">INDIA / GLOBAL</span>
              </div>
              <div className="telemetry-row">
                <span className="telemetry-label">COORDINATES</span>
                <span className="telemetry-val hud-font">18.5204° N, 73.8567° E</span>
              </div>
              <div className="telemetry-row">
                <span className="telemetry-label">SECURITY</span>
                <span className="telemetry-val emerald-accent">TLS 1.3 / ENCRYPTED</span>
              </div>
              <div className="telemetry-row">
                <span className="telemetry-label">STATUS</span>
                <span className="telemetry-val"><span className="status-ping" /> OPERATIONAL</span>
              </div>
            </div>
            <Link to="/contact" className="btn-secondary footer-cta-btn">
              COMMENCE TRANSMISSION
            </Link>
          </div>
        </div>

        {/* Legal & Compliance Navigation Bar */}
        <div
          className="footer-legal-bar"
          style={{
            borderTop: '1px solid rgba(199, 205, 209, 0.08)',
            paddingTop: '1.5rem',
            paddingBottom: '1rem',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            fontSize: '0.75rem'
          }}
        >
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.25rem', alignItems: 'center' }}>
            <Link to="/privacy" style={{ color: 'var(--silver)', transition: 'color 0.2s' }}>
              Privacy Policy
            </Link>
            <span style={{ color: 'var(--border-emerald)' }}>·</span>
            <Link to="/terms" style={{ color: 'var(--silver)', transition: 'color 0.2s' }}>
              Terms of Service
            </Link>
            <span style={{ color: 'var(--border-emerald)' }}>·</span>
            <Link to="/cookies" style={{ color: 'var(--silver)', transition: 'color 0.2s' }}>
              Cookie Policy
            </Link>
            <span style={{ color: 'var(--border-emerald)' }}>·</span>
            <Link to="/refund" style={{ color: 'var(--silver)', transition: 'color 0.2s' }}>
              Refund Policy
            </Link>
            <span style={{ color: 'var(--border-emerald)' }}>·</span>
            <button
              type="button"
              onClick={triggerCookieModal}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--antique-gold)',
                cursor: 'pointer',
                padding: 0,
                fontSize: '0.75rem',
                textDecoration: 'underline',
                textUnderlineOffset: '3px'
              }}
            >
              Cookie Preferences
            </button>
            <span style={{ color: 'var(--border-emerald)' }}>·</span>
            <Link to="/privacy#data-deletion" style={{ color: 'var(--emerald-cyan)' }}>
              Data Erasure Request
            </Link>
          </div>

          <div style={{ color: 'var(--muted-text)', fontSize: '0.6875rem' }}>
            Official Direct: <a href="mailto:contact@aarkonamstudios.com" style={{ color: 'var(--silver)' }}>contact@aarkonamstudios.com</a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>© {new Date().getFullYear()} AARKONAM STUDIOS. ALL RIGHTS RESERVED. EMERALD NOIR ENGINE.</p>
          </div>
          <div className="footer-meta hud-font">
            <span>BUILD 1.0.0-HARDENED</span>
            <span className="meta-separator">/</span>
            <span className="emerald-accent">OWASP ASVS SECURED</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
