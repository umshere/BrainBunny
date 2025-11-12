import React, { useState, useRef } from 'react';
import { StudentProfile, QuizQuestion, GenerationDetails, AppStatus, Assignment } from '../types';
import { GeneratorForm, GeneratorFormHandle } from './GeneratorForm';
import { QuestionReview } from './parent/QuestionReview';
import { HomeworkOutput } from './HomeworkOutput';
import { ComingSoon } from './ComingSoon';
import { WorksheetLibrary } from './WorksheetLibrary';
import { QuestionsLoader, FormattingLoader } from './loaders';
import { generateQuizQuestions, formatWorksheetFromQuestions } from '../services/geminiService';
import { useUser } from '../contexts/UserContext';

type MainAppProps = {
    student: StudentProfile;
    onPrintRequest: (content: string) => void;
    onStartOver: () => void;
};

export const MainApp = ({ student, onPrintRequest, onStartOver }: MainAppProps) => {
    const { addAssignment } = useUser();
    const [status, setStatus] = useState<AppStatus>('idle');
    const [error, setError] = useState<string | null>(null);
    const [generatedQuestions, setGeneratedQuestions] = useState<QuizQuestion[]>([]);
    const [worksheetContent, setWorksheetContent] = useState({ worksheet: '', answerKey: '' });
    const [generationDetails, setGenerationDetails] = useState<GenerationDetails | null>(null);
    const formRef = useRef<GeneratorFormHandle>(null);

    const handleGenerateQuestions = async (details: GenerationDetails) => {
        setStatus('generating_questions');
        setError(null);
        setGenerationDetails(details);
        try {
            const questions = await generateQuizQuestions(details);
            setGeneratedQuestions(questions);
            setStatus('reviewing');
        } catch (err: any) {
            setError(err.message || "An unknown error occurred.");
            setStatus('idle');
        }
    };

    const handleRegenerateQuestions = () => {
        if (generationDetails) {
            handleGenerateQuestions(generationDetails);
        }
    };

    const handleFormatWorksheet = async () => {
        if (!generationDetails || generatedQuestions.length === 0) return;
        setStatus('formatting');
        setError(null);
        try {
            const result = await formatWorksheetFromQuestions(generatedQuestions, generationDetails);
            setWorksheetContent(result);
            setStatus('complete');
        } catch (err: any) {
            setError(err.message || "An unknown error occurred while formatting.");
            setStatus('reviewing'); // Go back to review screen on error
        }
    };

    const handleAssignToStudent = () => {
        if (!generationDetails) return;
        const newAssignment: Assignment = {
            id: `as_${Date.now()}`,
            topic: generationDetails.topic,
            gradeLevel: generationDetails.gradeLevel,
            difficulty: 'Medium', // Default difficulty for now
            questions: generatedQuestions,
            status: 'pending',
            dateAssigned: new Date().toISOString(),
        };
        addAssignment(student.id, newAssignment);
        alert(`${generationDetails.topic} worksheet assigned to ${student.name}!`);
        onStartOver(); // Reset the view after assigning
    };

    const handleTopicSelected = (prompt: string, grade: string) => {
        if (formRef.current) {
            formRef.current.setFormData(prompt, grade);
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    };

    const renderContent = () => {
        switch (status) {
            case 'generating_questions':
                return <QuestionsLoader topic={generationDetails?.topic || 'a new worksheet'} />;
            case 'reviewing':
                return (
                    <QuestionReview
                        questions={generatedQuestions}
                        onRegenerate={handleRegenerateQuestions}
                        onAssign={handleAssignToStudent}
                        onFormat={handleFormatWorksheet}
                        onStartOver={() => setStatus('idle')}
                    />
                );
            case 'formatting':
                return <FormattingLoader />;
            case 'complete':
                return (
                    <HomeworkOutput
                        worksheet={worksheetContent.worksheet}
                        answerKey={worksheetContent.answerKey}
                        onPrint={onPrintRequest}
                        onAssign={handleAssignToStudent}
                        onStartOver={onStartOver}
                        canAssign={true}
                    />
                );
            case 'idle':
            default:
                return (
                    <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-200">
                        <h2 className="text-2xl font-bold text-slate-800 text-center mb-1">Create a New Worksheet</h2>
                        <p className="text-center text-slate-500 mb-6">Fill out the details below to generate a custom worksheet for {student.name}.</p>
                        <GeneratorForm ref={formRef} onGenerate={handleGenerateQuestions} error={error} />
                    </div>
                );
        }
    };

    return (
        <main className="flex-grow">
            <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-8">
                {renderContent()}
                {status === 'idle' && <WorksheetLibrary onTopicSelected={handleTopicSelected} />}
                {status === 'idle' && <ComingSoon />}
            </div>
        </main>
    );
};
