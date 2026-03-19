import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
    // Supports 'light', 'dark', 'system'
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') || 'system';
        }
        return 'system';
    });

    const [systemIsDark, setSystemIsDark] = useState(() => {
         if (typeof window !== 'undefined') {
             return window.matchMedia('(prefers-color-scheme: dark)').matches;
         }
         return false;
    });

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        const handleChange = (e) => setSystemIsDark(e.matches);
        
        mediaQuery.addEventListener('change', handleChange);
        return () => mediaQuery.removeEventListener('change', handleChange);
    }, []);

    const isDark = theme === 'system' ? systemIsDark : theme === 'dark';
    const resolvedTheme = isDark ? 'dark' : 'light';

    const toggleTheme = () => {
        setTheme(prev => {
            if (prev === 'system') {
                return systemIsDark ? 'light' : 'dark';
            }
            return prev === 'dark' ? 'light' : 'dark';
        });
    };

    useEffect(() => {
        const root = window.document.documentElement;
        
        if (isDark) {
            root.classList.add('dark');
        } else {
            root.classList.remove('dark');
        }
        
        localStorage.setItem('theme', theme);
    }, [theme, isDark]);

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme, isDark, resolvedTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};