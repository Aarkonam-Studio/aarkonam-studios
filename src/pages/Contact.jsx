import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SectionHeader from '../components/SectionHeader';
import ContactForm from '../components/ContactForm';

export default function Contact() {
  return (
    <div className="page-container">
      <Navigation />
      <div className="ambient-grain" aria-hidden="true" />
      <div className="ambient-vignette" aria-hidden="true" />

      <main className="main-content">
        <div className="content-wrapper">
          <SectionHeader
            eyebrow="COMMUNICATIONS RELAY // TRANSMISSION PORTAL"
            title="INITIATE"
            titleHighlight="ENGAGEMENT"
            subtitle="Connect with the Aarkonam executive council regarding game production, technology licensing, custom interactive engineering, or strategic studio partnerships."
          />

          <div className="contact-layout-grid">
            {/* Left: Contact Form */}
            <div className="contact-main-col">
              <ContactForm />
            </div>

            {/* Right: Telemetry & Transmission Directives */}
            <aside className="contact-sidebar">
              {/* Studio Directives Card */}
              <div className="contact-info-card">
                <div className="info-card-header">
                  <span className="hud-font">STUDIO TELEMETRY</span>
                  <span className="hud-tag active">ENCRYPTED</span>
                </div>

                <div className="contact-info-block">
                  <span className="info-label hud-font">OPERATIONAL BASE</span>
                  <p className="info-val">Pune, Maharashtra, India</p>
                  <small className="info-sub hud-font">COORDINATES: 18.5204° N, 73.8567° E</small>
                </div>

                <div className="contact-info-block">
                  <span className="info-label hud-font">OFFICIAL DESTINATION</span>
                  <p className="info-val emerald-accent">contact@aarkonamstudios.placeholder</p>
                  <small className="info-sub">Subject to production routing queue</small>
                </div>

                <div className="contact-info-block">
                  <span className="info-label hud-font">AVERAGE DISPATCH RESPONSE</span>
                  <p className="info-val">24 — 48 Business Hours</p>
                  <small className="info-sub">Direct executive assessment</small>
                </div>

                <div className="contact-info-block">
                  <span className="info-label hud-font">ENCRYPTION LEVEL</span>
                  <p className="info-val gold-accent">TLS 1.3 / AES-256 Protocol</p>
                </div>
              </div>

              {/* Inquiry Protocols Note */}
              <div className="protocol-notice-box">
                <div className="protocol-header hud-font">
                  <span className="hud-tag gold">INQUIRY PROTOCOLS</span>
                </div>
                <ul className="protocol-list">
                  <li>
                    <span className="bullet">01</span>
                    <span>All mutual proprietary concepts are treated under bilateral NDA standards upon request.</span>
                  </li>
                  <li>
                    <span className="bullet">02</span>
                    <span>Game pitch briefs must outline target platforms, anticipated production timeline, and visual references.</span>
                  </li>
                  <li>
                    <span className="bullet">03</span>
                    <span>Software & AI inquiries will be routed directly to CTO Mohd Sumair’s engineering review team.</span>
                  </li>
                </ul>
              </div>

              {/* Official Seal Watermark */}
              <div className="contact-seal-card">
                <img
                  src="/icons/aarkonam-emblem.png"
                  alt="Aarkonam Emblem"
                  className="contact-seal-img"
                />
                <div>
                  <p className="hud-font">AARKONAM COMMUNICATIONS</p>
                  <small>VERIFIED TRANSMISSION CHANNEL</small>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
