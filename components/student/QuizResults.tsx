import React from 'react';
import { StarIcon, ArrowPathIcon } from '../icons';

type QuizResultsProps = {
    score: number;
    totalQuestions: number;
    onNewQuiz: () => void;
    passed: boolean;
    isAssignment?: boolean;
};

export const QuizResults = ({ score, totalQuestions, onNewQuiz, passed, isAssignment }: QuizResultsProps) => {
    const percentage = Math.round((score / totalQuestions) * 100);
    
    const getMessage = () => {
        if (percentage > 90) return { text: "Wow, you're a superstar!", color: "text-amber-500" };
        if (percentage >= 70) return { text: "Amazing job!", color: "text-green-600" };
        if (percentage >= 50) return { text: "Great effort!", color: "text-sky-600" };
        return { text: "Good try! Keep practicing!", color: "text-blue-600" };
    }
    
    const { text: message, color: messageColor } = getMessage();

    return (
        <div className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-200 text-center animate-correct-pop">
            <div className="flex justify-center mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                    <StarIcon key={i} className={`w-10 h-10 ${i < Math.round(percentage/20) ? 'text-yellow-400' : 'text-slate-300'}`} />
                ))}
            </div>
            <h3 className={`text-3xl font-bold ${messageColor} mb-2`}>{message}</h3>
            <p className="text-slate-600 mb-6 text-lg">You answered</p>
            <p className="text-6xl font-extrabold text-slate-800">{score}<span className="text-3xl font-bold text-slate-400">/{totalQuestions}</span></p>
            <p className="text-slate-600 mt-1 text-lg">questions correctly!</p>
            
            <div className="mt-8">
                 <button
                    onClick={onNewQuiz}
                    className="w-full inline-flex items-center justify-center bg-slate-600 hover:bg-slate-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 text-lg"
                >
                    Back to Assignments
                </button>
            </div>
        </div>
    );
};
