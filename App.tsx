import React, { useState, useCallback, useRef } from 'react';
import { generateHomework } from './services/geminiService';
import { MagicWandIcon, PrintIcon, LoaderIcon, MicrophoneIcon, UploadIcon, XIcon, BrainyBunnyIcon } from './components/icons';

const SAMPLE_TOPICS = [
  "Compass Directions for 3rd grade",
  "Simple addition up to 20",
  "The Water Cycle for kids",
  "Names of Planets in the Solar System",
];

type GenerationMode = 'topic' | 'weak_points';

declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

export default function App(): React.JSX.Element {
  const [generationMode, setGenerationMode] = useState<GenerationMode>('topic');
  const [topic, setTopic] = useState<string>('');
  const [weakPoints, setWeakPoints] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [generatedHomework, setGeneratedHomework] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const recognitionRef = useRef<any | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleGenerate = useCallback(async () => {
    setError(null);
    if (generationMode === 'topic' && !topic.trim()) {
      setError('Please enter a topic.');
      return;
    }
    if (generationMode === 'weak_points' && !weakPoints.trim() && !image) {
      setError('Please upload a completed worksheet or describe the weak points.');
      return;
    }

    setIsLoading(true);
    setGeneratedHomework('');

    try {
      const homeworkHtml = await generateHomework({
        mode: generationMode,
        topic: topic,
        weakPoints: weakPoints,
        imageBase64: image
      });
      setGeneratedHomework(homeworkHtml);
    } catch (err) {
      setError('Failed to generate homework. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [topic, weakPoints, image, generationMode]);
  
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => { setImage(reader.result as string); };
        reader.readAsDataURL(file);
        setError(null);
    } else {
        setError("Please select a valid image file.");
    }
  };

  const removeImage = () => {
      setImage(null);
      if(fileInputRef.current) { fileInputRef.current.value = ""; }
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
    recognition.lang = 'en-US';

    recognition.onstart = () => { setIsRecording(true); setError(null); };
    recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        if (generationMode === 'topic') setTopic(transcript);
        else setWeakPoints(transcript);
    };
    recognition.onerror = (event: any) => {
        if (event.error === 'not-allowed') setError('Microphone access denied.');
        else setError(`Voice recognition error: ${event.error}`);
    };
    recognition.onend = () => { setIsRecording(false); recognitionRef.current = null; };
    recognition.start();
  };

  const handlePrint = () => { window.print(); };

  const imageSectionTitle = generationMode === 'topic' ? '2. (Optional) Add a Reference Image' : '1. Upload Completed Worksheet';
  const imageSectionDescription = generationMode === 'topic' 
    ? "Upload a sample worksheet for style reference." 
    : "Upload a photo of the student's completed work. Our AI will find the weak spots and create a new practice sheet.";

  return (
    <div className="min-h-screen font-sans text-slate-800">
      <header className="bg-white/80 backdrop-blur-lg sticky top-0 z-10 shadow-sm no-print">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-3">
          <BrainyBunnyIcon className="w-12 h-12 text-orange-500"/>
          <div>
            <h1 className="text-3xl font-bold text-slate-900 tracking-tight">BrainyBunny</h1>
            <p className="text-slate-500 mt-1">Your AI-powered homework partner.</p>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 no-print">
        <div className="max-w-3xl mx-auto">
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
                <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-full mb-6">
                    <button onClick={() => setGenerationMode('topic')} className={`px-4 py-2 text-center font-semibold rounded-full transition-all ${generationMode === 'topic' ? 'bg-orange-500 shadow text-white' : 'text-slate-600 hover:bg-orange-100'}`}>Create New Sheet</button>
                    <button onClick={() => setGenerationMode('weak_points')} className={`px-4 py-2 text-center font-semibold rounded-full transition-all ${generationMode === 'weak_points' ? 'bg-orange-500 shadow text-white' : 'text-slate-600 hover:bg-orange-100'}`}>Practice Weak Points</button>
                </div>
                
                {generationMode === 'topic' ? (
                  <>
                    <div>
                      <label htmlFor="topic-input" className="text-xl font-semibold mb-2 text-slate-700 block">1. Describe the Homework Topic</label>
                      <div className="flex gap-2">
                          <input id="topic-input" type="text" value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g., Photosynthesis for 5th graders" className="flex-grow w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-shadow" disabled={isLoading || isRecording}/>
                          <button onClick={toggleVoiceRecognition} disabled={isLoading} aria-label={isRecording ? 'Stop' : 'Record'} className={`p-3 border rounded-lg transition-colors disabled:bg-slate-200 ${isRecording ? 'bg-red-100 text-red-600 ring-2 ring-red-500' : 'text-slate-600 border-slate-300 hover:bg-slate-100'}`}><MicrophoneIcon /></button>
                      </div>
                      <div className="flex flex-wrap gap-2 mt-3">
                          {SAMPLE_TOPICS.map((sample) => (<button key={sample} onClick={() => setTopic(sample)} className="px-3 py-1 text-sm bg-slate-100 text-slate-600 rounded-full hover:bg-orange-100 hover:text-orange-800 transition-colors">{sample}</button>))}
                      </div>
                    </div>
                    <hr className="my-6 border-slate-200"/>
                  </>
                ) : (
                  <>
                    <div>
                      <h2 className="text-xl font-semibold mb-2 text-slate-700">{imageSectionTitle}</h2>
                      <p className="text-slate-500 mb-4 text-sm">{imageSectionDescription}</p>
                      {image ? (
                           <div className="relative w-full sm:w-1/2"><img src={image} alt="Upload preview" className="w-full h-32 object-contain rounded-lg border border-slate-300 p-2" /><button onClick={removeImage} className="absolute top-2 right-2 bg-white/80 rounded-full p-1 text-slate-700 hover:bg-white" aria-label="Remove image"><XIcon /></button></div>
                      ) : (
                          <label className="flex flex-col items-center justify-center w-full sm:w-1/2 h-32 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors"><div className="flex flex-col items-center justify-center pt-5 pb-6"><UploadIcon /><p className="mb-2 text-sm text-slate-500"><span className="font-semibold">Click to upload</span></p></div><input ref={fileInputRef} type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleImageUpload} /></label>
                      )}
                    </div>
                    <hr className="my-6 border-slate-200"/>
                    <div>
                        <label htmlFor="weak-points-input" className="text-xl font-semibold mb-2 text-slate-700 block">2. (Optional) Or, Describe Weak Points Manually</label>
                        <p className="text-slate-500 mb-4 text-sm">If you don't have an image, type or dictate the topics or questions the student struggled with.</p>
                        <div className="flex gap-2">
                          <textarea id="weak-points-input" value={weakPoints} onChange={(e) => setWeakPoints(e.target.value)} placeholder="e.g., Adding two-digit numbers, long division..." rows={3} className="flex-grow w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-shadow" disabled={isLoading || isRecording}/>
                          <button onClick={toggleVoiceRecognition} disabled={isLoading} aria-label={isRecording ? 'Stop' : 'Record'} className={`p-3 border rounded-lg transition-colors disabled:bg-slate-200 self-start ${isRecording ? 'bg-red-100 text-red-600 ring-2 ring-red-500' : 'text-slate-600 border-slate-300 hover:bg-slate-100'}`}><MicrophoneIcon /></button>
                        </div>
                    </div>
                  </>
                )}

                { generationMode === 'topic' && (
                    <div>
                      <h2 className="text-xl font-semibold mb-2 text-slate-700">{imageSectionTitle}</h2>
                      <p className="text-slate-500 mb-4 text-sm">{imageSectionDescription}</p>
                      {image ? (
                           <div className="relative w-full sm:w-1/2"><img src={image} alt="Upload preview" className="w-full h-32 object-contain rounded-lg border border-slate-300 p-2" /><button onClick={removeImage} className="absolute top-2 right-2 bg-white/80 rounded-full p-1 text-slate-700 hover:bg-white" aria-label="Remove image"><XIcon /></button></div>
                      ) : (
                          <label className="flex flex-col items-center justify-center w-full sm:w-1/2 h-32 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition-colors"><div className="flex flex-col items-center justify-center pt-5 pb-6"><UploadIcon /><p className="mb-2 text-sm text-slate-500"><span className="font-semibold">Click to upload</span></p></div><input ref={fileInputRef} type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={handleImageUpload} /></label>
                      )}
                    </div>
                )}
            </div>

            <div className="mt-8 flex justify-center">
                <button onClick={handleGenerate} disabled={isLoading} className="flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 bg-orange-500 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-orange-600 disabled:bg-slate-400 disabled:cursor-not-allowed transition-all">
                    {isLoading ? <LoaderIcon /> : <MagicWandIcon />}
                    {isLoading ? 'Generating...' : 'Generate Homework'}
                </button>
            </div>
        </div>
      </main>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        {isLoading && <div className="text-center p-8"><div className="flex justify-center items-center gap-3 text-lg text-slate-600"><LoaderIcon /><p>Creating your homework sheet... Please wait.</p></div></div>}
        {error && <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-md shadow my-4 max-w-3xl mx-auto" role="alert"><p className="font-bold">Error</p><p>{error}</p></div>}
        {!isLoading && !generatedHomework && !error && <div className="text-center bg-white/80 border-2 border-dashed border-slate-300 rounded-xl p-12 mt-4 max-w-3xl mx-auto"><h3 className="text-xl font-medium text-slate-600">Your BrainyBunny sheet will appear here.</h3><p className="text-slate-400 mt-2">Get started above and click "Generate" to create a worksheet.</p></div>}
        {generatedHomework && (
          <div className="relative mt-4">
            <button onClick={handlePrint} className="no-print absolute -top-4 right-2 sm:right-0 sm:-top-12 flex items-center gap-2 px-4 py-2 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all"><PrintIcon />Print Sheet</button>
            <div id="printable-area" dangerouslySetInnerHTML={{ __html: generatedHomework }} />
          </div>
        )}
      </div>

       <footer className="text-center py-4 text-slate-400 text-sm no-print">
            <p>Powered by Google Gemini. Made with ❤️ by BrainyBunny.</p>
        </footer>
    </div>
  );
}