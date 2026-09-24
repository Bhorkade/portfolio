import React, { useState } from 'react';
import {
  FileText,
  Download,
  Eye,
  ExternalLink,
  X,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Code2,
  Briefcase,
  FolderGit2,
} from 'lucide-react';

export default function Resume() {
  const [showModal, setShowModal] = useState(false);
  const resumeUrl = '/resume/Shrikar-Bhorkade-Resume.pdf';

  return (
    <section id="resume" className="section-wrapper">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <FileText size={15} />
            <span>Curriculum Vitae</span>
          </div>
          <h2 className="section-title">
            Professional <span className="text-gradient">Resume</span>
          </h2>
          <p className="section-desc">
            Directly formatted from my official resume with verified academic milestones, skills, and projects.
          </p>
        </div>

        {/* Action Bar Above Sheet */}
        <div className="resume-toolbar">
          <div className="resume-toolbar-info">
            <FileText size={18} color="#38bdf8" />
            <span style={{ fontWeight: 600 }}>Shrikar-Bhorkade-Resume.pdf</span>
            <span className="code-font" style={{ fontSize: '0.78rem', color: '#94a3b8' }}>
              • Updated Version
            </span>
          </div>

          <div className="resume-toolbar-actions">
            <a
              href={resumeUrl}
              download="Shrikar-Bhorkade-Resume.pdf"
              className="btn btn-primary btn-sm"
              id="resume-download-btn"
            >
              <Download size={15} />
              <span>Download PDF</span>
            </a>

            <button
              onClick={() => setShowModal(true)}
              className="btn btn-secondary btn-sm"
              id="resume-view-btn"
            >
              <Eye size={15} />
              <span>Preview PDF</span>
            </button>

            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-outline btn-sm"
              id="resume-open-tab-btn"
            >
              <ExternalLink size={15} />
              <span>Open Tab</span>
            </a>
          </div>
        </div>

        {/* Real Interactive Resume Sheet on Page */}
        <div className="resume-sheet">
          {/* Header */}
          <div className="resume-sheet-header">
            <h1 className="resume-sheet-name">SHRIKAR BHORKADE</h1>
            <p className="resume-sheet-title">Software Developer | MCA Student</p>
            <div className="resume-sheet-contact-row">
              <span className="resume-sheet-contact-item">
                <Mail size={13} color="#38bdf8" />
                <a href="mailto:bhorkadeshrikar154@gmail.com">bhorkadeshrikar154@gmail.com</a>
              </span>
              <span className="resume-sheet-sep">•</span>
              <span className="resume-sheet-contact-item">
                <Phone size={13} color="#38bdf8" />
                <a href="tel:+918308851018">+91 8308851018</a>
              </span>
              <span className="resume-sheet-sep">•</span>
              <span className="resume-sheet-contact-item">
                <MapPin size={13} color="#38bdf8" />
                <span>Maharashtra, India</span>
              </span>
            </div>
          </div>

          <hr className="resume-sheet-divider" />

          {/* EDUCATION */}
          <div className="resume-sheet-section">
            <div className="resume-sheet-section-title">
              <GraduationCap size={16} color="#38bdf8" />
              <span>EDUCATION</span>
            </div>

            <div className="resume-sheet-item">
              <div className="resume-sheet-item-header">
                <strong>Master of Computer Applications (MCA)</strong>
                <span className="resume-sheet-date">2027</span>
              </div>
              <p className="resume-sheet-sub">Sanjivani University, Kopargaon</p>
            </div>

            <div className="resume-sheet-item">
              <div className="resume-sheet-item-header">
                <strong>Bachelor of Computer Applications (BCA)</strong>
                <span className="resume-sheet-date">2025</span>
              </div>
              <p className="resume-sheet-sub">
                Vishwalata ACS College, Yeola — <strong>CGPA: 8.10</strong>
              </p>
            </div>
          </div>

          {/* TECHNICAL SKILLS */}
          <div className="resume-sheet-section">
            <div className="resume-sheet-section-title">
              <Code2 size={16} color="#38bdf8" />
              <span>TECHNICAL SKILLS</span>
            </div>

            <div className="resume-sheet-skill-row">
              <span className="skill-cat-label">Programming:</span>
              <span className="skill-cat-val">C, C++, Java, Python</span>
            </div>

            <div className="resume-sheet-skill-row">
              <span className="skill-cat-label">Web:</span>
              <span className="skill-cat-val">HTML, CSS, JavaScript, React</span>
            </div>

            <div className="resume-sheet-skill-row">
              <span className="skill-cat-label">AI & Data:</span>
              <span className="skill-cat-val">Machine Learning, Deep Learning, LLM Basics</span>
            </div>

            <div className="resume-sheet-skill-row">
              <span className="skill-cat-label">Databases:</span>
              <span className="skill-cat-val">MySQL, MongoDB</span>
            </div>

            <div className="resume-sheet-skill-row">
              <span className="skill-cat-label">Tools:</span>
              <span className="skill-cat-val">Git, GitHub, VS Code</span>
            </div>
          </div>

          {/* EXPERIENCE */}
          <div className="resume-sheet-section">
            <div className="resume-sheet-section-title">
              <Briefcase size={16} color="#38bdf8" />
              <span>EXPERIENCE</span>
            </div>

            <div className="resume-sheet-item">
              <div className="resume-sheet-item-header">
                <strong>Ethara AI — AI & Data Science Enthusiast / LLM Post-Training Intern</strong>
                <span className="resume-sheet-date">02/2026 – 05/2026</span>
              </div>
              <p className="resume-sheet-sub">
                Engaged in LLM post-training workflows, dataset annotation, model evaluation, and machine learning problem solving.
              </p>
            </div>

            <div className="resume-sheet-item">
              <div className="resume-sheet-item-header">
                <strong>TATA-Forage — Data Analyst Fresher (Remote) / Data Visualization & Insights</strong>
                <span className="resume-sheet-date">11/2025 – 11/2025</span>
              </div>
              <p className="resume-sheet-sub">
                Formulated business insights, data visualizations, and analytics reporting using Python and statistical analysis.
              </p>
            </div>
          </div>

          {/* PROJECTS */}
          <div className="resume-sheet-section">
            <div className="resume-sheet-section-title">
              <FolderGit2 size={16} color="#38bdf8" />
              <span>PROJECTS</span>
            </div>

            <ul className="resume-sheet-projects-list">
              <li>
                <strong>Ladki Bahin Yojana Information Website</strong>{' '}
                <span className="code-font" style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  (HTML, CSS, JS, Vercel)
                </span>
                <p className="resume-sheet-sub">
                  Informational web portal for government welfare scheme covering eligibility, benefits, required documents, and application process.
                </p>
              </li>

              <li>
                <strong>Personal Portfolio Website</strong>{' '}
                <span className="code-font" style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  (HTML, CSS, JS, React)
                </span>
                <p className="resume-sheet-sub">
                  Modern responsive developer portfolio with clean dark GUI, custom cursor, smooth micro-interactions, and Express backend.
                </p>
              </li>

              <li>
                <strong>Online Blood Management System</strong>{' '}
                <span className="code-font" style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  (HTML, CSS, JS, MySQL)
                </span>
                <p className="resume-sheet-sub">
                  Healthcare management application supporting donor registration, real-time blood stock tracking, and urgent request dispatch.
                </p>
              </li>

              <li>
                <strong>Daily Sales Management System</strong>{' '}
                <span className="code-font" style={{ fontSize: '0.8rem', color: '#94a3b8' }}>
                  (C++, OOP, STL Vector)
                </span>
                <p className="resume-sheet-sub">
                  Object-oriented billing and transactional inventory system built with C++ OOP principles (Inheritance, Polymorphism, Encapsulation) and STL vectors.
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* In-App Resume Preview Modal */}
        {showModal && (
          <div
            className="modal-backdrop"
            onClick={() => setShowModal(false)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FileText size={18} color="#38bdf8" />
                  <span className="modal-title">Shrikar-Bhorkade-Resume.pdf</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <a
                    href={resumeUrl}
                    download="Shrikar-Bhorkade-Resume.pdf"
                    className="btn btn-primary btn-sm"
                  >
                    <Download size={13} />
                    <span>Download</span>
                  </a>
                  <button
                    className="modal-close-btn"
                    onClick={() => setShowModal(false)}
                    aria-label="Close modal"
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
              <div className="modal-body">
                <iframe
                  src={resumeUrl}
                  title="Shrikar Bhorkade Resume PDF Preview"
                  className="pdf-iframe"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
