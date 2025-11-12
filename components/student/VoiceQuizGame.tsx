import React from 'react';
import { QuizSettings } from '../../types';
import { MicrophoneIcon } from '../icons';

type VoiceQuizGameProps = {
    settings: QuizSettings;
    onEnd: () => void;
};

export const VoiceQuizGame = ({ settings, onEnd }: VoiceQuizGameProps) => {
    return (
        <div className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-200 text-center">
            <MicrophoneIcon className="w-16 h-16 mx-auto text-sky-500 mb-4" />
            <h2 className="text-2xl font-bold text-slate-800">Voice Quiz Mode</h2>
            <p className="text-slate-500 mt-2 mb-6">This feature is coming soon! Get ready to answer questions by speaking.</p>
            <button
                onClick={onEnd}
                className="w-full inline-flex items-center justify-center bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200"
            >
                Back to Setup
            </button>
        </div>
    );
};
