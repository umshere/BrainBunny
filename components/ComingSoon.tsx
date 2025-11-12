import React from 'react';
import { DownloadIcon, SparklesIcon, KeyIcon } from './icons';

export const ComingSoon = () => (
    <div className="mt-8 bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-200">
      <h3 className="text-xl font-bold text-slate-800 text-center mb-4">What's Next for BrainyBunny?</h3>
      <p className="text-center text-slate-500 mb-6 max-w-2xl mx-auto">
          We're always working on new features based on your feedback. Here's a sneak peek at what's on the roadmap:
      </p>
      <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <li className="bg-sky-50/50 p-4 rounded-lg border border-sky-100">
              <div className="flex justify-center items-center mb-2 text-sky-500">
                  <DownloadIcon />
              </div>
              <h4 className="font-semibold text-slate-700">DOCX & Image Export</h4>
              <p className="text-sm text-slate-500">Download as an editable document or shareable image.</p>
          </li>
          <li className="bg-emerald-50/50 p-4 rounded-lg border border-emerald-100">
              <div className="flex justify-center items-center mb-2 text-emerald-500">
                  <SparklesIcon className="w-6 h-6" />
              </div>
              <h4 className="font-semibold text-slate-700">Smart Error Analysis</h4>
              <p className="text-sm text-slate-500">Get parent coaching tips based on your child's mistakes.</p>
          </li>
           <li className="bg-amber-50/50 p-4 rounded-lg border border-amber-100">
              <div className="flex justify-center items-center mb-2 text-amber-500">
                 <KeyIcon />
              </div>
              <h4 className="font-semibold text-slate-700">Parent Coaching Tips</h4>
              <p className="text-sm text-slate-500">Actionable advice to help your child learn concepts.</p>
          </li>
      </ul>
    </div>
)
