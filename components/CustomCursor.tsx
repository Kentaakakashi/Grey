'use client';

import { useEffect, useRef, useState } from 'react';

export default function CustomCursor() {
    const outerRef = useRef<HTMLDivElement>(null);
    const innerRef = useRef<HTMLDivElement>(null);
    const pos = useRef({ x: 0, y: 0 });
    const outerPos = useRef({ x: 0, y: 0 });
    const [hovering, setHovering] = useState(false);
    const visibleRef = useRef(false);
    const rafId = useRef<number>(0);
    const enabledRef = useRef(false);

    useEffect(() => {
        // Skip on touch devices
        if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
        enabledRef.current = true;

        // Show the wrapper elements
        if (outerRef.current) outerRef.current.style.display = '';
        if (innerRef.current) innerRef.current.style.display = '';

        const onMove = (e: MouseEvent) => {
            pos.current = { x: e.clientX, y: e.clientY };
            // Inner dot follows instantly via direct DOM
            if (innerRef.current) {
                innerRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
            }
            if (!visibleRef.current) {
                visibleRef.current = true;
                if (outerRef.current) outerRef.current.style.opacity = '1';
                if (innerRef.current) innerRef.current.style.opacity = '1';
            }
        };

        // Outer ring lerps at 60fps for a subtle trailing feel
        const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
        const tick = () => {
            outerPos.current.x = lerp(outerPos.current.x, pos.current.x, 0.18);
            outerPos.current.y = lerp(outerPos.current.y, pos.current.y, 0.18);
            if (outerRef.current) {
                outerRef.current.style.transform = `translate(${outerPos.current.x}px, ${outerPos.current.y}px) translate(-50%, -50%)`;
            }
            rafId.current = requestAnimationFrame(tick);
        };

        const onLeave = () => {
            visibleRef.current = false;
            if (outerRef.current) outerRef.current.style.opacity = '0';
            if (innerRef.current) innerRef.current.style.opacity = '0';
        };
        const onEnter = () => {
            visibleRef.current = true;
            if (outerRef.current) outerRef.current.style.opacity = '1';
            if (innerRef.current) innerRef.current.style.opacity = '1';
        };

        const hoverStart = () => setHovering(true);
        const hoverEnd = () => setHovering(false);

        window.addEventListener('mousemove', onMove, { passive: true });
        document.addEventListener('mouseleave', onLeave);
        document.addEventListener('mouseenter', onEnter);

        const interactiveSelectors = 'a, button, [role="button"], input, select, textarea, [data-cursor-hover]';
        const addHoverListeners = () => {
            document.querySelectorAll(interactiveSelectors).forEach((el) => {
                el.addEventListener('mouseenter', hoverStart);
                el.addEventListener('mouseleave', hoverEnd);
            });
        };
        addHoverListeners();
        const observer = new MutationObserver(addHoverListeners);
        observer.observe(document.body, { childList: true, subtree: true });

        // Hide default cursor via injected stylesheet
        const style = document.createElement('style');
        style.textContent = '@media (pointer: fine) { * { cursor: none !important; } }';
        document.head.appendChild(style);

        rafId.current = requestAnimationFrame(tick);

        return () => {
            window.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseleave', onLeave);
            document.removeEventListener('mouseenter', onEnter);
            document.querySelectorAll(interactiveSelectors).forEach((el) => {
                el.removeEventListener('mouseenter', hoverStart);
                el.removeEventListener('mouseleave', hoverEnd);
            });
            observer.disconnect();
            cancelAnimationFrame(rafId.current);
            document.head.removeChild(style);
        };
    }, []);

    return (
        <>
            {/* Outer ring */}
            <div
                ref={outerRef}
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                style={{ opacity: 0, willChange: 'transform', display: 'none' }}
            >
                <div
                    className="rounded-full border-2 border-white transition-[width,height,margin] duration-200 ease-out"
                    style={{
                        width: hovering ? 56 : 32,
                        height: hovering ? 56 : 32,
                        marginLeft: hovering ? -28 : -16,
                        marginTop: hovering ? -28 : -16,
                    }}
                />
            </div>

            {/* Inner dot */}
            <div
                ref={innerRef}
                className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
                style={{ opacity: 0, willChange: 'transform', display: 'none' }}
            >
                <div
                    className="rounded-full bg-white transition-[width,height,margin] duration-150"
                    style={{
                        width: hovering ? 8 : 5,
                        height: hovering ? 8 : 5,
                        marginLeft: hovering ? -4 : -2.5,
                        marginTop: hovering ? -4 : -2.5,
                    }}
                />
            </div>
        </>
    );
}
