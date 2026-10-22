import React, { useState, useEffect } from 'react';
import { Link, useRouter } from '../context/RouterContext';

export default function Navigation() {
  const { currentPath } = useRouter();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentTime, setCurrentTime] = useState('');

  // Clock updates for HUD display
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Scroll detection for sticky header backdrop styling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route transition
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [currentPath]);

  const navLinks = [
    { to: '/', label: 'HOME', number: '00' },
    { to: '/studio', label: 'STUDIO', number: '01' },
    { to: '/games', label: 'GAMES', number: '02' },
    { to: '/projects', label: 'PROJECTS', number: '03' },
    { to: '/team', label: 'TEAM', number: '04' },
    { to: '/contact', label: 'CONTACT', number: '05' }
  ];

  return (
    <>
      <header className={`site-header ${scrolled ? 'site-header-scrolled' : ''}`}>
        <div className="header-inner">
          {/* Studio Brand */}
          <Link to="/" className="brand-link" aria-label="Aarkonam Studios Home">
            <img
              src="/images/aarkonam-wordmark.png"
              alt="Aarkonam Studios"
              className="brand-wordmark"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="desktop-nav" aria-label="Primary Navigation">
            {navLinks.map((link) => {
              const isActive = currentPath === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`nav-link ${isActive ? 'nav-link-active' : ''}`}
                >
                  <span className="nav-number">{link.number}</span>
                  <span className="nav-label">{link.label}</span>
                  {isActive && <span className="nav-indicator" aria-hidden="true" />}
                </Link>
              );
            })}
          </nav>

          {/* HUD System Status Widget */}
          <div className="header-status" aria-label="System status telemetry">
            <div className="clock-readout hud-font">{currentTime || '--:--'}</div>
            <div className="status-badge">
              <span className="status-ping" aria-hidden="true" />
              <span>SYS ONLINE</span>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="mobile-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            <span className={`hamburger-bar ${mobileMenuOpen ? 'open-1' : ''}`} />
            <span className={`hamburger-bar ${mobileMenuOpen ? 'open-2' : ''}`} />
            <span className={`hamburger-bar ${mobileMenuOpen ? 'open-3' : ''}`} />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <div
        className={`mobile-drawer-overlay ${mobileMenuOpen ? 'drawer-visible' : ''}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden="true"
      />
      <div
        className={`mobile-drawer ${mobileMenuOpen ? 'drawer-open' : ''}`}
        aria-label="Mobile Navigation"
      >
        <div className="drawer-header">
          <img
            src="/icons/aarkonam-emblem.png"
            alt="Aarkonam Emblem"
            className="drawer-emblem"
          />
          <div className="drawer-status hud-font">
            <span className="status-ping" /> SECURE LINK ACTIVE
          </div>
        </div>

        <nav className="drawer-nav">
          {navLinks.map((link) => {
            const isActive = currentPath === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`drawer-link ${isActive ? 'drawer-link-active' : ''}`}
              >
                <span className="drawer-num hud-font">{link.number}</span>
                <span className="drawer-txt">{link.label}</span>
                <span className="drawer-arrow">›</span>
              </Link>
            );
          })}
        </nav>

        <div className="drawer-footer">
          <p className="hud-font">AARKONAM STUDIOS</p>
          <small>BUILDING WORLDS BEYOND THE SCREEN</small>
        </div>
      </div>
    </>
  );
}
