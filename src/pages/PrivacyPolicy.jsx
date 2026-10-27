import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Link } from '../context/RouterContext';

export default function PrivacyPolicy() {
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
            <span>DATA SOVEREIGNTY PROTOCOL</span>
          </div>
          <h1 className="legal-title">Privacy & Data Protection Policy</h1>
          <div className="legal-meta-row">
            <div className="legal-meta-item">
              <span className="legal-meta-label">EFFECTIVE DATE:</span>
              <span>October 27, 2026</span>
            </div>
            <div className="legal-meta-item">
              <span className="legal-meta-label">COMPLIANCE FRAMEWORKS:</span>
              <span>GDPR (EU) · CCPA/CPRA (US) · DPDP Act 2023 (India)</span>
            </div>
            <div className="legal-meta-item">
              <span className="legal-meta-label">SECURITY RATING:</span>
              <span className="emerald-accent">TLS 1.3 / OWASP ASVS LEVEL 2</span>
            </div>
          </div>
          <p className="legal-intro">
            Aarkonam Studios (&ldquo;Aarkonam,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates at the intersection of cinematic worldcraft, real-time game architecture, and applied AI systems. We respect your digital sovereignty and adhere to strict data minimization principles. This document outlines how we collect, process, safeguard, and erase your personal data when you visit our website, submit project inquiries, or interact with our digital infrastructure.
          </p>
        </header>

        {/* Quick Table of Contents */}
        <nav className="legal-toc" aria-label="Privacy policy table of contents">
          <h3 className="legal-toc-title">DIRECTORY OF CLAUSES</h3>
          <ul className="legal-toc-grid">
            <li><a href="#controller"><span className="legal-toc-num">01 //</span> Data Controller & DPO</a></li>
            <li><a href="#minimization"><span className="legal-toc-num">02 //</span> Data Minimization Principles</a></li>
            <li><a href="#collection"><span className="legal-toc-num">03 //</span> Categories of Data Collected</a></li>
            <li><a href="#legal-basis"><span className="legal-toc-num">04 //</span> Lawful Bases for Processing</a></li>
            <li><a href="#sdks"><span className="legal-toc-num">05 //</span> Third-Party SDK & Service Audit</a></li>
            <li><a href="#children"><span className="legal-toc-num">06 //</span> Children&rsquo;s Privacy Protection</a></li>
            <li><a href="#cookies"><span className="legal-toc-num">07 //</span> Cookies & Web Storage</a></li>
            <li><a href="#rights"><span className="legal-toc-num">08 //</span> Your Statutory Privacy Rights</a></li>
            <li><a href="#data-deletion"><span className="legal-toc-num">09 //</span> Data Deletion & Erasure Protocol</a></li>
            <li><a href="#security"><span className="legal-toc-num">10 //</span> Technical & Cryptographic Safeguards</a></li>
          </ul>
        </nav>

        {/* 01: Controller */}
        <section id="controller" className="legal-section">
          <div className="legal-section-header">
            <span className="legal-section-num">01 //</span>
            <h2 className="legal-section-title">Data Controller &amp; Contact Specifications</h2>
          </div>
          <p>
            The legal entity responsible for the processing of your personal information under this policy is:
          </p>
          <div className="officer-card">
            <div>
              <div className="officer-field-label">LEGAL ENTITY</div>
              <div className="officer-field-val">Aarkonam Studios</div>
            </div>
            <div>
              <div className="officer-field-label">PRIMARY JURISDICTION</div>
              <div className="officer-field-val">Maharashtra, India (Global Remote Studio)</div>
            </div>
            <div>
              <div className="officer-field-label">DATA PROTECTION OFFICER (DPO)</div>
              <div className="officer-field-val">
                <a href="mailto:privacy@aarkonamstudios.com">privacy@aarkonamstudios.com</a>
              </div>
            </div>
            <div>
              <div className="officer-field-label">GENERAL &amp; NDA INQUIRIES</div>
              <div className="officer-field-val">
                <a href="mailto:contact@aarkonamstudios.com">contact@aarkonamstudios.com</a>
              </div>
            </div>
          </div>
        </section>

        {/* 02: Data Minimization */}
        <section id="minimization" className="legal-section">
          <div className="legal-section-header">
            <span className="legal-section-num">02 //</span>
            <h2 className="legal-section-title">Data Minimization Discipline</h2>
          </div>
          <p>
            In strict compliance with GDPR Article 5(1)(c) and international privacy statutes, Aarkonam Studios enforces <strong>Data Minimization</strong> across every interface. We collect only the minimum personal data strictly necessary to communicate, evaluate commercial briefs, or protect against automated denial-of-service abuse.
          </p>
          <div className="legal-callout">
            <div className="legal-callout-title">✔ ZERO UNNECESSARY DATA HARVESTING</div>
            <p>
              We do not collect physical addresses, phone numbers, biometric markers, device fingerprinting canvases, government identification numbers, financial account details, or location tracking coordinates from public website visitors.
            </p>
          </div>
        </section>

        {/* 03: Categories Collected */}
        <section id="collection" className="legal-section">
          <div className="legal-section-header">
            <span className="legal-section-num">03 //</span>
            <h2 className="legal-section-title">Categories of Data Collected</h2>
          </div>
          <p>
            The table below itemizes every personal data field processed by our website, its exact purpose, and retention lifespan:
          </p>
          <div className="legal-table-wrapper">
            <table className="legal-table">
              <thead>
                <tr>
                  <th>DATA CATEGORY</th>
                  <th>SPECIFIC FIELDS</th>
                  <th>PROCESSING PURPOSE</th>
                  <th>RETENTION LIFESPAN</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Contact &amp; Proposal Data</strong></td>
                  <td>Full Name, Transmission Email Address, Organization Name (optional)</td>
                  <td>Bilateral communication, replying to client scoping requests, sending non-disclosure agreements.</td>
                  <td>Maintained for the duration of commercial correspondence or until a deletion request is received.</td>
                </tr>
                <tr>
                  <td><strong>Technical Briefing</strong></td>
                  <td>Inquiry Classification, Codename, Project Scope, Brief Message</td>
                  <td>Evaluating game design, custom simulation, licensing, or publishing fit.</td>
                  <td>Maintained for commercial reference under studio confidentiality protocols.</td>
                </tr>
                <tr>
                  <td><strong>Anti-Abuse Telemetry</strong></td>
                  <td>Interaction timing, session transmission counter, honeypot validation flag</td>
                  <td>Protecting our mail servers from spam scripts, botnets, and automated brute-force flooding.</td>
                  <td>Ephemeral (persists only within active browser session storage; auto-cleared upon tab close).</td>
                </tr>
                <tr>
                  <td><strong>Cookie &amp; Consent State</strong></td>
                  <td>Essential consent flag (`ark_cookie_consent`)</td>
                  <td>Remembering your consent choices so you are not prompted on every page load.</td>
                  <td>Stored locally in your browser for 365 days or until manually cleared.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 04: Lawful Basis */}
        <section id="legal-basis" className="legal-section">
          <div className="legal-section-header">
            <span className="legal-section-num">04 //</span>
            <h2 className="legal-section-title">Lawful Bases for Processing</h2>
          </div>
          <p>We process your personal information strictly under the following statutory grounds:</p>
          <ul>
            <li><strong>Affirmative Consent (GDPR Art. 6(1)(a)):</strong> When you voluntarily submit an inquiry through our Contact terminal and check the confirmation box.</li>
            <li><strong>Pre-Contractual Steps (GDPR Art. 6(1)(b)):</strong> When you request technical consulting proposals, technology licensing agreements, or commercial game development terms.</li>
            <li><strong>Legitimate Interests (GDPR Art. 6(1)(f)):</strong> Maintaining server network security, defending against automated spam attacks, and monitoring platform uptime.</li>
            <li><strong>Legal Obligation (GDPR Art. 6(1)(c)):</strong> Complying with regulatory audits, anti-fraud standards, and statutory data retention mandates.</li>
          </ul>
        </section>

        {/* 05: SDK Audit */}
        <section id="sdks" className="legal-section">
          <div className="legal-section-header">
            <span className="legal-section-num">05 //</span>
            <h2 className="legal-section-title">Third-Party SDK &amp; Service Audit</h2>
          </div>
          <p>
            We regularly audit all installed libraries and external service providers to ensure zero unauthorized data leakage:
          </p>
          <div className="legal-table-wrapper">
            <table className="legal-table">
              <thead>
                <tr>
                  <th>SERVICE / SDK</th>
                  <th>PURPOSE</th>
                  <th>DATA SHARED</th>
                  <th>PRIVACY GUARANTEE</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>@emailjs/browser</strong></td>
                  <td>Client-side notification dispatch for contact submissions</td>
                  <td>Sender name, email, project brief, dispatch ID</td>
                  <td>Relays message directly to studio executive inbox; zero third-party advertising monetization.</td>
                </tr>
                <tr>
                  <td><strong>Google Fonts</strong></td>
                  <td>Web typography (`Cinzel`, `Orbitron`, `Inter`)</td>
                  <td>Standard HTTP request headers (anonymized IP)</td>
                  <td>Zero cookies set; queries served via Google Fonts CDN without user profiling.</td>
                </tr>
                <tr>
                  <td><strong>Firebase (Cloud Suite)</strong></td>
                  <td>Optional administrative identity verification &amp; cloud storage</td>
                  <td>Operator email, salted cryptographic credential hash</td>
                  <td>Hardened under Firestore Security Rules (RBAC); public visitors never transmit data to Firebase unless authenticated.</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 06: Children's Privacy */}
        <section id="children" className="legal-section">
          <div className="legal-section-header">
            <span className="legal-section-num">06 //</span>
            <h2 className="legal-section-title">Protection of Children&rsquo;s Privacy (Age 16+ Policy)</h2>
          </div>
          <p>
            Aarkonam Studios is a specialized game development and enterprise creative software studio. Our website, services, and commercial contact forms are strictly directed to individuals aged <strong>16 and older</strong> (or the age of majority in your jurisdiction).
          </p>
          <div className="legal-alert">
            <div className="legal-alert-title">⚠ MINORS &amp; CHILDREN&rsquo;S SAFEGUARD (COPPA &amp; GDPR ART. 8)</div>
            <p>
              We do not knowingly solicit, collect, or retain personal data from children under 13 (or under 16 in the EEA/UK). If you believe a child has submitted personal details through our form, contact <a href="mailto:privacy@aarkonamstudios.com">privacy@aarkonamstudios.com</a> immediately. Upon verification, we will permanently purge the record within 24 hours.
            </p>
          </div>
        </section>

        {/* 07: Cookies & Web Storage */}
        <section id="cookies" className="legal-section">
          <div className="legal-section-header">
            <span className="legal-section-num">07 //</span>
            <h2 className="legal-section-title">Cookies &amp; Local Web Storage</h2>
          </div>
          <p>
            We reject the surveillance advertising model. We deploy zero cross-site tracking cookies, third-party advertising beacons, or social media retargeting pixels.
          </p>
          <p>
            To inspect our complete cookie inventory or adjust your telemetry settings, view our full{' '}
            <Link to="/cookies">Cookie &amp; Tracking Policy</Link> or{' '}
            <a href="#preferences" onClick={triggerCookieModal} className="emerald-accent" style={{ textDecoration: 'underline' }}>
              open your Cookie Preferences modal
            </a>.
          </p>
        </section>

        {/* 08: Statutory Rights */}
        <section id="rights" className="legal-section">
          <div className="legal-section-header">
            <span className="legal-section-num">08 //</span>
            <h2 className="legal-section-title">Your Statutory Privacy Rights</h2>
          </div>
          <p>Regardless of your geographic location, Aarkonam Studios grants you the following enforceable rights:</p>
          <ul>
            <li><strong>Right of Access (GDPR Art. 15):</strong> You have the right to request a complete copy of all personal records we hold regarding you.</li>
            <li><strong>Right to Rectification (GDPR Art. 16):</strong> You may request immediate correction of inaccurate or incomplete project communications.</li>
            <li><strong>Right to Erasure / &ldquo;Right to be Forgotten&rdquo; (GDPR Art. 17 / CCPA):</strong> You may demand permanent deletion of your contact records, project proposals, and correspondence.</li>
            <li><strong>Right to Restriction of Processing (GDPR Art. 18):</strong> You may limit how we process your personal data while a formal dispute is reviewed.</li>
            <li><strong>Right to Data Portability (GDPR Art. 20):</strong> You may receive your personal data in a structured, commonly used, machine-readable JSON format.</li>
            <li><strong>Right to Object (GDPR Art. 21):</strong> You may object at any time to any processing founded upon legitimate interests.</li>
          </ul>
        </section>

        {/* 09: Data Deletion */}
        <section id="data-deletion" className="legal-section">
          <div className="legal-section-header">
            <span className="legal-section-num">09 //</span>
            <h2 className="legal-section-title">Data Deletion &amp; Subject Access Request Protocol</h2>
          </div>
          <p>
            To exercise any statutory privacy right or submit a formal <strong>Data Erasure Request</strong>, choose either method below:
          </p>
          <ol>
            <li>
              <strong>Direct Email Transmission:</strong> Send an email to{' '}
              <a href="mailto:privacy@aarkonamstudios.com?subject=DATA%20ERASURE%20REQUEST" className="emerald-accent">
                privacy@aarkonamstudios.com
              </a>{' '}
              with the subject line <code>DATA ERASURE REQUEST</code>. Please specify the email address used during your submission.
            </li>
            <li>
              <strong>Contact Terminal:</strong> Visit our{' '}
              <Link to="/contact">Contact Page</Link>, select <strong>&ldquo;Data Privacy &amp; Erasure Request&rdquo;</strong> in the inquiry classification dropdown, and transmit your request.
            </li>
          </ol>
          <div className="legal-callout">
            <div className="legal-callout-title">30-DAY STATUTORY SLA COMMITMENT</div>
            <p>
              Our Data Protection Officer will acknowledge your request within 48 hours and complete permanent database purging within <strong>30 calendar days</strong>, providing written cryptographic confirmation of record erasure.
            </p>
          </div>
        </section>

        {/* 10: Security Safeguards */}
        <section id="security" className="legal-section">
          <div className="legal-section-header">
            <span className="legal-section-num">10 //</span>
            <h2 className="legal-section-title">Technical &amp; Cryptographic Safeguards</h2>
          </div>
          <p>We implement defense-in-depth security measures to protect stored information:</p>
          <ul>
            <li><strong>End-to-End Transport Encryption:</strong> All public transmissions enforce TLS 1.3 with modern AEAD cipher suites (ChaCha20-Poly1305 / AES-256-GCM).</li>
            <li><strong>Salted Cryptographic Hashing:</strong> Administrative passkeys are hashed using 256-bit salted digests via the native Web Crypto API with zero plaintext persistence.</li>
            <li><strong>Strict Role-Based Access Control (RBAC):</strong> Client inquiry briefs can only be accessed by cleared Studio Owners and Admins; public visitors and lower operator ranks are cryptographically blocked.</li>
            <li><strong>Automated Abuse Throttling:</strong> Client rate-limiting engines throttle automated submission floods, stopping brute-force and DDoS vectors before data ingestion.</li>
          </ul>
        </section>

        <div style={{ marginTop: '3.5rem', textAlign: 'center' }}>
          <Link to="/contact" className="btn-primary" style={{ display: 'inline-flex', padding: '0.875rem 2rem' }}>
            TRANSMIT PRIVACY INQUIRY ›
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
