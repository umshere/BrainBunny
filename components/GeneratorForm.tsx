import React, { useState, useRef, useImperativeHandle, forwardRef } from 'react';
import {
    DocumentIcon, ClockIcon, ArrowUpTrayIcon, CameraIcon, XMarkIcon,
    ArrowPathIcon, AcademicCapIcon, Bars3BottomLeftIcon, MoleculeIcon,
    CalculatorIcon, BuildingLibraryIcon, SparklesIcon, PencilIcon,
    PaintBrushIcon, PuzzlePieceIcon, QuestionMarkCircleIcon, LightBulbIcon
} from './icons';
import { CameraModal } from './CameraModal';
import { GenerationDetails } from '../types';

type GeneratorFormProps = {
    onGenerate: (details: GenerationDetails) => void;
    error: string | null;
};

export type GeneratorFormHandle = {
    setFormData: (prompt: string, grade: string, category: string) => void;
};

const SUBJECTS = [
    { name: 'Math', icon: <CalculatorIcon /> },
    { name: 'Science', icon: <MoleculeIcon /> },
    { name: 'Language Arts', icon: <Bars3BottomLeftIcon /> },
    { name: 'History', icon: <BuildingLibraryIcon /> },
    { name: 'Art', icon: <PaintBrushIcon /> },
    { name: 'Logic', icon: <PuzzlePieceIcon /> },
    { name: 'Trivia', icon: <QuestionMarkCircleIcon /> },
    { name: 'Other', icon: <LightBulbIcon /> },
];

const WORKSHEET_TYPES = ['Multiple Choice', 'Fill-in-the-Blank', 'Short Answer', 'Matching', 'Problem Solving'];

export const GeneratorForm = forwardRef<GeneratorFormHandle, GeneratorFormProps>(({ onGenerate, error }, ref) => {
    const [gradeLevel, setGradeLevel] = useState("3rd Grade");
    const [subject, setSubject] = useState(SUBJECTS[0].name);
    const [topic, setTopic] = useState("");
    const [numQuestions, setNumQuestions] = useState(10);
    const [worksheetType, setWorksheetType] = useState(WORKSHEET_TYPES[0]);
    const [includeAnswerKey, setIncludeAnswerKey] = useState(true);
    const [customInstructions, setCustomInstructions] = useState("");
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [isCameraOpen, setIsCameraOpen] = useState(false);
    const [internalError, setInternalError] = useState<string | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files[0]) {
            setUploadedFile(event.target.files[0]);
        }
    };

    const handleUsePicture = (file: File) => {
        setUploadedFile(file);
        setIsCameraOpen(false);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setInternalError(null);
        if (!topic.trim()) {
            setInternalError("Please enter a topic for the worksheet.");
            return;
        }
        
        onGenerate({
            gradeLevel,
            subject,
            topic,
            numQuestions,
            worksheetType,
            includeAnswerKey,
            customInstructions
        });
    };
    
    useImperativeHandle(ref, () => ({
        setFormData: (prompt: string, grade: string, category: string) => {
            setTopic(prompt);
            setGradeLevel(grade);
            
            // Normalize "Language" to "Language Arts" for matching
            const normalizedCategory = category === 'Language' ? 'Language Arts' : category;
            
            const foundSubject = SUBJECTS.find(s => s.name.toLowerCase() === normalizedCategory.toLowerCase());
            
            if (foundSubject) {
                setSubject(foundSubject.name);
            } else {
                // Default to 'Other' if a category from the library isn't in the form's subject list
                setSubject('Other');
            }
        }
    }));

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Grade Level */}
                <div className="flex flex-col">
                    <label htmlFor="grade-level" className="mb-2 font-semibold text-slate-700 flex items-center"><AcademicCapIcon className="w-5 h-5 mr-2" />Grade Level</label>
                    <select id="grade-level" value={gradeLevel} onChange={e => setGradeLevel(e.target.value)} className="p-3 border border-slate-300 rounded-lg w-full focus:ring-2 focus:ring-amber-500">
                        {["Kindergarten", "1st Grade", "2nd Grade", "3rd Grade", "4th Grade", "5th Grade", "6th Grade", "7th Grade", "8th Grade"].map(grade => <option key={grade} value={grade}>{grade}</option>)}
                    </select>
                </div>
                {/* Number of Questions */}
                <div className="flex flex-col">
                    <label htmlFor="num-questions" className="mb-2 font-semibold text-slate-700 flex items-center"><ClockIcon className="w-5 h-5 mr-2" />Number of Questions</label>
                    <input type="number" id="num-questions" value={numQuestions} onChange={e => setNumQuestions(Number(e.target.value))} min="1" max="25" className="p-3 border border-slate-300 rounded-lg w-full focus:ring-2 focus:ring-amber-500" />
                </div>
            </div>

            {/* Subject */}
            <div>
                 <label className="mb-2 font-semibold text-slate-700 block">Subject</label>
                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                     {SUBJECTS.map(s => (
                         <button type="button" key={s.name} onClick={() => setSubject(s.name)} className={`flex flex-col items-center justify-center p-3 text-sm font-semibold rounded-lg border-2 transition-all ${subject === s.name ? 'bg-amber-100 border-amber-500 text-amber-800' : 'bg-white border-slate-200 text-slate-600 hover:border-amber-400'}`}>
                             <div className="w-6 h-6 mb-1">{s.icon}</div>
                             {s.name}
                         </button>
                     ))}
                 </div>
            </div>

            {/* Topic */}
            <div>
                <label htmlFor="topic" className="mb-2 font-semibold text-slate-700 flex items-center"><PencilIcon className="w-5 h-5 mr-2" />Topic or Learning Goal</label>
                <input id="topic" type="text" value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g., 'The life cycle of a butterfly'" className="p-3 border border-slate-300 rounded-lg w-full focus:ring-2 focus:ring-amber-500" required />
            </div>

            {/* Optional: Use a picture */}
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                <p className="font-semibold text-slate-700 mb-2">Optional: Use a picture</p>
                <p className="text-sm text-slate-500 mb-3">Upload a photo of existing homework or a drawing to inspire the worksheet.</p>
                <div className="flex flex-wrap gap-3">
                    <button type="button" onClick={() => fileInputRef.current?.click()} className="flex items-center bg-white border-2 border-slate-300 text-slate-700 font-semibold py-2 px-4 rounded-lg hover:border-amber-500 transition">
                        <ArrowUpTrayIcon className="w-5 h-5 mr-2" />Upload Image
                    </button>
                    <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
                    <button type="button" onClick={() => setIsCameraOpen(true)} className="flex items-center bg-white border-2 border-slate-300 text-slate-700 font-semibold py-2 px-4 rounded-lg hover:border-amber-500 transition">
                        <CameraIcon className="w-5 h-5 mr-2" />Use Camera
                    </button>
                </div>
                {uploadedFile && (
                    <div className="mt-3 flex items-center bg-amber-50 p-2 rounded-lg">
                        <DocumentIcon className="w-5 h-5 text-amber-600 mr-2 flex-shrink-0" />
                        <span className="text-sm text-slate-800 truncate">{uploadedFile.name}</span>
                        <button onClick={() => setUploadedFile(null)} className="ml-auto text-slate-500 hover:text-slate-800"><XMarkIcon className="w-4 h-4" /></button>
                    </div>
                )}
            </div>

            {/* Advanced Options */}
            <div>
                 <label className="mb-2 font-semibold text-slate-700 block">Worksheet Type</label>
                 <div className="flex flex-wrap gap-2">
                     {WORKSHEET_TYPES.map(type => (
                         <button type="button" key={type} onClick={() => setWorksheetType(type)} className={`px-3 py-1.5 text-sm font-semibold rounded-full border-2 transition-all ${worksheetType === type ? 'bg-amber-500 border-amber-500 text-white' : 'bg-white border-slate-200 text-slate-600 hover:border-amber-400'}`}>
                             {type}
                         </button>
                     ))}
                 </div>
            </div>
            
             <div>
                <label htmlFor="custom-instructions" className="mb-2 font-semibold text-slate-700 block">Custom Instructions</label>
                <textarea id="custom-instructions" value={customInstructions} onChange={e => setCustomInstructions(e.target.value)} rows={2} placeholder="e.g., 'Make the questions funny' or 'Focus on addition under 20'" className="p-3 border border-slate-300 rounded-lg w-full focus:ring-2 focus:ring-amber-500"></textarea>
            </div>
            
            <div className="flex items-center">
                <input type="checkbox" id="answer-key" checked={includeAnswerKey} onChange={e => setIncludeAnswerKey(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-amber-600 focus:ring-amber-500" />
                <label htmlFor="answer-key" className="ml-2 block text-sm text-slate-700">Include Answer Key</label>
            </div>
            
            {(error || internalError) && <p className="text-red-500 text-center bg-red-50 p-3 rounded-lg">{error || internalError}</p>}

            <button type="submit" className="w-full flex items-center justify-center bg-amber-500 hover:bg-amber-600 disabled:bg-slate-400 text-white font-bold py-4 px-8 rounded-lg transition text-lg shadow-lg hover:shadow-xl">
                <SparklesIcon className="w-6 h-6 mr-2" />
                Generate Questions
            </button>
             <CameraModal isOpen={isCameraOpen} onClose={() => setIsCameraOpen(false)} onUsePicture={handleUsePicture} />
        </form>
    );
});