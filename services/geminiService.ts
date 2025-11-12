import { GoogleGenAI, Type } from "@google/genai";
import { GenerationDetails, QuizQuestion } from '../types';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export async function generateLibraryTopics(gradeLevel: string): Promise<any[]> {
  const model = 'gemini-2.5-flash';
  const prompt = `
    You are a creative curriculum designer for elementary and middle school students. 
    Your task is to generate a list of 6 engaging and curiosity-driven worksheet topics for a ${gradeLevel} student. 
    The topics should be a mix of standard subjects and fun trivia or real-world connections.

    Return the list as a valid JSON array of objects.

    Each object must have three properties:
    1. "title": A short, fun, and catchy title for the worksheet (e.g., "Dinosaur Detectives").
    2. "prompt": A slightly more detailed prompt that can be used to generate the actual worksheet (e.g., "A worksheet with math word problems involving different dinosaur species and their sizes.").
    3. "category": A single word category from this list: ['Math', 'Science', 'History', 'Language', 'Art', 'Trivia', 'Logic'].
  `;
  
  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              prompt: { type: Type.STRING },
              category: { type: Type.STRING }
            },
            required: ["title", "prompt", "category"]
          }
        }
      }
    });
    
    // The response text is a JSON string, so we parse it.
    const jsonString = response.text.trim();
    return JSON.parse(jsonString);

  } catch (error) {
    console.error("Error generating library topics:", error);
    throw new Error("Failed to generate library topics from Gemini API.");
  }
}

export async function generateQuizQuestions(gradeLevel: string, topic: string, difficulty: string, level: number): Promise<QuizQuestion[]> {
  const model = 'gemini-2.5-flash';
  const prompt = `
    You are a fun and engaging quiz creator for children who structures quizzes in levels.
    Generate a quiz with 10 questions for a ${gradeLevel} student on the topic of "${topic}".
    If the topic is "surprise me", please choose an interesting, age-appropriate topic yourself (like 'Animal Facts', 'Famous Landmarks', 'Outer Space', or 'Funny History') and generate the questions for that.
    
    This quiz is for Level ${level}. The difficulty setting is ${difficulty}.
    The questions must become progressively more challenging as the level number increases. 
    - Level 1 should cover foundational concepts.
    - For levels greater than 1, ensure the questions are new and cover different aspects of the topic than the previous level to avoid repetition.
    - Adjust the challenge based on the difficulty setting ('Easy', 'Medium', 'Hard').

    The questions must be multiple-choice with exactly 4 options.

    Return the output as a valid JSON object with a single key "questions".
    The value of "questions" should be an array of objects.
    Each object must have the following properties:
    1. "question": The question text (string).
    2. "options": An array of 4 strings representing the answer choices.
    3. "answer": The string of the correct answer, which must exactly match one of the strings from the "options" array.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING }
                  },
                  answer: { type: Type.STRING }
                },
                required: ["question", "options", "answer"]
              }
            }
          },
          required: ["questions"]
        }
      }
    });

    const jsonString = response.text.trim();
    const parsedJson = JSON.parse(jsonString);
    return parsedJson.questions;
  } catch (error) {
    console.error("Error generating quiz questions:", error);
    throw new Error("Failed to generate quiz questions from Gemini API.");
  }
}

export async function analyzeImageForTopic(imageBase64: string): Promise<string> {
  const model = 'gemini-2.5-flash';
  const prompt = "Analyze the attached worksheet image. Identify the main subject or topic. Respond with only a short, descriptive topic title. For example: 'Simple Addition up to 20' or 'The Solar System'. Do not add any other text.";
  
  const [header, data] = imageBase64.split(',');
  const mimeType = header?.match(/:(.*?);/)?.[1];

  if (!mimeType || !data) {
    throw new Error("Invalid image format for analysis.");
  }

  const imagePart = { inlineData: { mimeType, data } };
  const textPart = { text: prompt };

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: { parts: [imagePart, textPart] },
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error analyzing image with Gemini API:", error);
    throw new Error("Failed to analyze image.");
  }
}

const getThemeInstructions = (theme: string): string => {
    switch (theme) {
        case 'Minimal':
            return `
            **Theme: Minimal**
            - Use a clean, sans-serif font like Arial or Helvetica.
            - Use simple, thin horizontal lines. For example, use '<hr class="border-gray-300">' instead of heavy borders.
            - Avoid all decorative elements, shadows, bold text (except for 'Name' and 'Date'), or heavy borders. The design should be extremely clean and simple.
            `;
        case 'Ink Saver':
            return `
            **Theme: Ink Saver**
            - This theme is critical for users who need to save printer ink.
            - Use a standard, light-weight font.
            - All lines, borders, and text must be light gray (e.g., 'text-gray-500', 'border-gray-200') instead of black.
            - Avoid any solid color blocks, background colors, or heavy/bold fonts.
            `;
        case 'Illustrated':
            return `
            **Theme: Illustrated**
            - Create a fun, engaging worksheet for a child.
            - Add one or two simple, line-art style SVG illustrations (as inline <svg> code) that are directly related to the worksheet's topic.
            - For example, for a math worksheet, you could add a simple drawing of a calculator or an abacus. For a science topic, a beaker or a plant.
            - Place these illustrations in the corners or margins of the page so they do not interfere with the questions.
            - The illustrations must be simple, appropriate for children, and rendered as clean SVG code.
            `;
        case 'Default':
        default:
            return `
            **Theme: Default**
            - Use a friendly, serif font for the main content.
            - The design should be clean but engaging, with clear headings and good spacing.
            - Use shadows and borders as specified in the base instructions to create a visually appealing layout.
            `;
    }
}

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

    const themeInstructions = getThemeInstructions(details.theme);

    return `
    You are an expert elementary school teacher. Your task is to create a homework worksheet and a corresponding answer key for children, each formatted as a single block of clean, safe HTML.
    ${details.imageBase64 && details.mode === 'topic' ? "The user has provided an image of a sample worksheet. Use it as a strong reference for the style, difficulty, and format of the questions you generate." : ""}
    
    **Instructions:**
    1.  **Grade Level:** The content must be appropriate for a ${details.gradeLevel} student.
    2.  **Number of Questions:** The worksheet must contain exactly ${details.questionCount} questions.
    3.  **Question Types:** The questions should be of the following types: ${details.questionTypes.join(', ')}.
    4.  **Theme & Styling:** You must adhere strictly to the styling instructions for the chosen theme.
        ${themeInstructions}
    5.  **Output Format:** You must generate TWO separate HTML blocks: the worksheet first, then the answer key.
    6.  **Separator:** Use '---ANSWER-KEY---' as a unique and exact separator on its own line between the worksheet HTML block and the answer key HTML block.

    ${taskDescription}

    **Worksheet HTML Structure:**
    -   A top-level container div: \`<div class="p-6 bg-white rounded-lg shadow-lg border border-gray-200">\`. (Adjust classes based on theme, e.g., no shadow for 'Minimal').
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