import React, { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { MainApp } from './components/MainApp';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SparklesIcon } from './components/icons';
import { StudentZone } from './components/student/StudentZone';

const ComingSoonToast = () => (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-down">
      <p className="flex items-center">
        <SparklesIcon className="w-5 h-5 mr-2 text-amber-400" />
        <span>Google Login is a coming soon feature!</span>
      </p>
    </div>
);

export default function App(): React.JSX.Element {
  const [appMode, setAppMode] = useState<'welcome' | 'parent' | 'student'>('welcome');
  const [showLoginComingSoon, setShowLoginComingSoon] = useState(false);

  const handleGoogleLoginClick = () => {
    setShowLoginComingSoon(true);
    setTimeout(() => {
        setShowLoginComingSoon(false);
    }, 3000); // Hide after 3 seconds
  };

  const handleGuestMode = () => setAppMode('parent');
  const handleStudentMode = () => setAppMode('student');
  const handleExit = () => setAppMode('welcome');

  if (appMode === 'welcome') {
      return (
        <>
            <WelcomeScreen 
                onGoogleLoginClick={handleGoogleLoginClick} 
                onGuestMode={handleGuestMode}
                onStudentMode={handleStudentMode}
            />
            {showLoginComingSoon && <ComingSoonToast />}
        </>
      );
  }
  
  if (appMode === 'student') {
    return <StudentZone onExit={handleExit} />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header isLoggedIn={true} onLogout={handleExit} />
      <MainApp />
      <Footer />
    </div>
  );
}