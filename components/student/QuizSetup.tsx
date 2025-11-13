import React, { useState } from 'react';
import { QuizSettings } from '../../types';
import { BrainyBunnyIcon, ArrowUturnLeftIcon, SparklesIcon } from '../icons';
import { ButtonLoader } from '../loaders';
import { generateSurpriseTopic } from '../../services/geminiService';


type QuizSetupProps = {
    onStart: (settings: QuizSettings) => void;
    onBack: () => void;
    error: string | null;
    gradeLevel: string;
};

const difficulties: QuizSettings['difficulty'][] = ['Easy', 'Medium', 'Hard'];
const modes: QuizSettings['mode'][] = ['classic', 'voice'];

export const QuizSetup = ({ onStart, onBack, error, gradeLevel }: QuizSetupProps) => {
    const [topic, setTopic] = useState('');
    const [difficulty, setDifficulty] = useState<QuizSettings['difficulty']>('Medium');
    const [mode, setMode] = useState<QuizSettings['mode']>('classic');
    const [isLoading, setIsLoading] = useState(false);
    const [isSurpriseLoading, setIsSurpriseLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (topic.trim() && !isLoading && !isSurpriseLoading) {
            setIsLoading(true);
            onStart({
                topic: topic.trim(),
                difficulty,
                mode,
                gradeLevel,
            });
        }
    };

    const handleSurpriseMe = async () => {
        setIsSurpriseLoading(true);
        const surpriseTopic = await generateSurpriseTopic(gradeLevel);
        onStart({
            topic: surpriseTopic,
            difficulty,
            mode,
            gradeLevel,
        });
    };

    return (
        <div className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-2xl border border-slate-200 relative">
            <button onClick={onBack} className="absolute top-4 left-4 text-slate-500 hover:text-slate-800 disabled:opacity-50" disabled={isLoading || isSurpriseLoading}>
                <ArrowUturnLeftIcon className="w-6 h-6" />
            </button>
            <BrainyBunnyIcon className="w-16 h-16 text-amber-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-slate-800 text-center">Practice Quiz</h2>
            <p className="text-slate-500 text-center mt-2 mb-6">What do you want to practice today?</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="topic" className="block text-sm font-medium text-slate-700 mb-1">Topic</label>
                    <input
                        type="text"
                        id="topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="e.g., 'Addition up to 100'"
                        className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500"
                        required
                        disabled={isLoading || isSurpriseLoading}
                    />
                </div>
                
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Difficulty</label>
                    <div className="grid grid-cols-3 gap-2">
                        {difficulties.map(d => (
                            <button
                                type="button"
                                key={d}
                                onClick={() => setDifficulty(d)}
                                className={`px-3 py-2 text-sm font-semibold rounded-lg border-2 transition ${difficulty === d ? 'bg-sky-500 text-white border-sky-500' : 'bg-white text-slate-600 hover:border-sky-400'}`}
                                disabled={isLoading || isSurpriseLoading}
                            >
                                {d}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Mode</label>
                     <div className="grid grid-cols-2 gap-2">
                         {modes.map(m => (
                            <button
                                type="button"
                                key={m}
                                onClick={() => setMode(m)}
                                className={`px-3 py-2 text-sm font-semibold rounded-lg border-2 transition capitalize ${mode === m ? 'bg-sky-500 text-white border-sky-500' : 'bg-white text-slate-600 hover:border-sky-400'}`}
                                disabled={isLoading || isSurpriseLoading || m === 'voice'}
                            >
                                {m}{m === 'voice' && ' (Soon)'}
                            </button>
                        ))}
                    </div>
                </div>

                {error && <p className="text-red-500 text-center bg-red-50 p-3 rounded-lg">{error}</p>}
                
                <div className="mt-6 space-y-3">
                    <button
                        type="submit"
                        disabled={isLoading || isSurpriseLoading}
                        className="w-full h-[52px] flex items-center justify-center bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-4 rounded-lg transition text-lg shadow-lg hover:shadow-xl disabled:bg-slate-400"
                    >
                        {isLoading && !isSurpriseLoading ? <ButtonLoader /> : (
                            <>
                                <SparklesIcon className="w-6 h-6 mr-2" />
                                Start Quiz
                            </>
                        )}
                    </button>
                    <button
                        type="button"
                        onClick={handleSurpriseMe}
                        disabled={isLoading || isSurpriseLoading}
                        className="w-full h-[52px] flex items-center justify-center bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-4 rounded-lg transition text-lg shadow-lg hover:shadow-xl disabled:bg-slate-400"
                    >
                        {isSurpriseLoading ? <ButtonLoader /> : "✨ Surprise Me!" }
                    </button>
                </div>
            </form>
        </div>
    );
};