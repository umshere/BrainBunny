import React, { useRef } from 'react';
import { GenerationMode, PageSize } from '../types';
import { SparklesIcon, ArrowPathIcon, MicrophoneIcon, ArrowUpTrayIcon, XMarkIcon, CameraIcon, PaintBrushIcon, EyeDropperIcon, Bars3BottomLeftIcon, DocumentIcon } from './icons';
import { WorksheetLibrary } from './WorksheetLibrary';

const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

const SAMPLE_TOPICS = [
  "Compass Directions for 3rd grade",
  "Simple addition up to 20",
  "The Water Cycle for kids",
  "Names of Planets in the Solar System",
];

const GRADE_LEVELS = ["Kindergarten", "1st Grade", "2nd Grade", "3rd Grade", "4th Grade", "5th Grade", "6th Grade", "7th Grade", "8th Grade"];
const QUESTION_TYPES = ["Multiple Choice", "Word Problems", "Fill-in-the-Blank", "Mixed"];
const THEMES = ["Default", "Minimal", "Ink Saver", "Illustrated"];

type GeneratorFormProps = {
    generationMode: GenerationMode;
    handleModeChange: (mode: GenerationMode) => void;
    topic: string;
    setTopic: (value: string) => void;
    weakPoints: string;
    setWeakPoints: (value: string) => void;
    gradeLevel: string;
    setGradeLevel: (value: string) => void;
    questionCount: number;
    setQuestionCount: (value: number) => void;
    image: string | null;
    handleImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
    removeImage: (e: React.MouseEvent) => void;
    handleOpenCamera: () => void;
    isAnalyzingImage: boolean;
    analysisMessage: string;
    isRecording: boolean;
    toggleVoiceRecognition: () => void;
    theme: string;
    setTheme: (value: string) => void;
    questionTypes: string[];
    handleQuestionTypeToggle: (type: string) => void;
    error: string | null;
    isLoading: boolean;
    handleGenerate: () => void;
    onTopicSelectFromLibrary: (prompt: string, grade: string) => void;
    hasStudentWeakSpots: boolean;
    onLoadWeakSpots: () => void;
};

export const GeneratorForm = (props: GeneratorFormProps) => {
    const {
        generationMode, handleModeChange, topic, setTopic, weakPoints, setWeakPoints,
        gradeLevel, setGradeLevel, questionCount, setQuestionCount, image, handleImageUpload,
        removeImage, handleOpenCamera, isAnalyzingImage, analysisMessage, isRecording,
        toggleVoiceRecognition, theme, setTheme, questionTypes, handleQuestionTypeToggle,
        error, isLoading, handleGenerate, onTopicSelectFromLibrary, hasStudentWeakSpots, onLoadWeakSpots
    } = props;
    
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    return (
        <div className="bg-white p-6 md:p-8 rounded-2xl shadow-lg border border-slate-200">
            <h2 className="text-2xl font-bold text-slate-800 mb-2">Create a New Homework Sheet</h2>
            <p className="text-slate-500 mb-6">Choose how you want to generate questions for your student.</p>

            <div className="flex justify-center border-b border-slate-200 mb-6">
                 <TabButton
                    isActive={generationMode === 'library'}
                    onClick={() => handleModeChange('library')}
                    label="Explore Library"
                />
                <TabButton
                    isActive={generationMode === 'topic'}
                    onClick={() => handleModeChange('topic')}
                    label="From a Topic"
                />
                <TabButton
                    isActive={generationMode === 'weak_points'}
                    onClick={() => handleModeChange('weak_points')}
                    label="From Weak Points"
                />
            </div>
            
            {generationMode === 'library' && (
                <WorksheetLibrary onTopicSelect={onTopicSelectFromLibrary} />
            )}

            {generationMode !== 'library' && (
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
                    <GenerationSettings gradeLevel={gradeLevel} setGradeLevel={setGradeLevel} questionCount={questionCount} setQuestionCount={setQuestionCount} />
                    <div className="mt-4">
                          <label className="block text-sm font-medium text-slate-700 mb-1">Upload style reference (Optional)</label>
                          <p className="text-xs text-slate-500 mb-2">Provide an example worksheet image for style and format inspiration.</p>
                          <UploadArea {...{fileInputRef, image, removeImage, isAnalyzingImage, analysisMessage, handleOpenCamera, handleImageUpload}} />
                      </div>
                  </div>
                ) : ( // weak_points mode
                  <div>
                      {hasStudentWeakSpots && (
                          <div className="mb-4 p-4 bg-sky-50 border-2 border-dashed border-sky-200 rounded-lg text-center">
                              <p className="font-semibold text-sky-800">Practice makes perfect!</p>
                              <p className="text-sm text-sky-600 mb-3">We noticed some tricky topics from the Student Zone.</p>
                              <button onClick={onLoadWeakSpots} className="inline-flex items-center bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                                  <SparklesIcon className="w-5 h-5 mr-2"/> Load Practice Topics
                              </button>
                          </div>
                      )}
                      <label className="block text-sm font-medium text-slate-700 mb-1">Upload Worksheet to Analyze</label>
                      <div className="mb-4">
                          <UploadArea {...{fileInputRef, image, removeImage, isAnalyzingImage, analysisMessage, handleOpenCamera, handleImageUpload}} />
                      </div>
                      <label htmlFor="weak_points" className="block text-sm font-medium text-slate-700 mb-1">
                          Detected Topic / Weak Points (Editable)
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
                      <GenerationSettings gradeLevel={gradeLevel} setGradeLevel={setGradeLevel} questionCount={questionCount} setQuestionCount={setQuestionCount} />
                  </div>
                )}

                <ThemeSelector theme={theme} setTheme={setTheme} />
                <QuestionTypeSelector questionTypes={questionTypes} handleQuestionTypeToggle={handleQuestionTypeToggle} />
              
                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

                <div className="mt-8 text-center">
                  <button
                    onClick={handleGenerate}
                    disabled={isLoading || isAnalyzingImage}
                    className="w-full sm:w-auto inline-flex items-center justify-center bg-amber-500 hover:bg-amber-600 disabled:bg-slate-300 text-white font-bold py-3 px-8 rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500"
                  >
                    {isLoading ? (
                      <><ArrowPathIcon className="w-6 h-6 animate-spin" /><span className="ml-2">Generating...</span></>
                    ) : isAnalyzingImage ? (
                      <><ArrowPathIcon className="w-6 h-6 animate-spin" /><span className="ml-2">Analyzing...</span></>
                    ) : (
                      <><SparklesIcon className="w-6 h-6" /><span className="ml-2">Generate Homework</span></>
                    )}
                  </button>
                </div>
              </div>
            )}
        </div>
    );
};

// Sub-components for the form
const TabButton = ({ isActive, onClick, label }: { isActive: boolean, onClick: () => void, label: string }) => (
    <button
        onClick={onClick}
        className={`px-4 py-3 font-semibold text-sm transition-all duration-200 border-b-2 -mb-px
        ${isActive ? 'border-amber-500 text-amber-600' : 'border-transparent text-slate-500 hover:text-slate-800 hover:border-slate-300'}`}
    >
        <span>{label}</span>
    </button>
);


const GenerationSettings = ({ gradeLevel, setGradeLevel, questionCount, setQuestionCount }: any) => (
    <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
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
);

const ThemeSelector = ({ theme, setTheme }: any) => {
    const themeIcons: { [key: string]: React.JSX.Element } = {
        "Default": <DocumentIcon />, "Minimal": <Bars3BottomLeftIcon />, "Ink Saver": <EyeDropperIcon />, "Illustrated": <PaintBrushIcon />
    };
    return (
        <div className="pt-4">
            <label className="block text-sm font-medium text-slate-700 mb-2">Theme</label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {THEMES.map(themeName => (
                    <button key={themeName} onClick={() => setTheme(themeName)} className={`p-3 rounded-lg border-2 text-center transition-all duration-200 ${theme === themeName ? 'border-amber-500 bg-amber-50' : 'border-slate-300 hover:border-amber-400'}`}>
                        <div className="flex justify-center items-center mb-1 text-slate-600">{themeIcons[themeName]}</div>
                        <span className="text-sm font-semibold text-slate-700">{themeName}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

const QuestionTypeSelector = ({ questionTypes, handleQuestionTypeToggle }: any) => (
    <div className="pt-4">
        <label className="block text-sm font-medium text-slate-700 mb-2">Question Types</label>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 rounded-lg p-1 bg-slate-100 border border-slate-200">
            {QUESTION_TYPES.map((type) => (
                <button
                    key={type}
                    onClick={() => handleQuestionTypeToggle(type)}
                    className={`px-3 py-2 text-sm font-semibold rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-1 focus:ring-offset-slate-100 ${questionTypes.includes(type) ? 'bg-amber-500 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-200'}`}
                >
                    {type}
                </button>
            ))}
        </div>
    </div>
);

const UploadArea = ({ fileInputRef, image, removeImage, isAnalyzingImage, analysisMessage, handleOpenCamera, handleImageUpload }: any) => (
    <div className="flex items-center justify-center w-full">
        <label htmlFor="dropzone-file" className={`flex flex-col items-center justify-center w-full h-48 border-2 border-slate-300 border-dashed rounded-lg cursor-pointer bg-slate-50 hover:bg-slate-100 transition relative overflow-hidden ${image && !isAnalyzingImage ? 'p-0' : 'p-5'}`}>
            {isAnalyzingImage ? <AnalysisLoader message={analysisMessage} /> : image ? (
                <>
                    <img src={image} alt="Uploaded worksheet preview" className="w-full h-full object-contain rounded-lg" />
                    <button onClick={removeImage} className="absolute top-2 right-2 bg-slate-800/60 text-white rounded-full p-1 shadow-md hover:bg-red-600 transition-colors" aria-label="Remove image">
                        <XMarkIcon />
                    </button>
                </>
            ) : (
                <UploadPlaceholder onOpenCamera={(e: React.MouseEvent) => { e.preventDefault(); e.stopPropagation(); handleOpenCamera(); }} />
            )}
            <input ref={fileInputRef} id="dropzone-file" type="file" className="hidden" onChange={handleImageUpload} accept="image/*" />
        </label>
    </div>
);

const AnalysisLoader = ({ message }: { message: string }) => (
    <div className="absolute inset-0 bg-slate-50/80 backdrop-blur-sm flex flex-col items-center justify-center text-center p-4">
        <ArrowPathIcon className="animate-spin w-8 h-8 text-slate-700" />
        <p className="mt-2 text-sm text-slate-600 font-semibold animate-pulse">{message}</p>
    </div>
);

const UploadPlaceholder = ({ onOpenCamera }: { onOpenCamera: (e: React.MouseEvent) => void }) => (
    <div className="flex flex-col items-center justify-center text-center">
        <ArrowUpTrayIcon className="w-8 h-8 mb-4 text-slate-500" />
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