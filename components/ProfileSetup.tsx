import React, { useState } from 'react';
import { useUser } from '../contexts/UserContext';
import { BrainyBunnyIcon } from './icons';

const GRADE_LEVELS = ["Kindergarten", "1st Grade", "2nd Grade", "3rd Grade", "4th Grade", "5th Grade", "6th Grade", "7th Grade", "8th Grade"];

export const ProfileSetup = () => {
    const { addStudent } = useUser();
    const [studentName, setStudentName] = useState('');
    const [gradeLevel, setGradeLevel] = useState(GRADE_LEVELS[3]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (studentName.trim()) {
            addStudent(studentName.trim(), gradeLevel);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-amber-50 to-sky-50">
            <div className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-lg border border-slate-200">
                 <BrainyBunnyIcon className="w-16 h-16 text-amber-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-slate-800 text-center mb-2">Let's Get Started!</h2>
                <p className="text-slate-500 text-center mb-6">Create a profile for your first student.</p>
                <form onSubmit={handleSubmit} className="space-y-4">
                     <div>
                        <label htmlFor="studentName" className="block text-sm font-medium text-slate-700 mb-1">Student's Name</label>
                        <input
                            type="text"
                            id="studentName"
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                            placeholder="e.g., Alex"
                            className="w-full p-3 border border-slate-300 rounded-lg"
                            required
                        />
                    </div>
                     <div>
                        <label htmlFor="gradeLevel" className="block text-sm font-medium text-slate-700 mb-1">Grade Level</label>
                        <select
                            id="gradeLevel"
                            value={gradeLevel}
                            onChange={e => setGradeLevel(e.target.value)}
                            className="w-full p-3 border border-slate-300 rounded-lg"
                        >
                            {GRADE_LEVELS.map(level => <option key={level} value={level}>{level}</option>)}
                        </select>
                    </div>
                    <button
                        type="submit"
                        className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-lg transition"
                    >
                        Create Profile
                    </button>
                </form>
            </div>
        </div>
    );
};
