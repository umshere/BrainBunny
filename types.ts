import React from 'react';

// Fix: Provide full content for types.ts to resolve module errors.
export type User = {
    id: string;
    name: string;
    avatar: string; // Emoji or initial
};

export type WeakPoint = {
    topic: string;
    lastAttempted: string; // ISO date string
};

export type QuizQuestion = {
    question: string;
    options?: string[]; // Options are now optional
    answer: string;
    type: string; // Added to handle different question formats
    explanation?: string; // To show why the answer is correct
};

export type Assignment = {
    id: string;
    topic: string;
    gradeLevel: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    questions: QuizQuestion[];
    status: 'pending' | 'completed';
    score?: number;
    dateAssigned: string; // ISO date string
    dateCompleted?: string; // ISO date string
    studentAnswers?: (string | null)[];
};

export type StudentProfile = {
    id: string;
    name: string;
    avatar: string; // Emoji
    gradeLevel: string;
    assignments: Assignment[];
    weakPoints: WeakPoint[];
};

export type QuizSettings = {
    gradeLevel: string;
    topic: string;
    difficulty: 'Easy' | 'Medium' | 'Hard';
    mode: 'classic' | 'voice';
};

export type Topic = {
    title: string;
    prompt: string;
    category: string;
    icon?: React.JSX.Element;
};

export type OutputView = 'worksheet' | 'answer_key';

export type AppView = 'parent' | 'student' | 'profiles' | 'landing' | 'setup';

export type SessionData = {
    isLoggedIn: boolean;
    user: User | null;
    students: StudentProfile[];
    activeStudentId: string | null;
    credits: number;
};

// New types for the improved generator workflow
export type AppStatus = 'idle' | 'generating_questions' | 'reviewing' | 'formatting' | 'complete';

export type GenerationDetails = {
    gradeLevel: string;
    subject: string;
    topic: string;
    numQuestions: number;
    worksheetType: string;
    includeAnswerKey: boolean;
    customInstructions: string;
};