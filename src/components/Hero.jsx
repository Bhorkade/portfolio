import React, { useState, useEffect } from 'react';
import {
  FolderGit2,
  Download,
  Mail,
  Terminal,
  Code2,
  Check,
  ArrowUpRight,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from './Icons';

export default function Hero() {
  const [typedCode, setTypedCode] = useState('');
  const fullCode = 'const dev = { mca: 2027, role: "Software Developer" };';

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedCode(fullCode.slice(0, index));
      index++;
      if (index > fullCode.length + 15) {
        index = 0;
      }
    }, 90);

    return () => clearInterval(interval);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="hero" className="hero-section">
      {/* Decorative Geometric Elements from Screenshot */}
      <div className="hero-geom-square sq-1" aria-hidden="true"></div>
      <div className="hero-geom-square sq-2" aria-hidden="true"></div>
      <div className="hero-geom-square sq-3" aria-hidden="true"></div>
      <div className="hero-geom-box-slate box-1" aria-hidden="true"></div>
      <div className="hero-geom-box-slate box-2" aria-hidden="true"></div>
      <div className="hero-geom-arc arc-1" aria-hidden="true"></div>
      <div className="hero-geom-arc arc-2" aria-hidden="true"></div>

      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Text & Actions */}
          <div className="hero-text-content">
            {/* Pill badge matching screenshot */}
            <div className="hero-badge-wrap">
              <span>SOFTWARE DEVELOPER</span>
            </div>

            <h1 className="hero-name">
              Shrikar Bhorkade
            </h1>

            <div className="hero-title-tag">
              <Terminal size={18} style={{ color: 'var(--accent-primary)' }} />
              <span>Software Developer | MCA Student</span>
            </div>

            <p className="hero-summary">
              I transform ideas into digital realities, focusing on creating unique, high-performance web systems,
              AI/ML workflows, and scalable software applications.
            </p>

            {/* Action Buttons */}
            <div className="hero-cta-group">
              <button
                className="btn btn-primary"
                id="hero-reachout-btn"
                onClick={() => scrollToSection('contact')}
              >
                <span>Reach out</span>
                <ArrowUpRight size={17} />
              </button>

              <button
                className="btn btn-secondary"
                id="hero-view-projects-btn"
                onClick={() => scrollToSection('projects')}
              >
                <FolderGit2 size={17} />
                <span>View Projects</span>
              </button>

              <a
                href="https://drive.google.com/file/d/1HAxnaK0TbqGrFXlCiqakufnYEd83Bh1W/view?usp=drivesdk"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                id="hero-download-resume-btn"
              >
                <Download size={17} />
                <span>Resume</span>
              </a>
            </div>

            {/* Social Links */}
            <div className="hero-socials">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                id="hero-social-github"
                aria-label="GitHub Profile"
              >
                <GithubIcon size={18} />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                id="hero-social-linkedin"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon size={18} />
              </a>

              <a
                href="https://leetcode.com"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                id="hero-social-leetcode"
                aria-label="LeetCode Profile"
              >
                <LeetcodeIcon size={18} />
              </a>
            </div>
          </div>

          {/* Right Column: MCA Student Developer Visual */}
          <div className="hero-visual-container">
            {/* Subtle Floating Code Elements */}
            <div className="floating-code-pill pill-top-right">
              <Code2 size={13} />
              <span>MCA '27 • Sanjivani Univ</span>
            </div>

            <div className="floating-code-pill pill-bottom-left">
              <Check size={13} style={{ color: 'var(--accent-primary)' }} />
              <span>status: active_coding</span>
            </div>

            {/* Developer Window Card */}
            <div className="hero-visual-card">
              {/* Window Header */}
              <div className="ide-window-header">
                <div className="ide-dots">
                  <span className="ide-dot dot-red"></span>
                  <span className="ide-dot dot-yellow"></span>
                  <span className="ide-dot dot-green"></span>
                </div>
                <span>shrikar_dev.jsx</span>
                <span style={{ fontSize: '0.7rem' }}>UTF-8</span>
              </div>

              {/* Character Image with subtle breathing & scanline activity */}
              <div className="hero-image-wrap">
                <img
                  src="/images/hero-developer.jpg"
                  alt="Shrikar Bhorkade - MCA Student Software Developer coding with modern setup"
                  className="hero-image"
                  loading="eager"
                />
                <div className="screen-glow-overlay" aria-hidden="true"></div>
              </div>

              {/* IDE Code Footer with live typing simulation */}
              <div className="ide-code-footer">
                <div>
                  <span style={{ color: 'var(--accent-primary)' }}>&gt;</span>{' '}
                  <span style={{ color: 'var(--text-secondary)' }}>{typedCode}</span>
                  <span className="live-cursor-blink" aria-hidden="true"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
