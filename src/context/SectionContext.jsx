import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

const SECTION_IDS = [
  'hero',
  'projects',
  'about',
  'skills',
  'experience',
  'education',
  'certifications',
  'resume',
  'contact',
];

const SectionContext = createContext();

export function SectionProvider({ children }) {
  const [activeSection, setActiveSection] = useState('hero');
  const activeSectionRef = useRef('hero');
  const hoveredElementRef = useRef(null);
  const mousePosRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  useEffect(() => {
    // 1. Initial setup of section elements on DOM
    const updateSectionsDOM = (newActiveId) => {
      SECTION_IDS.forEach((id) => {
        const el = document.getElementById(id);
        if (!el) return;
        if (id === newActiveId) {
          if (!el.classList.contains('is-active')) {
            el.classList.add('is-active', 'active-section');
            el.setAttribute('data-active-section', 'true');
          }
        } else {
          if (el.classList.contains('is-active')) {
            el.classList.remove('is-active', 'active-section');
            el.setAttribute('data-active-section', 'false');
          }
        }
      });
    };

    updateSectionsDOM('hero');

    // 2. Track mouse position globally
    const onMouseMove = (e) => {
      mousePosRef.current.x = e.clientX;
      mousePosRef.current.y = e.clientY;

      // Real mouse movement naturally restores accurate browser hover
      const forcedElements = document.querySelectorAll('.force-no-hover');
      if (forcedElements.length > 0) {
        forcedElements.forEach((el) => el.classList.remove('force-no-hover'));
      }

      const target = e.target.closest(
        '.glass-card, .project-card, .skill-card, .cert-card, .highlight-box, .hero-visual-card, .feature-item-card, .education-card, .timeline-card, .contact-info-card, .contact-form-card, .btn, .nav-reachout-btn'
      );

      hoveredElementRef.current = target || null;
    };

    // 3. Fast, rock-solid scroll synchronization using requestAnimationFrame
    let rAFId = null;
    let scrollEndTimeout = null;

    const handleScroll = () => {
      if (rAFId) return;

      rAFId = requestAnimationFrame(() => {
        rAFId = null;

        const scrollY = window.scrollY;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;

        // Bottom of page check (ensures contact is active when scrolled to bottom)
        let currentId = 'hero';
        if (windowHeight + scrollY >= docHeight - 70) {
          currentId = 'contact';
        } else if (scrollY < 80) {
          currentId = 'hero';
        } else {
          // Trigger line is 32% down from viewport top (below floating navbar)
          const triggerLine = windowHeight * 0.32;

          for (let i = 0; i < SECTION_IDS.length; i++) {
            const id = SECTION_IDS[i];
            const el = document.getElementById(id);
            if (el) {
              const rect = el.getBoundingClientRect();
              if (rect.top <= triggerLine && rect.bottom > triggerLine) {
                currentId = id;
                break;
              } else if (rect.top <= triggerLine) {
                currentId = id;
              }
            }
          }
        }

        // When active section changes:
        if (currentId !== activeSectionRef.current) {
          const prevId = activeSectionRef.current;
          activeSectionRef.current = currentId;
          setActiveSection(currentId);
          updateSectionsDOM(currentId);

          // Dispatch sectionchange event for custom cursor and other listeners
          window.dispatchEvent(
            new CustomEvent('sectionchange', {
              detail: { activeSection: currentId, prevSection: prevId },
            })
          );
        }

        // 4. Synchronize hover state for stationary mouse while scrolling:
        if (mousePosRef.current.x >= 0 && mousePosRef.current.y >= 0) {
          const elUnderPoint = document.elementFromPoint(
            mousePosRef.current.x,
            mousePosRef.current.y
          );
          const currentInteractive = elUnderPoint?.closest(
            '.glass-card, .project-card, .skill-card, .cert-card, .highlight-box, .hero-visual-card, .feature-item-card, .education-card, .timeline-card, .contact-info-card, .contact-form-card, .btn, .nav-reachout-btn'
          );

          if (hoveredElementRef.current && hoveredElementRef.current !== currentInteractive) {
            hoveredElementRef.current.classList.add('force-no-hover');
          }

          // Check if any card has stuck browser :hover pseudo-class
          try {
            const stuckHovered = document.querySelectorAll(
              '.glass-card:hover, .project-card:hover, .skill-card:hover, .cert-card:hover, .highlight-box:hover, .hero-visual-card:hover, .feature-item-card:hover, .education-card:hover, .timeline-card:hover'
            );
            stuckHovered.forEach((el) => {
              if (el !== currentInteractive) {
                el.classList.add('force-no-hover');
              }
            });
          } catch (e) {
            // querySelectorAll(':hover') fallback
          }

          if (currentInteractive) {
            const parentSection = currentInteractive.closest('section');
            if (!parentSection || parentSection.id === currentId) {
              currentInteractive.classList.remove('force-no-hover');
              hoveredElementRef.current = currentInteractive;
            } else {
              currentInteractive.classList.add('force-no-hover');
              hoveredElementRef.current = null;
            }
          } else {
            hoveredElementRef.current = null;
          }
        }

        // 5. Cleanup pass after scrolling ends
        clearTimeout(scrollEndTimeout);
        scrollEndTimeout = setTimeout(() => {
          if (mousePosRef.current.x >= 0 && mousePosRef.current.y >= 0) {
            const elUnderPoint = document.elementFromPoint(
              mousePosRef.current.x,
              mousePosRef.current.y
            );
            const currentCard = elUnderPoint?.closest(
              '.glass-card, .project-card, .skill-card, .cert-card, .highlight-box, .hero-visual-card, .feature-item-card, .education-card, .timeline-card, .contact-info-card, .contact-form-card'
            );
            document.querySelectorAll('.force-no-hover').forEach((el) => {
              if (el !== currentCard) {
                el.classList.remove('force-no-hover');
              }
            });
          }
        }, 120);
      });
    };

    // 6. IntersectionObserver to detect visibility of sections
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view', 'visible');
          } else {
            entry.target.classList.remove('in-view', 'visible');
            entry.target.querySelectorAll('.force-no-hover').forEach((child) => {
              child.classList.remove('force-no-hover');
            });
          }
        });
      },
      {
        rootMargin: '0px 0px -10% 0px',
        threshold: [0.05, 0.2],
      }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Initial check
    handleScroll();

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
      if (rAFId) cancelAnimationFrame(rAFId);
      if (scrollEndTimeout) clearTimeout(scrollEndTimeout);
    };
  }, []);

  return (
    <SectionContext.Provider value={{ activeSection, setActiveSection, mousePosRef }}>
      {children}
    </SectionContext.Provider>
  );
}

export function useSection() {
  const context = useContext(SectionContext);
  if (!context) {
    throw new Error('useSection must be used within a SectionProvider');
  }
  return context;
}
