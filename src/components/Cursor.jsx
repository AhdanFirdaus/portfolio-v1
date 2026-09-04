'use client';

import { useEffect, useRef } from 'react';

const Cursor = () => {
  const wrapperRef = useRef(null);
  const timeoutRef = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const cursorPosition = useRef({ x: 0, y: 0 });
  const rafRef = useRef(null);
  const isInsideWindow = useRef(true);
  const isVisible = useRef(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;

    const showCursor = () => {
      if (!wrapper) return;
      wrapper.style.opacity = '1';
      wrapper.style.visibility = 'visible';
      isVisible.current = true;
    };

    const hideCursor = () => {
      if (!wrapper) return;
      wrapper.style.opacity = '0';
      wrapper.style.visibility = 'hidden';
      isVisible.current = false;
    };

    const animateCursor = () => {
      if (wrapper && isInsideWindow.current) {
        const dx = mousePosition.current.x - cursorPosition.current.x;
        const dy = mousePosition.current.y - cursorPosition.current.y;

        const easing = 0.25;

        cursorPosition.current.x += dx * easing;
        cursorPosition.current.y += dy * easing;

        wrapper.style.transform = `translate(${cursorPosition.current.x}px, ${cursorPosition.current.y}px)`;
      }

      rafRef.current = requestAnimationFrame(animateCursor);
    };

    rafRef.current = requestAnimationFrame(animateCursor);

    const handleMouseMove = (e) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };

      if (!isVisible.current) {
        cursorPosition.current = { x: e.clientX, y: e.clientY };
        showCursor();
      }

      const target = e.target;
      const isClickable =
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('[role="button"]') ||
        target.closest('.nav-item') ||
        target.closest('[data-cursor-hover]');

      const cursor = wrapper.querySelector('.custom-cursor');

      if (isClickable) {
        cursor.classList.add('hover');
      } else {
        cursor.classList.remove('hover');
      }

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        hideCursor();
      }, 1500);
    };

    const handleMouseLeaveWindow = () => {
      isInsideWindow.current = false;
      hideCursor();
    };

    const handleMouseEnterWindow = () => {
      isInsideWindow.current = true;
    };

    const handleMouseDown = () => {
      const cursor = wrapper.querySelector('.custom-cursor');
      cursor.classList.add('click');
    };

    const handleMouseUp = () => {
      const cursor = wrapper.querySelector('.custom-cursor');
      cursor.classList.remove('click');
    };

    document.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeaveWindow);
    window.addEventListener('mouseenter', handleMouseEnterWindow);
    document.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeaveWindow);
      window.removeEventListener('mouseenter', handleMouseEnterWindow);
      document.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseup', handleMouseUp);
      cancelAnimationFrame(rafRef.current);
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <>
      <style>
        {`
          * {
            cursor: none !important;
          }

          @media (max-width: 768px) {
            * {
              cursor: auto !important;
            }
            .cursor-wrapper {
              display: none !important;
            }
          }

          .cursor-wrapper {
            position: fixed;
            top: 0;
            left: 0;
            pointer-events: none;
            z-index: 99999;
            will-change: transform, opacity;
            transition: opacity .2s ease, visibility .2s ease;
            opacity: 0;
            visibility: hidden;
          }

          .custom-cursor {
            width: 12px;
            height: 12px;
            border-radius: 0px !important;
            background: var(--accent-red);
            transform: translate(-50%, -50%);
            box-shadow: 0 0 10px rgba(251, 79, 92, 0.7);
            transition: 
              width .15s ease,
              height .15s ease,
              background .15s ease,
              border .15s ease,
              box-shadow .15s ease;
          }

          .custom-cursor::before {
            content: '';
            position: absolute;
            inset: -4px;
            border-radius: 0px !important;
            border: 1px solid rgba(251, 79, 92, 0.4);
            transition: .2s ease;
          }

          .custom-cursor.hover {
            width: 26px;
            height: 26px;
            background: rgba(251, 79, 92, 0.15);
            border: 1.5px solid var(--accent-red);
            box-shadow: 0 0 15px rgba(251, 79, 92, 0.5);
          }

          .custom-cursor.hover::before {
            inset: -6px;
            border-color: rgba(251, 79, 92, 0.6);
          }

          .custom-cursor.click {
            width: 8px;
            height: 8px;
            background: var(--text-main);
            box-shadow: 0 0 12px rgba(255, 255, 255, 0.9);
          }
        `}
      </style>

      <div ref={wrapperRef} className="cursor-wrapper">
        <div className="custom-cursor" />
      </div>
    </>
  );
};

export default Cursor;