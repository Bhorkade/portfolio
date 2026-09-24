import React, { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, ArrowUpRight } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useSection } from '../context/SectionContext';

const NAV_ITEMS = [
  { id: 'hero', label: 'Home' },
  { id: 'projects', label: 'Projects' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'resume', label: 'Resume' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { activeSection } = useSection();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`navbar-header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-inner">
        {/* Brand Monomark like in screenshot */}
        <a
          href="#hero"
          onClick={(e) => handleNavClick(e, 'hero')}
          className="nav-brand"
          id="nav-brand-logo"
        >
          <span className="brand-icon-mark">/\</span>
          <span>Shrikar</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="nav-links-desktop" aria-label="Main Navigation">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                id={`nav-link-${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`nav-link ${isActive ? 'active' : ''}`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        {/* Right Action: Reach Out Orange Pill & Interactive Theme Toggle */}
        <div className="nav-actions-right">
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, 'contact')}
            className="nav-reachout-btn"
            id="nav-reachout-btn"
          >
            <span>Reach out</span>
            <ArrowUpRight size={14} />
          </a>

          {/* Interactive Light/Dark Toggle Button */}
          <button
            onClick={toggleTheme}
            className="nav-theme-pill"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle theme"
            id="theme-toggle-btn"
          >
            {theme === 'dark' ? (
              <Sun size={15} style={{ color: 'var(--accent-primary)' }} />
            ) : (
              <Moon size={15} style={{ color: 'var(--accent-primary)' }} />
            )}
          </button>

          {/* Mobile Hamburger Toggle */}
          <button
            className="mobile-menu-btn"
            id="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`} id="mobile-navigation-drawer">
        {NAV_ITEMS.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.id}
              href={`#${item.id}`}
              id={`mobile-link-${item.id}`}
              onClick={(e) => handleNavClick(e, item.id)}
              className={`mobile-nav-link ${isActive ? 'active' : ''}`}
            >
              {item.label}
            </a>
          );
        })}

        {/* Mobile Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="mobile-nav-link"
          id="mobile-theme-toggle-btn"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'none',
            border: '1px solid var(--border-default)',
            textAlign: 'left',
            cursor: 'pointer',
          }}
        >
          {theme === 'dark' ? (
            <>
              <Sun size={16} style={{ color: 'var(--accent-primary)' }} />
              <span>Switch to Light Mode</span>
            </>
          ) : (
            <>
              <Moon size={16} style={{ color: 'var(--accent-primary)' }} />
              <span>Switch to Dark Mode</span>
            </>
          )}
        </button>

        <a
          href="#contact"
          id="mobile-link-contact"
          onClick={(e) => handleNavClick(e, 'contact')}
          className="btn btn-primary btn-sm"
          style={{ marginTop: '8px' }}
        >
          <span>Reach out</span>
          <ArrowUpRight size={14} />
        </a>
      </div>
    </header>
  );
}
