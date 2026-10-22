import React from 'react';

export default function ProjectCard({ project }) {
  return (
    <article className="project-card">
      <div className="project-card-media">
        <img
          src={project.image}
          alt={project.title}
          className="project-card-img"
          loading="lazy"
        />
        <div className="project-card-overlay" />
        <div className="project-card-badges">
          <span className="hud-tag gold">{project.category}</span>
          <span className="hud-tag active">{project.status}</span>
        </div>
      </div>

      <div className="project-card-body">
        <div className="project-scope-label hud-font">{project.scope}</div>
        <h3 className="project-card-title">{project.title}</h3>
        <p className="project-card-desc">{project.description}</p>

        {project.metric && (
          <div className="project-metric-box">
            <span className="metric-label hud-font">BENCHMARK / METRIC:</span>
            <span className="metric-val emerald-accent hud-font">{project.metric}</span>
          </div>
        )}

        <div className="project-tech-stack">
          {project.techStack?.map((tech, idx) => (
            <span key={idx} className="tech-chip">{tech}</span>
          ))}
        </div>

        <div className="project-features-list">
          {project.features?.slice(0, 2).map((feat, idx) => (
            <div key={idx} className="project-feature-item">
              <span className="feat-dot">▪</span>
              <span>{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative cybernetic lines */}
      <div className="project-accent-rule" />
    </article>
  );
}
