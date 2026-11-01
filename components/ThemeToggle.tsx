'use client';

import { Moon, Sun } from 'lucide-react';
import { useState, useSyncExternalStore } from 'react';

type Theme = 'dark' | 'light';

// 👉 Replace with your localStorage key (must match app/layout.tsx)
const STORAGE_KEY = 'portfolio-theme';

function applyTheme(theme: Theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.style.colorScheme = theme;

    const themeMeta = document.querySelector('meta[name="theme-color"]');
    if (themeMeta) {
        themeMeta.setAttribute('content', theme === 'dark' ? '#050505' : '#f5f5f2');
    }
}

function resolveTheme(): Theme {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'light' || stored === 'dark') {
        return stored;
    }

    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export default function ThemeToggle() {
    const isHydrated = useSyncExternalStore(
        () => () => { },
        () => true,
        () => false
    );

    const [theme, setTheme] = useState<Theme>(() => {
        if (typeof document === 'undefined') {
            return 'dark';
        }

        const currentTheme = document.documentElement.getAttribute('data-theme');
        if (currentTheme === 'light' || currentTheme === 'dark') {
            return currentTheme;
        }

        return resolveTheme();
    });

    const toggleTheme = () => {
        const nextTheme: Theme = theme === 'dark' ? 'light' : 'dark';
        setTheme(nextTheme);
        localStorage.setItem(STORAGE_KEY, nextTheme);
        applyTheme(nextTheme);
    };

    if (!isHydrated) {
        return null;
    }

    return (
        <button
            type="button"
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="fixed bottom-6 right-6 z-[2500] inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur-md transition-all hover:scale-105"
        >
            {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            {theme === 'dark' ? 'Light' : 'Dark'}
        </button>
    );
}
