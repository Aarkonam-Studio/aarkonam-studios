import React from 'react';

export default function TeamCard({ member }) {
  return (
    <article className="team-card">
      <div className="team-card-inner">
        <div className="team-card-header">
          <div className="team-emblem-wrap">
            <img
              src="/icons/aarkonam-emblem.png"
              alt="Aarkonam Emblem"
              className="team-emblem"
            />
          </div>
          <span className="team-badge hud-font">{member.emblemBadge}</span>
        </div>

        <div className="team-card-content">
          <p className="team-designation hud-font">{member.designation}</p>
          <h3 className="team-name">{member.name}</h3>
          <p className="team-role gold-accent">{member.role}</p>

          <div className="team-divider" />

          <div className="team-division">
            <span className="div-label hud-font">EXECUTIVE PORTFOLIO</span>
            <p className="div-title">{member.division}</p>
          </div>

          <p className="team-focus">{member.focus}</p>
        </div>

        <div className="team-card-hud-bottom">
          <span className="hud-code">ARK-DIR // 2026</span>
          <span className="hud-status-active">
            <span className="status-ping" /> SEATED
          </span>
        </div>
      </div>

      {/* Cybernetic border accents */}
      <span className="team-corner tl" />
      <span className="team-corner tr" />
      <span className="team-corner bl" />
      <span className="team-corner br" />
    </article>
  );
}
