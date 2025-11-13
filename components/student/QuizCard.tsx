import React, { useState, useEffect, useMemo } from 'react';
import { QuizQuestion } from '../../types';
import { AdjustmentsHorizontalIcon, CheckCircleIcon, HeartIcon, XCircleIcon } from '../icons';

type QuizCardProps = {
    question: QuizQuestion;
    questionNumber: number;
    totalQuestions: number;
    lives: number;
    fontSize: number;
    onAnswerSelected: (answer: string) => void;
    onNextQuestion: () => void;
    onFontSizeChange: (size: number) => void;
};

export const QuizCard = ({ question, questionNumber, totalQuestions, lives, fontSize, onAnswerSelected, onNextQuestion, onFontSizeChange }: QuizCardProps) => {
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [textAnswer, setTextAnswer] = useState('');
    const [isFlipped, setIsFlipped] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [showFontSlider, setShowFontSlider] = useState(false);

    const isAnswered = selectedAnswer !== null;

    useEffect(() => {
        // Reset state for new question
        setSelectedAnswer(null);
        setIsFlipped(false);
        setIsCorrect(null);
        setTextAnswer('');
        setShowFontSlider(false);
    }, [question]);

    const handleAnswer = (answer: string) => {
        if (isAnswered) return;

        setSelectedAnswer(answer);
        const correct = question.answer.trim().toLowerCase() === answer.trim().toLowerCase();
        setIsCorrect(correct);
        onAnswerSelected(answer);
        setIsFlipped(true);
    };

    const questionTextFontSize = useMemo(() => {
        // This dynamic sizing is a fallback; the slider gives user control.
        const baseSize = 2.25; // rem for text-4xl
        const maxLength = 150;
        let scale = 1;
        if (question.question.length > maxLength) {
            scale = Math.max(0.5, maxLength / question.question.length);
        }
        return `clamp(1rem, ${baseSize * scale * (fontSize / 100)}rem, 4rem)`;
    }, [question.question, fontSize]);

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
                                    ${isAnswered && option === question.answer ? 'bg-green-100 border-green-400 text-green-800 scale-105' : ''}
                                    ${isAnswered && selectedAnswer === option && !isCorrect ? 'bg-red-100 border-red-400 text-red-800' : ''}
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
                            value={textAnswer}
                            onChange={(e) => setTextAnswer(e.target.value)}
                            className="w-full p-4 border-2 border-slate-300 rounded-lg text-lg focus:ring-2 focus:ring-sky-500"
                            placeholder="Type your answer..."
                            disabled={isAnswered}
                        />
                        <button type="submit" disabled={isAnswered || !textAnswer.trim()} className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-lg text-lg transition disabled:bg-slate-300">
                            Submit Answer
                        </button>
                    </form>
                );
            default:
                return <p className="text-red-500">Error: Unknown question type '{question.type}'.</p>;
        }
    };

    return (
        <div className="bg-transparent w-full perspective-[1000px] h-[600px]">
            <div className={`quiz-card ${isFlipped ? 'flipped' : ''} w-full h-full`}>
                <div className="quiz-card-inner">
                    {/* --- FRONT OF CARD --- */}
                    <div className="quiz-card-front bg-white shadow-2xl border border-slate-200 flex flex-col">
                        <div className="w-full flex justify-between items-center text-slate-500">
                            <div className="flex items-center gap-2">
                                {Array.from({ length: 3 }).map((_, i) => (
                                    <HeartIcon key={i} className={`w-6 h-6 transition-all duration-300 ${i < lives ? 'text-red-500' : 'text-slate-300'}`} isFilled={i < lives} />
                                ))}
                            </div>
                            <div className="relative">
                                <button onClick={() => setShowFontSlider(!showFontSlider)} className="p-1 hover:bg-slate-100 rounded-full">
                                    <AdjustmentsHorizontalIcon className="w-6 h-6" />
                                </button>
                                {showFontSlider && (
                                    <div className="absolute top-full right-0 mt-2 bg-white p-2 rounded-lg shadow-lg border z-10 w-48">
                                        <input
                                            type="range"
                                            min="50"
                                            max="150"
                                            value={fontSize}
                                            onChange={(e) => onFontSizeChange(Number(e.target.value))}
                                            className="w-full"
                                        />
                                    </div>
                                )}
                            </div>
                             <div className="font-bold bg-slate-100 py-1 px-3 rounded-full text-sm">
                                {questionNumber} / {totalQuestions}
                            </div>
                        </div>
                        <div className="flex-grow w-full flex items-center justify-center overflow-y-auto p-2">
                            <p
                                className="font-bold text-slate-800 text-center"
                                style={{ fontSize: questionTextFontSize }}
                            >
                                {question.question || "Oops! It looks like this question is empty."}
                            </p>
                        </div>
                        <div className="w-full">{renderAnswerOptions()}</div>
                    </div>

                    {/* --- BACK OF CARD --- */}
                    <div className="quiz-card-back bg-white shadow-2xl border border-slate-200 flex flex-col">
                         <div className="w-full text-center flex-grow overflow-y-auto">
                            {isCorrect ? (
                                <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto animate-correct-pop" />
                            ) : (
                                <XCircleIcon className="w-20 h-20 text-red-500 mx-auto animate-wrong-shake" />
                            )}
                            <h2 className={`text-4xl font-bold mt-4 ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                                {isCorrect ? "Correct!" : "Not Quite!"}
                            </h2>
                            {!isCorrect && (
                                 <p className="text-slate-800 mt-2 text-lg">
                                    The correct answer was: <span className="font-bold text-slate-900">{question.answer}</span>
                                </p>
                            )}
                            
                            <div className="my-4 text-left p-4 bg-slate-50 rounded-lg border border-slate-200">
                                <p className="text-sm text-slate-700 font-medium">The question was:</p>
                                <p className="mt-1 font-semibold text-slate-900">{question.question}</p>
                            </div>

                            {!isCorrect && question.explanation && (
                                <div className="mt-4 text-left p-4 bg-amber-50 border-l-4 border-amber-400 rounded-r-lg">
                                    <h3 className="font-bold text-amber-800 flex items-center">
                                        <span className="text-xl mr-2">💡</span> Explanation
                                    </h3>
                                    <p className="text-slate-800 mt-1">{question.explanation}</p>
                                </div>
                            )}
                        </div>
                        <button
                            onClick={onNextQuestion}
                            className={`w-full mt-auto flex-shrink-0 font-bold py-4 rounded-xl text-xl transition-all ${isCorrect ? 'bg-green-500 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600'} text-white`}
                        >
                            Next Question
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
