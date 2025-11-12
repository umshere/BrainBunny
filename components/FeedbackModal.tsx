import React, { useState, useRef } from 'react';
import { XMarkIcon, MicrophoneIcon } from './icons';

type FeedbackModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export const FeedbackModal = ({ isOpen, onClose }: FeedbackModalProps) => {
    const [feedbackText, setFeedbackText] = useState('');
    const [name, setName] = useState('');
    const [isRecording, setIsRecording] = useState(false);
    const [error, setError] = useState('');
    const recognitionRef = useRef<any>(null);

    if (!isOpen) return null;
    
    const handleSendFeedback = () => {
        if (!feedbackText.trim()) {
            setError('Please enter your feedback before sending.');
            return;
        }
        setError('');
        
        const recipient = 'umshere@gmail.com';
        const subject = 'Feedback for BrainyBunny.ai';
        let body = `Feedback:\n${feedbackText}`;
        if (name.trim()) {
            body = `From: ${name.trim()}\n\n${body}`;
        }
        
        const mailtoLink = `mailto:${recipient}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
        
        window.location.href = mailtoLink;
        onClose();
    };

    const toggleVoiceRecognition = () => {
        if (isRecording) {
            recognitionRef.current?.stop();
            return;
        }
    
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (!SpeechRecognition) {
            setError("Sorry, your browser doesn't support voice recognition.");
            return;
        }
    
        const recognition = new SpeechRecognition();
        recognitionRef.current = recognition;
        recognition.onstart = () => setIsRecording(true);
        recognition.onend = () => {
            setIsRecording(false);
            recognitionRef.current = null;
        };
        recognition.onerror = (event: any) => {
            setError(`Voice recognition error: ${event.error}`);
            setIsRecording(false);
        };
        recognition.onresult = (event: any) => {
            const transcript = Array.from(event.results).map((result: any) => result[0]).map((result) => result.transcript).join('');
            setFeedbackText(prev => prev ? `${prev} ${transcript}`: transcript);
        };
        recognition.start();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 no-print backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg flex flex-col relative">
                <div className="p-4 border-b flex justify-between items-center bg-slate-50 rounded-t-2xl">
                    <h3 className="text-lg font-bold text-slate-800">Share Your Feedback</h3>
                    <button onClick={onClose} className="text-slate-500 hover:text-slate-800"><XMarkIcon /></button>
                </div>
                
                <div className="p-6 space-y-4">
                    <p className="text-sm text-slate-600">We'd love to hear your thoughts! What's working well? What could be better?</p>
                    
                    <div>
                        <label htmlFor="feedback-text" className="block text-sm font-medium text-slate-700 mb-1">Your Feedback</label>
                        <div className="relative">
                            <textarea
                                id="feedback-text"
                                rows={5}
                                value={feedbackText}
                                onChange={(e) => setFeedbackText(e.target.value)}
                                placeholder="Type or use the microphone to speak..."
                                className="w-full p-3 pr-12 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                            />
                            <button onClick={toggleVoiceRecognition} className={`absolute top-3 right-0 px-3 flex items-center ${isRecording ? 'text-red-500 animate-pulse' : 'text-slate-400 hover:text-amber-500'}`} aria-label={isRecording ? "Stop recording" : "Start recording"}>
                                <MicrophoneIcon />
                            </button>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="feedback-name" className="block text-sm font-medium text-slate-700 mb-1">Your Name (Optional)</label>
                        <input
                            type="text"
                            id="feedback-name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Leave blank to remain anonymous"
                            className="w-full p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                        />
                    </div>
                    {error && <p className="text-sm text-red-500">{error}</p>}
                </div>
                
                <div className="p-4 border-t flex justify-end bg-slate-50 rounded-b-2xl">
                    <button onClick={handleSendFeedback} className="inline-flex items-center bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                        Send Feedback
                    </button>
                </div>
            </div>
        </div>
    );
};