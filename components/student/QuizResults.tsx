import React, { useState } from 'react';
import { Assignment } from '../../types';
import { CheckCircleIcon, XCircleIcon, ArrowPathIcon, ArrowUturnLeftIcon, StarIcon } from '../icons';

type QuizResultsProps = {
    score: number;
    totalQuestions: number;
    assignment: Assignment;
    studentAnswers: (string | null)[];
    ranOutOfLives: boolean;
    onRestart: () => void;
    onEnd: () => void;
};

export const QuizResults = ({ score, totalQuestions, assignment, studentAnswers, ranOutOfLives, onRestart, onEnd }: QuizResultsProps) => {
    const percentage = totalQuestions > 0 ? Math.round((score / totalQuestions) * 100) : 0;
    const [showReview, setShowReview] = useState(false);
    
    const getFeedback = () => {
        if (ranOutOfLives) return "Don't worry, practice makes perfect!";
        if (percentage === 100) return "Perfect Score! You're a superstar! ✨";
        if (percentage >= 80) return "Great job! You really know your stuff! 👍";
        if (percentage >= 60) return "Good effort! Keep practicing! 💪";
        return "Don't give up! Review the answers and try again. 🧠";
    };

    const title = ranOutOfLives ? "Game Over!" : "Quiz Complete!";
    const titleColor = ranOutOfLives ? "text-red-500" : "text-slate-800";
    const scoreColor = ranOutOfLives ? "text-slate-500" : (percentage >= 80 ? "text-green-500" : (percentage >= 60 ? "text-amber-500" : "text-red-500"));

    return (
        <div className="bg-white p-6 md:p-8 rounded-3xl shadow-2xl border border-slate-200 w-full animate-fade-in">
            <h2 className={`text-3xl font-bold text-center ${titleColor}`}>{title}</h2>
            
            <div className="text-center my-6">
                <p className="text-lg text-slate-600">You scored</p>
                <p className={`text-6xl font-bold my-2 ${scoreColor}`}>{score} / {totalQuestions}</p>
                <p className="font-semibold text-slate-700">{getFeedback()}</p>
            </div>
            
             <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                <button onClick={() => setShowReview(!showReview)} className="text-sm font-semibold text-sky-600 hover:underline">
                    {showReview ? 'Hide Review' : 'Review Answers'}
                </button>
            </div>

            {showReview && (
                <div className="mt-4 max-h-[30vh] overflow-y-auto space-y-3 p-4 bg-slate-50 rounded-lg border">
                    {assignment.questions.map((q, index) => {
                        const studentAnswer = studentAnswers[index];
                        const isCorrect = studentAnswer && q.answer.trim().toLowerCase() === studentAnswer.trim().toLowerCase();
                        return (
                            <div key={index} className={`bg-white p-3 rounded-md shadow-sm border-l-4 ${isCorrect ? 'border-green-500' : 'border-red-500'}`}>
                                <p className="font-semibold text-slate-700">{index + 1}. {q.question}</p>
                                <div className="text-sm mt-2 flex items-start">
                                    {isCorrect
                                        ? <CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                        : <XCircleIcon className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-0.5" />
                                    }
                                    <div>
                                        <p className={`font-medium ${isCorrect ? 'text-slate-800' : 'text-red-700 line-through'}`}>
                                            Your answer: {studentAnswer || 'No answer'}
                                        </p>
                                        {!isCorrect && <p className="font-medium text-green-700">Correct answer: {q.answer}</p>}
                                        {!isCorrect && q.explanation && (
                                            <p className="mt-1 text-slate-700 italic">💡 {q.explanation}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
            
            <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                <button onClick={onRestart} className="w-full sm:w-auto flex items-center justify-center bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-3 px-6 rounded-lg transition">
                    <ArrowPathIcon className="w-5 h-5 mr-2" />
                    Try Again
                </button>
                <button onClick={onEnd} className="w-full sm:w-auto flex items-center justify-center bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-6 rounded-lg transition">
                     <ArrowUturnLeftIcon className="w-5 h-5 mr-2" />
                    Back to Dashboard
                </button>
            </div>
        </div>
    );
};
