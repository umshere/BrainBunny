import React, { useState } from 'react';
import { QuizSettings } from '../../types';
import { AcademicCapIcon, BrainyBunnyIcon, LightBulbIcon, MicrophoneIcon, SparklesIcon, XMarkIcon } from '../icons';

type QuizSetupProps = {
    onStart: (settings: QuizSettings) => void;
    onBack: () => void;
    error: string | null;
};

const DIFFICULTIES: ('Easy' | 'Medium' | 'Hard')[] = ['Easy', 'Medium', 'Hard'];

export const QuizSetup = ({ onStart, onBack, error }: QuizSetupProps) => {
    const [topic, setTopic] = useState('');
    const [difficulty, setDifficulty] = useState<'Easy' | 'Medium' | 'Hard'>('Medium');
    const [gradeLevel, setGradeLevel] = useState('3rd Grade'); // This would ideally come from student profile
    const [mode, setMode] = useState<'classic' | 'voice'>('classic');
    const [internalError, setInternalError] = useState<string | null>(null);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!topic.trim()) {
            setInternalError('Please enter a topic to practice!');
            return;
        }
        setInternalError(null);
        onStart({ topic, difficulty, gradeLevel, mode });
    };

    return (
        <div className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-200 relative animate-fade-in">
             <button onClick={onBack} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                <XMarkIcon className="w-6 h-6" />
            </button>
            <BrainyBunnyIcon className="w-16 h-16 text-sky-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-800 text-center mb-2">Practice Zone</h2>
            <p className="text-slate-500 text-center mb-6">What do you want to practice today?</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="topic" className="font-semibold text-slate-700 mb-2 flex items-center">
                        <LightBulbIcon className="w-5 h-5 mr-2" /> Topic
                    </label>
                    <input
                        id="topic"
                        type="text"
                        value={topic}
                        onChange={e => setTopic(e.target.value)}
                        placeholder="e.g., Multiplication"
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                        required
                    />
                </div>
                
                <div>
                    <label className="font-semibold text-slate-700 mb-2 block">
                        <AcademicCapIcon className="w-5 h-5 mr-2 inline" /> Difficulty
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                        {DIFFICULTIES.map(d => (
                            <button
                                type="button"
                                key={d}
                                onClick={() => setDifficulty(d)}
                                className={`p-3 text-sm font-semibold rounded-lg border-2 transition ${difficulty === d ? 'bg-sky-500 text-white border-sky-500' : 'bg-white text-slate-600 border-slate-200 hover:border-sky-400'}`}
                            >
                                {d}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                     <label className="font-semibold text-slate-700 mb-2 block">
                        <MicrophoneIcon className="w-5 h-5 mr-2 inline" /> Quiz Mode
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                         <button type="button" onClick={() => setMode('classic')} className={`p-3 text-sm font-semibold rounded-lg border-2 transition ${mode === 'classic' ? 'bg-sky-500 text-white border-sky-500' : 'bg-white text-slate-600 border-slate-200 hover:border-sky-400'}`}>Classic</button>
                         <button type="button" onClick={() => setMode('voice')} className={`p-3 text-sm font-semibold rounded-lg border-2 transition ${mode === 'voice' ? 'bg-purple-500 text-white border-purple-500' : 'bg-white text-slate-600 border-slate-200 hover:border-purple-400'}`}>Voice (Soon)</button>
                    </div>
                </div>

                {(error || internalError) && <p className="text-red-500 text-center bg-red-50 p-3 rounded-lg">{error || internalError}</p>}

                <button
                    type="submit"
                    className="w-full flex items-center justify-center bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-6 rounded-lg transition shadow-lg hover:shadow-xl text-lg"
                >
                    <SparklesIcon className="w-6 h-6 mr-2" /> Start Quiz
                </button>
            </form>
        </div>
    );
};
