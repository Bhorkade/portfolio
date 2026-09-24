import React from 'react';
import {
  Code,
  FileCode,
  Globe,
  Database,
  Terminal,
  Brain,
  Layers,
  Sparkles,
  GitBranch,
  Wrench,
  Binary,
  Server,
  Cloud,
  Box,
  Send,
  FileText,
  Network,
  Cpu,
} from 'lucide-react';

const SKILL_CATEGORIES = [
  {
    category: 'Programming',
    icon: Code,
    skills: [
      { name: 'C', icon: Binary, highlight: 'Procedural & Systems' },
      { name: 'C++', icon: Code, highlight: 'OOP & STL' },
      { name: 'Java', icon: FileCode, highlight: 'OOP & Backend' },
      { name: 'Python', icon: Terminal, highlight: 'Scripting & AI/ML' },
    ],
  },
  {
    category: 'Web Development',
    icon: Globe,
    skills: [
      { name: 'HTML5', icon: Globe, highlight: 'Semantic Markup' },
      { name: 'CSS3', icon: Layers, highlight: 'Modern Layouts' },
      { name: 'JavaScript', icon: Code, highlight: 'ES6+ & DOM' },
      { name: 'React', icon: Code, highlight: 'Component UI & Hooks' },
    ],
  },
  {
    category: 'Backend Development',
    icon: Server,
    skills: [
      { name: 'Node.js', icon: Cpu, highlight: 'Server-Side JavaScript' },
      { name: 'Express.js', icon: Layers, highlight: 'REST API & Backend' },
      { name: 'REST API', icon: Network, highlight: 'API Development' },
    ],
  },
  {
    category: 'AI & Data Science',
    icon: Brain,
    skills: [
      { name: 'Machine Learning', icon: Brain, highlight: 'Algorithms & Models' },
      { name: 'Deep Learning', icon: Layers, highlight: 'Neural Networks' },
      { name: 'LLM Basics', icon: Sparkles, highlight: 'Post-Training & Prompting' },
    ],
  },
  {
    category: 'Databases',
    icon: Database,
    skills: [
      { name: 'MySQL', icon: Database, highlight: 'Relational & SQL' },
      { name: 'MongoDB', icon: Server, highlight: 'Document NoSQL' },
    ],
  },
  {
    category: 'Cloud & Deployment',
    icon: Cloud,
    skills: [
      { name: 'AWS', icon: Cloud, highlight: 'Cloud & Deployment' },
      { name: 'Docker', icon: Box, highlight: 'Containerization' },
    ],
  },
  {
    category: 'Tools & Workflow',
    icon: Wrench,
    skills: [
      { name: 'Git', icon: GitBranch, highlight: 'Version Control' },
      { name: 'GitHub', icon: GitBranch, highlight: 'Collaboration & CI' },
      { name: 'VS Code', icon: Terminal, highlight: 'Dev Environment' },
      { name: 'Postman', icon: Send, highlight: 'API Testing' },
      { name: 'MS Word', icon: FileText, highlight: 'Document & Formatting' },
    ],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="section-wrapper">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Wrench size={15} />
            <span>Technical Stack</span>
          </div>
          <h2 className="section-title">
            Skills & <span className="text-gradient">Technologies</span>
          </h2>
          <p className="section-desc">
            A comprehensive overview of programming languages, frameworks, databases, and AI tooling I utilize.
          </p>
        </div>

        {/* Categories Grid */}
        <div className="skills-container">
          {SKILL_CATEGORIES.map((catGroup) => {
            const CatIcon = catGroup.icon;
            return (
              <div key={catGroup.category} className="skills-category-group">
                <div className="category-title-wrap">
                  <CatIcon size={20} style={{ color: 'var(--accent-primary)' }} />
                  <h3 className="category-title">{catGroup.category}</h3>
                  <span className="category-count">{catGroup.skills.length} skills</span>
                </div>

                <div className="skills-grid">
                  {catGroup.skills.map((skill) => {
                    const SkillIcon = skill.icon;
                    return (
                      <div
                        key={skill.name}
                        className="glass-card skill-card"
                        id={`skill-${skill.name.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                      >
                        <div className="skill-icon-wrap">
                          <SkillIcon size={24} />
                        </div>
                        <h4 className="skill-name">{skill.name}</h4>
                        <span className="code-font" style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                          {skill.highlight}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
