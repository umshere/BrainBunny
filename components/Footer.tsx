import React from 'react';

export const Footer = ({ isLoginScreen = false }: { isLoginScreen?: boolean }) => (
    <footer className={`text-center py-4 text-slate-500 text-sm no-print ${isLoginScreen ? 'relative mt-auto' : ''}`}>
        <p>Powered by AI. Generated content may not always be accurate.</p>
        <p>&copy; {new Date().getFullYear()} BrainyBunny.ai - Fun Learning Ahead!</p>
    </footer>
);
