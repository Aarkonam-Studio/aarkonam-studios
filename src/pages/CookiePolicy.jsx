import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Link } from '../context/RouterContext';

export default function CookiePolicy() {
  const triggerCookieModal = (e) => {
    e.preventDefault();
    window.dispatchEvent(new Event('open-cookie-preferences'));
  };

  return (
    <div className="legal-page-container">
      <Navigation />
      <div className="ambient-grain" aria-hidden="true" />
      <div className="ambient-vignette" aria-hidden="true" />

      <main id="main-content" className="legal-content-wrapper" tabIndex="-1">
        <header className="legal-header">
          <div className="legal-badge">
            <span>LEGAL DIRECTIVE</span>
            <span>//</span>
            <span>TRACKING &amp; STORAGE TRANSPARENCY</span>
          </div>
          <h1 className="legal-title">Cookie &amp; Tracking Technology Policy</h1>
          <div className="legal-meta-row">
            <div className="legal-meta-item">
              <span className="legal-meta-label">LAST REVISED:</span>
              <span>October 27, 2026</span>
            </div>
            <div className="legal-meta-item">
              <span className="legal-meta-label">ADVERTISING TRACKERS:</span>
              <span className="emerald-accent">ZERO DEPLOYED (100% AD-FREE)</span>
            </div>
            <div className="legal-meta-item">
              <span className="legal-meta-label">DEFAULT TELEMETRY:</span>
              <span>STRICTLY OPT-IN</span>
            </div>
          </div>
          <p className="legal-intro">
            Aarkonam Studios is committed to complete technical transparency regarding how your browser stores session information. This Cookie Policy explains what cookies and modern web storage technologies are used on our website, how we honor your consent, and how you can review or modify your preferences at any time.
          </p>
        </header>

        {/* Preferences Quick-Action Banner */}
        <div className="legal-callout" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <div className="legal-callout-title">CURRENT STORAGE CLEARANCE</div>
            <p style={{ margin: 0 }}>You can change or revoke your telemetry preferences with a single click.</p>
          </div>
          <button
            type="button"
            className="btn-primary"
            onClick={triggerCookieModal}
            style={{ padding: '0.625rem 1.25rem', fontSize: '0.6875rem' }}
          >
            OPEN COOKIE PREFERENCES MODAL ›
          </button>
        </div>

        {/* 01: What are Cookies */}
        <section className="legal-section">
          <div className="legal-section-header">
            <span className="legal-section-num">01 //</span>
            <h2 className="legal-section-title">What are Cookies &amp; Web Storage?</h2>
          </div>
          <p>
            Cookies are small text files placed on your computer or mobile device by a web server. Modern web applications also utilize <strong>Web Storage (HTML5 localStorage and sessionStorage)</strong> to preserve state, protect forms from automated bots, and retain user preferences locally within your browser sandbox without continuously transmitting data back across the network.
          </p>
        </section>

        {/* 02: Our Core Commitment */}
        <section className="legal-section">
          <div className="legal-section-header">
            <span className="legal-section-num">02 //</span>
            <h2 className="legal-section-title">Zero Advertising Trackers</h2>
          </div>
          <p>
            Unlike advertising-supported websites, Aarkonam Studios builds games, software systems, and AI simulation technology. We do not participate in cross-site behavioral tracking or programmatic advertising networks.
          </p>
          <div className="legal-alert">
            <div className="legal-alert-title">✔ ZERO THIRD-PARTY AD BEACONS</div>
            <p>
              We deploy zero Meta/Facebook Pixel tags, zero Google Ads conversion trackers, zero LinkedIn insight tags, zero TikTok pixels, and zero data-broker analytics. Your reading and browsing activity on our website is never monetized.
            </p>
          </div>
        </section>

        {/* 03: Storage Inventory */}
        <section className="legal-section">
          <div className="legal-section-header">
            <span className="legal-section-num">03 //</span>
            <h2 className="legal-section-title">Comprehensive Storage &amp; Cookie Inventory</h2>
          </div>
          <p>
            The table below itemizes all browser storage keys utilized across our domain:
          </p>
          <div className="legal-table-wrapper">
            <table className="legal-table">
              <thead>
                <tr>
                  <th>STORAGE KEY</th>
                  <th>STORAGE TYPE</th>
                  <th>CLASSIFICATION</th>
                  <th>EXPIRATION</th>
                  <th>EXACT PURPOSE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><code>ark_cookie_consent</code></td>
                  <td>localStorage</td>
                  <td>Strictly Necessary</td>
                  <td>365 Days</td>
                  <td>Stores your affirmative consent decision so you are not prompted on every page load.</td>
                </tr>
                <tr>
                  <td><code>ark_last_submit_ts</code></td>
                  <td>sessionStorage</td>
                  <td>Security / Anti-Abuse</td>
                  <td>Session Duration</td>
                  <td>Enforces a 10-second client cooldown between contact transmissions to protect mail servers from spam scripts.</td>
                </tr>
                <tr>
                  <td><code>ark_rl_*</code></td>
                  <td>sessionStorage</td>
                  <td>Security / Anti-Brute-Force</td>
                  <td>5 Minutes</td>
                  <td>Throttles consecutive failed login attempts on the administrative clearance terminal.</td>
                </tr>
                <tr>
                  <td><code>ark_admin_session_token</code></td>
                  <td>sessionStorage</td>
                  <td>Authentication</td>
                  <td>2 Hours</td>
                  <td>Preserves cryptographic clearance credentials for verified studio administrators; auto-expires upon 2 hours of inactivity.</td>
                </tr>
                <tr>
                  <td><code>arkonam_master_store_v1</code></td>
                  <td>localStorage</td>
                  <td>Application State</td>
                  <td>Persistent</td>
                  <td>Caches local studio CMS records (published games, active technology pipelines, announcements) for offline resilience.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 04: Optional Telemetry */}
        <section className="legal-section">
          <div className="legal-section-header">
            <span className="legal-section-num">04 //</span>
            <h2 className="legal-section-title">Anonymous Engine Performance Telemetry</h2>
          </div>
          <p>
            If you optionally enable <strong>Anonymous Engine Telemetry</strong> in our consent banner:
          </p>
          <ul>
            <li>We record anonymized render frame rates (FPS) and WebGL shader compilation duration.</li>
            <li>We identify hardware tier classifications (e.g. discrete GPU vs integrated mobile GPU) to optimize cinematic background performance.</li>
            <li>No personal identification, IP addresses, or cross-domain URLs are recorded.</li>
          </ul>
          <p>
            This telemetry is disabled by default until you affirmatively click &ldquo;Accept All&rdquo; or enable it in the <a href="#customize" onClick={triggerCookieModal} className="emerald-accent" style={{ textDecoration: 'underline' }}>Preferences modal</a>.
          </p>
        </section>

        {/* 05: How to Manage */}
        <section className="legal-section">
          <div className="legal-section-header">
            <span className="legal-section-num">05 //</span>
            <h2 className="legal-section-title">How to Manage, Revoke, or Block Storage</h2>
          </div>
          <p>You have full autonomy over your browser storage:</p>
          <ul>
            <li>
              <strong>On-Site Controls:</strong> Click the &ldquo;Cookie Preferences&rdquo; link situated in the footer of every page or click the button at the top of this policy to instantly adjust your preferences.
            </li>
            <li>
              <strong>Browser Storage Clearing:</strong> You can clear all cookies and web storage at any time via your browser settings:
              <ul>
                <li><strong>Chrome:</strong> Settings &gt; Privacy &amp; Security &gt; Clear Browsing Data.</li>
                <li><strong>Firefox:</strong> Settings &gt; Privacy &amp; Security &gt; Cookies &amp; Site Data.</li>
                <li><strong>Safari:</strong> Preferences &gt; Privacy &gt; Manage Website Data.</li>
                <li><strong>Edge:</strong> Settings &gt; Cookies &amp; Site Permissions &gt; Manage and Delete Cookies.</li>
              </ul>
            </li>
          </ul>
        </section>

        {/* 06: Contact */}
        <section className="legal-section">
          <div className="legal-section-header">
            <span className="legal-section-num">06 //</span>
            <h2 className="legal-section-title">Questions &amp; Inquiries</h2>
          </div>
          <p>
            If you have questions regarding our storage practices or cybersecurity hygiene, contact our Data Protection Officer at{' '}
            <a href="mailto:privacy@aarkonamstudios.com" className="emerald-accent">privacy@aarkonamstudios.com</a>.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  );
}
