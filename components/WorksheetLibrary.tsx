import React, { useState, useCallback } from 'react';
import { Topic } from '../types';
import { 
    AcademicCapIcon, BeakerIcon, BuildingLibraryIcon, CalculatorIcon, ChatBubbleLeftEllipsisIcon, PaintBrushIcon, 
    PuzzlePieceIcon, QuestionMarkCircleIcon, ArrowPathIcon 
} from './icons';
import { generateLibraryTopics } from '../services/geminiService';

const GRADE_LEVELS = ["Kindergarten", "1st Grade", "2nd Grade", "3rd Grade", "4th Grade", "5th Grade", "6th Grade", "7th Grade", "8th Grade"];

const categoryIcons: { [key: string]: React.JSX.Element } = {
    'Math': <CalculatorIcon />,
    'Science': <BeakerIcon />,
    'History': <BuildingLibraryIcon />,
    'Language': <ChatBubbleLeftEllipsisIcon />,
    'Art': <PaintBrushIcon />,
    'Trivia': <QuestionMarkCircleIcon />,
    'Logic': <PuzzlePieceIcon />,
    'Default': <AcademicCapIcon />,
};

const getIconForCategory = (category: string) => {
    return categoryIcons[category] || categoryIcons['Default'];
};


type WorksheetLibraryProps = {
    onTopicSelect: (prompt: string, grade: string) => void;
}

export const WorksheetLibrary = ({ onTopicSelect }: WorksheetLibraryProps) => {
    const [openGrade, setOpenGrade] = useState<string | null>(null);
    const [generatedTopics, setGeneratedTopics] = useState<{ [key: string]: Topic[] }>({});
    const [isLoading, setIsLoading] = useState<{ [key: string]: boolean }>({});
    const [error, setError] = useState<string | null>(null);

    const fetchTopics = useCallback(async (grade: string) => {
        setIsLoading(prev => ({ ...prev, [grade]: true }));
        setError(null);
        try {
            const topics = await generateLibraryTopics(grade);
            const topicsWithIcons = topics.map((topic: any) => ({
                ...topic,
                icon: getIconForCategory(topic.category)
            }));
            setGeneratedTopics(prev => ({ ...prev, [grade]: topicsWithIcons }));
        } catch (e) {
            setError(`Could not fetch ideas for ${grade}. Please try again.`);
            console.error(e);
        } finally {
            setIsLoading(prev => ({ ...prev, [grade]: false }));
        }
    }, []);

    const handleGradeToggle = (grade: string) => {
        const newOpenGrade = openGrade === grade ? null : grade;
        setOpenGrade(newOpenGrade);
        if (newOpenGrade && !generatedTopics[newOpenGrade]) {
            fetchTopics(newOpenGrade);
        }
    };

    return (
        <div className="pt-2 pb-6">
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <div className="space-y-2 max-w-2xl mx-auto">
                {GRADE_LEVELS.map(grade => (
                    <div key={grade}>
                        <button
                            onClick={() => handleGradeToggle(grade)}
                            className="w-full flex justify-between items-center p-4 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-lg text-left font-semibold text-slate-700 transition"
                        >
                            <span>{grade}</span>
                            <svg className={`w-5 h-5 transition-transform ${openGrade === grade ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                        {openGrade === grade && (
                            <div className="p-4 bg-slate-50/50 rounded-b-lg border border-t-0 border-slate-200">
                                {isLoading[grade] && (
                                    <div className="flex items-center justify-center p-8">
                                        <ArrowPathIcon className="w-6 h-6 animate-spin" />
                                        <span className="ml-2 text-slate-500">Generating fresh ideas...</span>
                                    </div>
                                )}
                                {!isLoading[grade] && generatedTopics[grade] && (
                                    <>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                            {generatedTopics[grade].map((topic) => (
                                                <button
                                                    key={topic.title}
                                                    onClick={() => onTopicSelect(topic.prompt, grade)}
                                                    className="flex items-center p-3 bg-white border-2 border-slate-200 rounded-lg hover:border-amber-500 hover:bg-amber-50 transition-all duration-200 text-left h-full"
                                                >
                                                    <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center text-amber-600 mr-3">
                                                        {topic.icon}
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-slate-800 text-sm leading-tight">{topic.title}</p>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                        <div className="text-center mt-4">
                                            <button 
                                                onClick={() => fetchTopics(grade)}
                                                className="text-sm font-semibold text-amber-600 hover:text-amber-800 transition-colors"
                                            >
                                                Refresh Ideas
                                            </button>
                                        </div>
                                    </>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};