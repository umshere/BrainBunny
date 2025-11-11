import React from 'react';

export const BrainyBunnyIcon = ({ className = "w-10 h-10" }: { className?: string }): React.JSX.Element => (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
        <path d="M15.5 11.5a.5.5 0 0 1-.5-.5V6.5a3.5 3.5 0 0 0-7 0v4.5a.5.5 0 0 1-1 0V6.5a4.5 4.5 0 1 1 9 0v4.5a.5.5 0 0 1-.5.5z" />
        <path d="M18.5 11.5c0 4.14-2.91 7.5-6.5 7.5s-6.5-3.36-6.5-7.5c0-4.14 2.91-7.5 6.5-7.5s6.5 3.36 6.5 7.5z" />
    </svg>
);

// Fix: Changed return type from JSX.Element to React.JSX.Element to resolve namespace error.
export const MagicWandIcon = (): React.JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L11.8 9.2a1.21 1.21 0 0 0 0 1.72l5.66 5.66a1.21 1.21 0 0 0 1.72 0l6.84-6.84a1.21 1.21 0 0 0 0-1.72Z" />
    <path d="m14 7 3 3" />
    <path d="M5 6v4" />
    <path d="M19 14v4" />
    <path d="M10 2v2" />
    <path d="M7 8H3" />
    <path d="M21 16h-4" />
    <path d="M11 3H9" />
  </svg>
);

// Fix: Changed return type from JSX.Element to React.JSX.Element to resolve namespace error.
export const PrintIcon = (): React.JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 6 2 18 2 18 9" />
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
    <rect x="6" y="14" width="12" height="8" />
  </svg>
);

// Fix: Changed return type from JSX.Element to React.JSX.Element to resolve namespace error.
export const LoaderIcon = (): React.JSX.Element => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="animate-spin"
  >
    <path d="M21 12a9 9 0 1 1-6.219-8.56" />
  </svg>
);

export const MicrophoneIcon = (): React.JSX.Element => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
);

export const UploadIcon = (): React.JSX.Element => (
    <svg 
        className="w-8 h-8 mb-4 text-slate-500" 
        aria-hidden="true" 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 20 16">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
    </svg>
);

export const XIcon = (): React.JSX.Element => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

export const CameraIcon = (): React.JSX.Element => (
    <svg
      className="w-5 h-5 text-slate-500"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
);

export const KeyIcon = (): React.JSX.Element => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="20" 
        height="20" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
    >
        <circle cx="7.5" cy="15.5" r="5.5" />
        <path d="m21 2-9.6 9.6" />
        <path d="m15.5 8.5 3 3L22 8l-3-3" />
    </svg>
);

export const SparklesIcon = ({ className = "w-6 h-6" }: { className?: string }): React.JSX.Element => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
    >
        <path fillRule="evenodd" d="M9.315 7.584C10.866 6.33 12.83 6 15 6c2.67 0 5 1.8 5 4.5 0 2.05-1.12 3.8-2.784 4.877l.012.012c.08.082.15.17.214.264.095.138.17.29.226.453.056.16.086.328.086.503 0 .71-.4 1.35-1.002 1.65a2.98 2.98 0 0 1-1.688.083 3.003 3.003 0 0 1-2.22 2.653c-.622.33-1.34.33-1.962 0a3.003 3.003 0 0 1-2.22-2.653 2.98 2.98 0 0 1-1.688-.083C5.4 18.35 5 17.71 5 17c0-.175.03-.343.086-.503.056-.163.13-.315.226-.453a4.723 4.723 0 0 1 .214-.264l.012-.012A5.513 5.513 0 0 1 3 10.5C3 8.3 4.8 6.5 7.185 6.084A3.003 3.003 0 0 1 9.315 7.584ZM15 7.5c-1.556 0-3.04.832-4.006 2.083a.75.75 0 0 0 1.212.898C12.91 9.59 13.88 9 15 9c1.657 0 3 1.119 3 2.5 0 1.258-1.02 2.304-2.42 2.473a.75.75 0 0 0-.58.727v.001c0 .414.336.75.75.75H15c2.485 0 4.5-1.79 4.5-4s-2.015-4-4.5-4Z" clipRule="evenodd" />
        <path d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v.375c0 1.036.84 1.875 1.875 1.875h.375c1.036 0 1.875-.84 1.875-1.875V3.375c0-1.036-.84-1.875-1.875-1.875h-.375Z" />
        <path d="M19.125 18c-1.036 0-1.875.84-1.875 1.875v.375c0 1.036.84 1.875 1.875 1.875h.375c1.036 0 1.875-.84 1.875-1.875v-.375c0-1.036-.84-1.875-1.875-1.875h-.375Z" />
    </svg>
);

export const UserIcon = (): React.JSX.Element => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="24" 
        height="24" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="text-slate-600"
    >
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
        <circle cx="12" cy="7" r="4"></circle>
    </svg>
);
