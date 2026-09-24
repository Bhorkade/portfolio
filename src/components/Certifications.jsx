import React from 'react';
import { Award, CheckCircle2, ShieldCheck, Sparkles, Trophy } from 'lucide-react';

const CERTIFICATIONS = [
  {
    title: 'Machine Learning Using Python',
    category: 'AI & Data Science',
    icon: Award,
    description: 'Practical training on supervised/unsupervised machine learning algorithms, model training, and Python libraries.',
  },
  {
    title: 'Smart India Hackathon',
    category: 'Hackathon & Innovation',
    icon: Trophy,
    description: 'National level hackathon participation demonstrating rapid problem-solving, teamwork, and software prototyping.',
  },
  {
    title: 'Generative AI Fluency',
    category: 'Artificial Intelligence',
    icon: Sparkles,
    description: 'Foundational concepts in generative models, prompt engineering, LLM architectures, and AI applications.',
  },
  {
    title: 'Zonal Level Research Project',
    category: 'Research & Innovation',
    icon: ShieldCheck,
    description: 'Presented and evaluated academic technical research project at the competitive zonal collegiate level.',
  },
  {
    title: 'TATA–Forage Data Visualization & Business Insights',
    category: 'Analytics & Visualization',
    icon: Award,
    description: 'Enterprise virtual internship credential covering data cleaning, visualization dashboards, and business communication.',
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className="section-wrapper">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Award size={15} />
            <span>Credentials</span>
          </div>
          <h2 className="section-title">
            Certifications & <span className="text-gradient">Achievements</span>
          </h2>
          <p className="section-desc">
            Verified technical credentials, hackathon participation, and domain certifications.
          </p>
        </div>

        {/* Certifications Grid */}
        <div className="certs-grid">
          {CERTIFICATIONS.map((cert, index) => {
            const CertIcon = cert.icon;
            return (
              <div
                key={index}
                className="glass-card cert-card"
                id={`cert-card-${index}`}
              >
                <div className="cert-icon">
                  <CertIcon size={22} />
                </div>
                <div style={{ flexGrow: 1 }}>
                  <span className="code-font" style={{ fontSize: '0.75rem', color: '#8b5cf6' }}>
                    {cert.category}
                  </span>
                  <h3 className="cert-title">{cert.title}</h3>
                  <p style={{ fontSize: '0.88rem', color: '#94a3b8', lineHeight: '1.5', marginTop: '6px' }}>
                    {cert.description}
                  </p>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginTop: '12px',
                    }}
                  >
                    <CheckCircle2 size={14} color="#10b981" />
                    <span className="cert-status">Verified Credential</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
