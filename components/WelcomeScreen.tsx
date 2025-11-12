import React from 'react';
import { ProfileSelector } from './ProfileSelector';
import { Footer } from './Footer';

/**
 * @deprecated This component is no longer in use and will be removed.
 * The new entry point for logged-out users is LandingScreen.tsx.
 */
export const WelcomeScreen = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-amber-50 to-sky-50">
           <main className="flex-grow flex items-center justify-center w-full">
                <ProfileSelector onProfileSelected={() => {}} />
           </main>
           <Footer isLoginScreen={true} />
        </div>
    );
};
