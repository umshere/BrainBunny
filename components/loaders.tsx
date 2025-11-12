import React from 'react';
import { LightBulbIcon, PaintBrushIcon, CoffeeBrewerIcon } from './icons';

export const QuestionsLoader = ({ topic }: { topic: string }) => (
    <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-slate-200">
        <div className="relative inline-block">
            <LightBulbIcon className="w-16 h-16 text-amber-400 animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mt-4 animate-pulse">Generating Questions...</h2>
        <p className="text-slate-500 mt-2">Our AI is crafting some great questions about <span className="font-semibold">{topic}</span>. This shouldn't take long!</p>
    </div>
);

export const FormattingLoader = () => (
    <div className="text-center p-8 bg-white rounded-2xl shadow-lg border border-slate-200">
        <div className="relative inline-block">
            <PaintBrushIcon className="w-16 h-16 text-sky-500 animate-pulse" />
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mt-4 animate-pulse">Formatting Your Worksheet...</h2>
        <p className="text-slate-500 mt-2">Making it look just right for printing. Almost there!</p>
    </div>
);

// A more generic loader for other parts of the app if needed
export const GeneralLoader = ({ message = "Loading..." }: { message?: string }) => (
    <div className="flex flex-col items-center justify-center p-8">
        <CoffeeBrewerIcon className="w-24 h-24 text-slate-400" />
        <p className="text-slate-600 font-semibold mt-4 animate-pulse">{message}</p>
    </div>
);
