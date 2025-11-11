import React, { useState, useCallback, useRef, useEffect } from 'react';
import { generateHomework } from './services/geminiService';
import { MagicWandIcon, PrintIcon, LoaderIcon, MicrophoneIcon, UploadIcon, XIcon, BrainyBunnyIcon, CameraIcon, KeyIcon, SparklesIcon, UserIcon } from './components/icons';

const SAMPLE_TOPICS = [
  "Compass Directions for 3rd grade",
  "Simple addition up to 20",
  "The Water Cycle for kids",
  "Names of Planets in the Solar System",
];

const GRADE_LEVELS = ["Kindergarten", "1st Grade", "2nd Grade", "3rd Grade", "4th Grade", "5th Grade", "6th Grade", "7th Grade", "8th Grade"];
const QUESTION_TYPES = ["Multiple Choice", "Word Problems", "Fill-in-the-Blank", "Mixed"];

type GenerationMode = 'topic' | 'weak_points';
type PageSize = 'A4' | 'letter';
type OutputView = 'worksheet' | 'answer_key';

declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

// Custom hook for persisting state to localStorage
function usePersistentState<T>(key: string, initialState: T): [T, React.Dispatch<React.SetStateAction<T>>] {
    const [state, setState] = useState<T>(() => {
        try {
            const storedValue = window.localStorage.getItem(key);
            return storedValue ? JSON.parse(storedValue) : initialState;
        } catch (error) {
            console.error(error);
            return initialState;
        }
    });

    useEffect(() => {
        try {
            window.localStorage.setItem(key, JSON.stringify(state));
        } catch (error) {
            console.error(error);
        }
    }, [key, state]);

    return [state, setState];
}

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

export default function App(): React.JSX.Element {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginComingSoon, setShowLoginComingSoon] = useState(false);

  const handleGoogleLoginClick = () => {
    setShowLoginComingSoon(true);
    setTimeout(() => {
        setShowLoginComingSoon(false);
    }, 3000); // Hide after 3 seconds
  };

  const handleLogout = () => setIsLoggedIn(false);
  
  const handleGuestMode = () => setIsLoggedIn(true);

  if (!isLoggedIn) {
      return (
        <>
            <LoginScreen onGoogleLoginClick={handleGoogleLoginClick} onGuestMode={handleGuestMode} />
            {showLoginComingSoon && <ComingSoonToast />}
        </>
      );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <MainApp />
      <Footer />
    </div>
  );
}

const ComingSoonToast = () => (
    <div className="fixed top-5 left-1/2 -translate-x-1/2 bg-slate-800 text-white px-4 py-2 rounded-lg shadow-lg z-50 animate-fade-in-down">
      <p className="flex items-center">
        <SparklesIcon className="w-5 h-5 mr-2 text-amber-400" />
        <span>Google Login is a coming soon feature!</span>
      </p>
    </div>
);

const LoginScreen = ({ onGoogleLoginClick, onGuestMode }: { onGoogleLoginClick: () => void; onGuestMode: () => void; }) => (
    <div className="flex flex-col min-h-screen justify-center items-center p-4">
        <header className="absolute top-0 left-0 right-0 p-4">
            <div className="container mx-auto flex items-center space-x-2">
                 <BrainyBunnyIcon className="w-8 h-8 text-amber-500" />
                  <h1 className="text-2xl font-bold text-slate-800">
                    BrainyBunny<span className="text-amber-500">.ai</span>
                  </h1>
            </div>
        </header>
        <main className="text-center max-w-lg">
            <BrainyBunnyIcon className="w-20 h-20 text-amber-500 mx-auto mb-4" />
            <h1 className="text-4xl font-bold text-slate-800 mb-2">Welcome to BrainyBunny!</h1>
            <p className="text-slate-500 mb-8 text-lg">Your AI-powered partner for creating fun, effective homework.</p>
            <div className="space-y-4 flex flex-col items-center">
                <button
                    onClick={onGoogleLoginClick}
                    className="w-full max-w-xs inline-flex items-center justify-center bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold py-3 px-6 rounded-lg transition-all duration-200"
                >
                    <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48" width="48px" height="48px"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.222,0-9.617-3.317-11.28-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.574l6.19,5.238C42.022,35.244,44,30.036,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>
                    Login with Google
                </button>
                 <button
                    onClick={onGuestMode}
                    className="w-full max-w-xs bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200"
                >
                    Continue as Guest
                </button>
            </div>
        </main>
       <Footer isLoginScreen={true} />
    </div>
);

const Header = ({ isLoggedIn, onLogout }: { isLoggedIn: boolean, onLogout: () => void }) => (
    <header className="bg-white/80 backdrop-blur-lg shadow-sm sticky top-0 z-10 no-print">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
              <div className="flex items-center space-x-2">
                  <BrainyBunnyIcon className="w-8 h-8 text-amber-500" />
                  <h1 className="text-2xl font-bold text-slate-800">
                    BrainyBunny<span className="text-amber-500">.ai</span>
                  </h1>
              </div>
              {isLoggedIn ? (
                  <div className="flex items-center space-x-4">
                      <button className="relative p-2 rounded-full hover:bg-slate-100">
                          <UserIcon />
                      </button>
                      <button onClick={onLogout} className="text-sm font-medium text-slate-600 hover:text-slate-800">Logout</button>
                  </div>
              ) : (
                <p className="hidden md:block text-slate-500">Your AI-Powered Homework Helper</p>
              )}
          </div>
        </div>
    </header>
);

const Footer = ({ isLoginScreen = false }: { isLoginScreen?: boolean }) => (
    <footer className={`text-center py-4 text-slate-500 text-sm no-print ${isLoginScreen ? 'absolute bottom-0 left-0 right-0' : ''}`}>
        <p>Powered by AI. Generated content may not always be accurate.</p>
        <p>&copy; {new Date().getFullYear()} BrainyBunny.ai - Fun Learning Ahead!</p>
    </footer>
);


const MainApp = () => {
  const [generationMode, setGenerationMode] = useState<GenerationMode>('topic');
  const [topic, setTopic] = useState<string>('');
  const [weakPoints, setWeakPoints] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [generatedHomework, setGeneratedHomework] = useState<string>('');
  const [generatedAnswerKey, setGeneratedAnswerKey] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isPrintPreviewOpen, setIsPrintPreviewOpen] = useState<boolean>(false);
  const [printPreviewContent, setPrintPreviewContent] = useState<string>('');
  const [outputView, setOutputView] = useState<OutputView>('worksheet');
  
  // Generation settings with persistence
  const [gradeLevel, setGradeLevel] = usePersistentState<string>('gradeLevel', '3rd Grade');
  const [questionCount, setQuestionCount] = usePersistentState<number>('questionCount', 10);
  const [questionTypes, setQuestionTypes] = usePersistentState<string[]>('questionTypes', ['Mixed']);

  // Print controls state
  const [pageSize, setPageSize] = useState<PageSize>('A4');
  const [margin, setMargin] = useState(15);
  const [fontSize, setFontSize] = useState(12);
  const [questionSpacing, setQuestionSpacing] = useState(1.5);

  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const recognitionRef = useRef<any | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const previewContainerRef = useRef<HTMLDivElement>(null);
  const previewContentRef = useRef<HTMLDivElement>(null);

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
    setGeneratedAnswerKey('');
    setOutputView('worksheet');

    try {
      const { worksheet, answerKey } = await generateHomework({
        mode: generationMode,
        topic: topic,
        weakPoints: weakPoints,
        imageBase64: image,
        gradeLevel: gradeLevel,
        questionCount: questionCount,
        questionTypes: questionTypes
      });
      setGeneratedHomework(worksheet);
      setGeneratedAnswerKey(answerKey);
    } catch (err) {
      setError('Failed to generate homework. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [topic, weakPoints, image, generationMode, gradeLevel, questionCount, questionTypes]);
  
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

  const removeImage = (e: React.MouseEvent) => {
      e.stopPropagation();
      e.preventDefault();
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
        const transcript = Array.from(event.results)
            .map((result: any) => result[0])
            .map((result) => result.transcript)
            .join('');
        if (generationMode === 'topic') {
            setTopic(transcript);
        } else {
            setWeakPoints(transcript);
        }
    };

    recognition.start();
  };

    const openPrintPreview = (content: string) => {
        setPrintPreviewContent(content);
        setIsPrintPreviewOpen(true);
    };

    const handleActualPrint = () => {
        // 1. Get all styles from the main document. The Tailwind JIT script creates a style tag with this ID.
        let styles = "";
        const tailwindStyles = document.getElementById('tailwindcss-style');
        if (tailwindStyles) {
            styles += tailwindStyles.innerHTML;
        } else {
            console.warn("Could not find Tailwind styles. Printing may be unstyled.");
        }

        // 2. Add print-specific styles
        const printStyles = `
            body {
                font-family: 'Poppins', sans-serif;
                -webkit-print-color-adjust: exact !important; 
                print-color-adjust: exact !important;
            }
            @page {
                size: ${pageSize};
                margin: ${margin}mm;
            }
            body {
                font-size: ${fontSize}pt;
                line-height: 1.5;
            }
            ol > li:not(:last-child) { 
                margin-bottom: ${questionSpacing}rem !important; 
            }
        `;

        // 3. Create a hidden iframe
        const iframe = document.createElement('iframe');
        iframe.style.position = 'absolute';
        iframe.style.width = '0';
        iframe.style.height = '0';
        iframe.style.border = '0';
        iframe.style.left = '-9999px'; // Hide it off-screen
        
        document.body.appendChild(iframe);
        
        const poppinsUrl = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap";
        
        // 4. Create a self-contained HTML document with embedded styles
        const htmlContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <title>Print</title>
              <link href="${poppinsUrl}" rel="stylesheet" type="text/css">
              <style>${styles}</style>
              <style>${printStyles}</style>
            </head>
            <body>
              ${printPreviewContent}
            </body>
          </html>
        `;
        
        iframe.srcdoc = htmlContent;

        // 5. Wait for the iframe to load fully, then trigger print.
        // A short delay is crucial for mobile browsers to render styles and fonts.
        iframe.onload = () => {
            setTimeout(() => {
                try {
                    iframe.contentWindow?.focus();
                    iframe.contentWindow?.print();
                } catch (e) {
                    console.error("Printing failed:", e);
                } finally {
                    // Cleanup after a delay to allow the print dialog to close
                    setTimeout(() => {
                        if (document.body.contains(iframe)) {
                            document.body.removeChild(iframe);
                        }
                    }, 2000);
                }
            }, 500); // This 500ms delay is key for reliability on mobile.
        };
    };
    
  const handleModeChange = (mode: GenerationMode) => {
    setGenerationMode(mode);
    setTopic('');
    setWeakPoints('');
    setImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setError(null);
  };

  const handleOpenCamera = async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } });
        if (videoRef.current) {
            videoRef.current.srcObject = stream;
            streamRef.current = stream;
            setIsCameraOpen(true);
            setCapturedImage(null);
        }
    } catch (err) {
        console.error("Error accessing camera:", err);
        setError("Could not access the camera. Please grant permission and try again.");
    }
  };

  const handleCloseCamera = () => {
      if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
      }
      setIsCameraOpen(false);
      setCapturedImage(null);
  };

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

  const handleUsePicture = () => {
      if (capturedImage) {
          setImage(capturedImage);
          handleCloseCamera();
      }
  };
  
  const handleRetakePicture = () => {
      setCapturedImage(null);
  };
    
  useEffect(() => {
    if (!isPrintPreviewOpen) return;

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
  }, [isPrintPreviewOpen, pageSize, printPreviewContent]);

  const handleQuestionTypeToggle = (type: string) => {
    if (type === 'Mixed') {
        setQuestionTypes(['Mixed']);
    } else {
        const newTypes = questionTypes.filter(t => t !== 'Mixed');
        if (newTypes.includes(type)) {
            const filtered = newTypes.filter(t => t !== type);
            // If empty after filtering, default to Mixed
            setQuestionTypes(filtered.length > 0 ? filtered : ['Mixed']);
        } else {
            setQuestionTypes([...newTypes, type]);
        }
    }
  };

  const UploadPlaceholder = ({onOpenCamera}: {onOpenCamera: (e: React.MouseEvent) => void}) => (
    <div className="flex flex-col items-center justify-center text-center">
        <UploadIcon />
        <p className="mb-2 text-sm text-slate-500"><span className="font-semibold">Click to upload</span></p>
        <p className="text-xs text-slate-500">PNG, JPG or GIF</p>
        {!isMobile && (
            <>
                <div className="mt-4 w-full flex items-center justify-center">
                    <span className="h-px flex-1 bg-slate-200"></span>
                    <span className="px-2 text-xs text-slate-500 uppercase">Or</span>
                    <span className="h-px flex-1 bg-slate-200"></span>
                </div>
                <button 
                    type="button" 
                    onClick={onOpenCamera} 
                    className="mt-4 inline-flex items-center px-4 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                >
                    <CameraIcon />
                    <span className="ml-2">Use Camera</span>
                </button>
            </>
        )}
    </div>
  );
  
  const ComingSoon = () => (
      <div className="mt-8 bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-200">
        <h3 className="text-xl font-bold text-slate-800 text-center mb-4">Coming Soon!</h3>
        <p className="text-center text-slate-500 mb-6 max-w-2xl mx-auto">
            We're working hard on exciting new features to make BrainyBunny even better. Here's a sneak peek at what's on the roadmap:
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <li className="bg-amber-50/50 p-4 rounded-lg border border-amber-100">
                <div className="flex justify-center items-center mb-2">
                    <SparklesIcon className="w-6 h-6 text-amber-500" />
                </div>
                <h4 className="font-semibold text-slate-700">Worksheet Themes</h4>
                <p className="text-sm text-slate-500">Choose from styles like "Ink Saver," "Illustrated," and more.</p>
            </li>
            <li className="bg-sky-50/50 p-4 rounded-lg border border-sky-100">
                <div className="flex justify-center items-center mb-2">
                    <SparklesIcon className="w-6 h-6 text-sky-500" />
                </div>
                <h4 className="font-semibold text-slate-700">DOCX & Image Export</h4>
                <p className="text-sm text-slate-500">Download as an editable document or shareable image.</p>
            </li>
            <li className="bg-emerald-50/50 p-4 rounded-lg border border-emerald-100">
                <div className="flex justify-center items-center mb-2">
                    <SparklesIcon className="w-6 h-6 text-emerald-500" />
                </div>
                <h4 className="font-semibold text-slate-700">Smart Error Analysis</h4>
                <p className="text-sm text-slate-500">Get parent coaching tips based on your child's mistakes.</p>
            </li>
        </ul>
      </div>
  )

  return (
    <>
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Create a New Homework Sheet</h2>
            <p className="text-slate-500 mb-6">Choose how you want to generate questions for your student.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <button
                onClick={() => handleModeChange('topic')}
                className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${generationMode === 'topic' ? 'border-amber-500 bg-amber-50' : 'border-slate-300 hover:border-amber-400'}`}
              >
                <h3 className="font-bold text-slate-700">From a Topic</h3>
                <p className="text-sm text-slate-500">Generate questions about a specific subject like "Math" or "Science".</p>
              </button>
              <button
                onClick={() => handleModeChange('weak_points')}
                className={`p-4 rounded-lg border-2 text-left transition-all duration-200 ${generationMode === 'weak_points' ? 'border-amber-500 bg-amber-50' : 'border-slate-300 hover:border-amber-400'}`}
              >
                <h3 className="font-bold text-slate-700">From Weak Points</h3>
                <p className="text-sm text-slate-500">Upload a finished worksheet to target areas that need practice.</p>
              </button>
            </div>
            
            <div className="space-y-4">
              {generationMode === 'topic' ? (
                <div>
                  <label htmlFor="topic" className="block text-sm font-medium text-slate-700 mb-1">Topic</label>
                  <div className="relative">
                    <input
                      type="text"
                      id="topic"
                      value={topic}
                      onChange={(e) => setTopic(e.target.value)}
                      placeholder={`e.g., "${SAMPLE_TOPICS[Math.floor(Math.random() * SAMPLE_TOPICS.length)]}"`}
                      className="w-full p-3 pr-12 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                    />
                    <button onClick={toggleVoiceRecognition} className={`absolute inset-y-0 right-0 px-3 flex items-center rounded-r-lg ${isRecording ? 'text-red-500 animate-pulse' : 'text-slate-400 hover:text-amber-500'}`} aria-label={isRecording ? "Stop recording" : "Start recording"}>
                      <MicrophoneIcon />
                    </button>
                  </div>
                   <div className="mt-4">
                        <label className="block text-sm font-medium text-slate-700 mb-1">Upload style reference (Optional)</label>
                        <p className="text-xs text-slate-500 mb-2">Provide an example worksheet image for style and format inspiration.</p>
                        <div className="flex items-center justify-center w-full">
                            <label htmlFor="dropzone-file-topic" className={`flex flex-col items-center justify-center w-full h-48 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition relative ${image ? 'p-0' : 'p-5'}`}>
                                {image ? (
                                    <>
                                        <img src={image} alt="Uploaded worksheet preview" className="w-full h-full object-contain rounded-lg" />
                                        <button onClick={removeImage} className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-red-100" aria-label="Remove image">
                                            <XIcon />
                                        </button>
                                    </>
                                ) : (
                                    <UploadPlaceholder onOpenCamera={(e) => { e.preventDefault(); e.stopPropagation(); handleOpenCamera(); }} />
                                )}
                                <input ref={fileInputRef} id="dropzone-file-topic" type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                            </label>
                        </div>
                    </div>
                </div>
              ) : (
                <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Upload Worksheet (Optional)</label>
                    <div className="flex items-center justify-center w-full mb-4">
                        <label htmlFor="dropzone-file" className={`flex flex-col items-center justify-center w-full h-48 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition relative ${image ? 'p-0' : 'p-5'}`}>
                            {image ? (
                                <>
                                    <img src={image} alt="Uploaded worksheet preview" className="w-full h-full object-contain rounded-lg" />
                                    <button onClick={removeImage} className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md hover:bg-red-100" aria-label="Remove image">
                                        <XIcon />
                                    </button>
                                </>
                            ) : (
                               <UploadPlaceholder onOpenCamera={(e) => { e.preventDefault(); e.stopPropagation(); handleOpenCamera(); }} />
                            )}
                            <input ref={fileInputRef} id="dropzone-file" type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
                        </label>
                    </div>

                    <label htmlFor="weak_points" className="block text-sm font-medium text-slate-700 mb-1">
                        Or Describe Weak Points
                    </label>
                     <div className="relative">
                        <textarea
                            id="weak_points"
                            rows={3}
                            value={weakPoints}
                            onChange={(e) => setWeakPoints(e.target.value)}
                            placeholder="e.g., 'Struggling with carrying over in addition' or 'Doesn't know the capital of France'"
                            className="w-full p-3 pr-12 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition"
                        />
                         <button onClick={toggleVoiceRecognition} className={`absolute top-3 right-0 px-3 flex items-center ${isRecording ? 'text-red-500 animate-pulse' : 'text-slate-400 hover:text-amber-500'}`} aria-label={isRecording ? "Stop recording" : "Start recording"}>
                            <MicrophoneIcon />
                        </button>
                    </div>
                </div>
              )}

              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="grade-level" className="block text-sm font-medium text-slate-700 mb-2">Grade Level</label>
                    <select id="grade-level" value={gradeLevel} onChange={e => setGradeLevel(e.target.value)} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition">
                        {GRADE_LEVELS.map(level => <option key={level} value={level}>{level}</option>)}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="question-count" className="block text-sm font-medium text-slate-700 mb-2">Number of Questions</label>
                    <input id="question-count" type="number" min="1" max="20" value={questionCount} onChange={e => setQuestionCount(Number(e.target.value))} className="w-full p-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition" />
                  </div>
              </div>

              <div className="pt-4">
                <label className="block text-sm font-medium text-slate-700 mb-2">Question Types</label>
                 <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 rounded-lg p-1 bg-slate-100 border border-slate-200">
                    {QUESTION_TYPES.map((type) => (
                        <button
                            key={type}
                            onClick={() => handleQuestionTypeToggle(type)}
                            className={`px-3 py-2 text-sm font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-1 focus:ring-offset-slate-100 ${
                            questionTypes.includes(type)
                                ? 'bg-amber-500 text-white shadow-sm'
                                : 'text-slate-600 hover:bg-slate-200'
                            }`}
                        >
                            {type}
                        </button>
                    ))}
                </div>
              </div>
            </div>

            {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

            <div className="mt-8 text-center">
              <button
                onClick={handleGenerate}
                disabled={isLoading}
                className="w-full sm:w-auto inline-flex items-center justify-center bg-amber-500 hover:bg-amber-600 disabled:bg-slate-300 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
              >
                {isLoading ? (
                  <>
                    <LoaderIcon />
                    <span className="ml-2">Generating...</span>
                  </>
                ) : (
                  <>
                    <MagicWandIcon />
                    <span className="ml-2">Generate Homework</span>
                  </>
                )}
              </button>
            </div>
          </div>
          
          {!generatedHomework && !isLoading && <ComingSoon />}

          {generatedHomework && !isLoading && (
            <div className="mt-8 bg-white p-4 sm:p-6 md:p-8 rounded-2xl shadow-lg border border-slate-200">
                <div className="flex justify-between items-center mb-4">
                     <h3 className="text-2xl font-bold text-slate-800 text-center">Your Homework is Ready!</h3>
                     <div className="flex rounded-lg p-1 bg-slate-100 border border-slate-200">
                         <button onClick={() => setOutputView('worksheet')} className={`px-4 py-1 text-sm font-semibold rounded-md transition-colors ${outputView === 'worksheet' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-600'}`}>Worksheet</button>
                         <button onClick={() => setOutputView('answer_key')} className={`px-4 py-1 text-sm font-semibold rounded-md transition-colors ${outputView === 'answer_key' ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-600'}`}>Answer Key</button>
                     </div>
                </div>

                <div id="printable-area-container">
                    <div id="printable-area" className="max-w-none mx-auto" dangerouslySetInnerHTML={{ __html: outputView === 'worksheet' ? generatedHomework : generatedAnswerKey }} />
                </div>
                
                <div className="mt-8 text-center no-print flex justify-center items-center space-x-4">
                    <button onClick={() => openPrintPreview(generatedHomework)} className="inline-flex items-center bg-slate-700 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                        <PrintIcon />
                        <span className="ml-2">Print Sheet</span>
                    </button>
                    {generatedAnswerKey && (
                         <button onClick={() => openPrintPreview(generatedAnswerKey)} className="inline-flex items-center bg-sky-600 hover:bg-sky-700 text-white font-bold py-3 px-6 rounded-lg transition-colors">
                            <KeyIcon />
                            <span className="ml-2">Print Key</span>
                        </button>
                    )}
                </div>
            </div>
          )}
        </div>
      </main>
      
      {isPrintPreviewOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 no-print backdrop-blur-sm">
              <div className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl h-full max-h-[90vh] flex flex-col">
                  <div className="p-4 border-b flex justify-between items-center bg-slate-50 rounded-t-2xl">
                      <h3 className="text-lg font-bold text-slate-800">Print Preview & Settings</h3>
                      <button onClick={() => setIsPrintPreviewOpen(false)} className="text-slate-500 hover:text-slate-800"><XIcon /></button>
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
                                      <span>Margins</span>
                                      <span className="font-normal text-slate-500">{margin}mm</span>
                                    </label>
                                    <input id="margin-slider" type="range" min="5" max="30" value={margin} onChange={e => setMargin(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500" />
                                </div>
                                <div>
                                    <label htmlFor="fontsize-slider" className="flex justify-between text-sm font-medium text-slate-700 mb-1">
                                      <span>Font Size</span>
                                      <span className="font-normal text-slate-500">{fontSize}pt</span>
                                    </label>
                                    <input id="fontsize-slider" type="range" min="8" max="18" value={fontSize} onChange={e => setFontSize(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500" />
                                </div>
                                <div>
                                    <label htmlFor="spacing-slider" className="flex justify-between text-sm font-medium text-slate-700 mb-1">
                                      <span>Question Spacing</span>
                                      <span className="font-normal text-slate-500">{questionSpacing.toFixed(1)}rem</span>
                                    </label>
                                    <input id="spacing-slider" type="range" min="0.5" max="4" step="0.1" value={questionSpacing} onChange={e => setQuestionSpacing(Number(e.target.value))} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500" />
                                </div>
                           </div>
                      </div>
                      <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-hidden bg-slate-200 flex items-center justify-center">
                          <div
                            id="preview-page"
                            ref={previewContainerRef}
                            className={`bg-white shadow-xl overflow-hidden ${pageSize === 'A4' ? 'aspect-[210/297]' : 'aspect-[8.5/11]'} h-full max-w-full mx-auto`}
                          >
                            <div 
                              id="preview-content"
                              ref={previewContentRef}
                              className="origin-top-left bg-white"
                              style={{
                                  width: pageSize === 'A4' ? '794px' : '816px',
                                  height: pageSize === 'A4' ? '1123px' : '1056px',
                                  padding: `${margin}mm`,
                                  fontSize: `${fontSize}pt`,
                              }}
                            >
                              <style>{`
                                  #preview-content { line-height: 1.5; color: #374151; overflow: hidden; }
                                  #preview-content h2 { font-size: 1.8em; font-weight: 700; line-height: 1.2; text-align: center; }
                                  #preview-content div[class*="justify-between"] p { font-size: 1.05em; }
                                  #preview-content p[class*="italic"] { font-size: 1em; text-align: center; color: #4b5563; }
                                  #preview-content ol { font-size: 1em; list-style-position: inside; list-style-type: decimal; }
                                  #preview-content ol > li:not(:last-child) { margin-bottom: ${questionSpacing}rem !important; }
                              `}</style>
                              <div className="max-w-none" dangerouslySetInnerHTML={{ __html: printPreviewContent }}/>
                            </div>
                          </div>
                      </div>
                  </div>
                  <div className="p-4 border-t flex justify-end bg-slate-50 rounded-b-2xl">
                      <button onClick={handleActualPrint} className="inline-flex items-center bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                          <PrintIcon />
                          <span className="ml-2">Print Now</span>
                      </button>
                  </div>
              </div>
          </div>
      )}
      
      {isCameraOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4 no-print backdrop-blur-sm">
              <div className="bg-slate-800 rounded-2xl shadow-2xl w-full max-w-2xl flex flex-col relative">
                  <div className="absolute top-0 right-0 p-2 z-10">
                      <button onClick={handleCloseCamera} className="text-slate-400 hover:text-white bg-slate-700/50 rounded-full p-2">
                          <XIcon />
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
      )}
    </>
  );
}