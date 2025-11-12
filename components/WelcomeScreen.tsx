import React from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { BrainyBunnyIcon, MagicWandIcon, TargetIcon, SettingsIcon, PrintIcon, SparklesIcon } from './icons';

const FeatureCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
        <div className="flex items-center justify-center w-12 h-12 bg-amber-100 text-amber-600 rounded-lg mb-4">
            {icon}
        </div>
        <h3 className="text-lg font-bold text-slate-800 mb-2">{title}</h3>
        <p className="text-slate-500 text-sm">{description}</p>
    </div>
);

export const WelcomeScreen = ({ onGoogleLoginClick, onGuestMode, onStudentMode }: { onGoogleLoginClick: () => void; onGuestMode: () => void; onStudentMode: () => void; }) => (
    <div className="flex flex-col min-h-screen">
        <Header isLoggedIn={false} onLogout={() => {}} />
        <main className="flex-1 container mx-auto px-4 py-8 md:py-16 text-center">
            <div className="max-w-3xl mx-auto">
                <BrainyBunnyIcon className="w-20 h-20 text-amber-500 mx-auto mb-4" />
                <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-4 leading-tight">
                    Create Perfect Homework in Seconds
                </h1>
                <p className="text-slate-500 mb-8 text-lg max-w-2xl mx-auto">
                    A tool for parents & teachers to generate customized, print-ready worksheets on any topic, or upload completed work to target a child's specific needs.
                </p>
                <div className="space-y-4 sm:space-y-0 sm:space-x-4 flex flex-col sm:flex-row items-center justify-center">
                    <button
                        onClick={onGoogleLoginClick}
                        className="w-full sm:w-auto inline-flex items-center justify-center bg-white border-2 border-slate-300 hover:border-slate-400 text-slate-700 font-semibold py-3 px-6 rounded-lg transition-all duration-200"
                    >
                        <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48" width="48px" height="48px"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.617-3.317-11.28-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C42.022,35.244,44,30.036,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>
                        Login with Google
                    </button>
                    <button
                        onClick={onGuestMode}
                        className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                    >
                        Continue as Parent/Teacher
                    </button>
                </div>
            </div>

            <div className="max-w-3xl mx-auto mt-12 p-6 bg-sky-50 rounded-2xl border-2 border-dashed border-sky-300">
                <div className="flex justify-center items-center mb-3">
                    <SparklesIcon className="w-8 h-8 text-sky-500" />
                </div>
                <h2 className="text-2xl font-bold text-sky-800">Are you a Student?</h2>
                <p className="text-sky-600 my-2">Jump into a fun quiz game and test your knowledge!</p>
                <button 
                    onClick={onStudentMode}
                    className="mt-2 bg-sky-500 hover:bg-sky-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                >
                    Enter Student Zone
                </button>
            </div>


            <div className="max-w-6xl mx-auto mt-16 md:mt-24">
                <h2 className="text-3xl font-bold text-slate-800 text-center mb-10">How BrainyBunny Helps You</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    <FeatureCard
                        icon={<MagicWandIcon />}
                        title="Instant Generation"
                        description="Create worksheets on any topic from math to science, perfectly tailored to your chosen grade level."
                    />
                    <FeatureCard
                        icon={<TargetIcon />}
                        title="Targeted Practice"
                        description="Upload a photo of completed homework to identify weak spots and generate practice questions."
                    />
                    <FeatureCard
                        icon={<SettingsIcon />}
                        title="Total Customization"
                        description="Choose question types, worksheet themes, and the exact number of problems you need."
                    />
                    <FeatureCard
                        icon={<PrintIcon />}
                        title="Perfectly Printable"
                        description="Fine-tune margins, font size, and spacing for a flawless printout on any device, every time."
                    />
                </div>
            </div>
        </main>
       <Footer isLoginScreen={true} />
    </div>
);