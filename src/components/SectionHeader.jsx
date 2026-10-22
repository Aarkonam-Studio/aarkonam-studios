import React from 'react';

export default function SectionHeader({
  eyebrow = 'AARKONAM STUDIOS',
  title,
  titleHighlight,
  subtitle,
  className = ''
}) {
  return (
    <div className={`section-header ${className}`}>
      {eyebrow && <div className="section-eyebrow">{eyebrow}</div>}
      <h2 className="section-title">
        {title} {titleHighlight && <span>{titleHighlight}</span>}
      </h2>
      {subtitle && <p className="section-subtitle">{subtitle}</p>}
      <div className="section-divider">
        <div className="section-divider-line" />
        <div className="section-divider-diamond" />
        <div className="section-divider-line" />
      </div>
    </div>
  );
}
