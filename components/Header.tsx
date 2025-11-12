import React from 'react';
import { BrainyBunnyIcon, UserIcon } from './icons';

type HeaderProps = {
    isLoggedIn: boolean;
    onLogout: () => void;
};

export const Header = ({ isLoggedIn, onLogout }: HeaderProps): React.JSX.Element => (
    <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-10 no-print">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
                <div className="flex items-center space-x-2">
                    <BrainyBunnyIcon className="w-8 h-8 text-amber-500" />
                    <h1 className="text-2xl font-bold text-slate-800">
                        BrainyBunny<span className="text-amber-500">.ai</span>
                    </h1>
                </div>
                {isLoggedIn ? (
                    <div className="flex items-center space-x-4">
                        <button className="relative p-2 rounded-full hover:bg-slate-100">
                            <UserIcon />
                        </button>
                        <button onClick={onLogout} className="text-sm font-medium text-slate-600 hover:text-slate-800">Logout</button>
                    </div>
                ) : (
                    <p className="hidden md:block text-slate-500">Your AI-Powered Homework Helper</p>
                )}
            </div>
        </div>
    </header>
);
