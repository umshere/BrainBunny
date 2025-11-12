import React, { useState } from 'react';
import { QuizQuestion } from '../../types';
import { generateQuizQuestions } from '../../services/geminiService';
import { QuizSetup } from './QuizSetup';
import { QuizGame } from './QuizGame';
import { QuizResults } from './QuizResults';
import { CoffeeBrewerIcon, BrainyBunnyIcon } from '../icons';

type QuizState = 'setup' | 'loading' | 'playing' | 'results';
type QuizSettings = {
    gradeLevel: string;
    topic: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
};

const WEAK_SPOTS_KEY = 'brainyBunnyWeakSpots';

export const StudentZone = ({ onExit }: { onExit: () => void; }) => {
    const [quizState, setQuizState] = useState<QuizState>('setup');
    const [quizSettings, setQuizSettings] = useState<QuizSettings | null>(null);
    const [questions, setQuestions] = useState<QuizQuestion[]>([]);
    const [score, setScore] = useState(0);
    const [level, setLevel] = useState(1);
    const [levelPassed, setLevelPassed] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleAddWeakSpot = (questionText: string) => {
        try {
            const stored = localStorage.getItem(WEAK_SPOTS_KEY);
            const existingSpots: string[] = stored ? JSON.parse(stored) : [];
            const newSpots = new Set([...existingSpots, questionText]);
            localStorage.setItem(WEAK_SPOTS_KEY, JSON.stringify(Array.from(newSpots)));
        } catch (e) {
            console.error("Failed to save weak spot:", e);
        }
    };

    const fetchQuestions = async (currentLevel: number) => {
        if (!quizSettings) return;
        setQuizState('loading');
        setError(null);
        try {
            const generatedQuestions = await generateQuizQuestions(quizSettings.gradeLevel, quizSettings.topic, quizSettings.difficulty, currentLevel);
            if (generatedQuestions && generatedQuestions.length > 0) {
                setQuestions(generatedQuestions);
                setScore(0);
                setQuizState('playing');
            } else {
                setError("Sorry, I couldn't create a quiz for that topic. Please try another one!");
                setQuizState('setup');
            }
        } catch (e) {
            console.error(e);
            setError("Oh no! Something went wrong while creating the quiz. Please try again.");
            setQuizState('setup');
        }
    };

    const handleStartQuiz = async (settings: QuizSettings) => {
        setQuizSettings(settings);
        setLevel(1);
        await fetchQuestions(1);
    };

    const handleQuizEnd = (finalScore: number) => {
        setScore(finalScore);
        const passed = finalScore / questions.length >= 0.7; // Pass if 70% or more
        setLevelPassed(passed);
        if (passed) {
            setLevel(prev => prev + 1);
        }
        setQuizState('results');
    };
    
    const handleNextLevel = () => {
        fetchQuestions(level);
    }

    const handleNewQuiz = () => {
        setQuizState('setup');
        setQuestions([]);
        setQuizSettings(null);
        setError(null);
    };

    const renderContent = () => {
        switch (quizState) {
            case 'setup':
                return <QuizSetup onStart={handleStartQuiz} error={error} />;
            case 'loading':
                return (
                    <div className="text-center">
                        <CoffeeBrewerIcon className="w-32 h-32 mx-auto" />
                        <h2 className="text-2xl font-bold text-slate-700 mt-4">Brewing up some questions...</h2>
                        <p className="text-slate-500">This might take a moment!</p>
                    </div>
                );
            case 'playing':
                return <QuizGame questions={questions} onEnd={handleQuizEnd} topic={quizSettings?.topic || ''} level={level} onAddWeakSpot={handleAddWeakSpot} />;
            case 'results':
                return <QuizResults score={score} totalQuestions={questions.length} onNextLevel={handleNextLevel} onNewQuiz={handleNewQuiz} passed={levelPassed} level={level} />;
            default:
                return <QuizSetup onStart={handleStartQuiz} error={error} />;
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-sky-100">
             <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-10 no-print">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center space-x-2">
                            <BrainyBunnyIcon className="w-8 h-8 text-sky-500" />
                            <h1 className="text-2xl font-bold text-slate-800">
                                Student Zone
                            </h1>
                        </div>
                        <button onClick={onExit} className="text-sm font-medium text-slate-600 hover:text-slate-800 bg-slate-200 hover:bg-slate-300 px-4 py-2 rounded-lg">Exit</button>
                    </div>
                </div>
            </header>
            <main className="flex-1 flex flex-col items-center justify-center p-4">
                {renderContent()}
            </main>
        </div>
    );
};