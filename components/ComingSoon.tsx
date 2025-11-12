import React from 'react';
import { BeakerIcon, PuzzlePieceIcon } from './icons';

export const ComingSoon = () => {
    return (
        <div className="bg-gradient-to-r from-sky-50 to-purple-50 p-6 md:p-8 rounded-2xl shadow-lg border border-slate-200 text-center">
            <div className="flex justify-center items-center gap-4 mb-4">
                <BeakerIcon className="w-10 h-10 text-sky-500 opacity-80" />
                <PuzzlePieceIcon className="w-12 h-12 text-purple-500" />
            </div>
            <h3 className="text-xl font-bold text-slate-800">More Fun is On The Way!</h3>
            <p className="text-slate-500 mt-2 max-w-xl mx-auto">
                We're busy building exciting new features like interactive voice quizzes, progress tracking, and custom learning paths. Stay tuned!
            </p>
        </div>
    );
};
