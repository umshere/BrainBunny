import React, { createContext, useContext, ReactNode } from 'react';
import { usePersistentState } from '../hooks/usePersistentState';
import { SessionData, StudentProfile, Assignment, User, WeakPoint, QuizQuestion } from '../types';

// --- Default Data for Guest Session ---
const GUEST_USER: User = { id: 'guest', name: 'Guest', avatar: '👤' };
const INITIAL_STUDENTS: StudentProfile[] = [];

const INITIAL_SESSION: SessionData = {
    isLoggedIn: false,
    user: null,
    students: INITIAL_STUDENTS,
    activeStudentId: null,
    credits: 20, // Starting credits for guests
};

// --- Context Definition ---
type UserContextType = {
    session: SessionData;
    loginAsGuest: () => void;
    logout: () => void;
    addStudent: (name: string, gradeLevel: string) => void;
    selectStudent: (studentId: string) => void;
    getActiveStudent: () => StudentProfile | null;
    completeAssignment: (studentId: string, assignmentId: string, score: number, studentAnswers: (string | null)[]) => void;
    addAssignment: (studentId: string, assignment: Assignment) => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

// --- Provider Component ---
export const UserProvider = ({ children }: { children: ReactNode }) => {
    const [session, setSession] = usePersistentState<SessionData>('brainy-bunny-session', INITIAL_SESSION);

    const loginAsGuest = () => {
        setSession({
            ...INITIAL_SESSION,
            isLoggedIn: true,
            user: GUEST_USER,
            students: [], // Reset students on new guest login
            activeStudentId: null,
        });
    };
    
    const logout = () => {
        setSession(INITIAL_SESSION);
    };

    const addStudent = (name: string, gradeLevel: string) => {
        const newStudent: StudentProfile = {
            id: `student_${Date.now()}`,
            name,
            gradeLevel,
            avatar: name.charAt(0).toUpperCase() || '?',
            assignments: [],
            weakPoints: [],
        };
        setSession(prev => {
            const newStudents = [...prev.students, newStudent];
            return {
                ...prev,
                students: newStudents,
                activeStudentId: prev.activeStudentId ?? newStudent.id,
            }
        });
    };

    const selectStudent = (studentId: string) => {
        if (session.students.find(s => s.id === studentId)) {
            setSession(prev => ({
                ...prev,
                activeStudentId: studentId,
            }));
        }
    };
    
    const getActiveStudent = (): StudentProfile | null => {
        if (!session.activeStudentId) return null;
        return session.students.find(s => s.id === session.activeStudentId) || null;
    };
    
    const completeAssignment = (studentId: string, assignmentId: string, score: number, studentAnswers: (string | null)[]) => {
        setSession(prev => {
            const studentToUpdate = prev.students.find(s => s.id === studentId);
            if (!studentToUpdate) return prev;

            const assignmentToUpdate = studentToUpdate.assignments.find(a => a.id === assignmentId);
            if (!assignmentToUpdate) return prev;
            
            // Identify new weak points from this assignment
            const newWeakPoints: WeakPoint[] = [];
            assignmentToUpdate.questions.forEach((q, index) => {
                const studentAnswer = studentAnswers[index];
                if (studentAnswer !== q.answer) {
                    newWeakPoints.push({ topic: assignmentToUpdate.topic, lastAttempted: new Date().toISOString() });
                }
            });

            const updatedStudent = {
                ...studentToUpdate,
                assignments: studentToUpdate.assignments.map(a => 
                    a.id === assignmentId
                        ? { ...a, status: 'completed' as const, score, studentAnswers, dateCompleted: new Date().toISOString() }
                        : a
                ),
                weakPoints: [...studentToUpdate.weakPoints, ...newWeakPoints],
            };

            return {
                ...prev,
                students: prev.students.map(s => s.id === studentId ? updatedStudent : s),
            };
        });
    };


    const addAssignment = (studentId: string, assignment: Assignment) => {
        setSession(prev => ({
            ...prev,
            students: prev.students.map(student =>
                student.id === studentId
                    ? { ...student, assignments: [assignment, ...student.assignments] }
                    : student
            ),
             // Deduct credit for new assignment
            credits: Math.max(0, prev.credits - 1),
        }));
    };

    const value = {
        session,
        loginAsGuest,
        logout,
        addStudent,
        selectStudent,
        getActiveStudent,
        completeAssignment,
        addAssignment,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// --- Custom Hook ---
export const useUser = () => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
