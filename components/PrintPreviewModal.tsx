import React, { useRef } from 'react';
import { PrinterIcon, XMarkIcon } from './icons';

type PrintPreviewModalProps = {
    isOpen: boolean;
    onClose: () => void;
    content: string;
};

const printStyles = `
    @media print {
        body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
        .no-print { display: none !important; }
    }
    @page {
        size: A4;
        margin: 0.75in;
    }
    body { 
        font-family: sans-serif;
        margin: 0;
        padding: 0;
    }
`;

export const PrintPreviewModal = ({ isOpen, onClose, content }: PrintPreviewModalProps) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const handlePrint = () => {
        const iframe = iframeRef.current;
        if (iframe && iframe.contentWindow) {
            iframe.contentWindow.focus();
            iframe.contentWindow.print();
        }
    };
    
    if (!isOpen) return null;

    const fullHtml = `
        <html>
            <head>
                <title>Print Preview</title>
                <script src="https://cdn.tailwindcss.com"></script>
                <style>${printStyles}</style>
            </head>
            <body>
                ${content}
            </body>
        </html>
    `;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 no-print backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl flex flex-col h-[90vh]">
                <div className="p-4 border-b flex justify-between items-center bg-slate-50 rounded-t-2xl">
                    <h3 className="text-lg font-bold text-slate-800">Print Preview</h3>
                    <div className="flex items-center space-x-2">
                        <button onClick={handlePrint} className="inline-flex items-center bg-slate-700 hover:bg-slate-800 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                            <PrinterIcon className="w-5 h-5" />
                            <span className="ml-2">Print</span>
                        </button>
                        <button onClick={onClose} className="text-slate-500 hover:text-slate-800"><XMarkIcon /></button>
                    </div>
                </div>
                <div className="flex-grow p-4 bg-slate-200">
                    <iframe
                        ref={iframeRef}
                        srcDoc={fullHtml}
                        title="Print Preview"
                        className="w-full h-full border-0 bg-white shadow-inner"
                    />
                </div>
            </div>
        </div>
    );
};
