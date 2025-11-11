import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

type GenerationDetails = {
  mode: 'topic' | 'weak_points';
  topic?: string;
  weakPoints?: string;
  imageBase64: string | null;
  gradeLevel: string;
  questionCount: number;
  questionTypes: string[];
};

const getBasePrompt = (details: GenerationDetails): string => {
    let taskDescription = '';
    
    if (details.mode === 'topic') {
        taskDescription = `The topic is: "${details.topic}". Please create a general homework sheet about this.`;
    } else { // weak_points mode
        if (details.imageBase64) {
            taskDescription = `
            The user has uploaded an image of a student's completed worksheet. Your first and most important task is to carefully analyze this image to identify which questions the student answered incorrectly.
            Based on these incorrect answers, determine the student's "weak points" or areas of misunderstanding. Then, generate a new worksheet that specifically targets these weak areas to help the student practice and improve.
            Do not simply copy the provided questions. Create new, similar questions that address the same underlying concepts.
            If the user has also provided text input, use it as additional context to understand the weak points.
            The manually described weak points are: "${details.weakPoints}"
            `;
        } else {
            taskDescription = `
            The user has provided a list of topics or questions the student answered incorrectly. Your task is to analyze this information to identify the student's "weak points" or areas of misunderstanding.
            Then, generate a new worksheet that specifically targets these weak areas to help the student practice and improve.
            The incorrect questions/topics are:
            ---
            ${details.weakPoints}
            ---
            Do not simply copy the provided questions. Create new, similar questions that address the same underlying concepts.
            `;
        }
    }

    return `
    You are an expert elementary school teacher. Your task is to create a homework worksheet and a corresponding answer key for children, each formatted as a single block of clean, safe HTML.
    ${details.imageBase64 && details.mode === 'topic' ? "The user has provided an image of a sample worksheet. Use it as a strong reference for the style, difficulty, and format of the questions you generate." : ""}
    
    **Instructions:**
    1.  **Grade Level:** The content must be appropriate for a ${details.gradeLevel} student.
    2.  **Number of Questions:** The worksheet must contain exactly ${details.questionCount} questions.
    3.  **Question Types:** The questions should be of the following types: ${details.questionTypes.join(', ')}.
    4.  **Output Format:** You must generate TWO separate HTML blocks: the worksheet first, then the answer key.
    5.  **Separator:** Use '---ANSWER-KEY---' as a unique and exact separator on its own line between the worksheet HTML block and the answer key HTML block.

    ${taskDescription}

    **Worksheet HTML Structure:**
    -   A top-level container div: \`<div class="p-6 bg-white rounded-lg shadow-lg border border-gray-200 font-serif">\`.
    -   An \`<h2 class="font-bold text-center text-gray-800 mb-2">\` for a clear, engaging title.
    -   A \`<p class="text-center text-gray-600 mb-6 italic">\` for a simple, one-sentence instruction.
    -   A section for "Name" and "Date", placed *after* the title and instructions. Use: \`<div class="flex justify-between items-center mb-6 pb-2 border-b-2 border-gray-200"> <p><strong>Name:</strong> _________________________</p> <p><strong>Date:</strong> _________________________</p> </div>\`
    -   An \`<ol class="list-decimal list-inside text-gray-700">\` with \`<li>\` tags for the questions.

    **Answer Key HTML Structure:**
    -   A top-level container div, identical to the worksheet's container.
    -   A title: \`<h2 class="font-bold text-center text-gray-800 mb-4">Answer Key</h2>\`.
    -   An ordered list (\`<ol>\`) that corresponds to the questions in the worksheet.
    -   Each list item (\`<li>\`) should contain the correct answer. For complex problems (like math word problems), provide a brief, step-by-step explanation within the list item.

    Your entire output must be only the HTML code. Do not include \`\`\`html, \`<html>\`, \`<head>\`, or \`<body>\` tags.
  `;
}

export async function generateHomework(details: GenerationDetails): Promise<{ worksheet: string; answerKey: string; }> {
  const model = 'gemini-2.5-flash';
  const prompt = getBasePrompt(details);
  
  const textPart = { text: prompt };
  const requestParts: any[] = [textPart];

  if (details.imageBase64) {
    const [header, data] = details.imageBase64.split(',');
    const mimeType = header?.match(/:(.*?);/)?.[1];
    
    if (mimeType && data) {
      const imagePart = { inlineData: { mimeType, data } };
      requestParts.unshift(imagePart);
    }
  }

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: { parts: requestParts },
    });
    
    const responseText = response.text.trim();
    const separator = '---ANSWER-KEY---';
    const separatorIndex = responseText.indexOf(separator);

    if (separatorIndex !== -1) {
        const worksheet = responseText.substring(0, separatorIndex).trim();
        const answerKey = responseText.substring(separatorIndex + separator.length).trim();
        return { worksheet, answerKey };
    } else {
        // Fallback if the separator is not found
        return { worksheet: responseText, answerKey: '<div class="p-6 bg-white rounded-lg shadow-lg border border-gray-200 font-serif"><p>Sorry, the answer key could not be generated for this worksheet.</p></div>' };
    }

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate content from Gemini API.");
  }
}