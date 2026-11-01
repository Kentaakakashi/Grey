'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface Section {
    id: string;
    label: string;
}

export default function DotScrollNav({ sections }: { sections: Section[] }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY + window.innerHeight / 3;
            let current = 0;

            for (let i = 0; i < sections.length; i++) {
                const el = document.getElementById(sections[i].id);
                if (el && el.offsetTop <= scrollY) {
                    current = i;
                }
            }
            setActiveIndex(current);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [sections]);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="fixed right-6 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center">
            <div className="dot-nav-pill rounded-full py-4 px-2.5 flex flex-col items-center gap-4 shadow-lg">
                {sections.map((section, idx) => (
                    <div
                        key={section.id}
                        className="relative flex items-center"
                        onMouseEnter={() => setHoveredIndex(idx)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        {/* Label tooltip */}
                        <AnimatePresence>
                            {hoveredIndex === idx && (
                                <motion.div
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-full mr-4 whitespace-nowrap px-3 py-1.5 rounded-lg bg-white text-black text-xs font-bold shadow-lg"
                                >
                                    {section.label}
                                </motion.div>
                            )}
                        </AnimatePresence>

                        <button
                            onClick={() => scrollTo(section.id)}
                            className="relative flex items-center justify-center w-6 h-6 group"
                            aria-label={`Scroll to ${section.label}`}
                            data-cursor-hover
                        >
                            {activeIndex === idx ? (
                                <motion.div
                                    layoutId="activeDot"
                                    className="w-5 h-5 rounded-full border-2 dot-nav-active-ring flex items-center justify-center"
                                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                                >
                                    <div className="w-2 h-2 rounded-full dot-nav-active-fill" />
                                </motion.div>
                            ) : (
                                <div
                                    className={`rounded-full transition-all duration-300 ${idx === sections.length - 1
                                            ? 'w-3 h-3 dot-nav-last-dot'
                                            : 'w-2 h-2 dot-nav-dot'
                                        }`}
                                />
                            )}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
