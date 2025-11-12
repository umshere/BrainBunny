import React, { useRef, useState } from 'react';
import { XMarkIcon } from './icons';

type CameraModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onUsePicture: (file: File) => void;
};

export const CameraModal = ({ isOpen, onClose, onUsePicture }: CameraModalProps): React.JSX.Element | null => {
    const [capturedImage, setCapturedImage] = useState<string | null>(null);
    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    if (!isOpen) return null;
    
    const handleTakePicture = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const context = canvas.getContext('2d');
            if (context) {
                context.drawImage(video, 0, 0, canvas.width, canvas.height);
                const dataUrl = canvas.toDataURL('image/jpeg');
                setCapturedImage(dataUrl);
            }
        }
    };

    const handleRetakePicture = () => {
        setCapturedImage(null);
    };

    function dataURLtoFile(dataurl: string, filename: string): File {
        let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)?.[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
    }

    const handleUsePicture = () => {
        if (capturedImage) {
            const file = dataURLtoFile(capturedImage, 'capture.jpg');
            onUsePicture(file);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 no-print backdrop-blur-sm">
            <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col relative">
                <div className="absolute top-0 right-0 p-2 z-10">
                    <button onClick={onClose} className="text-slate-400 hover:text-white bg-slate-700/50 rounded-full p-2">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                {capturedImage ? (
                    <div className="flex flex-col items-center justify-center p-4">
                        <img src={capturedImage} alt="Captured" className="rounded-lg max-h-[70vh] w-auto" />
                        <div className="flex space-x-4 mt-4">
                            <button onClick={handleRetakePicture} className="inline-flex items-center bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                                Retake
                            </button>
                            <button onClick={handleUsePicture} className="inline-flex items-center bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                                Use this picture
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center p-4">
                        <video ref={videoRef} autoPlay playsInline className="rounded-lg w-full max-h-[70vh]"></video>
                        <button onClick={handleTakePicture} className="mt-4 inline-flex items-center justify-center bg-white hover:bg-slate-200 text-slate-800 font-bold w-16 h-16 rounded-full transition-all duration-300 shadow-lg border-4 border-slate-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-800 focus:ring-amber-500" aria-label="Take picture">
                            <div className="w-12 h-12 rounded-full bg-slate-100"></div>
                        </button>
                    </div>
                )}
                <canvas ref={canvasRef} className="hidden"></canvas>
            </div>
        </div>
    );
};