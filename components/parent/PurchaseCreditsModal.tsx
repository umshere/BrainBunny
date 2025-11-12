import React from 'react';
import { XMarkIcon } from '../icons';

type PurchaseCreditsModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export const PurchaseCreditsModal = ({ isOpen, onClose }: PurchaseCreditsModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 no-print backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md flex flex-col relative">
                <div className="p-4 border-b flex justify-between items-center bg-slate-50 rounded-t-2xl">
                    <h3 className="text-lg font-bold text-slate-800">Get More Credits</h3>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-800"><XMarkIcon /></button>
                </div>
                <div className="p-6 text-center">
                    <p className="text-slate-600">Credit purchasing system is coming soon!</p>
                </div>
            </div>
        </div>
    );
};
