import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import { Link } from '../context/RouterContext';

export default function NotFound() {
  return (
    <div className="page-container">
      <Navigation />
      <div className="ambient-grain" aria-hidden="true" />
      <div className="ambient-vignette" aria-hidden="true" />

      <main id="main-content" className="main-content" tabIndex="-1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: '65vh' }}>
        <div className="content-wrapper">
          <div className="hud-tag gold" style={{ marginBottom: '1.25rem' }}>
            STATUS CODE 404 // ROUTE DISCONNECTED
          </div>
          <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4.5rem)', letterSpacing: '0.18em', marginBottom: '1rem' }}>
            SECTOR <span className="emerald-accent">UNEXPLORED</span>
          </h1>
          <p style={{ maxWidth: '540px', margin: '0 auto 2.5rem', color: 'var(--muted-text)', fontSize: '1rem', lineHeight: '1.7' }}>
            The requested transmission coordinate or directory does not exist within the current Aarkonam network topology. Return to authorized coordinates.
          </p>

          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/" className="btn-primary">
              RETURN TO MAIN TERMINAL <span>›</span>
            </Link>
            <Link to="/games" className="btn-secondary">
              BROWSE ACTIVE REALMS
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
