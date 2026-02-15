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

        const easing = 0.18;

        cursorPosition.current.x += dx * easing;
        cursorPosition.current.y += dy * easing;

        wrapper.style.transform = `translate(${cursorPosition.current.x}px, ${cursorPosition.current.y}px)`;
      }

      rafRef.current = requestAnimationFrame(animateCursor);
    };

    rafRef.current = requestAnimationFrame(animateCursor);

    const handleMouseMove = (e) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };

      // Kalau baru muncul lagi, snap posisi biar gak ketinggalan
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
      }, 1200);
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
            transition: opacity .25s ease, visibility .25s ease;
            opacity: 0;
            visibility: hidden;
          }

          .custom-cursor {
            width: 14px;
            height: 14px;
            border-radius: 50%;
            background: #3b82f6;
            transform: translate(-50%, -50%);
            box-shadow:
              0 0 10px rgba(59,130,246,0.8),
              0 0 20px rgba(59,130,246,0.6),
              0 0 35px rgba(59,130,246,0.4);
            transition: 
              width .18s ease,
              height .18s ease,
              background .18s ease,
              box-shadow .18s ease;
          }

          .custom-cursor::before {
            content: '';
            position: absolute;
            inset: -12px;
            border-radius: 50%;
            background: rgba(59,130,246,0.15);
            transition: .25s ease;
          }

          .custom-cursor.hover {
            width: 24px;
            height: 24px;
            background: #8b5cf6;
            box-shadow:
              0 0 20px rgba(139,92,246,.9),
              0 0 40px rgba(139,92,246,.6);
          }

          .custom-cursor.hover::before {
            inset: -16px;
            background: rgba(139,92,246,.25);
          }

          .custom-cursor.click {
            width: 10px;
            height: 10px;
            background: #ec4899;
            box-shadow:
              0 0 20px rgba(236,72,153,.8),
              0 0 40px rgba(236,72,153,.6);
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