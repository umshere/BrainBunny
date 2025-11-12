import React, { useState } from 'react';
import { MagicWandIcon, SparklesIcon } from '../icons';

const GRADE_LEVELS = ["Kindergarten", "1st Grade", "2nd Grade", "3rd Grade", "4th Grade", "5th Grade", "6th Grade", "7th Grade", "8th Grade"];
const DIFFICULTIES = ['Easy', 'Medium', 'Hard'] as const;
type Difficulty = typeof DIFFICULTIES[number];

type QuizSetupProps = {
    onStart: (settings: { gradeLevel: string, topic: string, difficulty: Difficulty }) => void;
    error: string | null;
};

export const QuizSetup = ({ onStart, error }: QuizSetupProps) => {
    const [gradeLevel, setGradeLevel] = useState(GRADE_LEVELS[3]);
    const [topic, setTopic] = useState('');
    const [difficulty, setDifficulty] = useState<Difficulty>('Medium');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (topic.trim()) {
            onStart({ gradeLevel, topic, difficulty });
        }
    };
    
    const handleSurpriseMe = () => {
        onStart({ gradeLevel, topic: 'surprise me', difficulty });
    }

    return (
        <div className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
            <h2 className="text-3xl font-bold text-slate-800 text-center mb-2">Let's Start a Quiz!</h2>
            <p className="text-slate-500 text-center mb-6">Choose your grade, topic, and difficulty.</p>
            
            {error && <p className="text-red-500 text-center mb-4 bg-red-50 p-3 rounded-lg">{error}</p>}
            
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="grade-level" className="block text-sm font-medium text-slate-700 mb-2">Grade Level</label>
                    <select 
                        id="grade-level" 
                        value={gradeLevel} 
                        onChange={e => setGradeLevel(e.target.value)} 
                        className="w-full p-3 text-lg border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                    >
                        {GRADE_LEVELS.map(level => <option key={level} value={level}>{level}</option>)}
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">Difficulty</label>
                    <div className="grid grid-cols-3 gap-2 rounded-lg p-1 bg-slate-100 border border-slate-200">
                        {DIFFICULTIES.map((level) => (
                             <button
                                type="button"
                                key={level}
                                onClick={() => setDifficulty(level)}
                                className={`px-3 py-2 text-sm font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-1 focus:ring-offset-slate-100 ${difficulty === level ? 'bg-sky-500 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'}`}
                            >
                                {level}
                            </button>
                        ))}
                    </div>
                </div>

                <div>
                    <label htmlFor="topic" className="block text-sm font-medium text-slate-700 mb-2">Topic</label>
                    <input
                        type="text"
                        id="topic"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="e.g., 'Dinosaurs' or 'Multiplying'"
                        className="w-full p-3 text-lg border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 transition"
                    />
                </div>
                
                <div className="flex flex-col space-y-4">
                    <button
                        type="submit"
                        disabled={!topic.trim()}
                        className="w-full inline-flex items-center justify-center bg-amber-500 hover:bg-amber-600 disabled:bg-slate-300 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
                    >
                        <MagicWandIcon /><span className="ml-2">Start Quiz</span>
                    </button>
                    
                     <button
                        type="button"
                        onClick={handleSurpriseMe}
                        className="w-full inline-flex items-center justify-center bg-purple-500 hover:bg-purple-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl text-lg"
                    >
                        <SparklesIcon className="w-5 h-5" /><span className="ml-2">Surprise Me!</span>
                    </button>
                </div>
            </form>
        </div>
    );
};