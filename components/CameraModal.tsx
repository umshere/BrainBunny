import React, { useState, useRef, useCallback } from 'react';
import { CameraIcon, ArrowPathIcon, XMarkIcon } from './icons';

type CameraModalProps = {
    isOpen: boolean;
    onClose: () => void;
    onUsePicture: (file: File) => void;
};

export const CameraModal = ({ isOpen, onClose, onUsePicture }: CameraModalProps) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [stream, setStream] = useState<MediaStream | null>(null);
    const [error, setError] = useState<string | null>(null);

    const startCamera = useCallback(async () => {
        setError(null);
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
                setStream(stream);
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (err) {
                console.error("Error accessing camera:", err);
                setError("Could not access the camera. Please check permissions and try again.");
                // Fallback to user-facing camera if environment fails
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                    setStream(stream);
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream;
                    }
                } catch (fallbackErr) {
                    console.error("Error accessing fallback camera:", fallbackErr);
                }
            }
        } else {
            setError("Your browser does not support camera access.");
        }
    }, []);

    const stopCamera = useCallback(() => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            setStream(null);
        }
    }, [stream]);

    React.useEffect(() => {
        if (isOpen) {
            startCamera();
        } else {
            stopCamera();
        }
        return () => stopCamera();
    }, [isOpen, startCamera, stopCamera]);

    const handleCapture = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const context = canvas.getContext('2d');
            if (context) {
                context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
                canvas.toBlob((blob) => {
                    if (blob) {
                        const file = new File([blob], "capture.jpg", { type: "image/jpeg" });
                        onUsePicture(file);
                    }
                }, 'image/jpeg');
            }
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col relative overflow-hidden">
                <div className="p-4 border-b flex justify-between items-center bg-slate-50">
                    <h3 className="text-lg font-bold text-slate-800">Use Camera</h3>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-800"><XMarkIcon /></button>
                </div>
                <div className="p-4">
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    <div className="bg-slate-900 rounded-lg overflow-hidden aspect-video">
                        <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover" />
                    </div>
                </div>
                <div className="p-4 bg-slate-50 border-t flex justify-center">
                    <button 
                        onClick={handleCapture} 
                        disabled={!stream}
                        className="p-4 bg-amber-500 rounded-full text-white shadow-lg hover:bg-amber-600 disabled:bg-slate-300 transition"
                        aria-label="Take picture"
                    >
                        <CameraIcon className="w-8 h-8" />
                    </button>
                </div>
            </div>
        </div>
    );
};
