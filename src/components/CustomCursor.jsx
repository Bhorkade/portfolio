import React, { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [cursorState, setCursorState] = useState('default'); // 'default' | 'hover' | 'project'
  const [isVisible, setIsVisible] = useState(false);

  // Position references for smooth spring interpolation
  const mousePos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const animFrameId = useRef(null);

  useEffect(() => {
    // Check if device supports fine hover pointer (disable on touchscreen phones & tablets)
    const isTouch = window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
    if (isTouch) return;

    const handleMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
      if (!isVisible) setIsVisible(true);

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    // Smooth follower loop for ring with lerp interpolation
    const renderLoop = () => {
      const ease = 0.16;
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * ease;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * ease;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0) translate(-50%, -50%)`;
      }

      animFrameId.current = requestAnimationFrame(renderLoop);
    };

    // Context-sensitive hover detection
    const handleElementHover = (e) => {
      const target = e.target;
      const isProject = target.closest('.project-card');
      const isInteractive = target.closest('a, button, input, textarea, select, [role="button"], .skill-card, .cert-card, .social-icon-btn');

      if (isProject && !target.closest('a, button')) {
        setCursorState('project');
      } else if (isInteractive) {
        setCursorState('hover');
      } else {
        setCursorState('default');
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseover', handleElementHover, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    animFrameId.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleElementHover);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [isVisible]);

  let ringClass = '';
  if (cursorState === 'hover') ringClass = 'cursor-hover';
  if (cursorState === 'project') ringClass = 'cursor-project';

  return (
    <>
      <div
        ref={dotRef}
        className={`custom-cursor-dot ${!isVisible ? 'cursor-hidden' : ''}`}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className={`custom-cursor-ring ${ringClass} ${!isVisible ? 'cursor-hidden' : ''}`}
        aria-hidden="true"
      />
    </>
  );
}
