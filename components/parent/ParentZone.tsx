import React, { useState } from 'react';
import { Header } from '../Header';
import { Footer } from '../Footer';
import { MainApp } from '../MainApp';
import { StudentProfile } from '../../types';
import { useUser } from '../../contexts/UserContext';
import { PrintPreviewModal } from '../PrintPreviewModal';
import { FeedbackModal } from '../FeedbackModal';

type ParentZoneProps = {
    student: StudentProfile;
    onSwitchToStudent: () => void;
    onSwitchProfile: () => void;
};

export const ParentZone = ({ student, onSwitchToStudent, onSwitchProfile }: ParentZoneProps) => {
    const { session } = useUser();
    const [isPrintPreviewOpen, setIsPrintPreviewOpen] = useState(false);
    const [printContent, setPrintContent] = useState('');
    const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState(false);
    const [startOverKey, setStartOverKey] = useState(Date.now());

    const handlePrintRequest = (content: string) => {
        setPrintContent(content);
        setIsPrintPreviewOpen(true);
    };

    const handleStartOver = () => {
        setStartOverKey(Date.now());
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-50">
            <Header
                user={session.user}
                activeStudent={student}
                currentView="parent"
                onSwitchToParent={() => {}}
                onSwitchToStudent={onSwitchToStudent}
                onSwitchProfile={onSwitchProfile}
            />
            <MainApp 
                key={startOverKey} 
                student={student} 
                onPrintRequest={handlePrintRequest} 
                onStartOver={handleStartOver}
            />
            <Footer />

            <PrintPreviewModal 
                isOpen={isPrintPreviewOpen} 
                onClose={() => setIsPrintPreviewOpen(false)} 
                content={printContent} 
            />
            <FeedbackModal 
                isOpen={isFeedbackModalOpen}
                onClose={() => setIsFeedbackModalOpen(false)}
            />
        </div>
    );
};
