import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Link } from '../context/RouterContext';

export default function RefundPolicy() {
  return (
    <div className="legal-page-container">
      <Navigation />
      <div className="ambient-grain" aria-hidden="true" />
      <div className="ambient-vignette" aria-hidden="true" />

      <main id="main-content" className="legal-content-wrapper" tabIndex="-1">
        <header className="legal-header">
          <div className="legal-badge">
            <span>COMMERCIAL DIRECTIVE</span>
            <span>//</span>
            <span>TRANSPARENT BILLING PROTOCOL</span>
          </div>
          <h1 className="legal-title">Refund &amp; Cancellation Policy</h1>
          <div className="legal-meta-row">
            <div className="legal-meta-item">
              <span className="legal-meta-label">LAST REVISED:</span>
              <span>October 27, 2026</span>
            </div>
            <div className="legal-meta-item">
              <span className="legal-meta-label">BILLING TRANSPARENCY:</span>
              <span className="emerald-accent">ZERO HIDDEN FEES GUARANTEE</span>
            </div>
            <div className="legal-meta-item">
              <span className="legal-meta-label">OPERATIONS:</span>
              <span>Commercial Games · Custom Software · Tech Licensing</span>
            </div>
          </div>
          <p className="legal-intro">
            Aarkonam Studios operates on a foundation of technical excellence and unambiguous commercial transparency. This policy details our refund criteria, cancellation protocols, and milestone sign-off procedures across all studio operations.
          </p>
        </header>

        {/* Quick Directory */}
        <nav className="legal-toc" aria-label="Refund policy directory">
          <h3 className="legal-toc-title">DIRECTORY OF CLAUSES</h3>
          <ul className="legal-toc-grid">
            <li><a href="#games"><span className="legal-toc-num">01 //</span> Commercial Game Releases</a></li>
            <li><a href="#custom-dev"><span className="legal-toc-num">02 //</span> Custom Software &amp; Engineering</a></li>
            <li><a href="#licensing"><span className="legal-toc-num">03 //</span> Technology Licensing &amp; Tools</a></li>
            <li><a href="#no-hidden-fees"><span className="legal-toc-num">04 //</span> Zero Hidden Fees Guarantee</a></li>
            <li><a href="#disputes"><span className="legal-toc-num">05 //</span> Billing Inquiries &amp; Escalation</a></li>
          </ul>
        </nav>

        {/* 01: Commercial Games */}
        <section id="games" className="legal-section">
          <div className="legal-section-header">
            <span className="legal-section-num">01 //</span>
            <h2 className="legal-section-title">Commercial Game Releases &amp; Digital Storefronts</h2>
          </div>
          <p>
            When purchasing official Aarkonam Studios game releases (such as <em>Leviathan: Emerald Odyssey</em>, <em>Sanctum of the Void</em>, or <em>Aetheria: Neon Horizons</em>) through authorized digital distribution storefronts:
          </p>
          <ul>
            <li><strong>Platform Authority:</strong> All consumer purchases, payments, and refund transactions are governed by the respective storefront where the license was acquired (e.g. Steam, Epic Games Store, GOG, PlayStation Network, or Xbox Store).</li>
            <li><strong>Standard Return Windows:</strong> Most partner platforms honor standard refund requests within 14 calendar days of purchase, provided the software has been played for fewer than 2 hours.</li>
            <li><strong>Defect Remediation:</strong> If you encounter a verified critical software bug preventing progression, our engineering team deploys regular telemetry patches. You may also contact <a href="mailto:support@aarkonamstudios.com">support@aarkonamstudios.com</a> with crash dumps for expedited assistance.</li>
          </ul>
        </section>

        {/* 02: Custom Software */}
        <section id="custom-dev" className="legal-section">
          <div className="legal-section-header">
            <span className="legal-section-num">02 //</span>
            <h2 className="legal-section-title">Custom Software Engineering &amp; Client Projects</h2>
          </div>
          <p>
            For enterprise partnerships, bespoke simulation software, and specialized contract game development:
          </p>
          <div className="legal-callout">
            <div className="legal-callout-title">MILESTONE-BASED DELIVERY MODEL</div>
            <p>
              All custom development contracts operate strictly on defined technical milestones detailed in an executed Statement of Work (SOW). Billing is linked to acceptance criteria sign-offs rather than arbitrary recurring charges.
            </p>
          </div>
          <ul>
            <li><strong>Deposit &amp; Initiation:</strong> Initial project initiation deposits cover upfront technical architecture, asset pre-production, and engineering allocation. Deposits become non-refundable once sprint development has commenced.</li>
            <li><strong>Milestone Sign-Off:</strong> Clients receive a 14-business-day review window upon delivery of each milestone build. Approval or itemized remediation requests must be submitted within this period. Once a milestone is formally approved in writing, associated milestone fees are non-refundable.</li>
            <li><strong>Cancellation &amp; Kill-Fee Protocol:</strong> Either party may terminate a custom development engagement with 30 days written notice. In the event of early termination, the client is billed only for work completed up to the date of notice, and all deliverables, assets, and source code completed to date are transferred to the client.</li>
          </ul>
        </section>

        {/* 03: Technology Licensing */}
        <section id="licensing" className="legal-section">
          <div className="legal-section-header">
            <span className="legal-section-num">03 //</span>
            <h2 className="legal-section-title">Technology Licensing &amp; Proprietary Toolchains</h2>
          </div>
          <p>
            For licenses granting access to the Aarkonam World Engine, custom real-time shaders, or the Sentinel Neural AI Framework:
          </p>
          <ul>
            <li><strong>Evaluation Sandboxes:</strong> We provide structured technical evaluation sandboxes or live technical demos prior to license execution so prospective partners can verify architectural compatibility.</li>
            <li><strong>Source Code Delivery:</strong> Due to the proprietary nature of binary SDKs and source code repositories, software license fees become non-refundable once access credentials, GitHub worktrees, or build artifacts have been dispatched to the licensee.</li>
          </ul>
        </section>

        {/* 04: Zero Hidden Fees */}
        <section id="no-hidden-fees" className="legal-section">
          <div className="legal-section-header">
            <span className="legal-section-num">04 //</span>
            <h2 className="legal-section-title">Zero Hidden Fees Guarantee</h2>
          </div>
          <p>
            Aarkonam Studios condemns dark patterns, hidden administrative surcharges, and deceptive payment traps. We guarantee:
          </p>
          <div className="legal-alert">
            <div className="legal-alert-title">✔ COMMERCIAL CLARITY PLEDGE</div>
            <p>
              Every cost, license fee, maintenance schedule, and third-party hosting requirement is explicitly itemized in advance. We never charge hidden setup fees, surprise platform surcharges, unquoted maintenance penalties, or automatic subscription roll-overs without affirmative written consent.
            </p>
          </div>
        </section>

        {/* 05: Disputes */}
        <section id="disputes" className="legal-section">
          <div className="legal-section-header">
            <span className="legal-section-num">05 //</span>
            <h2 className="legal-section-title">Billing Inquiries &amp; Escalation</h2>
          </div>
          <p>
            If you have questions regarding a studio invoice, payment receipt, or commercial settlement, our finance directorate is accessible:
          </p>
          <div className="officer-card">
            <div>
              <div className="officer-field-label">FINANCE DIRECTIVITY</div>
              <div className="officer-field-val">
                <a href="mailto:billing@aarkonamstudios.com">billing@aarkonamstudios.com</a>
              </div>
            </div>
            <div>
              <div className="officer-field-label">RESPONSE SLA</div>
              <div className="officer-field-val">24&ndash;48 Business Hours</div>
            </div>
          </div>
        </section>

        <div style={{ marginTop: '3.5rem', textAlign: 'center' }}>
          <Link to="/contact" className="btn-primary" style={{ display: 'inline-flex', padding: '0.875rem 2rem' }}>
            SUBMIT COMMERCIAL INQUIRY ›
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
