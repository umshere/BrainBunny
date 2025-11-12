import React from 'react';
import { XMarkIcon } from './icons';

type FeedbackModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export const FeedbackModal = ({ isOpen, onClose }: FeedbackModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 no-print backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md flex flex-col relative">
                <div className="p-4 border-b flex justify-between items-center bg-slate-50 rounded-t-2xl">
                    <h3 className="text-lg font-bold text-slate-800">Submit Feedback</h3>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-800"><XMarkIcon /></button>
                </div>
                <div className="p-6">
                    <p className="text-slate-600 mb-4">We'd love to hear your thoughts! This feature is coming soon.</p>
                     <button
                        onClick={onClose}
                        className="w-full bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};
