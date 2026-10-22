import React from 'react';

export default function GameCard({ game, onSelect }) {
  return (
    <article className="game-card" tabIndex={0} onKeyDown={(e) => e.key === 'Enter' && onSelect(game)}>
      <div className="game-card-media">
        <img
          src={game.image}
          alt={game.title}
          className="game-card-img"
          loading="lazy"
        />
        <div className="game-card-gradient" />
        <div className="game-card-hud-tags">
          <span className="hud-tag active">{game.status}</span>
          <span className="hud-tag gold">{game.genre.split('/')[0]}</span>
        </div>
      </div>

      <div className="game-card-info">
        <p className="game-card-eyebrow hud-font">{game.tagline}</p>
        <h3 className="game-card-title">{game.title}</h3>
        <p className="game-card-description">{game.description}</p>

        <div className="game-card-footer">
          <div className="game-card-platforms">
            {game.platforms?.map((p, idx) => (
              <span key={idx} className="platform-tag">{p}</span>
            ))}
          </div>
          
          <button
            type="button"
            className="btn-inspect hud-font"
            onClick={() => onSelect(game)}
            aria-label={`Inspect ${game.title} details`}
          >
            <span>EXPAND INTEL</span>
            <span className="inspect-arrow">›</span>
          </button>
        </div>
      </div>
      
      {/* Corner decorative HUD notches */}
      <span className="card-notch notch-tl" aria-hidden="true" />
      <span className="card-notch notch-tr" aria-hidden="true" />
      <span className="card-notch notch-bl" aria-hidden="true" />
      <span className="card-notch notch-br" aria-hidden="true" />
    </article>
  );
}
