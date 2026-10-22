import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from '../context/RouterContext';
import '../styles/home.css';

export default function Home() {
  const { navigate } = useRouter();

  const [activeIndex, setActiveIndex] = useState(0);
  const [clockTime, setClockTime] = useState('--:--');
  const [currentDate, setCurrentDate] = useState('---');

  const menuItems = [
    { number: '01', label: 'STUDIO', path: '/studio' },
    { number: '02', label: 'GAMES', path: '/games' },
    { number: '03', label: 'PROJECTS', path: '/projects' },
    { number: '04', label: 'TEAM', path: '/team' },
    { number: '05', label: 'CONTACT', path: '/contact' }
  ];

  // Digital clock & date updates
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setClockTime(
        now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })
      );
      setCurrentDate(
        now.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()
      );
    };

    tick();
    const interval = setInterval(tick, 1000);
    return () => clearInterval(interval);
  }, []);

  // Keyboard navigation (ArrowUp, ArrowDown, Enter)
  const handleSelect = useCallback(
    (index) => {
      const normalizedIndex = (index + menuItems.length) % menuItems.length;
      setActiveIndex(normalizedIndex);
    },
    [menuItems.length]
  );

  const handleActivate = useCallback(
    (index) => {
      const target = menuItems[index];
      if (target) {
        navigate(target.path);
      }
    },
    [menuItems, navigate]
  );

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey || e.ctrlKey || e.metaKey) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        handleSelect(activeIndex + 1);
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        handleSelect(activeIndex - 1);
      } else if (e.key === 'Enter') {
        const activeTag = document.activeElement?.tagName;
        if (!['INPUT', 'TEXTAREA'].includes(activeTag)) {
          e.preventDefault();
          handleActivate(activeIndex);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, handleSelect, handleActivate]);

  return (
    <main className="game-menu-screen" role="region" aria-label="Aarkonam Studios Main Terminal">
      {/* Background Layers */}
      <div className="game-scene" aria-hidden="true" />
      <div className="game-shade" aria-hidden="true" />
      <div className="ambient-grain" aria-hidden="true" />

      {/* Topbar */}
      <header className="home-topbar">
        <a href="/" className="home-brand" aria-label="Aarkonam Studios Home" onClick={(e) => { e.preventDefault(); navigate('/'); }}>
          <img
            src="/images/aarkonam-wordmark.png"
            alt="Aarkonam Studios"
            className="home-brand-logo"
          />
        </a>

        <div className="home-status-widget" aria-label="System status telemetry">
          <div className="home-clock hud-font">{clockTime}</div>
          <div className="home-status-label hud-font">
            <span className="status-ping" aria-hidden="true" />
            <span>SYSTEM ONLINE</span>
          </div>
          <p className="home-date hud-font">{currentDate}</p>
        </div>
      </header>

      {/* Vertical Interactive Game Menu */}
      <nav className="home-game-menu" aria-label="Terminal Navigation">
        {menuItems.map((item, index) => {
          const isSelected = activeIndex === index;
          return (
            <button
              key={item.label}
              type="button"
              className={`home-menu-item ${isSelected ? 'active' : ''}`}
              onMouseEnter={() => handleSelect(index)}
              onFocus={() => handleSelect(index)}
              onClick={() => handleActivate(index)}
              aria-current={isSelected ? 'page' : undefined}
            >
              <span className="menu-num">{item.number}</span>
              <span className="menu-label">{item.label}</span>
              <span className="menu-arrow" aria-hidden="true">›</span>
            </button>
          );
        })}
      </nav>

      {/* Center Cinematic Hero Content */}
      <section className="home-hero-center" aria-labelledby="home-hero-title">
        <div className="home-eyebrow">
          <span className="home-eyebrow-line" />
          <span>INDEPENDENT CREATIVE STUDIO</span>
          <span className="home-eyebrow-line" />
        </div>

        <h1 id="home-hero-title" className="home-title">
          AARKONAM
        </h1>
        <p className="home-studios-sub">S T U D I O S</p>

        <div className="home-diamond-rule" aria-hidden="true">
          <span className="home-diamond-rule-gem" />
        </div>

        <p className="home-tagline">
          BUILDING WORLDS<br />BEYOND THE SCREEN
        </p>

        <p className="home-subnote">
          GAMES · SOFTWARE · EXPERIMENTAL TECHNOLOGY
        </p>
      </section>

      {/* Tactical Radar / Network Minimap (Bottom-Left) */}
      <aside className="home-network-radar" aria-label="Tactical Network Telemetry">
        <div className="tactical-map" aria-hidden="true">
          <span className="map-cardinal-north">N</span>
          <span className="map-route-vector" />
          <i className="map-player-pointer" />
          <i className="map-beacon-node beacon-1" />
          <i className="map-beacon-node beacon-2" />
        </div>

        <div className="network-details">
          <p>AARKONAM NETWORK</p>
          <small>TERMINAL ROOT</small>
          <small className="coords hud-font">18.5204° N &nbsp;73.8567° E</small>
        </div>
      </aside>

      {/* Footer Credo & Version Telemetry */}
      <footer className="home-bottom-footer">
        <p className="home-footer-credo">
          CREATIVE SYSTEMS <em>/</em> GAMES <em>/</em> TECHNOLOGY <em>/</em> PEOPLE
        </p>
        <div className="home-footer-version">
          <span>BUILD 0.1.0</span><br />
          <small>INDIA <em>/</em> 2026</small>
        </div>
      </footer>

      {/* Center Bottom Accent Line */}
      <div className="home-center-notch" aria-hidden="true">
        <span />
      </div>

      {/* Keyboard Interaction Hint */}
      <p className="home-interaction-hint" aria-hidden="true">
        USE ↑ ↓ TO NAVIGATE <span>·</span> ENTER TO SELECT
      </p>
    </main>
  );
}
