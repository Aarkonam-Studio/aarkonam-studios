import React from 'react';
import { Link } from '../context/RouterContext';

export default function Footer() {
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
                alt="Aarkonam Studios"
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
                alt="Official Emblem"
                className="footer-emblem-badge"
              />
              <div className="seal-text">
                <span className="hud-font">AARKONAM SEAL</span>
                <small>AUTHORIZED PRODUCTION ENTITY</small>
              </div>
            </div>
          </div>

          {/* Navigation Links Column */}
          <div className="footer-col">
            <h4 className="footer-heading hud-font">DIRECTORY</h4>
            <ul className="footer-links">
              <li><Link to="/">00 // Home Experience</Link></li>
              <li><Link to="/studio">01 // Studio Profile</Link></li>
              <li><Link to="/games">02 // Active Games</Link></li>
              <li><Link to="/projects">03 // Research & Tools</Link></li>
              <li><Link to="/team">04 // Leadership</Link></li>
              <li><Link to="/contact">05 // Contact & Inquiries</Link></li>
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

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>© {new Date().getFullYear()} AARKONAM STUDIOS. ALL RIGHTS RESERVED.</p>
          </div>
          <div className="footer-meta hud-font">
            <span>BUILD 0.1.0-STABLE</span>
            <span className="meta-separator">/</span>
            <span>EMERALD NOIR ENGINE</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
