import React, { useState, useEffect } from 'react';
import { generateLibraryTopics } from '../services/geminiService';
import { Topic } from '../types';
import { useUser } from '../contexts/UserContext';
import {
    CalculatorIcon, BeakerIcon, BuildingLibraryIcon, Bars3BottomLeftIcon,
    PaintBrushIcon, PuzzlePieceIcon, QuestionMarkCircleIcon, LightBulbIcon
} from './icons';

type WorksheetLibraryProps = {
    onTopicSelected: (prompt: string, grade: string) => void;
};

const categoryIcons: { [key: string]: React.JSX.Element } = {
    Math: <CalculatorIcon />,
    Science: <BeakerIcon />,
    History: <BuildingLibraryIcon />,
    Language: <Bars3BottomLeftIcon />,
    Art: <PaintBrushIcon />,
    Logic: <PuzzlePieceIcon />,
    Trivia: <QuestionMarkCircleIcon />,
};

const getIcon = (category: string) => {
    return categoryIcons[category] || <LightBulbIcon />;
};

export const WorksheetLibrary = ({ onTopicSelected }: WorksheetLibraryProps) => {
    const { getActiveStudent } = useUser();
    const [topics, setTopics] = useState<Topic[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const activeStudent = getActiveStudent();
    const gradeLevel = activeStudent?.gradeLevel || '3rd Grade';

    useEffect(() => {
        const fetchTopics = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const fetchedTopics = await generateLibraryTopics(gradeLevel);
                setTopics(fetchedTopics);
            } catch (err: any) {
                setError(err.message || 'Could not load ideas.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchTopics();
    }, [gradeLevel]);

    const handleSelect = (topic: Topic) => {
        onTopicSelected(topic.prompt, gradeLevel);
    };

    const renderSkeleton = () => (
        Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="bg-slate-100 p-4 rounded-lg animate-pulse">
                <div className="h-6 w-6 bg-slate-200 rounded-full mb-2"></div>
                <div className="h-4 bg-slate-200 rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-slate-200 rounded w-full"></div>
                <div className="h-3 bg-slate-200 rounded w-1/2 mt-1"></div>
            </div>
        ))
    );
    
    return (
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-200">
            <h3 className="text-xl font-bold text-slate-800 text-center mb-1">Stuck for Ideas?</h3>
            <p className="text-center text-slate-500 mb-6 max-w-2xl mx-auto">
                Try one of these pre-made worksheet ideas for a <span className="font-semibold">{gradeLevel}</span> student.
            </p>
            {error && <p className="text-center text-red-500 bg-red-50 p-3 rounded-lg">{error}</p>}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {isLoading ? renderSkeleton() : topics.map((topic, index) => (
                    <button
                        key={index}
                        onClick={() => handleSelect(topic)}
                        className="bg-slate-50 hover:bg-amber-50 text-left p-4 rounded-lg border-2 border-slate-200 hover:border-amber-400 transition-all duration-200 transform hover:scale-105"
                    >
                        <div className="w-7 h-7 mb-2 text-slate-500">{getIcon(topic.category)}</div>
                        <h4 className="font-semibold text-slate-700">{topic.title}</h4>
                        <p className="text-xs text-slate-500 mt-1">{topic.category}</p>
                    </button>
                ))}
            </div>
        </div>
    );
};
