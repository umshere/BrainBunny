import React from 'react';
import { BrainyBunnyIcon, UserIcon, AcademicCapIcon, ArrowRightOnRectangleIcon, ChatBubbleLeftRightIcon } from './icons';
import { StudentProfile, User } from '../types';
import { useUser } from '../contexts/UserContext';

type HeaderProps = {
    user: User | null;
    activeStudent: StudentProfile | null;
    onSwitchToParent: () => void;
    onSwitchToStudent: () => void;
    onSwitchProfile: () => void;
    currentView: 'parent' | 'student';
};

export const Header = ({ user, activeStudent, onSwitchToParent, onSwitchToStudent, onSwitchProfile, currentView }: HeaderProps) => {
    const { logout, session } = useUser();

    return (
        <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-40 border-b border-slate-200 no-print">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <button onClick={onSwitchProfile} className="flex-shrink-0 flex items-center">
                        <BrainyBunnyIcon className="w-8 h-8 text-amber-500" />
                        <span className="text-xl font-bold text-slate-800 ml-2">BrainyBunny</span>
                    </button>
                    <div className="flex items-center space-x-2 sm:space-x-4">
                        <div className="flex rounded-lg p-1 bg-slate-100 border border-slate-200">
                             <button
                                onClick={onSwitchToParent}
                                className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors flex items-center ${currentView === 'parent' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-600'}`}
                            >
                                <UserIcon className="w-4 h-4 mr-1.5" /> Parent
                            </button>
                            <button
                                onClick={onSwitchToStudent}
                                className={`px-3 py-1 text-sm font-semibold rounded-md transition-colors flex items-center ${currentView === 'student' ? 'bg-sky-500 text-white shadow-sm' : 'text-slate-600'}`}
                            >
                                <AcademicCapIcon className="w-4 h-4 mr-1.5" /> {activeStudent?.name || 'Student'}
                            </button>
                        </div>

                        {session.students.length > 1 && (
                            <button onClick={onSwitchProfile} className="p-1.5 text-slate-500 hover:text-slate-800 hidden sm:flex items-center" title="Switch Profile">
                               <ChatBubbleLeftRightIcon className="w-5 h-5" />
                               <span className="text-sm font-semibold ml-1">Switch</span>
                           </button>
                        )}
                        
                        <div className="flex items-center space-x-2 pl-2 border-l border-slate-200">
                            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-lg font-bold text-slate-600">
                                {user?.avatar}
                            </div>
                            <span className="hidden sm:inline text-sm font-semibold text-slate-700">{user?.name}</span>
                             <button onClick={logout} className="p-1.5 text-slate-500 hover:text-slate-800" title="Logout">
                                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};
