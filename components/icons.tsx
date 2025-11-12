import React from 'react';

// Main App Icon
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

// --- Generic Icons (Heroicons - Outline Style) ---

export const PrinterIcon = ({ className = "w-6 h-6" }: { className?: string }): React.JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.72 13.829c-.24.03-.48.062-.72.096m.72-.096a42.415 42.415 0 0 1 10.56 0m-10.56 0L6 18.25m0 0a2.25 2.25 0 0 0 2.25 2.25h8.25a2.25 2.25 0 0 0 2.25-2.25M18 18.25l.75.75m-9-3.75h9m-9 0a2.25 2.25 0 0 1 2.25-2.25h5.25a2.25 2.25 0 0 1 2.25 2.25m-9.75 0V9.75m0 0a2.25 2.25 0 0 1 2.25-2.25h5.25a2.25 2.25 0 0 1 2.25 2.25M12 15.75a.75.75 0 0 1 .75.75v.008a.75.75 0 0 1-1.5 0v-.008a.75.75 0 0 1 .75-.75Z" />
  </svg>
);

export const ArrowPathIcon = ({ className = "w-6 h-6" }: { className?: string }): React.JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 11.667 0l3.181-3.183m-3.181-4.991v4.99" />
  </svg>
);

export const MicrophoneIcon = ({ className = "w-6 h-6" }: { className?: string }): React.JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m12 7.5v-1.5a6 6 0 0 0-6-6v-1.5a6 6 0 0 0-6 6v1.5m6-7.5h.008v.008H12v-.008Z" />
  </svg>
);

export const ArrowUpTrayIcon = ({ className = "w-6 h-6" }: { className?: string }): React.JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5" />
  </svg>
);

export const XMarkIcon = ({ className = "w-6 h-6" }: { className?: string }): React.JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
);

export const CameraIcon = ({ className = "w-6 h-6" }: { className?: string }): React.JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 0 1 5.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 0 0-1.134-.175 2.31 2.31 0 0 1-1.64-1.055l-.822-1.316a2.192 2.192 0 0 0-1.736-1.039 48.776 48.776 0 0 0-5.232 0 2.192 2.192 0 0 0-1.736 1.039l-.821 1.316Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0ZM18.75 10.5h.008v.008h-.008V10.5Z" />
  </svg>
);

export const KeyIcon = ({ className = "w-6 h-6" }: { className?: string }): React.JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25a3 3 0 0 1 3 3m3 0a6 6 0 0 1-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1 1 21.75 8.25Z" />
  </svg>
);

export const UserIcon = ({ className = "w-6 h-6" }: { className?: string }): React.JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);

export const PaintBrushIcon = ({ className = "w-6 h-6" }: { className?: string }): React.JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.53 16.122a3 3 0 0 0-5.78 1.128 2.25 2.25 0 0 1-2.475 2.118A2.25 2.25 0 0 0 1 18.25v-5.757a2.25 2.25 0 0 0 1.5-2.119c.128-1.386.64-2.69 1.343-3.717a3 3 0 0 1 4.243-1.357 3 3 0 0 1 1.357 4.243c-.353.472-.693.974-1 1.498a3 3 0 0 0-1.498 1 .28.28 0 0 0-.05.289c.05.283.12.56.2.836.092.312.2.612.33.894a3 3 0 0 0 1.498 1.357 3 3 0 0 0 1.357-4.243c.472-.353.974-.693 1.498-1 1.027-.703 2.33-1.215 3.717-1.343a2.25 2.25 0 0 0 2.119-1.5 2.25 2.25 0 0 0-1.842-2.739M15.75 9-10.5-10.5" />
  </svg>
);

export const EyeDropperIcon = ({ className = "w-6 h-6" }: { className?: string }): React.JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m15.75 10.5-4.72-4.72a.75.75 0 0 0-1.06 0L8.25 7.5l-1.06-1.06a.75.75 0 0 0-1.06 0L3 9.75l1.06 1.06a.75.75 0 0 0 1.06 0l1.06-1.06 1.72 1.72a.75.75 0 0 0 1.06 0l4.72-4.72" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 6.75a3 3 0 0 1 0 4.24l-3.75 3.75a3 3 0 0 1-4.24 0L8.25 11.25a3 3 0 0 1 0-4.24l3.75-3.75a3 3 0 0 1 4.24 0Z" />
  </svg>
);

export const Bars3BottomLeftIcon = ({ className = "w-6 h-6" }: { className?: string }): React.JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
  </svg>
);

export const DocumentIcon = ({ className = "w-6 h-6" }: { className?: string }): React.JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
  </svg>
);

export const ArrowDownTrayIcon = ({ className = "w-6 h-6" }: { className?: string }): React.JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
  </svg>
);

export const BookOpenIcon = ({ className = "w-6 h-6" }: { className?: string }): React.JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
  </svg>
);

export const CrosshairsIcon = ({ className = "w-6 h-6" }: { className?: string }): React.JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);

export const Cog6ToothIcon = ({ className = "w-6 h-6" }: { className?: string }): React.JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.26.716.53 1.003l.828.828c.329.329.329.86 0 1.19l-.828.828c-.27.287-.467.629-.53 1.003l-.213 1.281c-.09.543-.56.94-1.11.94h-2.593c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.063-.374-.26-.716-.53-1.003l-.828-.828c-.329.329-.329.86 0-1.19l.828.828c.27-.287.467.629.53-1.003l.213-1.281Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
  </svg>
);

export const QuestionMarkCircleIcon = ({ className = "w-6 h-6" }: { className?: string }): React.JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
  </svg>
);

export const LightBulbIcon = ({ className = "w-6 h-6" }: { className?: string }): React.JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.311a7.5 7.5 0 0 1-7.5 0c-1.42-1.58-2.67-3.319-2.67-5.511a1 1 0 0 1 .65-1.066l.75-.25a1 1 0 0 0 .55-.944v-1.123a1 1 0 0 1 .984-1.065h.305a1 1 0 0 1 .984 1.065v1.123a1 1 0 0 0 .55.944l.75.25a1 1 0 0 1 .65 1.066c0 2.192-1.25 3.931-2.67 5.511Z" />
  </svg>
);

export const ClockIcon = ({ className = "w-6 h-6" }: { className?: string }): React.JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
  </svg>
);

export const BeakerIcon = ({ className = "w-6 h-6" }: { className?: string }): React.JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 0 1-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 0 1 4.5 0m0 0v5.714c0 .597.237 1.17.659 1.591L19 14.5M12 14.5v5.25m0 0a2.25 2.25 0 0 1-2.25 2.25h-1.5a2.25 2.25 0 0 1-2.25-2.25M12 19.5h1.5a2.25 2.25 0 0 0 2.25-2.25V14.5" />
  </svg>
);

export const BuildingLibraryIcon = ({ className = "w-6 h-6" }: { className?: string }): React.JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.332A48.36 48.36 0 0 0 12 9.75c-2.551 0-5.056.2-7.5.582V21M3 21h18M12 6.75h.008v.008H12V6.75Z" />
  </svg>
);

export const CalculatorIcon = ({ className = "w-6 h-6" }: { className?: string }): React.JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 15.75V18m-7.5-6.75h.008v.008H8.25v-.008Zm0 3h.008v.008H8.25v-.008Zm0 3h.008v.008H8.25v-.008Zm3-6h.008v.008H11.25v-.008Zm0 3h.008v.008H11.25v-.008Zm0 3h.008v.008H11.25v-.008Zm3-6h.008v.008H14.25v-.008Zm0 3h.008v.008H14.25v-.008Zm0 3h.008v.008H14.25v-.008Zm3-12h-.008v.008H17.25V3.75Zm-6 0h-.008v.008H11.25V3.75Z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 15h18M3 9h18M3 6h18M3 3h18" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 12v9a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 21V3.75A2.25 2.25 0 0 1 5.25 1.5h13.5A2.25 2.25 0 0 1 21 3.75V12Z" />
  </svg>
);

export const ChatBubbleLeftEllipsisIcon = ({ className = "w-6 h-6" }: { className?: string }): React.JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.76 9.76 0 0 1-2.53-.423l-3.358 2.106-2.106-3.358A9.754 9.754 0 0 1 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25Z" />
  </svg>
);

export const ClipboardDocumentCheckIcon = ({ className = "w-6 h-6" }: { className?: string }): React.JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 0 1 9 9v.375M10.125 2.25A3.375 3.375 0 0 1 13.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 0 1 3.375 3.375M9 15l2.25 2.25L15 12" />
  </svg>
);

export const PuzzlePieceIcon = ({ className = "w-6 h-6" }: { className?: string }): React.JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 6.75a4.5 4.5 0 0 1-4.5 4.5H4.5a4.5 4.5 0 0 1-4.5-4.5V2.25A2.25 2.25 0 0 1 2.25 0h9.75a2.25 2.25 0 0 1 2.25 2.25v4.5Zm0 0a4.5 4.5 0 0 0 4.5 4.5h3.75a.75.75 0 0 0 .75-.75V3a.75.75 0 0 0-.75-.75h-3.75a4.5 4.5 0 0 0-4.5-4.5v4.5Zm0 0a4.5 4.5 0 0 1 4.5-4.5h3.75a.75.75 0 0 1 .75.75V9a.75.75 0 0 1-.75.75h-3.75a4.5 4.5 0 0 1-4.5-4.5V6.75Zm-5.25-1.5a.75.75 0 0 0-.75.75v3.75a.75.75 0 0 0 .75.75h3.75a.75.75 0 0 0 .75-.75V6a.75.75 0 0 0-.75-.75H9Z" />
  </svg>
);

export const AcademicCapIcon = ({ className = "w-6 h-6" }: { className?: string }): React.JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.627 48.627 0 0 1 12 20.904a48.627 48.627 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.57 50.57 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
  </svg>
);

export const MagnifyingGlassIcon = ({ className = "w-6 h-6" }: { className?: string }): React.JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
  </svg>
);

export const ChatBubbleLeftRightIcon = ({ className = "w-6 h-6" }: { className?: string }): React.JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193l-3.72.35c-1.063.1-2.062.624-2.88 1.434l-1.493 1.493a.98 1.05 0 0 1-1.486 0l-1.493-1.493c-.818-.81-.182-1.334-2.88-1.434l-3.72-.35c-1.133-.1-1.98-1.057-1.98-2.193V10.608c0-.97.616-1.813 1.5-2.097m14.25 0A9.996 9.996 0 0 0 12 3.75a9.996 9.996 0 0 0-8.25 4.761" />
  </svg>
);

export const ArrowRightOnRectangleIcon = ({ className = "w-6 h-6" }: { className?: string }): React.JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
  </svg>
);

// FIX: Add missing ArrowUturnLeftIcon for the review screen's 'Back' button.
export const ArrowUturnLeftIcon = ({ className = "w-6 h-6" }: { className?: string }): React.JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
    </svg>
);

export const PencilIcon = ({ className = "w-6 h-6" }: { className?: string }): React.JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
    </svg>
);

export const AdjustmentsHorizontalIcon = ({ className = "w-6 h-6" }: { className?: string }): React.JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 1 1-3 0m3 0a1.5 1.5 0 1 0-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m-9.75 0h9.75" />
    </svg>
);


// --- Solid/Stateful Icons (Heroicons) ---

export const HeartIcon: React.FC<{ className?: string, isFilled?: boolean }> = ({ className = "w-6 h-6", isFilled = true }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={isFilled ? "currentColor" : "none"} className={className}>
        {isFilled ? (
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} stroke="currentColor" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
        )}
    </svg>
);

export const CheckCircleIcon = ({ className = "w-10 h-10" }: { className?: string }): React.JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.06-1.06l-3.25 3.25-1.5-1.5a.75.75 0 0 0-1.06 1.06l2 2a.75.75 0 0 0 1.06 0l3.75-3.75Z" clipRule="evenodd" />
  </svg>
);

export const XCircleIcon = ({ className = "w-10 h-10" }: { className?: string }): React.JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
  </svg>
);

export const StarIcon: React.FC<{ className?: string }> = ({ className = "w-6 h-6" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
    </svg>
);

export const CoffeeBrewerIcon = ({ className = "w-24 h-24" }: { className?: string }): React.JSX.Element => (
    <svg className={className} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
            <linearGradient id="pot-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e5e7eb" />
                <stop offset="100%" stopColor="#f9fafb" />
            </linearGradient>
            <linearGradient id="coffee-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#6b4f4b" />
                <stop offset="100%" stopColor="#4a2e2a" />
            </linearGradient>
            <radialGradient id="power-light-gradient">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#b91c1c" />
            </radialGradient>
        </defs>

        {/* Pot */}
        <path d="M20 90 H80 L85 45 H15 L20 90 Z" fill="url(#pot-gradient)" stroke="#6b7280" strokeWidth="2" />
        <path d="M18 80 H82" stroke="#9ca3af" strokeWidth="1" />
        <path d="M16 65 H84" stroke="#9ca3af" strokeWidth="1" />
        <path d="M85 45 C95 50, 95 70, 85 75" stroke="#6b7280" strokeWidth="2" fill="none" />
        {/* Glass highlight */}
        <path d="M28 50 C 35 55, 35 70, 28 85" stroke="white" strokeWidth="1.5" fill="none" strokeOpacity="0.6" />

        {/* Coffee inside pot */}
        <g clipPath="url(#pot-clip)">
            <rect className="coffee-fill" x="21" y="46" width="58" height="43" fill="url(#coffee-gradient)" />
            {/* Coffee bubbles */}
            <g>
                <circle className="coffee-bubble" cx="40" cy="88" r="1.5" fill="#c0a080" fillOpacity="0.5" />
                <circle className="coffee-bubble" cx="60" cy="88" r="1" fill="#c0a080" fillOpacity="0.5" />
                <circle className="coffee-bubble" cx="50" cy="88" r="2" fill="#c0a080" fillOpacity="0.5" />
            </g>
        </g>
        <clipPath id="pot-clip">
            <path d="M20 90 H80 L85 45 H15 L20 90 Z" />
        </clipPath>

        {/* Brewer top */}
        <path d="M25 10 H75 L78 30 H22 L25 10 Z" fill="#4b5563" stroke="#1f2937" strokeWidth="2" />
        <path d="M25 15 H75" stroke="#374151" strokeWidth="1" />
        {/* Filter holder */}
        <path d="M40 30 L45 40 H55 L60 30 Z" fill="#374151" stroke="#1f2937" strokeWidth="2" />
        {/* Power light */}
        <circle className="power-light" cx="30" cy="22" r="3" fill="url(#power-light-gradient)" stroke="#1f2937" strokeWidth="1" />

        {/* Dripping coffee */}
        <circle className="coffee-drop" cx="50" cy="40" r="2" fill="url(#coffee-gradient)" />
        <circle className="coffee-drop" cx="50" cy="40" r="2" fill="url(#coffee-gradient)" />
        <circle className="coffee-drop" cx="50" cy="40" r="2" fill="url(#coffee-gradient)" />

        {/* Steam */}
        <path className="steam" d="M30 8 C30 2, 35 2, 35 8" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" />
        <path className="steam" d="M40 5 C40 0, 45 0, 45 5" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" />
        <path className="steam" d="M50 8 C50 2, 55 2, 55 8" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" />
        <path className="steam" d="M60 5 C60 0, 65 0, 65 5" stroke="#d1d5db" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
);


// --- Deprecated Icons (Will be removed after refactor) ---
// Note: This is a placeholder section. In the final version, these will be completely removed.
// Kept some here to avoid breaking imports during a large refactor.
export const SparklesIcon = ({ className = "w-6 h-6" }: { className?: string }): React.JSX.Element => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456Z" />
    </svg>
);