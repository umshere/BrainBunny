import React from 'react';
import { useUser } from '../contexts/UserContext';
import { BrainyBunnyIcon, UserIcon } from './icons';
import { Footer } from './Footer';

export const LandingScreen = () => {
    const { loginAsGuest } = useUser();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-amber-50 to-sky-50">
           <main className="flex-grow flex items-center justify-center w-full">
                <div className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-200 text-center">
                    <BrainyBunnyIcon className="w-16 h-16 text-amber-500 mx-auto mb-4" />
                    <h1 className="text-3xl font-bold text-slate-800">Welcome to BrainyBunny!</h1>
                    <p className="text-slate-500 mt-2 mb-8">AI-powered homework, personalized for your child.</p>
                    <div className="space-y-4">
                        <button
                            onClick={() => alert("Google Sign-In coming soon!")}
                            className="w-full flex items-center justify-center p-3 bg-white border-2 border-slate-300 hover:border-amber-400 rounded-lg transition-all font-semibold text-slate-700"
                        >
                            <GoogleIcon />
                            Sign in with Google
                        </button>
                        <button
                            onClick={loginAsGuest}
                            className="w-full flex items-center justify-center p-3 bg-amber-500 hover:bg-amber-600 rounded-lg transition-all font-bold text-white shadow-md"
                        >
                            <UserIcon className="w-5 h-5 mr-2" />
                            Continue as Guest
                        </button>
                    </div>
                </div>
           </main>
           <Footer isLoginScreen={true} />
        </div>
    );
};

const GoogleIcon = () => (
    <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
        <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path>
        <path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
        <path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
        <path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C39.913,34.537,44,29.836,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
    </svg>
);
