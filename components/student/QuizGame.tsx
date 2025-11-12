import React, { useState, useEffect } from 'react';
import { Assignment } from '../../types';
import { useUser } from '../../contexts/UserContext';
import { QuizCard } from './QuizCard';
import { QuizResults } from './QuizResults';

type QuizGameProps = {
    assignment: Assignment;
    onEnd: () => void;
};

export const QuizGame = ({ assignment, onEnd }: QuizGameProps) => {
    const { completeAssignment, getActiveStudent } = useUser();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [studentAnswers, setStudentAnswers] = useState<(string | null)[]>([]);
    const [isFinished, setIsFinished] = useState(false);
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(3);
    const [fontSize, setFontSize] = useState(100); // Percentage

    const activeStudent = getActiveStudent();

    useEffect(() => {
        // Pre-fill answers array with nulls and reset state on new assignment
        setStudentAnswers(Array(assignment.questions.length).fill(null));
        setCurrentQuestionIndex(0);
        setIsFinished(false);
        setScore(0);
        setLives(3);
        setFontSize(100);
    }, [assignment]);

    const handleAnswerSelected = (answer: string) => {
        const newAnswers = [...studentAnswers];
        newAnswers[currentQuestionIndex] = answer;
        setStudentAnswers(newAnswers);

        const isCorrect = questionIsCorrect(answer);
        if (!isCorrect) {
            if (lives - 1 <= 0) {
                setLives(0);
                finishQuiz(newAnswers, true);
                return;
            }
            setLives(lives - 1);
        }
    };

    const questionIsCorrect = (answer: string): boolean => {
        const currentQuestion = assignment.questions[currentQuestionIndex];
        // Case-insensitive and trims whitespace for text-based answers
        return currentQuestion.answer.trim().toLowerCase() === answer.trim().toLowerCase();
    };

    const advanceToNextQuestion = () => {
         if (currentQuestionIndex < assignment.questions.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
        } else {
            finishQuiz(studentAnswers, false);
        }
    };

    const finishQuiz = (finalAnswers: (string | null)[], ranOutOfLives: boolean) => {
        let correctAnswers = 0;
        assignment.questions.forEach((q, index) => {
            const studentAnswer = finalAnswers[index];
            if (studentAnswer && q.answer.trim().toLowerCase() === studentAnswer.trim().toLowerCase()) {
                correctAnswers++;
            }
        });
        setScore(correctAnswers);

        if (activeStudent && assignment.id.startsWith('as_')) { // Only save permanent assignments
             completeAssignment(activeStudent.id, assignment.id, correctAnswers, finalAnswers);
        }
        setIsFinished(true);
    };
    
    const handleRestart = () => {
        setCurrentQuestionIndex(0);
        setStudentAnswers(Array(assignment.questions.length).fill(null));
        setIsFinished(false);
        setScore(0);
        setLives(3);
    };

    const currentQuestion = assignment.questions[currentQuestionIndex];

    return (
        <div className="min-h-screen bg-gradient-to-br from-sky-100 to-purple-100 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl">
                {!isFinished ? (
                    currentQuestion && (
                        <QuizCard
                            key={currentQuestionIndex}
                            question={currentQuestion}
                            questionNumber={currentQuestionIndex + 1}
                            totalQuestions={assignment.questions.length}
                            onAnswerSelected={handleAnswerSelected}
                            onNextQuestion={advanceToNextQuestion}
                            lives={lives}
                            fontSize={fontSize}
                            onFontSizeChange={setFontSize}
                        />
                    )
                ) : (
                    <QuizResults
                        score={score}
                        totalQuestions={assignment.questions.length}
                        assignment={assignment}
                        studentAnswers={studentAnswers}
                        onRestart={handleRestart}
                        onEnd={onEnd}
                        ranOutOfLives={lives <= 0}
                    />
                )}
            </div>
        </div>
    );
};
