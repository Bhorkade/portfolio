import React from 'react';
import { ArrowUp, Heart, Code2 } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-wrapper">
      <div className="container footer-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Code2 size={20} style={{ color: 'var(--accent-primary)' }} />
          <span style={{ fontWeight: 600 }}>Shrikar Bhorkade</span>
          <span style={{ color: 'var(--text-muted)' }}>• MCA Student & Software Developer</span>
        </div>

        <p className="footer-copy">
          © {new Date().getFullYear()} Shrikar Bhorkade. Built with React & Pure CSS.
        </p>

        <button
          onClick={scrollToTop}
          className="footer-back-to-top"
          id="footer-back-to-top-btn"
          aria-label="Back to Top"
        >
          <span>Back to Top</span>
          <ArrowUp size={16} />
        </button>
      </div>
    </footer>
  );
}
