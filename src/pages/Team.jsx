import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Footer from '../components/Footer';
import SectionHeader from '../components/SectionHeader';
import TeamCard from '../components/TeamCard';
import { studioDivisions } from '../data/team';
import { store, subscribeToStore } from '../services/storeService';
import { Link } from '../context/RouterContext';

export default function Team() {
  const [team, setTeam] = useState(() => store.getPublishedTeam());

  useEffect(() => {
    const unsub = subscribeToStore(() => {
      setTeam(store.getPublishedTeam());
    });
    return () => unsub();
  }, []);

  return (
    <div className="page-container">
      <Navigation />
      <div className="ambient-grain" aria-hidden="true" />
      <div className="ambient-vignette" aria-hidden="true" />

      <main className="main-content">
        <div className="content-wrapper">
          <SectionHeader
            eyebrow="STUDIO ARCHITECTS // EXECUTIVE DIRECTORATE"
            title="LEADERSHIP &"
            titleHighlight="FOUNDERS"
            subtitle="The executive council steering the creative vision, technical architecture, and strategic governance of Aarkonam Studios."
          />

          {/* Founders Grid */}
          <section className="founders-section" aria-label="Executive Founders">
            <div className="team-grid">
              {team.map((member) => (
                <TeamCard key={member.id} member={member} />
              ))}
            </div>
          </section>

          {/* Studio Divisions & Structure */}
          <section className="divisions-section" aria-label="Studio Divisions">
            <SectionHeader
              eyebrow="ORGANIZATIONAL TAXONOMY"
              title="STUDIO"
              titleHighlight="DIVISIONS"
              subtitle="Specialized cross-functional cohorts dedicated to narrative worldcraft, low-level engine systems, and production discipline."
            />

            <div className="divisions-grid">
              {studioDivisions.map((div, idx) => (
                <div key={idx} className="division-box">
                  <div className="hud-tag gold" style={{ marginBottom: '0.75rem' }}>
                    0{idx + 1} // SECTOR
                  </div>
                  <h4 className="division-title hud-font">{div.name}</h4>
                  <p className="division-desc">{div.focus}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Governance & Integrity Note */}
          <div className="team-governance-box">
            <div className="gov-icon-wrap">
              <img
                src="/icons/aarkonam-emblem.png"
                alt="Aarkonam Seal"
                className="gov-emblem"
              />
            </div>
            <div>
              <h4 className="gov-title hud-font">EXECUTIVE RECORD VERIFICATION</h4>
              <p className="gov-text">
                Safin Mulani (CEO), Mohd Sumair (CTO), and Adeba Firdous (CFO) represent the official founding leadership of Aarkonam Studios. All technical architectures, artistic approvals, and partnership contracts are governed through the executive directorate in Pune, India.
              </p>
            </div>
          </div>

          {/* Contact / Inquiries Link */}
          <div className="team-footer-cta">
            <p className="hud-font">DIRECT COMMUNICATIONS TO LEADERSHIP</p>
            <Link to="/contact" className="btn-secondary">
              ENGAGE EXECUTIVE OFFICE <span>›</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
