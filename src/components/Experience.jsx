import React from 'react';
import { Briefcase, Calendar, Building2, CheckCircle2 } from 'lucide-react';

const EXPERIENCES = [
  {
    role: 'AI & Data Science Enthusiast | LLM Post-Training Intern',
    company: 'Ethara AI',
    period: '02/2026 – 05/2026',
    description:
      'Engaged in advanced LLM post-training workflows, data preprocessing, and evaluation pipelines to optimize conversational model performance.',
    skillsApplied: [
      'AI data annotation & dataset curation',
      'Model evaluation & benchmark testing',
      'LLM post-training workflows & RLHF methodologies',
      'Applied machine learning concepts',
      'In-depth exploratory data analysis',
      'Structured technical problem solving',
    ],
  },
  {
    role: 'Data Analyst Fresher (Remote)',
    company: 'TATA – Forage Certified (Data Visualization & Business Insights)',
    period: '11/2025 – 11/2025',
    description:
      'Completed an industry-standard virtual experience program focusing on translating complex enterprise data into actionable visual business insights.',
    skillsApplied: [
      'Data visualization & executive dashboards',
      'Business insights formulation',
      'Python data manipulation & statistical analysis',
      'Exploratory data analysis & metrics storytelling',
    ],
  },
];

export default function Experience() {
  return (
    <section id="experience" className="section-wrapper">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Briefcase size={15} />
            <span>Experience & Internships</span>
          </div>
          <h2 className="section-title">
            Industry & <span className="text-gradient">Practical Experience</span>
          </h2>
          <p className="section-desc">
            Hands-on work in artificial intelligence, model post-training, and enterprise data analytics.
          </p>
        </div>

        {/* Timeline */}
        <div className="timeline-container">
          <div className="timeline-line" aria-hidden="true"></div>

          {EXPERIENCES.map((exp, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-dot" aria-hidden="true">
                <div className="timeline-dot-inner"></div>
              </div>

              <div className="glass-card timeline-card">
                <div className="timeline-header">
                  <div>
                    <h3 className="timeline-role">{exp.role}</h3>
                    <div className="timeline-company" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Building2 size={16} />
                      <span>{exp.company}</span>
                    </div>
                  </div>
                  <div className="timeline-date" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Calendar size={14} />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <p style={{ color: '#cbd5e1', fontSize: '0.98rem', lineHeight: '1.65' }}>
                  {exp.description}
                </p>

                <ul className="timeline-bullets">
                  {exp.skillsApplied.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
