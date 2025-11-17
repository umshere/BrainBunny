import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Assignment, QuizQuestion } from '../../types';
import { useUser } from '../../contexts/UserContext';
import { QuizCard } from './QuizCard';
import { QuizResults } from './QuizResults';
import { ArrowUturnLeftIcon, CheckCircleIcon } from '../icons';

// FIX: Define QuizGameProps to resolve the type error.
type QuizGameProps = {
    assignment: Assignment;
    onEnd: () => void;
};

// New component to show dots for each question, indicating progress and allowing navigation.
const QuizProgressIndicator = ({
    count,
    activeIndex,
    studentAnswers,
    onIndicatorClick
}: {
    count: number,
    activeIndex: number,
    studentAnswers: (string | null)[],
    onIndicatorClick: (index: number) => void
}) => (
    <div className="flex justify-center items-center gap-2 mb-4 p-2 bg-white/50 rounded-full">
        {Array.from({ length: count }).map((_, i) => (
            <button
                key={i}
                onClick={() => onIndicatorClick(i)}
                className={`w-8 h-2 rounded-full transition-all duration-300 
                    ${i === activeIndex ? 'bg-sky-500' : 'bg-slate-300 hover:bg-slate-400'} 
                    ${studentAnswers[i] !== null ? '!bg-green-500' : ''}`}
                aria-label={`Go to question ${i + 1}`}
            />
        ))}
    </div>
);

// Helper function to determine if an answer is correct
const isAnswerCorrect = (question: QuizQuestion, studentAnswer: string | null): boolean => {
    if (studentAnswer === null) return false;

    if (question.type === 'Matching') {
        try {
            // The correct answer from the AI is a stringified JSON object.
            const correctAnswer = JSON.parse(question.answer as string) as Record<string, string>;
            // The student's answer is a JSON string from the QuizCard.
            const studentSelection = JSON.parse(studentAnswer);

            // Basic check: same number of keys.
            if (Object.keys(correctAnswer).length !== Object.keys(studentSelection).length) {
                return false;
            }

            // Check if every key-value pair matches.
            return Object.keys(correctAnswer).every(
                key => correctAnswer[key] === studentSelection[key]
            );
        } catch (e) {
            console.error("Error comparing matching answers:", e);
            return false;
        }
    } else {
        // Fallback to simple string comparison for all other types.
        const correctAnswer = question.answer as string;
        return correctAnswer.trim().toLowerCase() === studentAnswer.trim().toLowerCase();
    }
};

export const QuizGame = ({ assignment, onEnd }: QuizGameProps) => {
    const { completeAssignment, getActiveStudent } = useUser();
    const [studentAnswers, setStudentAnswers] = useState<(string | null)[]>([]);
    const [isFinished, setIsFinished] = useState(false);
    const [score, setScore] = useState(0);
    const [activeIndex, setActiveIndex] = useState(0);
    const [cardWidth, setCardWidth] = useState(500); // For responsiveness
    const [fontSize, setFontSize] = useState(26); // For question text size, default 26px

    const scrollerRef = useRef<HTMLDivElement>(null);
    
    const activeStudent = getActiveStudent();

    useEffect(() => {
        // Dynamic card width for responsiveness
        const calculateCardWidth = () => {
            const viewportWidth = window.innerWidth;
            // Subtract padding and some margin for a better fit on mobile
            const newWidth = Math.min(viewportWidth - 48, 500);
            setCardWidth(newWidth);
        };
        calculateCardWidth();
        window.addEventListener('resize', calculateCardWidth);
        
        return () => window.removeEventListener('resize', calculateCardWidth);
    }, []);

    useEffect(() => {
        // Reset state when a new assignment is loaded
        setStudentAnswers(Array(assignment.questions.length).fill(null));
        setIsFinished(false);
        setScore(0);
        setActiveIndex(0);
        if (scrollerRef.current) {
            scrollerRef.current.scrollLeft = 0;
        }
    }, [assignment]);

    const handleScroll = useCallback(() => {
        if (scrollerRef.current) {
            const { scrollLeft } = scrollerRef.current;
            const newIndex = cardWidth > 0 ? Math.round(scrollLeft / cardWidth) : 0;
            if (newIndex !== activeIndex) {
                setActiveIndex(newIndex);
            }
        }
    }, [activeIndex, cardWidth]);

    useEffect(() => {
        const scroller = scrollerRef.current;
        if (scroller) {
            // A simple debounce to avoid excessive re-renders on fast scrolls
            let debounceTimer: number;
            const debouncedHandler = () => {
                clearTimeout(debounceTimer);
                debounceTimer = window.setTimeout(() => {
                    handleScroll();
                }, 50);
            };
            scroller.addEventListener('scroll', debouncedHandler, { passive: true });
            return () => scroller.removeEventListener('scroll', debouncedHandler);
        }
    }, [handleScroll]);

    const handleIndicatorClick = (index: number) => {
        if (scrollerRef.current) {
            scrollerRef.current.scrollTo({
                left: index * cardWidth,
                behavior: 'smooth'
            });
        }
    };

    const handleAnswerSelected = (questionIndex: number, answer: string) => {
        const newAnswers = [...studentAnswers];
        newAnswers[questionIndex] = answer;
        setStudentAnswers(newAnswers);
    };

    const finishQuiz = () => {
        let correctAnswers = 0;
        assignment.questions.forEach((q, index) => {
            if (isAnswerCorrect(q, studentAnswers[index])) {
                correctAnswers++;
            }
        });
        setScore(correctAnswers);

        if (activeStudent && assignment.id.startsWith('as_')) { // Only save permanent assignments
            completeAssignment(activeStudent.id, assignment.id, correctAnswers, studentAnswers);
        }
        setIsFinished(true);
    };

    const handleRestart = () => {
        // Reset state for a new attempt
        setStudentAnswers(Array(assignment.questions.length).fill(null));
        setIsFinished(false);
        setScore(0);
        setActiveIndex(0);
        if (scrollerRef.current) {
            scrollerRef.current.scrollLeft = 0;
        }
    };
    
    const allAnswered = studentAnswers.every(a => a !== null);
    
    const questionCount = assignment.questions.length;

    if (isFinished) {
         return (
            <div className="min-h-screen bg-gradient-to-br from-sky-100 to-purple-100 flex items-center justify-center p-4">
                <div className="w-full max-w-2xl">
                    <QuizResults
                        score={score}
                        totalQuestions={questionCount}
                        assignment={assignment}
                        studentAnswers={studentAnswers}
                        onRestart={handleRestart}
                        onEnd={onEnd}
                        ranOutOfLives={false} // lives system removed for this UI
                    />
                </div>
            </div>
         )
    }

    return (
        <div 
            className="min-h-screen bg-gradient-to-br from-sky-100 to-purple-100 flex flex-col items-center justify-center p-4 quiz-container overflow-hidden" 
            style={{
                '--card-count': questionCount,
                '--card-width': `${cardWidth}px`,
                '--active': activeIndex
            } as React.CSSProperties}
        >
             <div className="w-full max-w-4xl mx-auto flex flex-col h-full">
                <div className="flex justify-between items-center mb-2 px-4 flex-shrink-0">
                    <h2 className="text-xl font-bold text-slate-700 truncate pr-2">{assignment.topic}</h2>
                    <div className="flex items-center gap-2 sm:gap-4">
                        {/* Font size control */}
                        <div className="hidden sm:flex items-center gap-2 bg-white/50 p-1.5 rounded-lg">
                            <span className="text-xs font-semibold text-slate-600">Aa</span>
                            <input 
                                type="range" 
                                min="16" 
                                max="40" 
                                step="2"
                                value={fontSize} 
                                onChange={(e) => setFontSize(Number(e.target.value))}
                                className="w-24"
                                aria-label="Adjust question font size"
                            />
                             <span className="text-lg font-semibold text-slate-600">Aa</span>
                        </div>
                        <button 
                            onClick={onEnd} 
                            className="flex items-center gap-2 bg-white/50 hover:bg-white text-slate-700 font-bold py-2 px-4 rounded-lg transition-colors shadow-sm flex-shrink-0"
                            aria-label="Exit quiz"
                        >
                            <ArrowUturnLeftIcon className="w-5 h-5" />
                            <span className="hidden sm:inline">Exit Quiz</span>
                        </button>
                    </div>
                </div>
                
                <div className="flex-shrink-0">
                    <QuizProgressIndicator 
                        count={questionCount} 
                        activeIndex={activeIndex} 
                        studentAnswers={studentAnswers} 
                        onIndicatorClick={handleIndicatorClick}
                    />
                </div>

                <div ref={scrollerRef} className="quiz-scroller flex-grow">
                    <div className="card-stack">
                        {assignment.questions.map((q, i) => (
                            <div key={`${assignment.id}-${i}`} className="question-card-wrapper">
                                <QuizCard
                                    question={q}
                                    questionNumber={i + 1}
                                    totalQuestions={questionCount}
                                    onAnswerSelected={(answer) => handleAnswerSelected(i, answer)}
                                    studentAnswer={studentAnswers[i]}
                                    fontSize={fontSize}
                                    style={{ '--i': i } as React.CSSProperties}
                                />
                            </div>
                        ))}
                    </div>
                </div>
                
                <div className="text-center mt-6 flex-shrink-0 h-16">
                    {allAnswered && (
                         <button 
                            onClick={finishQuiz} 
                            className="flex items-center gap-2 mx-auto bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition-transform hover:scale-105 shadow-lg animate-fade-in"
                        >
                            <CheckCircleIcon className="w-6 h-6" />
                            All Done! See My Score
                        </button>
                    )}
                </div>
             </div>
        </div>
    );
};