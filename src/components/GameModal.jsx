import React, { useEffect } from 'react';

export default function GameModal({ game, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  if (!game) return null;

  return (
    <div className="modal-backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="modal-game-title">
      <div className="modal-window" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close intel modal"
        >
          ✕
        </button>

        <div className="modal-hero-banner">
          <img
            src={game.leadArtwork || game.image}
            alt={game.title}
            className="modal-banner-img"
          />
          <div className="modal-banner-overlay" />
          <div className="modal-banner-header">
            <span className="hud-tag active">{game.status}</span>
            <h2 id="modal-game-title" className="modal-title">{game.title}</h2>
            <p className="modal-tagline hud-font">{game.tagline}</p>
          </div>
        </div>

        <div className="modal-body">
          <div className="modal-main-col">
            <div className="modal-section">
              <h4 className="modal-section-heading hud-font">MISSION SYNOPSIS</h4>
              <p className="modal-desc">{game.description}</p>
            </div>

            {game.loreSnippet && (
              <div className="modal-lore-quote">
                <span className="lore-mark">“</span>
                <p>{game.loreSnippet}</p>
              </div>
            )}

            <div className="modal-section">
              <h4 className="modal-section-heading hud-font">CORE ARCHITECTURAL FEATURES</h4>
              <ul className="modal-feature-list">
                {game.features?.map((feat, idx) => (
                  <li key={idx}>
                    <span className="feat-bullet">◆</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="modal-side-col">
            <div className="modal-spec-card">
              <h4 className="spec-card-heading hud-font">INTEL & TELEMETRY</h4>
              
              <div className="spec-row">
                <span className="spec-label">GENRE</span>
                <span className="spec-val">{game.genre}</span>
              </div>
              
              <div className="spec-row">
                <span className="spec-label">TARGET PLATFORMS</span>
                <span className="spec-val">
                  {game.platforms?.join(' · ') || 'PC / Next-Gen'}
                </span>
              </div>

              <div className="spec-row">
                <span className="spec-label">DEV STATUS</span>
                <span className="spec-val emerald-accent">{game.status}</span>
              </div>

              {game.technicalHighlights && (
                <div className="spec-row spec-tech">
                  <span className="spec-label">RENDER HIGHLIGHTS</span>
                  <span className="spec-val">{game.technicalHighlights}</span>
                </div>
              )}
            </div>

            <div className="modal-seal-badge">
              <img
                src="/icons/aarkonam-emblem.png"
                alt="Aarkonam Emblem"
                className="modal-emblem-icon"
              />
              <div>
                <p className="hud-font">OFFICIAL STUDIO PROPERTY</p>
                <small>CLASSIFIED DEVELOPMENT RECORD</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
