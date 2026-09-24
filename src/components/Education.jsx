import React from 'react';
import { GraduationCap, Award, MapPin, Calendar } from 'lucide-react';

const EDUCATION_DATA = [
  {
    degree: 'Master of Computer Applications (MCA)',
    institution: 'Sanjivani University, Kopargaon',
    year: 'Expected 2027',
    status: 'Currently Pursuing',
    details:
      'Advanced computer applications curriculum focusing on software architecture, advanced data structures, web technologies, and machine learning.',
    score: 'Enrolled & In Progress',
  },
  {
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'Vishwalata Art, Comm & Sci College, Yeola',
    year: '2025',
    status: 'Graduated',
    details:
      'Completed foundational computer science degree covering core programming (C, C++, Java), database management systems, web development, and object-oriented paradigms.',
    score: 'CGPA: 8.10',
  },
];

export default function Education() {
  return (
    <section id="education" className="section-wrapper">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <GraduationCap size={15} />
            <span>Academic Background</span>
          </div>
          <h2 className="section-title">
            Education & <span className="text-gradient">Qualifications</span>
          </h2>
          <p className="section-desc">
            My formal computer applications education and academic milestones.
          </p>
        </div>

        {/* Education Grid */}
        <div className="education-grid">
          {EDUCATION_DATA.map((edu, index) => (
            <div key={index} className="glass-card education-card">
              <div>
                <div className="edu-badge-row">
                  <span className="edu-degree">{edu.degree}</span>
                  <span className="edu-year">{edu.year}</span>
                </div>

                <div className="edu-institution" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <MapPin size={16} style={{ color: 'var(--accent-primary)' }} />
                  <span>{edu.institution}</span>
                </div>

                <p className="edu-detail" style={{ marginTop: '14px', lineHeight: '1.6' }}>
                  {edu.details}
                </p>
              </div>

              <div
                style={{
                  marginTop: '24px',
                  paddingTop: '16px',
                  borderTop: '1px solid var(--border-default)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span className="code-font" style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                  Academic Performance
                </span>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontWeight: 700,
                    color: 'var(--accent-emerald)',
                    background: 'rgba(16, 185, 129, 0.1)',
                    padding: '4px 12px',
                    borderRadius: '9999px',
                    border: '1px solid rgba(16, 185, 129, 0.25)',
                    fontSize: '0.9rem',
                  }}
                >
                  {edu.score}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
