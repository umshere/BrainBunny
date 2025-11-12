import React, { useState } from 'react';
import { StudentProfile, QuizSettings, Assignment } from '../../types';
import { generateQuizQuestions } from '../../services/geminiService';
import { QuizSetup } from './QuizSetup';
import { VoiceQuizGame } from './VoiceQuizGame';
import { QuizGame } from './QuizGame';
import { ClockIcon, CheckCircleIcon, SparklesIcon } from '../icons';
import { Header } from '../Header';
import { useUser } from '../../contexts/UserContext';

type StudentZoneProps = {
    student: StudentProfile;
    onSwitchToParent: () => void;
    onSwitchProfile: () => void;
};

type View = 'dashboard' | 'setup' | 'quiz' | 'voice_quiz';

export const StudentZone = ({ student, onSwitchToParent, onSwitchProfile }: StudentZoneProps) => {
    const { session } = useUser();
    const [view, setView] = useState<View>('dashboard');
    const [error, setError] = useState<string | null>(null);
    const [activeAssignment, setActiveAssignment] = useState<Assignment | null>(null);
    const [quizSettings, setQuizSettings] = useState<QuizSettings | null>(null);

    const pendingAssignments = student.assignments.filter(a => a.status === 'pending');
    const completedAssignments = student.assignments.filter(a => a.status === 'completed');

    const handleStartQuiz = async (settings: QuizSettings) => {
        setError(null);
        if (settings.mode === 'voice') {
            setQuizSettings(settings);
            setView('voice_quiz');
            return;
        }

        try {
            // FIX: The generateQuizQuestions function expects a single GenerationDetails-like object.
            const questions = await generateQuizQuestions({
                gradeLevel: settings.gradeLevel,
                topic: settings.topic,
                numQuestions: 5, // A reasonable number for a practice quiz
                worksheetType: "Multiple Choice",
                subject: "Practice",
                includeAnswerKey: false,
                customInstructions: `The quiz difficulty should be ${settings.difficulty}.`
            });
            const tempAssignment: Assignment = { 
                ...settings, 
                questions, 
                id: `temp_${Date.now()}`, 
                status: 'pending', 
                dateAssigned: new Date().toISOString() 
            };
            setActiveAssignment(tempAssignment);
            setView('quiz');
        } catch (e: any) {
            setError(e.message || "Failed to create quiz.");
            setView('setup');
        }
    };
    
    const startAssignment = (assignment: Assignment) => {
        setActiveAssignment(assignment);
        setView('quiz');
    };

    const handleEndQuiz = () => {
        setView('dashboard');
        setActiveAssignment(null);
        setQuizSettings(null);
    };

    if (view === 'setup') {
        return (
            <div className="min-h-screen bg-gradient-to-br from-sky-100 to-purple-100 flex items-center justify-center p-4">
                <QuizSetup onStart={handleStartQuiz} error={error} onBack={() => setView('dashboard')} />
            </div>
        );
    }

    if (view === 'quiz' && activeAssignment) {
        return <QuizGame assignment={activeAssignment} onEnd={handleEndQuiz} />;
    }
    
    if (view === 'voice_quiz' && quizSettings) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-sky-100 to-purple-100 flex items-center justify-center p-4">
                <VoiceQuizGame settings={quizSettings} onEnd={handleEndQuiz} />
            </div>
        );
    }

    return (
        <div className="flex flex-col min-h-screen">
             <Header
                user={session.user}
                activeStudent={student}
                currentView="student"
                onSwitchToParent={onSwitchToParent}
                onSwitchToStudent={() => {}}
                onSwitchProfile={onSwitchProfile}
            />
            <main className="flex-grow bg-slate-50">
                <div className="max-w-4xl mx-auto p-4 md:p-6">
                    <h2 className="text-3xl font-bold text-slate-800 mb-2">Welcome back, {student.name}! {student.avatar}</h2>
                    <p className="text-slate-500 mb-8">Ready to learn something new today?</p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
                            <h3 className="text-xl font-bold text-slate-800 flex items-center mb-4"><ClockIcon className="w-6 h-6 mr-2 text-amber-500" /> Pending Assignments</h3>
                            {pendingAssignments.length > 0 ? (
                                <ul className="space-y-3">
                                    {pendingAssignments.map(a => (
                                        <li key={a.id} className="p-3 bg-amber-50 rounded-lg flex justify-between items-center">
                                            <div>
                                                <p className="font-semibold text-slate-800">{a.topic}</p>
                                                <p className="text-sm text-slate-500">{a.difficulty} &middot; {a.questions.length} questions</p>
                                            </div>
                                            <button onClick={() => startAssignment(a)} className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-lg transition">Start</button>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-slate-500 text-center py-4">All caught up! No pending assignments.</p>
                            )}
                            <button onClick={() => setView('setup')} className="mt-6 w-full flex items-center justify-center bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 rounded-lg transition shadow">
                                <SparklesIcon className="w-5 h-5 mr-2" /> Start a New Practice Quiz
                            </button>
                        </div>
                        
                        <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
                             <h3 className="text-xl font-bold text-slate-800 flex items-center mb-4"><CheckCircleIcon className="w-6 h-6 mr-2 text-green-500" /> Completed Work</h3>
                             {completedAssignments.length > 0 ? (
                                <ul className="space-y-3">
                                    {completedAssignments.map(a => (
                                        <li key={a.id} className="p-3 bg-green-50 rounded-lg flex justify-between items-center opacity-80">
                                            <div>
                                                <p className="font-semibold text-slate-700">{a.topic}</p>
                                                <p className="text-sm text-slate-500">{a.difficulty} &middot; {a.questions.length} questions</p>
                                            </div>
                                            <p className="font-bold text-green-700">Score: {a.score}/{a.questions.length}</p>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-slate-500 text-center py-4">No quizzes completed yet. Let's get started!</p>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};
