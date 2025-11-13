import React, { useState, useEffect } from 'react';
import { useUser } from '../contexts/UserContext';
import { AppView } from '../types';
import { LandingScreen } from './LandingScreen';
import { ParentZone } from './parent/ParentZone';
import { StudentZone } from './student/StudentZone';
import { ProfileSetup } from './ProfileSetup';
import { ProfileSelector } from './ProfileSelector';

export const MainDashboard = () => {
    const { session, getActiveStudent, selectStudent, clearInitialView } = useUser();
    
    // Capture the initial intent from the session only on the first render.
    const [initialIntent] = useState(session.initialView);
    
    const [view, setView] = useState<AppView>(initialIntent || 'parent');
    
    // Effect to handle session setup and cleanup
    useEffect(() => {
        // Ensure an active student is selected if possible
        if (session.isLoggedIn && session.students.length > 0 && !session.activeStudentId) {
            selectStudent(session.students[0].id);
        }
        // Clean up the initialView flag from the session after it has been used for navigation.
        if (session.initialView) {
            clearInitialView();
        }
    }, [session.isLoggedIn, session.students, session.activeStudentId, selectStudent, session.initialView, clearInitialView]);

    if (!session.isLoggedIn) {
        return <LandingScreen />;
    }

    if (session.students.length === 0) {
        return <ProfileSetup />;
    }
    
    const activeStudent = getActiveStudent();

    if (view === 'profiles') {
        return <ProfileSelector onProfileSelected={() => setView('parent')} />;
    }
    
    if (!activeStudent) {
        // This can happen briefly while the active student is being set.
        // ProfileSelector is the best place to fix it.
        return <ProfileSelector onProfileSelected={() => setView('parent')} />;
    }
    
    if (view === 'parent') {
        return <ParentZone student={activeStudent} onSwitchToStudent={() => setView('student')} onSwitchProfile={() => setView('profiles')} />;
    }

    if (view === 'student') {
        return <StudentZone student={activeStudent} onSwitchToParent={() => setView('parent')} onSwitchProfile={() => setView('profiles')} startInSetupView={initialIntent === 'student'} />;
    }

    return null; // Should not be reached
};