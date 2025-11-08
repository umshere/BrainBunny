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
};

const getBasePrompt = (details: GenerationDetails): string => {
    let taskDescription = '';
    
    if (details.mode === 'topic') {
        taskDescription = `The topic is: "${details.topic}". Please create a general homework sheet about this.`;
    } else { // weak_points mode
        if (details.imageBase64) {
            taskDescription = `
            The user has uploaded an image of a student's completed worksheet. Your first and most important task is to carefully analyze this image to identify which questions the student answered incorrectly.
            Based on these incorrect answers, determine the student's "weak points" or areas of misunderstanding.
            Then, generate a new worksheet with 10 questions that specifically target these weak areas to help the student practice and improve.
            Do not simply copy the provided questions. Create new, similar questions that address the same underlying concepts.
            If the user has also provided text input, use it as additional context to understand the weak points.
            The manually described weak points are: "${details.weakPoints}"
            `;
        } else {
            taskDescription = `
            The user has provided a list of topics or questions the student answered incorrectly. Your task is to analyze this information to identify the student's "weak points" or areas of misunderstanding.
            Then, generate a new worksheet with 10 questions that specifically target these weak areas to help the student practice and improve.
            The incorrect questions/topics are:
            ---
            ${details.weakPoints}
            ---
            Do not simply copy the provided questions. Create new, similar questions that address the same underlying concepts.
            `;
        }
    }

    return `
    You are an expert elementary school teacher. Your task is to create a homework worksheet for children, formatted as a single block of clean, safe HTML. 
    ${details.imageBase64 && details.mode === 'topic' ? "The user has provided an image of a sample worksheet. Use it as a strong reference for the style, difficulty, and format of the questions you generate." : ""}
    Do not include \`<html>\`, \`<head>\`, or \`<body>\` tags. The entire response must be renderable inside a parent \`<div>\`.
    Use Tailwind CSS classes for styling to make it look clean and professional on a standard A4 page.

    ${taskDescription}

    Please generate the HTML worksheet with the following structure:
    1.  A top-level container div. Use: \`<div class="p-8 bg-white rounded-lg shadow-lg border border-gray-200 font-serif">\`.
    2.  A section for "Name" and "Date". Use: \`<div class="flex justify-between items-center mb-8 pb-4 border-b-2 border-gray-200"> <p class="text-lg"><strong>Name:</strong> _________________________</p> <p class="text-lg"><strong>Date:</strong> _________________________</p> </div>\`
    3.  An \`<h2 class="text-3xl font-bold text-center text-gray-800 mb-4">\` for a clear, engaging title.
    4.  A \`<p class="text-center text-gray-600 mb-8 italic">\` for a simple, one-sentence instruction for the student.
    5.  An \`<ol class="list-decimal list-inside space-y-6 text-lg text-gray-700">\` with \`<li>\` tags for exactly 10 age-appropriate questions. Each question should have ample space below it for the answer (e.g., using <br> tags).

    Your entire output must be only the HTML code for the worksheet. Do not include any other text, explanations, or markdown formatting like \`\`\`html.
  `;
}

export async function generateHomework(details: GenerationDetails): Promise<string> {
  const model = 'gemini-2.5-flash';
  const prompt = getBasePrompt(details);
  
  const textPart = { text: prompt };
  const requestParts: any[] = [textPart];

  if (details.imageBase64) {
    const [header, data] = details.imageBase64.split(',');
    const mimeType = header?.match(/:(.*?);/)?.[1];
    
    if (mimeType && data) {
      const imagePart = { inlineData: { mimeType, data } };
      // In weak_points mode, image is the primary context, so it should come first.
      requestParts.unshift(imagePart);
    }
  }

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: { parts: requestParts },
    });
    
    return response.text.trim();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate content from Gemini API.");
  }
}