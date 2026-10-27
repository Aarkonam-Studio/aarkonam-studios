import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Link } from '../context/RouterContext';

export default function TermsOfService() {
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
            <span>TERMS OF ENGAGEMENT</span>
          </div>
          <h1 className="legal-title">Terms of Service</h1>
          <div className="legal-meta-row">
            <div className="legal-meta-item">
              <span className="legal-meta-label">LAST REVISED:</span>
              <span>October 27, 2026</span>
            </div>
            <div className="legal-meta-item">
              <span className="legal-meta-label">APPLICABILITY:</span>
              <span>All Web Terminals, Inquiries &amp; Digital Services</span>
            </div>
            <div className="legal-meta-item">
              <span className="legal-meta-label">JURISDICTION:</span>
              <span className="emerald-accent">India (Global Commercial Operations)</span>
            </div>
          </div>
          <p className="legal-intro">
            These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of the website, digital headquarters, project inquiry terminals, and proprietary technology systems operated by Aarkonam Studios (&ldquo;Aarkonam,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By accessing our website or transmitting an inquiry, you agree to be bound by these Terms.
          </p>
        </header>

        {/* Quick Directory */}
        <nav className="legal-toc" aria-label="Terms of service directory">
          <h3 className="legal-toc-title">DIRECTORY OF CLAUSES</h3>
          <ul className="legal-toc-grid">
            <li><a href="#acceptance"><span className="legal-toc-num">01 //</span> Acceptance of Terms</a></li>
            <li><a href="#ip"><span className="legal-toc-num">02 //</span> Intellectual Property Rights</a></li>
            <li><a href="#conduct"><span className="legal-toc-num">03 //</span> Permitted Use &amp; Code of Conduct</a></li>
            <li><a href="#confidentiality"><span className="legal-toc-num">04 //</span> Inquiries &amp; Mutual Confidentiality</a></li>
            <li><a href="#fees"><span className="legal-toc-num">05 //</span> Transparent Pricing &amp; No Hidden Fees</a></li>
            <li><a href="#disclaimers"><span className="legal-toc-num">06 //</span> Disclaimers of Warranties</a></li>
            <li><a href="#liability"><span className="legal-toc-num">07 //</span> Limitation of Liability</a></li>
            <li><a href="#law"><span className="legal-toc-num">08 //</span> Governing Law &amp; Arbitration</a></li>
          </ul>
        </nav>

        {/* 01: Acceptance */}
        <section id="acceptance" className="legal-section">
          <div className="legal-section-header">
            <span className="legal-section-num">01 //</span>
            <h2 className="legal-section-title">Acceptance of Terms</h2>
          </div>
          <p>
            By accessing our digital headquarters at <code>aarkonamstudios.com</code> (or any authorized subdomains), you acknowledge that you have read, understood, and agreed to these Terms and our <Link to="/privacy">Privacy Policy</Link>. If you do not agree, you must immediately terminate your session.
          </p>
          <p>
            You affirm that you are at least 16 years of age (or the legal age of majority in your jurisdiction) and possess full legal capacity to enter into these Terms.
          </p>
        </section>

        {/* 02: IP Rights */}
        <section id="ip" className="legal-section">
          <div className="legal-section-header">
            <span className="legal-section-num">02 //</span>
            <h2 className="legal-section-title">Intellectual Property Rights</h2>
          </div>
          <p>
            All content, visual assets, software code, design systems, and creative universes published on this website are the proprietary property of Aarkonam Studios or our licensors:
          </p>
          <ul>
            <li><strong>Fictional Universes &amp; Games:</strong> The lore, narratives, character designs, codenames, and trademarks associated with <em>Leviathan: Emerald Odyssey</em>, <em>Sanctum of the Void</em>, <em>Aetheria: Neon Horizons</em>, and upcoming studio titles are protected under international copyright and trademark laws.</li>
            <li><strong>Emerald Noir Design System:</strong> The visual branding, color palettes, HUD interface motifs, icons, wordmarks, and typography compositions are the exclusive design property of Aarkonam Studios.</li>
            <li><strong>Software &amp; Frameworks:</strong> The source code of our public web applications, shader implementations, and preview software may not be reverse engineered, decompiled, copied, or distributed without prior written consent.</li>
          </ul>
        </section>

        {/* 03: Permitted Use & Conduct */}
        <section id="conduct" className="legal-section">
          <div className="legal-section-header">
            <span className="legal-section-num">03 //</span>
            <h2 className="legal-section-title">Permitted Use &amp; Code of Conduct</h2>
          </div>
          <p>You agree to access our terminals only for lawful purposes. You shall not:</p>
          <ul>
            <li>Deploy automated bots, spiders, or scrapers to extract studio data without authorization.</li>
            <li>Attempt to bypass, defeat, or manipulate our anti-abuse honeypot shields, rate limiters, or administrative authentication boundaries.</li>
            <li>Transmit unsolicited commercial spam, fraudulent communications, or malicious code through the Contact terminal.</li>
            <li>Probe, scan, or test the vulnerability of our infrastructure without formal written authorization from our Security Directorate (<a href="mailto:security@aarkonamstudios.com">security@aarkonamstudios.com</a>).</li>
          </ul>
        </section>

        {/* 04: Confidentiality & NDA */}
        <section id="confidentiality" className="legal-section">
          <div className="legal-section-header">
            <span className="legal-section-num">04 //</span>
            <h2 className="legal-section-title">Project Inquiries &amp; Mutual Confidentiality</h2>
          </div>
          <p>
            Aarkonam Studios understands the sensitive nature of game concepts, intellectual property pitches, and enterprise software briefs. When you submit a brief through our transmission terminal:
          </p>
          <div className="legal-callout">
            <div className="legal-callout-title">CONFIDENTIALITY PLEDGE</div>
            <p>
              We treat all project descriptions, design documents, and commercial estimates received as confidential information. We do not share, publish, or disclose your proprietary concepts to third parties. We are ready to execute bilateral Non-Disclosure Agreements (NDAs) prior to in-depth technical scoping.
            </p>
          </div>
          <p>
            Initial budget ranges and timeline estimates discussed during exploratory phases are non-binding estimates. Formal commitments become legally effective only upon the mutual execution of a Master Services Agreement (MSA) or Statement of Work (SOW).
          </p>
        </section>

        {/* 05: Transparent Pricing */}
        <section id="fees" className="legal-section">
          <div className="legal-section-header">
            <span className="legal-section-num">05 //</span>
            <h2 className="legal-section-title">Transparent Pricing &amp; Zero Hidden Fees</h2>
          </div>
          <p>
            Aarkonam Studios is committed to complete commercial clarity. In accordance with consumer trust regulations:
          </p>
          <ul>
            <li><strong>Zero Hidden Charges:</strong> All studio proposals, licensing tiers, and milestone schedules are itemized in clear terms. We never levy unquoted platform fees, unexpected maintenance surcharges, or hidden processing markups.</li>
            <li><strong>Milestone Verification:</strong> Custom development engagements operate on clear milestone deliverables with formal sign-off before subsequent development phases commence.</li>
            <li><strong>Commercial Games:</strong> Retail purchases of our published game titles are processed via authorized platform stores (e.g. Steam, Epic Games Store, PlayStation Network) under standard platform refund and licensing guidelines.</li>
          </ul>
          <p>
            For detailed commercial terms and cancellation procedures, view our <Link to="/refund">Refund &amp; Cancellation Policy</Link>.
          </p>
        </section>

        {/* 06: Disclaimers */}
        <section id="disclaimers" className="legal-section">
          <div className="legal-section-header">
            <span className="legal-section-num">06 //</span>
            <h2 className="legal-section-title">Disclaimers of Warranties</h2>
          </div>
          <p>
            This website and its content are provided on an &ldquo;as is&rdquo; and &ldquo;as available&rdquo; basis without warranties of any kind, either express or implied. To the maximum extent permitted by applicable law, Aarkonam Studios disclaims all warranties, including merchantability, fitness for a particular purpose, and non-infringement.
          </p>
          <p>
            While we maintain robust server uptime and strict cybersecurity hygiene, we do not guarantee uninterrupted, error-free, or virus-free operation of our public web servers.
          </p>
        </section>

        {/* 07: Limitation of Liability */}
        <section id="liability" className="legal-section">
          <div className="legal-section-header">
            <span className="legal-section-num">07 //</span>
            <h2 className="legal-section-title">Limitation of Liability</h2>
          </div>
          <p>
            To the fullest extent permitted by applicable law, in no event shall Aarkonam Studios, its founders, directors, employees, or contractors be liable for any indirect, incidental, consequential, special, or punitive damages (including loss of profits, data, goodwill, or business interruption) arising out of or related to your use of this website.
          </p>
        </section>

        {/* 08: Law & Arbitration */}
        <section id="law" className="legal-section">
          <div className="legal-section-header">
            <span className="legal-section-num">08 //</span>
            <h2 className="legal-section-title">Governing Law &amp; Dispute Resolution</h2>
          </div>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of <strong>India</strong>, without regard to conflict of law principles.
          </p>
          <p>
            Any dispute, controversy, or claim arising out of or relating to these Terms shall first be submitted to mutual amicable discussions between executive representatives. If unresolved within 30 days, the dispute shall be finally settled under the Arbitration and Conciliation Act, 1996 by a sole arbitrator mutually appointed by the parties, seated in <strong>Pune, Maharashtra, India</strong>.
          </p>
        </section>

        <div style={{ marginTop: '3.5rem', textAlign: 'center' }}>
          <Link to="/contact" className="btn-secondary" style={{ display: 'inline-flex', padding: '0.875rem 2rem' }}>
            CONNECT WITH LEGAL DIRECTIVITY ›
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
