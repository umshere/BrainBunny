import React, { useState } from 'react';
import { OutputView } from '../types';
import { PrinterIcon, KeyIcon, AcademicCapIcon, ArrowPathIcon } from './icons';

type HomeworkOutputProps = {
    worksheet: string;
    answerKey: string;
    onPrint: (content: string) => void;
    onAssign: () => void;
    onStartOver: () => void;
    canAssign: boolean;
};

export const HomeworkOutput = ({ worksheet, answerKey, onPrint, onAssign, canAssign, onStartOver }: HomeworkOutputProps) => {
    const [outputView, setOutputView] = useState<OutputView>('worksheet');

    return (
        <div className="mt-8 bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg border border-slate-200">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 gap-4">
                <h3 className="text-2xl font-bold text-slate-800">Your Homework is Ready!</h3>
                <div className="flex rounded-lg p-1 bg-slate-100 border border-slate-200 self-start sm:self-center">
                    <button onClick={() => setOutputView('worksheet')} className={`px-4 py-1 text-sm font-semibold rounded-md transition-colors ${outputView === 'worksheet' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-600'}`}>Worksheet</button>
                    <button onClick={() => setOutputView('answer_key')} className={`px-4 py-1 text-sm font-semibold rounded-md transition-colors ${outputView === 'answer_key' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-600'}`}>Answer Key</button>
                </div>
            </div>

            <div id="printable-area-container">
                <div id="printable-area" className="max-w-none mx-auto" dangerouslySetInnerHTML={{ __html: outputView === 'worksheet' ? worksheet : answerKey }} />
            </div>
            
            <div className="mt-8 text-center no-print flex flex-col sm:flex-row justify-center items-center flex-wrap gap-3">
                <button onClick={onStartOver} className="inline-flex items-center bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold py-3 px-6 rounded-lg transition-colors">
                    <ArrowPathIcon className="w-5 h-5" />
                    <span className="ml-2">Start Over</span>
                </button>
                {canAssign && (
                     <button onClick={onAssign} className="inline-flex items-center bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg">
                        <AcademicCapIcon className="w-5 h-5" />
                        <span className="ml-2">Assign to Student</span>
                    </button>
                )}
                <button onClick={() => onPrint(worksheet)} className="inline-flex items-center bg-slate-700 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-lg transition-colors shadow-md hover:shadow-lg">
                    <PrinterIcon />
                    <span className="ml-2">Print Sheet</span>
                </button>
                {answerKey && outputView === 'answer_key' && (
                    <button onClick={() => onPrint(answerKey)} className="inline-flex items-center bg-slate-700 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                        <KeyIcon />
                        <span className="ml-2">Print Key</span>
                    </button>
                )}
            </div>
        </div>
    );
};
