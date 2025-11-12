import React, { useState, useRef, useEffect } from 'react';
import { PageSize } from '../types';
import { XMarkIcon, PrinterIcon } from './icons';

type PrintPreviewModalProps = {
    isOpen: boolean;
    onClose: () => void;
    content: string;
};

export const PrintPreviewModal = ({ isOpen, onClose, content }: PrintPreviewModalProps) => {
    const [pageSize, setPageSize] = useState<PageSize>('A4');
    const [margin, setMargin] = useState(15);
    const [fontSize, setFontSize] = useState(12);
    const [questionSpacing, setQuestionSpacing] = useState(1.5);

    const previewContainerRef = useRef<HTMLDivElement>(null);
    const previewContentRef = useRef<HTMLDivElement>(null);
    
    useEffect(() => {
        if (!isOpen) return;

        const scalePreview = () => {
            if (!previewContainerRef.current || !previewContentRef.current) return;
            const containerWidth = previewContainerRef.current.clientWidth;
            const contentWidth = pageSize === 'A4' ? 794 : 816;
            if (containerWidth > 0 && contentWidth > 0) {
                const scale = containerWidth / contentWidth;
                previewContentRef.current.style.transform = `scale(${scale})`;
            }
        };

        const resizeObserver = new ResizeObserver(scalePreview);
        if (previewContainerRef.current) {
            resizeObserver.observe(previewContainerRef.current);
        }
        
        scalePreview();

        return () => {
            resizeObserver.disconnect();
        };
    }, [isOpen, pageSize, content]);

    const handleActualPrint = () => {
        let styles = "";
        try {
            for (const sheet of Array.from(document.styleSheets)) {
                try {
                    for (const rule of Array.from(sheet.cssRules)) {
                        styles += rule.cssText;
                    }
                } catch (e) {
                    // Ignore cross-origin stylesheet errors
                }
            }
        } catch (e) {
            console.error("Error collecting stylesheets for printing:", e);
        }

        const printStyles = `
            body { font-family: 'Poppins', sans-serif; -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
            @page { size: ${pageSize}; margin: ${margin}mm; }
            body { font-size: ${fontSize}pt; line-height: 1.5; }
            ol > li:not(:last-child) { margin-bottom: ${questionSpacing}rem !important; }
        `;
        
        const iframe = document.createElement('iframe');
        iframe.style.position = 'absolute';
        iframe.style.width = '0';
        iframe.style.height = '0';
        iframe.style.border = '0';
        iframe.style.left = '-9999px';
        
        document.body.appendChild(iframe);
        
        const poppinsUrl = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap";
        
        const htmlContent = `
          <!DOCTYPE html><html><head><title>Print</title>
              <link href="${poppinsUrl}" rel="stylesheet" type="text/css">
              <style>${styles}</style><style>${printStyles}</style>
          </head><body>${content}</body></html>
        `;
        
        iframe.srcdoc = htmlContent;

        iframe.onload = () => {
            setTimeout(() => {
                try {
                    iframe.contentWindow?.focus();
                    iframe.contentWindow?.print();
                } catch (e) {
                    console.error("Printing failed:", e);
                } finally {
                    setTimeout(() => {
                        if (document.body.contains(iframe)) document.body.removeChild(iframe);
                    }, 2000);
                }
            }, 500);
        };
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 no-print backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-full max-h-[90vh] flex flex-col">
                <div className="p-4 border-b flex justify-between items-center bg-slate-50 rounded-t-2xl">
                    <h3 className="text-lg font-bold text-slate-800">Print Preview & Settings</h3>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-800"><XMarkIcon /></button>
                </div>
                <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                    <div className="w-full md:w-1/3 lg:w-1/4 p-4 md:p-6 space-y-4 md:space-y-6 overflow-y-auto bg-slate-100 border-b md:border-r md:border-b-0">
                         <div>
                            <label className="block text-sm font-medium text-slate-700 mb-1">Page Size</label>
                            <select value={pageSize} onChange={e => setPageSize(e.target.value as PageSize)} className="w-full p-2 border border-slate-300 rounded-md focus:ring-amber-500 focus:border-amber-500">
                                <option value="A4">A4</option>
                                <option value="letter">US Letter</option>
                            </select>
                         </div>
                         <div className="space-y-4">
                            <div>
                                <label htmlFor="margin-slider" className="flex justify-between text-sm font-medium text-slate-700 mb-1">
                                  <span>Margins</span><span className="font-normal text-slate-500">{margin}mm</span>
                                </label>
                                <input id="margin-slider" type="range" min="5" max="30" value={margin} onChange={e => setMargin(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500" />
                            </div>
                            <div>
                                <label htmlFor="fontsize-slider" className="flex justify-between text-sm font-medium text-slate-700 mb-1">
                                  <span>Font Size</span><span className="font-normal text-slate-500">{fontSize}pt</span>
                                </label>
                                <input id="fontsize-slider" type="range" min="8" max="18" value={fontSize} onChange={e => setFontSize(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500" />
                            </div>
                            <div>
                                <label htmlFor="spacing-slider" className="flex justify-between text-sm font-medium text-slate-700 mb-1">
                                  <span>Question Spacing</span><span className="font-normal text-slate-500">{questionSpacing.toFixed(1)}rem</span>
                                </label>
                                <input id="spacing-slider" type="range" min="0.5" max="4" step="0.1" value={questionSpacing} onChange={e => setQuestionSpacing(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500" />
                            </div>
                         </div>
                    </div>
                    <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-hidden bg-slate-200 flex items-center justify-center">
                        <div id="preview-page" ref={previewContainerRef} className={`bg-white shadow-xl overflow-hidden ${pageSize === 'A4' ? 'aspect-[210/297]' : 'aspect-[8.5/11]'} h-full max-w-full mx-auto`}>
                          <div ref={previewContentRef} className="origin-top-left bg-white" style={{
                                width: pageSize === 'A4' ? '794px' : '816px',
                                height: pageSize === 'A4' ? '1123px' : '1056px',
                                padding: `${margin}mm`, fontSize: `${fontSize}pt`,
                            }}>
                            <style>{`
                                #preview-content { line-height: 1.5; color: #374151; overflow: hidden; }
                                #preview-content h2 { font-size: 1.8em; font-weight: 700; line-height: 1.2; text-align: center; }
                                #preview-content div[class*="justify-between"] p { font-size: 1.05em; }
                                #preview-content p[class*="italic"] { font-size: 1em; text-align: center; color: #4b5563; }
                                #preview-content ol { font-size: 1em; list-style-position: inside; list-style-type: decimal; }
                                #preview-content ol > li:not(:last-child) { margin-bottom: ${questionSpacing}rem !important; }
                            `}</style>
                            <div className="max-w-none" dangerouslySetInnerHTML={{ __html: content }}/>
                          </div>
                        </div>
                    </div>
                </div>
                <div className="p-4 border-t flex justify-end bg-slate-50 rounded-b-2xl">
                    <button onClick={handleActualPrint} className="inline-flex items-center bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                        <PrinterIcon /><span className="ml-2">Print Now</span>
                    </button>
                </div>
            </div>
        </div>
    );
};