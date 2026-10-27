import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SectionHeader from '../components/SectionHeader';
import GameCard from '../components/GameCard';
import GameModal from '../components/GameModal';
import { store, subscribeToStore } from '../services/storeService';
import { Link } from '../context/RouterContext';

export default function Games() {
  const [selectedGame, setSelectedGame] = useState(null);
  const [games, setGames] = useState(() => store.getPublishedGames());

  useEffect(() => {
    const unsub = subscribeToStore(() => {
      setGames(store.getPublishedGames());
    });
    return () => unsub();
  }, []);

  // Featured flagship game
  const featuredGame = games.find((g) => g.featured) || games[0];

  return (
    <div className="page-container">
      <Navigation />
      <div className="ambient-grain" aria-hidden="true" />
      <div className="ambient-vignette" aria-hidden="true" />

      <main id="main-content" className="main-content" tabIndex="-1">
        <div className="content-wrapper">
          <SectionHeader
            eyebrow="PORTFOLIO // ACTIVE REALMS"
            title="GAMES &"
            titleHighlight="EXPERIENCES"
            subtitle="Original intellectual properties forged in dark fantasy, atmospheric science-fiction, and tactical world simulation."
          />

          {/* Featured Game Spotlight */}
          {featuredGame && (
            <section className="featured-game-spotlight" aria-labelledby="featured-game-title">
              <div className="featured-game-banner">
                <img
                  src={featuredGame.image}
                  alt={featuredGame.title}
                  className="featured-game-bg"
                />
                <div className="featured-game-gradient" />
                <div className="featured-game-inner">
                  <div className="featured-badge-row">
                    <span className="hud-tag gold">FEATURED TITLES</span>
                    <span className="hud-tag active">{featuredGame.status}</span>
                  </div>

                  <p className="featured-game-tagline hud-font">{featuredGame.tagline}</p>
                  <h2 id="featured-game-title" className="featured-game-title">
                    {featuredGame.title}
                  </h2>
                  <p className="featured-game-desc">
                    {featuredGame.description}
                  </p>

                  <div className="featured-game-meta">
                    <div className="meta-block">
                      <span className="meta-label hud-font">GENRE</span>
                      <span className="meta-value">{featuredGame.genre}</span>
                    </div>
                    <div className="meta-block">
                      <span className="meta-label hud-font">PLATFORMS</span>
                      <span className="meta-value">{featuredGame.platforms?.join(' · ') || 'PC'}</span>
                    </div>
                  </div>

                  <div className="featured-game-actions">
                    <button
                      type="button"
                      className="btn-primary"
                      onClick={() => setSelectedGame(featuredGame)}
                    >
                      EXPAND MISSION INTEL <span>›</span>
                    </button>
                    <Link to="/contact" className="btn-secondary">
                      INQUIRE ON PRODUCTION
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* All Games Grid */}
          <section className="games-archive-section">
            <div className="archive-header-row">
              <h3 className="archive-title hud-font">DEVELOPMENT ARCHIVE</h3>
              <span className="archive-count hud-font">
                0{games.length} PROPERTIES REGISTERED
              </span>
            </div>

            <div className="game-grid">
              {games.map((game) => (
                <GameCard
                  key={game.id}
                  game={game}
                  onSelect={(g) => setSelectedGame(g)}
                />
              ))}
            </div>
          </section>

          {/* Disclaimer & Integrity Note */}
          <div className="integrity-note-box">
            <span className="note-icon">ℹ</span>
            <p>
              <strong>PRODUCTION DISCLOSURE:</strong> All projects listed reflect active concepts, architectural prototypes, and titles in development by Aarkonam Studios. We do not publish speculative release dates or premature commercial commitments.
            </p>
          </div>
        </div>
      </main>

      {/* Detail Intel Modal */}
      {selectedGame && (
        <GameModal
          game={selectedGame}
          onClose={() => setSelectedGame(null)}
        />
      )}

      <Footer />
    </div>
  );
}
