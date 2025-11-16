import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '../../types';

// New sub-component for handling the interactive Matching question UI
const MatchingQuestionInterface = ({
    question,
    isAnswered,
    studentAnswer,
    handleAnswer,
}: {
    question: QuizQuestion,
    isAnswered: boolean,
    studentAnswer: string | null,
    handleAnswer: (answer: string) => void,
}) => {
    const { matchingPairs } = question;
    const [selections, setSelections] = useState<Record<string, string>>({});

    useEffect(() => {
        // Pre-fill selections if an answer already exists (for review)
        if (isAnswered && studentAnswer) {
            try {
                setSelections(JSON.parse(studentAnswer));
            } catch {
                setSelections({});
            }
        } else {
            // Initialize empty selections for each prompt
            const initialSelections: Record<string, string> = {};
            matchingPairs?.prompts.forEach(p => { initialSelections[p] = '' });
            setSelections(initialSelections);
        }
    }, [isAnswered, studentAnswer, matchingPairs]);

    if (!matchingPairs) return <p className="text-red-500">Error: Matching data is missing.</p>;

    const handleSelectChange = (prompt: string, choice: string) => {
        setSelections(prev => ({ ...prev, [prompt]: choice }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleAnswer(JSON.stringify(selections));
    };

    const allSelected = Object.values(selections).every(s => s !== '');
    
    // The correct answer is now a stringified JSON object
    let correctAnswer: Record<string, string> = {};
    if (isAnswered) {
        try {
            correctAnswer = JSON.parse(question.answer as string);
        } catch {}
    }


    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            {matchingPairs.prompts.map((prompt, index) => (
                <div key={index} className="grid grid-cols-2 gap-2 items-center">
                    <p className="font-medium text-slate-700 text-right">{prompt}</p>
                    <select
                        value={selections[prompt] || ''}
                        onChange={(e) => handleSelectChange(prompt, e.target.value)}
                        disabled={isAnswered}
                        className={`w-full p-2 border-2 rounded-lg text-base transition
                            ${isAnswered && correctAnswer[prompt] === selections[prompt] ? 'bg-green-50 border-green-300' : ''}
                            ${isAnswered && correctAnswer[prompt] !== selections[prompt] ? 'bg-red-50 border-red-300' : 'border-slate-300'}
                            focus:ring-2 focus:ring-sky-500
                        `}
                    >
                        <option value="" disabled>Select...</option>
                        {matchingPairs.choices.map((choice, i) => (
                            <option key={i} value={choice}>{choice}</option>
                        ))}
                    </select>
                </div>
            ))}
            {!isAnswered && (
                <button type="submit" disabled={!allSelected} className="w-full mt-4 bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-lg text-lg transition disabled:bg-slate-300">
                    Submit Answer
                </button>
            )}
        </form>
    );
};


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

    // Determine correctness based on question type
    const isCorrect = (() => {
        if (!isAnswered || !studentAnswer) return false;
        if (question.type === 'Matching') {
            try {
                const correctAnswer = JSON.parse(question.answer as string) as Record<string, string>;
                const studentSelection = JSON.parse(studentAnswer);
                return Object.keys(correctAnswer).length === Object.keys(studentSelection).length &&
                       Object.keys(correctAnswer).every(key => correctAnswer[key] === studentSelection[key]);
            } catch { return false; }
        }
        return (question.answer as string).trim().toLowerCase() === studentAnswer.trim().toLowerCase();
    })();

    useEffect(() => {
        if (!isAnswered) setTextAnswer('');
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
                                    ${isAnswered && option.trim().toLowerCase() === (question.answer as string).trim().toLowerCase() ? 'bg-green-100 border-green-400 text-green-800 scale-105' : ''}
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
            case 'Matching':
                return (
                    <MatchingQuestionInterface
                        question={question}
                        isAnswered={isAnswered}
                        studentAnswer={studentAnswer}
                        handleAnswer={handleAnswer}
                    />
                );
            case 'Problem Solving':
                 return (
                    <form onSubmit={(e) => { e.preventDefault(); if (textAnswer.trim()) handleAnswer(textAnswer); }} className="space-y-4">
                        <textarea
                            value={isAnswered ? (studentAnswer || '') : textAnswer}
                            onChange={(e) => setTextAnswer(e.target.value)}
                            className={`w-full p-4 border-2 rounded-lg text-lg focus:ring-2 focus:ring-sky-500 min-h-[120px]
                                ${isAnswered && isCorrect ? 'bg-green-50 border-green-300' : ''}
                                ${isAnswered && !isCorrect ? 'bg-red-50 border-red-300' : 'border-slate-300'}
                            `}
                            placeholder="Type your answer here..."
                            disabled={isAnswered}
                            readOnly={isAnswered}
                            rows={4}
                        />
                         {!isAnswered &&
                            <button type="submit" disabled={isAnswered || !textAnswer.trim()} className="w-full bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-lg text-lg transition disabled:bg-slate-300">
                                Submit Answer
                            </button>
                         }
                    </form>
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
                         <p className="text-slate-700 text-sm">
                            The correct answer is: <span className="font-bold">
                                {(() => {
                                    // FIX: Safely render the answer by checking if it's an object and formatting it to a string.
                                    const answer = question.answer;
                                    if (typeof answer === 'object' && answer !== null) {
                                        return Object.entries(answer).map(([key, val]) => `${key}: ${val}`).join('; ');
                                    }
                                    if (typeof answer === 'string') {
                                        try {
                                            const parsed = JSON.parse(answer);
                                            if (typeof parsed === 'object' && parsed !== null) {
                                                return Object.entries(parsed).map(([key, val]) => `${key}: ${val}`).join('; ');
                                            }
                                        } catch (e) {
                                            // Not a JSON string, return as is.
                                        }
                                    }
                                    return String(answer);
                                })()}
                            </span>
                         </p>
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