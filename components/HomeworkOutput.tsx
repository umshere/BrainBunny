import React, { useState } from 'react';
import { OutputView } from '../types';
import { PrinterIcon, KeyIcon } from './icons';

type HomeworkOutputProps = {
    worksheet: string;
    answerKey: string;
    onPrint: (content: string) => void;
};

export const HomeworkOutput = ({ worksheet, answerKey, onPrint }: HomeworkOutputProps) => {
    const [outputView, setOutputView] = useState<OutputView>('worksheet');

    return (
        <div className="mt-8 bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg border border-slate-200">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold text-slate-800 text-center">Your Homework is Ready!</h3>
                <div className="flex rounded-lg p-1 bg-slate-100 border border-slate-200">
                    <button onClick={() => setOutputView('worksheet')} className={`px-4 py-1 text-sm font-semibold rounded-md transition-colors ${outputView === 'worksheet' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-600'}`}>Worksheet</button>
                    <button onClick={() => setOutputView('answer_key')} className={`px-4 py-1 text-sm font-semibold rounded-md transition-colors ${outputView === 'answer_key' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-600'}`}>Answer Key</button>
                </div>
            </div>

            <div id="printable-area-container">
                <div id="printable-area" className="max-w-none mx-auto" dangerouslySetInnerHTML={{ __html: outputView === 'worksheet' ? worksheet : answerKey }} />
            </div>
            
            <div className="mt-8 text-center no-print flex justify-center items-center space-x-4">
                <button onClick={() => onPrint(worksheet)} className="inline-flex items-center bg-slate-700 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                    <PrinterIcon />
                    <span className="ml-2">Print Sheet</span>
                </button>
                {answerKey && (
                    <button onClick={() => onPrint(answerKey)} className="inline-flex items-center bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                        <KeyIcon />
                        <span className="ml-2">Print Key</span>
                    </button>
                )}
            </div>
        </div>
    );
};