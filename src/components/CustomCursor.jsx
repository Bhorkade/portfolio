import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Position trackers for smooth spring physics
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef(null);

  const isHoveredRef = useRef(false);

  useEffect(() => {
    isHoveredRef.current = isHovered;
  }, [isHovered]);

  useEffect(() => {
    // Immediately detect touch / mobile devices
    const touchCheck =
      window.matchMedia('(pointer: coarse)').matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0;

    if (touchCheck) {
      setIsTouchDevice(true);
      return;
    }

    const INTERACTIVE_SELECTOR =
      'a, button, input, textarea, select, [role="button"], .btn, .project-card, .skill-card, .cert-card, .social-icon-btn, .nav-link, .nav-reachout-btn, .nav-theme-pill, .highlight-box, .feature-item-card';

    const checkHoverAt = (x, y) => {
      if (x < 0 || y < 0) {
        if (isHoveredRef.current) setIsHovered(false);
        return;
      }

      const el = document.elementFromPoint(x, y);
      if (!el) {
        if (isHoveredRef.current) setIsHovered(false);
        return;
      }

      // If marked with force-no-hover, suppress hover
      if (el.closest('.force-no-hover')) {
        if (isHoveredRef.current) setIsHovered(false);
        return;
      }

      const interactive = el.closest(INTERACTIVE_SELECTOR);
      if (!interactive) {
        if (isHoveredRef.current) setIsHovered(false);
        return;
      }

      // If inside a section, verify the section is active
      const section = interactive.closest('section');
      if (section && !section.classList.contains('is-active')) {
        if (isHoveredRef.current) setIsHovered(false);
        return;
      }

      if (!isHoveredRef.current) setIsHovered(true);
    };

    const onMouseMove = (e) => {
      mousePos.current.x = e.clientX;
      mousePos.current.y = e.clientY;

      if (!isVisible) setIsVisible(true);

      // Center dot follows mouse coordinates immediately with zero lag
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }

      checkHoverAt(e.clientX, e.clientY);
    };

    const onMouseDown = () => setIsClicked(true);
    const onMouseUp = () => setIsClicked(false);
    const onMouseLeave = () => {
      setIsVisible(false);
      setIsHovered(false);
    };
    const onMouseEnter = () => setIsVisible(true);

    let scrollRafId = null;
    const onScroll = () => {
      if (scrollRafId) return;
      scrollRafId = requestAnimationFrame(() => {
        scrollRafId = null;
        checkHoverAt(mousePos.current.x, mousePos.current.y);
      });
    };

    const onSectionChange = () => {
      checkHoverAt(mousePos.current.x, mousePos.current.y);
    };

    // Smooth lerp trailing loop for outer ring
    const render = () => {
      // Easing factor (0.18 = smooth, responsive follower)
      const ease = 0.18;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('sectionchange', onSectionChange);
    window.addEventListener('mousedown', onMouseDown, { passive: true });
    window.addEventListener('mouseup', onMouseUp, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('sectionchange', onSectionChange);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      if (scrollRafId) cancelAnimationFrame(scrollRafId);
    };
  }, [isVisible]);

  // Never render on touch/mobile devices
  if (isTouchDevice) return null;

  const ringClasses = [
    'custom-cursor-ring',
    isHovered ? 'cursor-hover' : '',
    isClicked ? 'cursor-click' : '',
    !isVisible ? 'cursor-hidden' : '',
  ]
    .filter(Boolean)
    .join(' ');

  const dotClasses = [
    'custom-cursor-dot',
    isHovered ? 'cursor-dot-hover' : '',
    isClicked ? 'cursor-dot-click' : '',
    !isVisible ? 'cursor-hidden' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <>
      <div ref={dotRef} className={dotClasses} aria-hidden="true" />
      <div ref={ringRef} className={ringClasses} aria-hidden="true" />
    </>
  );
}
