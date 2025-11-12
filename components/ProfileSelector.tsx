import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { BrainyBunnyIcon, UserIcon } from './icons';

const GRADE_LEVELS = ["Kindergarten", "1st Grade", "2nd Grade", "3rd Grade", "4th Grade", "5th Grade", "6th Grade", "7th Grade", "8th Grade"];

type ProfileSelectorProps = {
    onProfileSelected: (studentId: string) => void;
}

export const ProfileSelector = ({ onProfileSelected }: ProfileSelectorProps) => {
    const { session, selectStudent, addStudent } = useUser();
    const [isAdding, setIsAdding] = useState(false);
    const [newName, setNewName] = useState('');
    const [newGrade, setNewGrade] = useState(GRADE_LEVELS[3]);

    const handleSelectProfile = (studentId: string) => {
        selectStudent(studentId);
        onProfileSelected(studentId);
    };

    const handleAddStudent = (e: React.FormEvent) => {
        e.preventDefault();
        if (newName.trim()) {
            addStudent(newName.trim(), newGrade);
            setNewName('');
            setNewGrade(GRADE_LEVELS[3]);
            setIsAdding(false);
        }
    }

    return (
        <div className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-200 text-center">
            <BrainyBunnyIcon className="w-16 h-16 text-amber-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-slate-800">Who's Learning Today?</h1>
            <p className="text-slate-500 mt-2 mb-6">Select a profile or add a new student.</p>
            <div className="space-y-3">
                {session.students.map(student => (
                     <button
                        key={student.id}
                        onClick={() => handleSelectProfile(student.id)}
                        className="w-full flex items-center p-4 bg-slate-50 hover:bg-amber-50 border-2 border-slate-200 hover:border-amber-400 rounded-lg transition-all"
                    >
                        <span className="text-4xl mr-4">{student.avatar}</span>
                        <div className="text-left">
                            <p className="font-bold text-slate-800 text-lg">{student.name}</p>
                            <p className="text-sm text-slate-500">{student.gradeLevel}</p>
                        </div>
                    </button>
                ))}
            </div>
            
            {isAdding ? (
                <form onSubmit={handleAddStudent} className="mt-6 p-4 bg-slate-50 rounded-lg border border-slate-200 text-left space-y-3">
                    <h3 className="font-semibold text-slate-700 text-center">Add New Student</h3>
                    <div>
                        <label htmlFor="new-name" className="text-sm font-medium text-slate-600">Name</label>
                        <input id="new-name" type="text" value={newName} onChange={e => setNewName(e.target.value)} placeholder="Student's Name" className="w-full mt-1 p-2 border border-slate-300 rounded-md" required />
                    </div>
                     <div>
                        <label htmlFor="new-grade" className="text-sm font-medium text-slate-600">Grade</label>
                        <select id="new-grade" value={newGrade} onChange={e => setNewGrade(e.target.value)} className="w-full mt-1 p-2 border border-slate-300 rounded-md">
                            {GRADE_LEVELS.map(g => <option key={g} value={g}>{g}</option>)}
                        </select>
                    </div>
                    <div className="flex gap-2">
                        <button type="button" onClick={() => setIsAdding(false)} className="w-full bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold py-2 rounded-md transition">Cancel</button>
                        <button type="submit" className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 rounded-md transition">Add</button>
                    </div>
                </form>
            ) : (
                 <div className="mt-6">
                    <button onClick={() => setIsAdding(true)} className="text-sm font-semibold text-amber-600 hover:text-amber-800 transition">
                        + Add a New Student
                    </button>
                </div>
            )}

        </div>
    );
};
