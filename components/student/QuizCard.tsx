import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '../../types';
import { CheckCircleIcon, XCircleIcon } from '../icons';

type QuizCardProps = {
    question: QuizQuestion;
    onAnswerSelected: (isCorrect: boolean) => void;
    questionNumber: number;
    totalQuestions: number;
    isAnswered: boolean;
};

const ENCOURAGEMENTS = ['Awesome!', 'You got it!', 'Brilliant!', 'Superstar!', 'Great work!'];

// Fix: Changed component to React.FC<QuizCardProps> to allow for React-specific props like 'key'.
export const QuizCard: React.FC<QuizCardProps> = ({ question, onAnswerSelected, questionNumber, totalQuestions, isAnswered }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [encouragement, setEncouragement] = useState('');

    useEffect(() => {
        setEncouragement(ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)]);
    }, [question]);

    const handleAnswer = (selectedOption: string) => {
        if (isFlipped) return;
        
        const correct = selectedOption === question.answer;
        setIsCorrect(correct);
        setIsFlipped(true);
        onAnswerSelected(correct);
    };

    return (
        <div className="w-full h-96 [perspective:1000px]">
            <div className={`quiz-card ${isFlipped ? 'flipped' : ''} w-full h-full`}>
                <div className="quiz-card-inner">
                    {/* Card Front */}
                    <div className="quiz-card-front bg-white shadow-xl border border-slate-200">
                        <p className="absolute top-4 left-4 font-bold text-slate-400">{questionNumber}/{totalQuestions}</p>
                        <h3 className="text-2xl font-bold text-slate-800 mb-6">{question.question}</h3>
                        <div className="grid grid-cols-2 gap-4 w-full px-6">
                            {question.options.map(option => (
                                <button
                                    key={option}
                                    onClick={() => handleAnswer(option)}
                                    disabled={isAnswered}
                                    className="p-4 text-lg font-semibold text-slate-700 bg-slate-100 rounded-lg border-2 border-slate-200 hover:bg-amber-100 hover:border-amber-400 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {option}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Card Back */}
                    <div className={`quiz-card-back shadow-xl border-4 ${isCorrect ? 'bg-green-100 border-green-500' : 'bg-red-100 border-red-500'}`}>
                        {isCorrect !== null && (
                             <div className={`flex flex-col items-center justify-center animate-correct-pop`}>
                                {isCorrect ? (
                                    <>
                                        <CheckCircleIcon className="w-20 h-20 text-green-500" />
                                        <h2 className="text-4xl font-extrabold text-green-600 mt-4">{encouragement}</h2>
                                    </>
                                ) : (
                                    <>
                                        <XCircleIcon className="w-20 h-20 text-red-500" />
                                        <h2 className="text-4xl font-extrabold text-red-600 mt-4">No worries!</h2>
                                        <p className="text-slate-600 mt-2 text-lg">We'll practice this one later.</p>
                                        <p className="font-bold text-slate-800 text-xl mt-1">The answer was: {question.answer}</p>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};