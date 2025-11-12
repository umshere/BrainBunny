import React, { useState } from 'react';
import { Assignment } from '../../types';
import { QuizCard } from './QuizCard';
import { QuizResults } from './QuizResults';
import { useUser } from '../../contexts/UserContext';

type QuizGameProps = {
    assignment: Assignment;
    onEnd: () => void;
};

export const QuizGame = ({ assignment, onEnd }: QuizGameProps) => {
    const { completeAssignment, getActiveStudent } = useUser();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [isAnswered, setIsAnswered] = useState(false);
    const [isFinished, setIsFinished] = useState(false);
    const [studentAnswers, setStudentAnswers] = useState<(string | null)[]>([]);
    const [fontSize, setFontSize] = useState(28); // State lifted here
    
    const questions = assignment.questions;
    const currentQuestion = questions[currentQuestionIndex];

    const handleAnswerSelected = (selectedOption: string, isCorrect: boolean) => {
        if (isAnswered) return;

        setStudentAnswers(prev => [...prev, selectedOption]);
        let newScore = score;
        if (isCorrect) {
            newScore = score + 1;
            setScore(newScore);
        }
        setIsAnswered(true);

        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
                setIsAnswered(false);
            } else {
                finishQuiz(newScore, [...studentAnswers, selectedOption]);
            }
        }, 2000); // Wait 2 seconds before moving to the next question or results
    };
    
    const finishQuiz = (finalScore: number, finalAnswers: (string | null)[]) => {
        const activeStudent = getActiveStudent();
        // Only update official assignments, not temporary quizzes
        if (activeStudent && !assignment.id.startsWith('temp_')) {
            completeAssignment(activeStudent.id, assignment.id, finalScore, finalAnswers);
        }
        setIsFinished(true);
    };

    if (isFinished) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-sky-100 to-purple-100 flex items-center justify-center p-4">
                 <QuizResults 
                    score={score}
                    totalQuestions={questions.length}
                    onNewQuiz={onEnd}
                    passed={score / questions.length >= 0.7}
                 />
            </div>
        );
    }
    
    if (!currentQuestion) {
        // This case handles assignments with no questions, which can happen with old manual assignments.
        if (!isFinished) finishQuiz(0, []); 
        return (
             <div className="min-h-screen bg-gradient-to-br from-sky-100 to-purple-100 flex items-center justify-center p-4">
                 <p className="text-slate-600 font-semibold">This assignment has no questions.</p>
             </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-100 to-purple-100 flex flex-col items-center justify-center p-4">
            <h1 className="text-3xl font-bold text-slate-800 mb-2 text-center">{assignment.topic}</h1>
            <p className="text-slate-600 mb-8 text-center">{assignment.difficulty} Level</p>
            
            <div className="w-full max-w-lg">
                <QuizCard
                    key={currentQuestionIndex}
                    question={currentQuestion}
                    onAnswerSelected={handleAnswerSelected}
                    questionNumber={currentQuestionIndex + 1}
                    totalQuestions={questions.length}
                    isAnswered={isAnswered}
                    fontSize={fontSize}
                    onFontSizeChange={setFontSize}
                />
            </div>
        </div>
    );
};