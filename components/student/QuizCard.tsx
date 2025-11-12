import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '../../types';
import { CheckCircleIcon, XCircleIcon, AdjustmentsHorizontalIcon } from '../icons';

type QuizCardProps = {
    question: QuizQuestion;
    onAnswerSelected: (selectedOption: string, isCorrect: boolean) => void;
    questionNumber: number;
    totalQuestions: number;
    isAnswered: boolean;
    fontSize: number;
    onFontSizeChange: (size: number) => void;
};

const ENCOURAGEMENTS = ['Awesome!', 'You got it!', 'Brilliant!', 'Superstar!', 'Great work!'];

export const QuizCard: React.FC<QuizCardProps> = ({ question, onAnswerSelected, questionNumber, totalQuestions, isAnswered, fontSize, onFontSizeChange }) => {
    const [isFlipped, setIsFlipped] = useState(false);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
    const [encouragement, setEncouragement] = useState('');
    const [textAnswer, setTextAnswer] = useState('');
    const [showSizeControl, setShowSizeControl] = useState(false);

    useEffect(() => {
        setEncouragement(ENCOURAGEMENTS[Math.floor(Math.random() * ENCOURAGEMENTS.length)]);
    }, [question]);

    const handleAnswer = (selectedAnswer: string) => {
        if (isAnswered) return;
        
        const correct = selectedAnswer.trim().toLowerCase() === question.answer.trim().toLowerCase();
        setIsCorrect(correct);
        setIsFlipped(true);
        onAnswerSelected(selectedAnswer, correct);
    };

    const renderMultipleChoice = () => (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-md flex-shrink-0">
            {(question.options || []).map(option => (
                <button
                    key={option}
                    onClick={() => handleAnswer(option)}
                    disabled={isAnswered}
                    className="p-4 text-lg font-semibold text-slate-700 bg-white rounded-xl border-2 border-slate-200 shadow-sm hover:bg-amber-100 hover:border-amber-500 hover:shadow-md hover:scale-105 transform transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-sm"
                >
                    {option}
                </button>
            ))}
        </div>
    );

    const renderTextInput = () => (
        <form 
            onSubmit={(e) => { e.preventDefault(); handleAnswer(textAnswer); }}
            className="w-full max-w-md flex-shrink-0 flex flex-col items-center"
        >
            <input
                type="text"
                value={textAnswer}
                onChange={(e) => setTextAnswer(e.target.value)}
                placeholder="Type your answer here..."
                disabled={isAnswered}
                className="w-full p-4 text-lg font-semibold text-slate-700 bg-white rounded-xl border-2 border-slate-200 shadow-sm focus:border-amber-500 focus:ring-amber-500 mb-4"
                autoFocus
            />
            <button
                type="submit"
                disabled={isAnswered || !textAnswer.trim()}
                className="p-4 w-full text-lg font-semibold text-white bg-sky-500 rounded-xl border-2 border-sky-600 shadow-sm hover:bg-sky-600 transform transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Submit Answer
            </button>
        </form>
    );

    const renderAnswerArea = () => {
        switch (question.type) {
            case 'Multiple Choice':
                return renderMultipleChoice();
            case 'Fill-in-the-Blank':
            case 'Short Answer':
            case 'Problem Solving':
            case 'Matching': // Matching will use text input for now as a simplified version
                 return renderTextInput();
            default:
                // Fallback for unknown types or if type is missing, assume multiple choice if options exist
                if (question.options && question.options.length > 0) {
                    return renderMultipleChoice();
                }
                return renderTextInput(); // Fallback to text input if no options
        }
    };

    return (
        <div className="w-full h-96 [perspective:1000px]">
            <div className={`quiz-card ${isFlipped ? 'flipped' : ''} w-full h-full`}>
                <div className="quiz-card-inner">
                    {/* Card Front */}
                    <div className="quiz-card-front bg-slate-50 shadow-2xl border border-slate-200 overflow-hidden flex flex-col p-6 justify-between">
                        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-purple-400 to-sky-500"></div>
                        
                        <div className="absolute top-4 right-4 flex items-center space-x-2 z-10">
                             <button onClick={() => setShowSizeControl(!showSizeControl)} className="p-1 rounded-full hover:bg-slate-200 transition text-slate-500 hover:text-slate-700" title="Adjust text size">
                                <AdjustmentsHorizontalIcon className="w-5 h-5" />
                            </button>
                            <div className="bg-white py-1 px-3 rounded-full text-xs font-bold text-slate-500 shadow-sm border border-slate-200">
                                {questionNumber} / {totalQuestions}
                            </div>
                        </div>

                        {showSizeControl && (
                            <div className="absolute top-14 right-4 bg-white p-2 rounded-lg shadow-lg border border-slate-200 w-40 z-10">
                                <label htmlFor="font-size" className="text-xs font-semibold text-slate-500 block mb-1">Text Size</label>
                                <input
                                    id="font-size"
                                    type="range"
                                    min="14"
                                    max="40"
                                    step="1"
                                    value={fontSize}
                                    onChange={(e) => onFontSizeChange(Number(e.target.value))}
                                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
                                />
                            </div>
                        )}

                        <div className="flex-grow flex items-center justify-center overflow-y-auto my-4 pr-2">
                             <h3 
                                className="font-bold text-slate-800 text-center max-w-md leading-snug"
                                style={{ fontSize: `${fontSize}px` }}
                                dangerouslySetInnerHTML={{ __html: question.question.replace(/____/g, '<span class="inline-block border-b-2 border-slate-400 w-24 h-8"></span>') }}>
                            </h3>
                        </div>
                        {renderAnswerArea()}
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