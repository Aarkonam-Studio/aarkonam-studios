import React, { useState, useMemo } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SectionHeader from '../components/SectionHeader';
import ProjectCard from '../components/ProjectCard';
import { projectsData, projectCategories } from '../data/projects';
import { Link } from '../context/RouterContext';

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('ALL');

  // Real functional filtering
  const filteredProjects = useMemo(() => {
    if (activeCategory === 'ALL') return projectsData;
    return projectsData.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  const featuredProject = projectsData[0];

  return (
    <div className="page-container">
      <Navigation />
      <div className="ambient-grain" aria-hidden="true" />
      <div className="ambient-vignette" aria-hidden="true" />

      <main className="main-content">
        <div className="content-wrapper">
          <SectionHeader
            eyebrow="APPLIED SYSTEMS // RESEARCH & TOOLS"
            title="TECHNOLOGY &"
            titleHighlight="SOFTWARE"
            subtitle="Architectural frameworks, autonomous agent heuristics, and real-time graphics pipelines forged inside the Aarkonam engineering pipeline."
          />

          {/* Featured Technology Showcase: World Engine */}
          {featuredProject && (
            <section className="featured-project-panel" aria-labelledby="featured-project-heading">
              <div className="featured-project-backdrop">
                <img
                  src={featuredProject.image}
                  alt={featuredProject.title}
                  className="featured-project-bg-img"
                />
                <div className="featured-project-scrim" />
              </div>

              <div className="featured-project-body">
                <div className="panel-badge-row">
                  <span className="hud-tag gold">{featuredProject.category}</span>
                  <span className="hud-tag active">{featuredProject.status}</span>
                </div>

                <div className="panel-scope hud-font">{featuredProject.scope}</div>
                <h2 id="featured-project-heading" className="featured-project-title">
                  {featuredProject.title}
                </h2>
                <p className="featured-project-lead">{featuredProject.description}</p>

                <div className="featured-project-spec-grid">
                  <div className="spec-item">
                    <span className="spec-label hud-font">BENCHMARK PERFORMANCE</span>
                    <span className="spec-value emerald-accent hud-font">{featuredProject.metric}</span>
                  </div>
                  <div className="spec-item">
                    <span className="spec-label hud-font">CORE ARCHITECTURE</span>
                    <span className="spec-value">{featuredProject.techStack.join(' · ')}</span>
                  </div>
                </div>

                <div className="featured-project-features">
                  <h4 className="hud-font features-subheading">CAPABILITY DISCLOSURE</h4>
                  <ul className="capability-list">
                    {featuredProject.features.map((feat, idx) => (
                      <li key={idx}>
                        <span className="cap-mark">◆</span>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>
          )}

          {/* Category Filter Tabs (Fully functional) */}
          <div className="project-categories-bar" role="tablist" aria-label="Project Categories">
            {projectCategories.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`category-tab-btn ${isSelected ? 'tab-active' : ''}`}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Filtered Project Cards Grid */}
          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>

          {filteredProjects.length === 0 && (
            <div className="empty-filter-state">
              <p className="hud-font">NO RESEARCH ENTRIES CURRENTLY REGISTERED UNDER THIS CATEGORY.</p>
            </div>
          )}

          {/* Research & Collaboration CTA */}
          <section className="research-cta-card">
            <div className="research-cta-content">
              <div className="hud-font cta-eyebrow">TECHNOLOGY LICENSING & INQUIRIES</div>
              <h3 className="cta-heading">PARTNER ON APPLIED SYSTEMS</h3>
              <p className="cta-desc">
                Interested in licensing our rendering pipelines, integrating autonomous AI behavioral frameworks, or collaborating on custom simulation software?
              </p>
            </div>
            <Link to="/contact" className="btn-primary">
              INITIATE COLLABORATION <span>›</span>
            </Link>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
