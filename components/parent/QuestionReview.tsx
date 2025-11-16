import React from 'react';
import { QuizQuestion } from '../../types';
import { ArrowPathIcon, ClipboardDocumentCheckIcon, PrinterIcon, ArrowUturnLeftIcon } from '../icons';

type QuestionReviewProps = {
    questions: QuizQuestion[];
    onRegenerate: () => void;
    onAssign: () => void;
    onFormat: () => void;
    onStartOver: () => void;
};

export const QuestionReview = ({ questions, onRegenerate, onAssign, onFormat, onStartOver }: QuestionReviewProps) => {
    return (
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-200">
            <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-slate-800">Review Questions</h2>
                <button onClick={onStartOver} className="text-sm font-semibold text-slate-500 hover:text-slate-800 flex items-center">
                    <ArrowUturnLeftIcon className="w-4 h-4 mr-1" />
                    Back to Form
                </button>
            </div>

            <div className="max-h-[40vh] overflow-y-auto space-y-4 p-4 bg-slate-50 rounded-lg border">
                {questions.map((q, index) => (
                    <div key={index} className="bg-white p-3 rounded-md shadow-sm">
                        <p className="font-semibold text-slate-700">{index + 1}. {q.question}</p>
                        
                        {q.type === 'Matching' && q.matchingPairs ? (
                            <div className="mt-2 text-sm text-slate-600 grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                                <div>
                                    <h4 className="font-semibold underline">Prompts</h4>
                                    <ul className="list-disc pl-5">
                                        {q.matchingPairs.prompts.map(p => <li key={p}>{p}</li>)}
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="font-semibold underline">Choices</h4>
                                    <ul className="list-disc pl-5">
                                        {q.matchingPairs.choices.map(c => <li key={c}>{c}</li>)}
                                    </ul>
                                </div>
                                <div className="col-span-full mt-2">
                                    <p className="text-green-600 font-semibold">
                                        Answer: {(() => {
                                            try {
                                                const answerMap = JSON.parse(q.answer as string);
                                                return Object.entries(answerMap).map(([key, val]) => `${key} → ${val}`).join(', ');
                                            } catch {
                                                return q.answer as string;
                                            }
                                        })()}
                                    </p>
                                </div>
                            </div>
                        ) : q.options && q.options.length > 0 ? (
                            <ul className="mt-2 text-sm text-slate-600 grid grid-cols-1 sm:grid-cols-2 gap-x-4">
                                {q.options.map(opt => (
                                    <li key={opt} className={`${opt === q.answer ? 'font-bold text-green-600' : ''}`}>
                                        {opt}{opt === q.answer ? ' ✓' : ''}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="mt-2 text-sm text-green-600 font-semibold">Answer: {q.answer as string}</p>
                        )}
                    </div>
                ))}
            </div>
            
            <div className="mt-6 flex flex-col sm:flex-row justify-center items-center flex-wrap gap-3">
                 <button onClick={onRegenerate} className="flex items-center justify-center px-5 py-3 border-2 border-slate-300 text-slate-700 font-bold rounded-lg hover:bg-slate-100 transition">
                    <ArrowPathIcon className="w-5 h-5 mr-2" />
                    Regenerate
                </button>
                 <button onClick={onAssign} className="flex items-center justify-center px-5 py-3 border-2 border-sky-500 bg-sky-500 text-white font-bold rounded-lg hover:bg-sky-600 transition shadow">
                    <ClipboardDocumentCheckIcon className="w-5 h-5 mr-2" />
                    Assign to Student
                </button>
                 <button onClick={onFormat} className="flex items-center justify-center px-5 py-3 border-2 border-amber-500 bg-amber-500 text-white font-bold rounded-lg hover:bg-amber-600 transition shadow-lg">
                    <PrinterIcon className="w-5 h-5 mr-2" />
                    Format for Printing
                </button>
            </div>
        </div>
    );
};