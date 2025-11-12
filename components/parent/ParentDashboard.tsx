import React from 'react';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { MainApp } from '../MainApp';
import { ReferralCard } from './ReferralCard';
import { PurchaseCreditsModal } from './PurchaseCreditsModal';
import { useUser } from '../../contexts/UserContext';
import { StudentProfile } from '../../types';
import { AppView } from '../../types';

export const ParentDashboard = () => {
    const { session, getActiveStudent } = useUser();
    // FIX: Use getActiveStudent() from context to get the active student.
    const activeStudent = getActiveStudent();
    const students = activeStudent ? [activeStudent] : [];
    const [isPurchaseModalOpen, setIsPurchaseModalOpen] = React.useState(false);

    // This component is part of an older structure. The main logic is now in MainDashboard.
    // We'll manage a local view state to make it functional.
    const [currentView, setCurrentView] = React.useState<AppView>('parent');

    // FIX: Add handlers for props required by MainApp.
    const handlePrintRequest = (content: string) => {
        console.warn("Print request from deprecated ParentDashboard view. Content:", content);
        // In a full implementation, this would open a print modal.
    };

    const handleStartOver = () => {
        console.warn("Start over request from deprecated ParentDashboard view.");
        // In a full implementation, this would reset MainApp's state.
    };
    
    // FIX: Check for activeStudent existence.
    if (!activeStudent) {
        return <div>Setting up student profile...</div>;
    }

    return (
        <div className="flex flex-col min-h-screen">
            {/* FIX: Corrected Header component props to match its definition. */}
            <Header 
              user={session.user}
              activeStudent={activeStudent}
              // FIX: Ensure the view passed to the Header is either 'parent' or 'student'.
              currentView={currentView === 'student' ? 'student' : 'parent'} 
              onSwitchToParent={() => setCurrentView('parent')}
              onSwitchToStudent={() => setCurrentView('student')}
              onSwitchProfile={() => setCurrentView('profiles')}
            />
            <div className="flex-grow">
                {/* FIX: Pass the required 'student', 'onPrintRequest', and 'onStartOver' props to MainApp. */}
                <MainApp student={activeStudent} onPrintRequest={handlePrintRequest} onStartOver={handleStartOver} />
                 <div className="max-w-4xl mx-auto p-4 md:p-6 space-y-6">
                    {students.length > 0 && <StudentProgressSummary students={students} />}
                    <ReferralCard />
                </div>
            </div>
            <Footer />
            <PurchaseCreditsModal isOpen={isPurchaseModalOpen} onClose={() => setIsPurchaseModalOpen(false)} />
        </div>
    );
};


const StudentProgressSummary = ({ students }: { students: StudentProfile[]}) => (
    <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 mb-4">Student Snapshot</h3>
        <div className="space-y-4">
            {students.map(student => (
                <div key={student.id} className="flex items-center p-3 bg-slate-50 rounded-lg">
                    <span className="text-3xl mr-3">{student.avatar}</span>
                    <div>
                        <p className="font-bold text-slate-800">{student.name}</p>
                        {student.weakPoints.length > 0 ? (
                             <p className="text-sm text-slate-500">
                                Practice areas: {student.weakPoints.map(wp => wp.topic).slice(0,2).join(', ')}
                             </p>
                        ) : (
                             <p className="text-sm text-green-600">No weak spots detected. Great job!</p>
                        )}
                    </div>
                </div>
            ))}
        </div>
    </div>
);