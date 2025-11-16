import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '../../types';

type QuizCardProps = {
    question: QuizQuestion;
    questionNumber: number;
    totalQuestions: number;
    onAnswerSelected: (answer: string) => void;
    studentAnswer: string | null;
    fontSize: number;
    style: React.CSSProperties;
};

export const QuizCard = ({ question, questionNumber, totalQuestions, onAnswerSelected, studentAnswer, fontSize, style }: QuizCardProps) => {
    const [textAnswer, setTextAnswer] = useState('');

    const isAnswered = studentAnswer !== null;
    const isCorrect = isAnswered && question.answer.trim().toLowerCase() === studentAnswer?.trim().toLowerCase();

    useEffect(() => {
        // Reset local input state if the answer is cleared (e.g., on quiz restart)
        if (!isAnswered) {
            setTextAnswer('');
        }
    }, [isAnswered]);

    const handleAnswer = (answer: string) => {
        if (isAnswered) return;
        onAnswerSelected(answer);
    };

    const renderAnswerOptions = () => {
        switch (question.type) {
            case 'Multiple Choice':
                return (
                    <div className="grid grid-cols-1 gap-3">
                        {question.options?.map((option, index) => (
                            <button
                                key={index}
                                onClick={() => handleAnswer(option)}
                                disabled={isAnswered}
                                className={`w-full text-left p-4 rounded-xl border-2 text-lg transition-all duration-300 font-medium transform focus:outline-none focus:ring-4 focus:ring-amber-300 text-slate-800
                                    ${isAnswered && option.trim().toLowerCase() === question.answer.trim().toLowerCase() ? 'bg-green-100 border-green-400 text-green-800 scale-105' : ''}
                                    ${isAnswered && studentAnswer === option && !isCorrect ? 'bg-red-100 border-red-400 text-red-800' : ''}
                                    ${!isAnswered ? 'bg-white hover:bg-amber-50 border-slate-200' : 'bg-slate-50 text-slate-500 border-slate-200'}
                                `}
                            >
                                <span className="font-bold mr-3 py-1 px-2.5 bg-slate-100 text-slate-600 rounded-md">{String.fromCharCode(65 + index)}</span>
                                {option}
                            </button>
                        ))}
                    </div>
                );
            case 'Fill-in-the-Blank':
            case 'Short Answer':
                return (
                    <form onSubmit={(e) => { e.preventDefault(); if (textAnswer.trim()) handleAnswer(textAnswer); }} className="space-y-4">
                        <input
                            type="text"
                            value={isAnswered ? (studentAnswer || '') : textAnswer}
                            onChange={(e) => setTextAnswer(e.target.value)}
                            className={`w-full p-4 border-2 rounded-lg text-lg focus:ring-2 focus:ring-sky-500
                                ${isAnswered && isCorrect ? 'bg-green-50 border-green-300' : ''}
                                ${isAnswered && !isCorrect ? 'bg-red-50 border-red-300' : 'border-slate-300'}
                            `}
                            placeholder="Type your answer..."
                            disabled={isAnswered}
                            readOnly={isAnswered}
                        />
                         {!isAnswered &&
                            <button type="submit" disabled={isAnswered || !textAnswer.trim()} className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-lg text-lg transition disabled:bg-slate-300">
                                Submit Answer
                            </button>
                         }
                    </form>
                );
            default:
                return <p className="text-red-500">Error: Unknown question type '{question.type}'.</p>;
        }
    };

    return (
        <div className="question-card flex flex-col p-6 overflow-hidden" style={style}>
            <div className="w-full flex justify-between items-center text-slate-500 mb-4 flex-shrink-0">
                <span className="font-bold text-sm bg-slate-100 py-1 px-3 rounded-full">
                    {questionNumber} / {totalQuestions}
                </span>
                <span className="font-semibold text-xs text-slate-400">{question.type}</span>
            </div>

            <div className="flex-grow flex items-center justify-center overflow-y-auto p-2">
                <p
                    className="font-bold text-slate-800 text-center"
                    style={{ fontSize: `${fontSize}px`, lineHeight: 1.2 }}
                >
                    {question.question}
                </p>
            </div>

            <div className="w-full mt-4 flex-shrink-0">
                {renderAnswerOptions()}
            </div>

            {isAnswered && (
                 <div className="mt-4 text-left p-3 rounded-lg border-2 animate-fade-in-down flex-shrink-0
                    ${isCorrect ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}
                 ">
                     {!isCorrect && (
                         <p className="text-slate-700 text-sm">The correct answer is: <span className="font-bold">{question.answer}</span></p>
                     )}
                      {question.explanation && (
                         <p className={`mt-1 text-sm ${isCorrect ? 'text-slate-600' : 'text-slate-700'}`}>
                             💡 {question.explanation}
                         </p>
                     )}
                 </div>
            )}
        </div>
    );
};