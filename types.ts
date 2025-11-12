import React from 'react';

export type GenerationMode = 'topic' | 'weak_points' | 'library';
export type PageSize = 'A4' | 'letter';
export type OutputView = 'worksheet' | 'answer_key';

export type GenerationDetails = {
  mode: GenerationMode;
  topic?: string;
  weakPoints?: string;
  imageBase64: string | null;
  gradeLevel: string;
  questionCount: number;
  questionTypes: string[];
  theme: string;
};

// For worksheet library
export type Topic = { title: string; prompt: string; icon: React.JSX.Element; category?: string };
export type GradePack = { grade: string; packs: Topic[]; };

// For student quiz mode
export type QuizQuestion = {
  question: string;
  options: string[];
  answer: string;
};