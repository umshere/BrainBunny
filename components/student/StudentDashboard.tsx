import React, { useState } from 'react';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { StudentZone } from './StudentZone';
import { BrainyBunnyIcon } from '../icons';
import { useUser } from '../../contexts/UserContext';
import { AppView } from '../../types';

export const StudentDashboard = () => {
    const { session, getActiveStudent } = useUser();
    
    // This component is part of an older structure. The main logic is now in MainDashboard.
    // However, to make it functional as a standalone, we'll manage a local view state.
    const [isInStudentZone, setIsInStudentZone] = useState(false);

    // FIX: Use getActiveStudent() to get the current student profile.
    const activeStudent = getActiveStudent();

    // FIX: Check for activeStudent instead of session.student.
    if (!activeStudent) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading student profile...</p>
            </div>
        );
    }
    
    if (isInStudentZone) {
        // FIX: Pass activeStudent and a dummy onSwitchProfile prop to satisfy StudentZoneProps.
        return <StudentZone student={activeStudent} onSwitchToParent={() => setIsInStudentZone(false)} onSwitchProfile={() => {}} />;
    }

    return (
        <div className="flex flex-col min-h-screen">
            {/* FIX: Corrected props for Header component. */}
            <Header 
              user={session.user}
              activeStudent={activeStudent} 
              currentView={'student'}
              onSwitchToParent={() => { /* No-op in this deprecated view */ }}
              onSwitchToStudent={() => { /* Already in student view */ }}
              onSwitchProfile={() => { /* No-op in this deprecated view */ }}
            />
            <main className="flex-grow flex items-center justify-center p-4">
                <div className="text-center">
                    <BrainyBunnyIcon className="w-24 h-24 mx-auto text-amber-500 mb-4" />
                    <h2 className="text-3xl font-bold text-slate-800">Ready to Practice?</h2>
                    <p className="text-slate-500 mt-2 mb-8">Let's solve some fun quizzes and become a superstar!</p>
                    <button 
                        onClick={() => setIsInStudentZone(true)}
                        className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-4 px-8 rounded-full text-xl transition-transform hover:scale-105 shadow-lg"
                    >
                        Go to Student Zone
                    </button>
                </div>
            </main>
            <Footer />
        </div>
    );
};
