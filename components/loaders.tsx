import React, { useState, useEffect } from 'react';
import { LightBulbIcon, PaintBrushIcon, CoffeeBrewerIcon } from './icons';

export const QuestionsLoader = ({ topic }: { topic: string }) => (
    <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-slate-200">
        <CoffeeBrewerIcon />
        <h2 className="text-2xl font-bold text-slate-800 mt-4 animate-pulse">BrainyBunny is Brewing Your Worksheet...</h2>
        <p className="text-slate-500 mt-2">Our clever bunny is crafting some great questions about <span className="font-semibold">{topic}</span>. This shouldn't take long!</p>
    </div>
);

export const FormattingLoader = () => (
    <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-slate-200">
        <div className="relative inline-block">
            <PaintBrushIcon className="w-16 h-16 text-sky-500 animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mt-4 animate-pulse">BrainyBunny is Adding the Finishing Touches...</h2>
        <p className="text-slate-500 mt-2">Making it look perfect for your little learner. Almost there!</p>
    </div>
);

export const LibraryLoader = () => (
    <div className="text-center p-8">
        <div className="relative inline-block">
            <LightBulbIcon className="w-12 h-12 text-amber-400 animate-pulse" />
        </div>
        <p className="text-slate-500 mt-2 font-semibold">Sparking some ideas...</p>
    </div>
);

export const ButtonLoader = () => (
    <div className="flex items-center justify-center space-x-1">
        <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
        <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></span>
        <span className="w-2 h-2 bg-current rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
    </div>
);

const PENCIL_SHAVING_PATHS = [
    "M10 80 C 20 70, 30 70, 40 80 S 60 90, 70 80",
    "M20 75 C 30 65, 40 65, 50 75 S 70 85, 80 75",
    "M15 78 C 25 72, 35 72, 45 78 S 65 84, 75 78",
];

const LOADING_MESSAGES = [
    "BrainyBunny is sharpening its pencils...",
    "Hopping around for the best brain-teasers...",
    "Warming up the ol' thinking cap!",
    "Get ready for a fun challenge!",
    "Assembling an awesome quiz just for you..."
];

export const QuizLoader = ({ topic }: { topic: string }) => {
    const [message, setMessage] = useState(LOADING_MESSAGES[0]);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setMessage(prev => {
                const currentIndex = LOADING_MESSAGES.indexOf(prev);
                const nextIndex = (currentIndex + 1) % LOADING_MESSAGES.length;
                return LOADING_MESSAGES[nextIndex];
            });
        }, 2000);

        return () => clearInterval(intervalId);
    }, []);
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-100 to-purple-100 flex flex-col items-center justify-center p-4 text-center">
            <div className="relative w-48 h-48">
                {/* Pencil */}
                <svg className="absolute w-full h-full -rotate-45" viewBox="0 0 100 100">
                    <path d="M50 0 L60 20 L55 100 L45 100 L40 20 Z" fill="#FFD700" />
                    <path d="M50 0 L40 20 L45 20 Z" fill="#F0C400" />
                    <path d="M50 0 L60 20 L55 20 Z" fill="#F0C400" />
                    <path d="M45 100 L55 100 L50 90 Z" fill="#FFC0CB" />
                    <path d="M50 0 L48 5 L52 5 Z" fill="#36454F" />
                </svg>

                {/* Bunny */}
                 <div className="absolute bottom-0 right-0 w-24 h-24">
                    <div className="absolute bottom-0 right-0 w-16 h-16 bg-white rounded-full" />
                    <div className="absolute top-0 right-4 w-6 h-12 bg-white rounded-t-full border-b-4 border-pink-200" style={{ transform: 'rotate(15deg)' }}/>
                    <div className="absolute top-0 right-10 w-6 h-12 bg-white rounded-t-full border-b-4 border-pink-200" style={{ transform: 'rotate(-15deg)' }}/>
                    <div className="absolute top-6 right-7 w-3 h-3 bg-slate-800 rounded-full" />
                    <div className="absolute top-6 right-12 w-3 h-3 bg-slate-800 rounded-full" />
                </div>

                {/* Shavings Animation */}
                <div className="absolute top-0 left-0 w-full h-full">
                    {PENCIL_SHAVING_PATHS.map((path, i) => (
                        <svg key={i} className="absolute w-full h-full opacity-0" style={{ animation: `shaving-fall ${1.5 + i * 0.3}s ease-out infinite` }} viewBox="0 0 100 100">
                            <path d={path} stroke="#D2B48C" strokeWidth="2" fill="none" />
                        </svg>
                    ))}
                </div>
            </div>

            <style>{`
                @keyframes shaving-fall {
                    0% { transform: translateY(-20px) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(40px) rotate(90deg); opacity: 0; }
                }
            `}</style>

            <h2 className="text-2xl font-bold text-slate-800 mt-8 transition-all duration-500">{message}</h2>
            <p className="text-slate-500 mt-2">Preparing your quiz on <span className="font-semibold">{topic}</span>...</p>
        </div>
    );
};