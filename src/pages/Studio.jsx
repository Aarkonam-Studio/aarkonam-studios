import React from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SectionHeader from '../components/SectionHeader';
import { Link } from '../context/RouterContext';

export default function Studio() {
  const pillars = [
    {
      num: '01',
      title: 'IMMERSIVE WORLDCRAFT',
      tag: 'NARRATIVE & ENVIRONMENT',
      desc: 'We conceive and construct deep, cohesive fictional universes combining dark fantasy mythology, celestial science-fiction, and environmental storytelling. Every environment is built with atmospheric weight, intentional lore, and visual restraint.'
    },
    {
      num: '02',
      title: 'INTERACTIVE ARCHITECTURE',
      tag: 'GAME SYSTEMS & REAL-TIME',
      desc: 'Developing specialized game systems, responsive combat paradigms, and custom simulation logic. We focus on mechanical depth, tactile feedback, and seamless real-time rendering rather than shallow spectacle.'
    },
    {
      num: '03',
      title: 'APPLIED AI & EXPERIMENTAL TOOLS',
      tag: 'SYNTHESIS & AUTOMATION',
      desc: 'Exploring intelligent behavioral architectures, context-aware NPC cognition, and procedural level synthesis. We treat AI not as a replacement for human artistic intent, but as an amplifier for simulated world density.'
    },
    {
      num: '04',
      title: 'ENGINEERING DISCIPLINE',
      tag: 'SOFTWARE & INFRASTRUCTURE',
      desc: 'Building performant graphics pipelines, scalable client architectures, and distributed developer toolchains. Uncompromising focus on low frame times, stable memory footprints, and clean codebases.'
    }
  ];

  const principles = [
    {
      title: 'Atmosphere Over Noise',
      summary: 'True immersion is crafted through shadow, silence, and deliberate pacing—not relentless sensory saturation.'
    },
    {
      title: 'Technical Integrity',
      summary: 'Visual ambition is meaningless without rock-solid runtime performance and resilient software architecture.'
    },
    {
      title: 'Enduring Worlds',
      summary: 'We build worlds meant to linger in the player’s memory long after the screen goes dark.'
    }
  ];

  return (
    <div className="page-container">
      <Navigation />
      <div className="ambient-grain" aria-hidden="true" />
      <div className="ambient-vignette" aria-hidden="true" />

      <main id="main-content" className="main-content" tabIndex="-1">
        {/* Studio Hero with Grand Archive Artwork */}
        <section className="studio-hero-section">
          <div className="studio-hero-backdrop">
            <img
              src="/images/studio-grand-archive.png"
              alt="The Grand Emerald Archives — Aarkonam Studios"
              className="studio-hero-bg-img"
            />
            <div className="studio-hero-overlay" />
          </div>

          <div className="content-wrapper studio-hero-content">
            <div className="studio-hero-badge hud-tag gold">
              SANCTUARY OF WORLDCRAFT
            </div>
            <h1 className="studio-hero-title">
              ARCHITECTS OF <span>UNCHARTERED REALMS</span>
            </h1>
            <p className="studio-hero-lead">
              Aarkonam Studios is an independent creative studio operating at the intersection of cinematic worldcraft, advanced game engineering, and experimental technology.
            </p>
          </div>
        </section>

        {/* Narrative & Philosophy Section */}
        <section className="studio-narrative-section">
          <div className="content-wrapper">
            <div className="narrative-split-grid">
              <div className="narrative-left">
                <SectionHeader
                  eyebrow="STUDIO FOUNDATION"
                  title="THE ETHOS OF"
                  titleHighlight="EMERALD NOIR"
                  subtitle="We reject generic templates and disposable experiences. Our mandate is to build digital environments imbued with mythic atmosphere, architectural dignity, and technical rigor."
                />

                <div className="narrative-quote-block">
                  <p>
                    “To build a world beyond the screen is not simply to render polygons—it is to establish rules, atmosphere, and mystery that convince the player that this universe exists before they arrive, and continues after they leave.”
                  </p>
                  <cite className="hud-font">— AARKONAM CREATIVE DIRECTORATE</cite>
                </div>
              </div>

              <div className="narrative-right">
                <div className="telemetry-stat-card">
                  <div className="stat-card-header">
                    <span className="hud-font">STUDIO TELEMETRY</span>
                    <span className="hud-tag active">ACTIVE OPERATIONS</span>
                  </div>

                  <div className="stat-row">
                    <span className="stat-label hud-font">STUDIO ORIGIN</span>
                    <span className="stat-value">Pune, Maharashtra, India</span>
                  </div>

                  <div className="stat-row">
                    <span className="stat-label hud-font">PRIMARY DISCIPLINES</span>
                    <span className="stat-value">Game Development · Software Architecture · Applied AI</span>
                  </div>

                  <div className="stat-row">
                    <span className="stat-label hud-font">DESIGN LANGUAGE</span>
                    <span className="stat-value emerald-accent">Emerald Noir // Restrained Luxury</span>
                  </div>

                  <div className="stat-row">
                    <span className="stat-label hud-font">STATUS</span>
                    <span className="stat-value">Active Prototyping & Technology Development</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Studio Pillars & Capabilities */}
        <section className="studio-pillars-section">
          <div className="content-wrapper">
            <SectionHeader
              eyebrow="CAPABILITIES & DOMAINS"
              title="WHAT WE"
              titleHighlight="ENGINEER"
              subtitle="From proprietary simulation pipelines to atmospheric level geometry, our disciplines span the full spectrum of modern interactive development."
            />

            <div className="pillars-grid">
              {pillars.map((pillar) => (
                <div key={pillar.num} className="pillar-card">
                  <div className="pillar-top">
                    <span className="pillar-num hud-font">{pillar.num}</span>
                    <span className="pillar-tag hud-tag">{pillar.tag}</span>
                  </div>
                  <h3 className="pillar-title">{pillar.title}</h3>
                  <p className="pillar-desc">{pillar.desc}</p>
                  <div className="pillar-border-accent" />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Development Principles */}
        <section className="studio-principles-section">
          <div className="content-wrapper">
            <SectionHeader
              eyebrow="CREATIVE DISCIPLINE"
              title="FOUNDING"
              titleHighlight="PRINCIPLES"
              subtitle="The unbending tenets that govern our worldcraft, production schedules, and software architecture."
            />

            <div className="principles-grid">
              {principles.map((pr, idx) => (
                <div key={idx} className="principle-card">
                  <div className="principle-index hud-font">0{idx + 1} // RULE</div>
                  <h4 className="principle-title">{pr.title}</h4>
                  <p className="principle-summary">{pr.summary}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Cross-Link Routing Portals */}
        <section className="studio-portals-section">
          <div className="content-wrapper">
            <div className="portals-banner">
              <div className="portal-item">
                <span className="portal-num hud-font">02 // REALMS</span>
                <h3 className="portal-heading">EXPLORE ACTIVE GAMES</h3>
                <p className="portal-desc">Inspect our flagship titles, dark fantasy sagas, and mechanical prototypes.</p>
                <Link to="/games" className="btn-primary">
                  VIEW GAMES <span>›</span>
                </Link>
              </div>

              <div className="portal-separator" />

              <div className="portal-item">
                <span className="portal-num hud-font">03 // SYSTEMS</span>
                <h3 className="portal-heading">INSPECT TOOLS & RESEARCH</h3>
                <p className="portal-desc">Discover our procedural world engines, volumetric shaders, and AI agents.</p>
                <Link to="/projects" className="btn-secondary">
                  VIEW PROJECTS <span>›</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
