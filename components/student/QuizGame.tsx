import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '../../types';
import { QuizCard } from './QuizCard';
import { HeartIcon } from '../icons';

type QuizGameProps = {
    questions: QuizQuestion[];
    onEnd: (score: number) => void;
    topic: string;
    level: number;
    onAddWeakSpot: (questionText: string) => void;
};

const MAX_LIVES = 3;

export const QuizGame = ({ questions, onEnd, topic, level, onAddWeakSpot }: QuizGameProps) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(MAX_LIVES);
    const [isAnswered, setIsAnswered] = useState(false);

    useEffect(() => {
        if (lives <= 0) {
            setTimeout(() => onEnd(score), 1000);
        }
    }, [lives, onEnd, score]);

    const handleAnswerSelected = (isCorrect: boolean) => {
        setIsAnswered(true);
        if (isCorrect) {
            setScore(prev => prev + 1);
        } else {
            setLives(prev => prev - 1);
            // Add the incorrect question to weak spots for later practice
            onAddWeakSpot(questions[currentQuestionIndex].question);
        }

        setTimeout(() => {
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(prev => prev + 1);
                setIsAnswered(false);
            } else {
                onEnd(score + (isCorrect ? 1 : 0));
            }
        }, 2000);
    };
    
    const progressPercentage = ((currentQuestionIndex + 1) / questions.length) * 100;
    
    if (!questions || questions.length === 0) {
        return <div>Loading questions...</div>;
    }

    return (
        <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
            {/* Header */}
            <div className="w-full mb-6">
                <div className="flex justify-between items-center mb-3">
                     <div className="text-left">
                        <p className="text-slate-500 text-sm">Topic: <span className="font-bold text-slate-700 capitalize">{topic}</span></p>
                        <h2 className="font-bold text-sky-600 text-2xl">Level {level}</h2>
                    </div>
                    <div className="flex items-center space-x-2">
                        {Array.from({ length: MAX_LIVES }).map((_, i) => (
                           <HeartIcon key={i} className={`w-8 h-8 transition-colors ${i < lives ? 'text-red-500 animate-heart-pulse' : 'text-slate-300'}`} />
                        ))}
                    </div>
                </div>
                {/* Progress Bar */}
                 <div className="w-full bg-slate-200 rounded-full h-4">
                    <div className="bg-green-500 h-4 rounded-full transition-all duration-500" style={{ width: `${progressPercentage}%` }}></div>
                </div>
            </div>

            {/* Quiz Card */}
            <QuizCard
                key={currentQuestionIndex}
                question={questions[currentQuestionIndex]}
                onAnswerSelected={handleAnswerSelected}
                questionNumber={currentQuestionIndex + 1}
                totalQuestions={questions.length}
                isAnswered={isAnswered}
            />
        </div>
    );
};