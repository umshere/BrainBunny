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

export const PaintBrushIcon = (): React.JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 3.84a1 1 0 0 1 1.73.93l-4.34 8.7a1 1 0 0 1-1.6-.2L9 8.2a1 1 0 0 1-.2-1.6l8.7-4.35a1 1 0 0 1 .93 1.73Z"/><path d="m14 10 3 3"/><path d="M5 12v2a7 7 0 0 0 7 7h2a5 5 0 0 0 5-5v-2a3 3 0 0 0-3-3h-1.5"/></svg>
);

export const DropletIcon = (): React.JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>
);

export const MinimalIcon = (): React.JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M7 8h10"/><path d="M7 12h10"/><path d="M7 16h10"/></svg>
);

export const DocumentIcon = (): React.JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><line x1="10" y1="9" x2="8" y2="9"/></svg>
);

export const DownloadIcon = (): React.JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
);

export const LibraryIcon = (): React.JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/><path d="M4 19.5A2.5 2.5 0 0 0 6.5 22H20v-2.5"/><path d="M4 14.5A2.5 2.5 0 0 1 6.5 12H20v2.5"/></svg>
);

export const TargetIcon = (): React.JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
);

export const SettingsIcon = (): React.JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 0 2l-.15.08a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.38a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1 0-2l.15-.08a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>
);

// Library Icons
export const PizzaIcon = (): React.JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 11h.01"/><path d="M11 15h.01"/><path d="M16 16h.01"/><path d="M21.43 12.63 12.63 3.83a2.43 2.43 0 0 0-3.43 0L3.83 9.2a2.43 2.43 0 0 0 0 3.43l8.8 8.8a2.43 2.43 0 0 0 3.43 0l5.37-5.37a2.43 2.43 0 0 0 0-3.43Z"/><path d="m3 21 8.8-8.8"/></svg>
);

export const DinosaurIcon = (): React.JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10.5 13.5 8 16"/><path d="m14.5 13.5-2 2.5"/><path d="M13 18c-2.3 0-6.5-2.2-6.5-5.5S9 7 12.5 7s6.5 2.2 6.5 5.5"/><path d="M18.5 12.5a2 2 0 0 1-2-2V9a1 1 0 0 0-1-1h-1a1 1 0 0 0-1 1v1.5a2 2 0 0 1-2 2"/><path d="M2 22h20"/><path d="M6 18c-1 .5-2 1-2 1.5 0 .7.7 1.2 1.5 1.5h1c.8 0 1.5-.7 1.5-1.5S7.8 19 7 19H6Z"/></svg>
);

export const PlanetIcon = (): React.JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="8"/><path d="M21.3 16.5A8 8 0 0 1 7.5 2.7"/><path d="M12 2a8 8 0 0 0 0 20Z"/></svg>
);

export const TrainIcon = (): React.JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="16" x="4" y="3" rx="2"/><path d="M4 11h16"/><path d="m8 3-1 10"/><path d="m16 3 1 10"/><path d="M12 3v16"/><path d="M8 19v3"/><path d="M16 19v3"/></svg>
);

export const DetectiveIcon = (): React.JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/><path d="M11 8a3 3 0 0 1 3 3"/><path d="M14 11a3 3 0 0 1-3 3"/></svg>
);

export const CastleIcon = (): React.JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 21H2v-2a4 4 0 0 1 4-4h12a4 4 0 0 1 4 4v2Z"/><path d="M6 17V9a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v8"/><path d="M9 9V5l3-3 3 3v4"/><path d="M15 17v-3a3 3 0 0 0-3-3H6v6h9Z"/><path d="M6 11h3"/></svg>
);

export const PlantIcon = (): React.JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22a7 7 0 0 0 7-7h-4a3 3 0 0 0-3 3v4Z"/><path d="M12 18a3 3 0 0 0-3-3H5a7 7 0 0 0 7 7v-4Z"/><path d="M7 15h4a3 3 0 0 0 3-3V5a7 7 0 0 0-7 7h4Z"/><path d="M17 12a3 3 0 0 0-3 3v-4a7 7 0 0 0-7-7h4a3 3 0 0 1 3 3Z"/></svg>
);

export const CompassIcon = (): React.JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>
);

// New icons for AI library
export const QuestionMarkIcon = (): React.JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
);
export const LightbulbIcon = (): React.JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>
);
export const HistoryIcon = (): React.JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="M3.5 12.5a9.5 9.5 0 0 1 15-4.23"/><path d="M20.5 16.5a9.5 9.5 0 0 1-15 4.23"/></svg>
);
export const ArtIcon = (): React.JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a7.5 7.5 0 0 1 0 15 7.5 7.5 0 0 0 0 15"/><path d="M22 12a7.5 7.5 0 0 1-15 0 7.5 7.5 0 0 0-15 0"/></svg>
);
export const BrainIcon = (): React.JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M12 5a3 3 0 0 1 0 6 3 3 0 0 1 0-6Z"/><path d="M12 11v7"/></svg>
);
export const FeedbackIcon = (): React.JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
);

// New icons for Student Mode
// Fix: Changed component to React.FC to allow for React-specific props like 'key' when used in lists.
export const HeartIcon: React.FC<{ className?: string, isFilled?: boolean }> = ({ className = "w-6 h-6", isFilled = true }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isFilled ? "currentColor" : "none"} className={className}>
        <path fillRule="evenodd" d="M6.32 2.577a4.926 4.926 0 0 1 7.36 0l.32.32.32-.32a4.926 4.926 0 0 1 7.36 0 4.926 4.926 0 0 1 0 7.36l-7.68 7.68a.75.75 0 0 1-1.06 0l-7.68-7.68a4.926 4.926 0 0 1 0-7.36Z" clipRule="evenodd" />
    </svg>
);

export const CheckCircleIcon = ({ className = "w-10 h-10" }: { className?: string }): React.JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

export const XCircleIcon = ({ className = "w-10 h-10" }: { className?: string }): React.JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
);

// Fix: Changed component to React.FC to allow for React-specific props like 'key' when used in lists.
export const StarIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
    </svg>
);

export const ArrowPathIcon = ({ className = "w-6 h-6" }: { className?: string }): React.JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 11.667 0l3.181-3.183m-3.181-4.991v4.99" />
    </svg>
);