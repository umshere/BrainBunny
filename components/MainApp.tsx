import React, { useState, useCallback, useRef, useEffect } from 'react';
import { generateHomework, analyzeImageForTopic } from '../services/geminiService';
import { usePersistentState } from '../hooks/usePersistentState';
import { GenerationMode, PageSize, OutputView } from '../types';
import { GeneratorForm } from './GeneratorForm';
import { HomeworkOutput } from './HomeworkOutput';
import { PrintPreviewModal } from './PrintPreviewModal';
import { CameraModal } from './CameraModal';
import { ComingSoon } from './ComingSoon';
import { FeedbackModal } from './FeedbackModal';
// Fix: Corrected typo in icon import name.
import { ChatBubbleLeftEllipsisIcon } from './icons';

const ANALYSIS_MESSAGES = [
    "Analyzing worksheet image...",
    "Identifying question patterns...",
    "Extracting topics and concepts...",
    "Finalizing analysis..."
];

declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

export const MainApp = () => {
  const [generationMode, setGenerationMode] = useState<GenerationMode>('library');
  const [topic, setTopic] = useState<string>('');
  const [weakPoints, setWeakPoints] = useState<string>('');
  const [image, setImage] = useState<string | null>(null);
  const [generatedHomework, setGeneratedHomework] = useState<string>('');
  const [generatedAnswerKey, setGeneratedAnswerKey] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAnalyzingImage, setIsAnalyzingImage] = useState<boolean>(false);
  const [analysisMessage, setAnalysisMessage] = useState<string>('');
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  
  const [isPrintPreviewOpen, setIsPrintPreviewOpen] = useState<boolean>(false);
  const [printPreviewContent, setPrintPreviewContent] = useState<string>('');

  const [gradeLevel, setGradeLevel] = usePersistentState<string>('gradeLevel', '3rd Grade');
  const [questionCount, setQuestionCount] = usePersistentState<number>('questionCount', 10);
  const [questionTypes, setQuestionTypes] = usePersistentState<string[]>('questionTypes', ['Mixed']);
  const [theme, setTheme] = usePersistentState<string>('theme', 'Default');

  const [isCameraOpen, setIsCameraOpen] = useState<boolean>(false);
  const [isFeedbackModalOpen, setIsFeedbackModalOpen] = useState<boolean>(false);
  const [hasStudentWeakSpots, setHasStudentWeakSpots] = useState<boolean>(false);
  
  const recognitionRef = useRef<any | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const mainFormRef = useRef<HTMLDivElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (isAnalyzingImage) {
        let messageIndex = 0;
        setAnalysisMessage(ANALYSIS_MESSAGES[0]);
        const intervalId = setInterval(() => {
            messageIndex = (messageIndex + 1) % ANALYSIS_MESSAGES.length;
            setAnalysisMessage(ANALYSIS_MESSAGES[messageIndex]);
        }, 2500);
        return () => clearInterval(intervalId);
    }
  }, [isAnalyzingImage]);

  useEffect(() => {
      if (generationMode === 'weak_points') {
          try {
              const stored = localStorage.getItem('brainyBunnyWeakSpots');
              const spots = stored ? JSON.parse(stored) : [];
              setHasStudentWeakSpots(spots.length > 0);
          } catch (e) {
              console.error("Failed to parse weak spots from localStorage", e);
              setHasStudentWeakSpots(false);
          }
      } else {
          setHasStudentWeakSpots(false);
      }
  }, [generationMode]);

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

    try {
      const { worksheet, answerKey } = await generateHomework({
        mode: generationMode,
        topic: topic,
        weakPoints: weakPoints,
        imageBase64: image,
        gradeLevel: gradeLevel,
        questionCount: questionCount,
        questionTypes: questionTypes,
        theme: theme,
      });
      setGeneratedHomework(worksheet);
      setGeneratedAnswerKey(answerKey);
    } catch (err) {
      setError('Failed to generate homework. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [topic, weakPoints, image, generationMode, gradeLevel, questionCount, questionTypes, theme]);
  
  const processImageFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64Image = reader.result as string;
            setImage(base64Image);
            setIsAnalyzingImage(true);
            setError(null);
            
            try {
                const extractedTopic = await analyzeImageForTopic(base64Image);
                if (generationMode === 'topic') {
                    setTopic(extractedTopic);
                } else {
                    setWeakPoints(extractedTopic);
                }
            } catch (err) {
                setError("Could not analyze image. Please enter the topic manually.");
                console.error(err);
            } finally {
                setIsAnalyzingImage(false);
            }
        };
        reader.readAsDataURL(file);
    } else {
        setError("Please select a valid image file.");
    }
  };
  
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
        processImageFile(file);
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
        const transcript = Array.from(event.results).map((result: any) => result[0]).map((result) => result.transcript).join('');
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
    setIsCameraOpen(true);
  };

  const handleCloseCamera = () => {
      if (streamRef.current) {
          streamRef.current.getTracks().forEach(track => track.stop());
      }
      setIsCameraOpen(false);
  };

  const handleUsePictureFromCamera = (file: File) => {
      processImageFile(file);
      handleCloseCamera();
  };
  
  const handleQuestionTypeToggle = (type: string) => {
    if (type === 'Mixed') {
        setQuestionTypes(['Mixed']);
    } else {
        const newTypes = questionTypes.filter(t => t !== 'Mixed');
        if (newTypes.includes(type)) {
            const filtered = newTypes.filter(t => t !== type);
            setQuestionTypes(filtered.length > 0 ? filtered : ['Mixed']);
        } else {
            setQuestionTypes([...newTypes, type]);
        }
    }
  };
  
  const handleTopicSelectFromLibrary = (prompt: string, grade: string) => {
    setTopic(prompt);
    setGradeLevel(grade);
    setGenerationMode('topic');
    mainFormRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleLoadWeakSpots = () => {
    try {
        const stored = localStorage.getItem('brainyBunnyWeakSpots');
        const spots: string[] = stored ? JSON.parse(stored) : [];
        if (spots.length > 0) {
            // Append to existing weak points, separated by a newline
            const newWeakPoints = spots.join('\n');
            setWeakPoints(prev => (prev ? `${prev}\n${newWeakPoints}` : newWeakPoints).trim());
        }
    } catch (e) {
        console.error("Failed to load weak spots", e);
        setError("Could not load the student's practice topics.");
    }
  };


  return (
    <>
      <main className="flex-1 container mx-auto p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div ref={mainFormRef}>
             <GeneratorForm 
                generationMode={generationMode}
                handleModeChange={handleModeChange}
                topic={topic}
                setTopic={setTopic}
                weakPoints={weakPoints}
                setWeakPoints={setWeakPoints}
                gradeLevel={gradeLevel}
                setGradeLevel={setGradeLevel}
                questionCount={questionCount}
                setQuestionCount={setQuestionCount}
                image={image}
                handleImageUpload={handleImageUpload}
                removeImage={removeImage}
                handleOpenCamera={handleOpenCamera}
                isAnalyzingImage={isAnalyzingImage}
                analysisMessage={analysisMessage}
                isRecording={isRecording}
                toggleVoiceRecognition={toggleVoiceRecognition}
                theme={theme}
                setTheme={setTheme}
                questionTypes={questionTypes}
                handleQuestionTypeToggle={handleQuestionTypeToggle}
                error={error}
                isLoading={isLoading}
                handleGenerate={handleGenerate}
                onTopicSelectFromLibrary={handleTopicSelectFromLibrary}
                hasStudentWeakSpots={hasStudentWeakSpots}
                onLoadWeakSpots={handleLoadWeakSpots}
             />
          </div>
          
          {generatedHomework && !isLoading && (
            <HomeworkOutput 
                worksheet={generatedHomework}
                answerKey={generatedAnswerKey}
                onPrint={openPrintPreview}
            />
          )}

          {!generatedHomework && !isLoading && <ComingSoon />}
        </div>
      </main>
      
      <PrintPreviewModal 
        isOpen={isPrintPreviewOpen}
        onClose={() => setIsPrintPreviewOpen(false)}
        content={printPreviewContent}
      />
      
      <CameraModal 
        isOpen={isCameraOpen}
        onClose={handleCloseCamera}
        onUsePicture={handleUsePictureFromCamera}
      />

      <FeedbackModal
        isOpen={isFeedbackModalOpen}
        onClose={() => setIsFeedbackModalOpen(false)}
      />

      <button
        onClick={() => setIsFeedbackModalOpen(true)}
        className="fixed bottom-6 right-6 bg-amber-500 hover:bg-amber-600 text-white font-bold p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-20"
        aria-label="Share Feedback"
      >
        <ChatBubbleLeftEllipsisIcon />
      </button>
    </>
  );
}