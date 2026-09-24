import React from 'react';
import { ExternalLink, FolderGit2 } from 'lucide-react';
import { GithubIcon } from './Icons';

const PROJECTS = [
  {
    id: 'ladki-bahin',
    title: 'Ladki Bahin Yojana Information Website',
    image: '/images/project-ladki-bahin.jpg',
    description:
      'A comprehensive public informational web portal dedicated to the government welfare initiative, providing citizens with streamlined access to criteria, schemes, and guidelines.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Vercel'],
    features: [
      'Comprehensive scheme eligibility criteria & verification guidance',
      'Detailed benefits breakdown & financial assistance highlights',
      'Mandatory document checklist & verification requirements',
      'Step-by-step application submission process guide',
    ],
    githubUrl: 'https://github.com',
    liveUrl: 'https://vercel.com',
  },
  {
    id: 'portfolio-site',
    title: 'Personal Portfolio Website',
    image: '/images/project-portfolio.jpg',
    description:
      'A modern, high-performance personal developer portfolio showcasing academic qualifications, verified certifications, internships, and technical projects.',
    technologies: ['React.js', 'Vite', 'JavaScript', 'CSS3', 'Node.js'],
    features: [
      'Sleek developer-style dark theme with glowing accents',
      'Custom smooth mouse follower cursor with mobile auto-disable',
      'Decoupled Express.js & MongoDB backend contact API',
      'Fully responsive glassmorphic navigation & timeline layouts',
    ],
    githubUrl: 'https://github.com',
    liveUrl: '#hero',
  },
  {
    id: 'blood-management',
    title: 'Online Blood Management System',
    image: '/images/project-blood-bank.jpg',
    description:
      'A web-based healthcare management application engineered to bridge donors and medical institutions for streamlined emergency blood inventory handling.',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'MySQL'],
    features: [
      'Real-time blood stock & availability tracking by blood group',
      'Online voluntary donor registration and history management',
      'Emergency blood request dispatch and status updates',
      'Secure administrative donor information repository',
    ],
    githubUrl: 'https://github.com',
    liveUrl: 'https://github.com',
  },
  {
    id: 'daily-sales',
    title: 'Daily Sales Management System',
    image: '/images/project-sales-mgmt.jpg',
    description:
      'A robust desktop sales tracking and automated billing system developed using object-oriented C++ and Standard Template Library data structures.',
    technologies: ['C++', 'OOP', 'STL Vector', 'File I/O'],
    features: [
      'Daily transactional sales recording and calculation',
      'Automated itemized bill generation and receipt output',
      'Core OOP architecture: Inheritance, Polymorphism, Abstraction, Encapsulation',
      'Dynamic inventory manipulation powered by STL vector containers',
    ],
    githubUrl: 'https://github.com',
    liveUrl: 'https://github.com',
  },
];

export default function Projects() {
  return (
    <section id="projects" className="section-wrapper">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <FolderGit2 size={15} />
            <span>Featured Work</span>
          </div>
          <h2 className="section-title">
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="section-desc">
            A selection of practical applications spanning full-stack web platforms, healthcare tools, and C++ OOP systems.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="projects-grid">
          {PROJECTS.map((project) => (
            <div
              key={project.id}
              className="glass-card project-card"
              id={`project-card-${project.id}`}
            >
              {/* Project Image */}
              <div className="project-image-box">
                <img
                  src={project.image}
                  alt={project.title}
                  className="project-img"
                  loading="lazy"
                />
              </div>

              {/* Project Body */}
              <div className="project-content">
                <h3 className="project-name">{project.title}</h3>
                <p className="project-desc">{project.description}</p>

                {/* Key Features */}
                <ul className="project-features">
                  {project.features.map((feat, idx) => (
                    <li key={idx}>{feat}</li>
                  ))}
                </ul>

                {/* Tech Tags */}
                <div className="project-tech-tags">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="tech-tag">
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Action Buttons */}
                <div className="project-actions">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-secondary btn-sm"
                    id={`project-github-${project.id}`}
                  >
                    <GithubIcon size={16} />
                    <span>GitHub</span>
                  </a>

                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline btn-sm"
                    id={`project-live-${project.id}`}
                  >
                    <ExternalLink size={16} />
                    <span>Live Demo</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
