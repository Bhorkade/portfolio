import React from 'react';
import {
  GraduationCap,
  Cpu,
  Database,
  Code2,
  Brain,
  Rocket,
} from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="section-wrapper">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <GraduationCap size={15} />
            <span>About Me</span>
          </div>
          <h2 className="section-title">
            Engineering Code with <span className="text-gradient">Purpose & Passion</span>
          </h2>
          <p className="section-desc">
            A snapshot into my academic foundation, technical journey, and software aspirations.
          </p>
        </div>

        {/* About Grid */}
        <div className="about-grid">
          {/* Left Column: Bio & Core Highlights */}
          <div className="glass-card about-text-card">
            <div>
              <p className="about-bio-para">
                I am an <strong>MCA student</strong> and dedicated <strong>Software Development enthusiast</strong> with
                a firm foundation in computer applications and modern engineering practices. Having earned my
                BCA with a CGPA of <strong>8.10</strong>, I am currently expanding my advanced technical expertise
                at Sanjivani University.
              </p>
              <p className="about-bio-para">
                My passion lies at the intersection of <strong>full-stack development</strong>, <strong>data-driven applications</strong>,
                and <strong>AI/ML workflows</strong>. I love translating abstract logic into clean, scalable software,
                whether that means architecting responsive web applications, working on LLM post-training workflows, or
                crafting performant object-oriented systems.
              </p>
              <p className="about-bio-para">
                I am continuously honing my problem-solving abilities, algorithmic thinking, and system design principles
                to create software that delivers tangible real-world value.
              </p>
            </div>

            {/* Quick Metrics / Foundation */}
            <div className="about-highlights-grid">
              <div className="highlight-box">
                <div className="highlight-title">8.10</div>
                <div className="highlight-desc">BCA Graduation CGPA</div>
              </div>
              <div className="highlight-box">
                <div className="highlight-title">MCA '27</div>
                <div className="highlight-desc">Sanjivani University</div>
              </div>
              <div className="highlight-box">
                <div className="highlight-title">4+</div>
                <div className="highlight-desc">Key Featured Projects</div>
              </div>
              <div className="highlight-box">
                <div className="highlight-title">5+</div>
                <div className="highlight-desc">Verified Certifications</div>
              </div>
            </div>
          </div>

          {/* Right Column: Focus Areas */}
          <div className="about-features-col">
            <div className="glass-card feature-item-card">
              <div className="feature-icon-wrap">
                <Code2 size={22} />
              </div>
              <div>
                <h3 className="feature-title">Practical Software Development</h3>
                <p className="feature-desc">
                  Committed to building clean, maintainable web systems and desktop software with solid OOP architecture and modern JavaScript libraries.
                </p>
              </div>
            </div>

            <div className="glass-card feature-item-card">
              <div className="feature-icon-wrap">
                <Brain size={22} />
              </div>
              <div>
                <h3 className="feature-title">AI/ML & LLM Exploration</h3>
                <p className="feature-desc">
                  Hands-on experience in LLM post-training, data annotation, model evaluation, and foundational machine learning techniques with Python.
                </p>
              </div>
            </div>

            <div className="glass-card feature-item-card">
              <div className="feature-icon-wrap">
                <Database size={22} />
              </div>
              <div>
                <h3 className="feature-title">Data-Driven Applications</h3>
                <p className="feature-desc">
                  Passionate about database design, business insights, analytics, and efficient data pipelines utilizing MySQL and MongoDB.
                </p>
              </div>
            </div>

            <div className="glass-card feature-item-card">
              <div className="feature-icon-wrap">
                <Rocket size={22} />
              </div>
              <div>
                <h3 className="feature-title">Continuous Improvement</h3>
                <p className="feature-desc">
                  Relentlessly solving coding challenges, participating in hackathons, and adopting modern developer tools to stay ahead.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
