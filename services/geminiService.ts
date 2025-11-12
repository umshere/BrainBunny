import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion, Topic, GenerationDetails } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// Step 2 of the new flow: Format approved questions into a printable worksheet
export const formatWorksheetFromQuestions = async (
  questions: QuizQuestion[],
  details: GenerationDetails
): Promise<{ worksheet: string; answerKey: string }> => {
  try {
    const model = 'gemini-2.5-pro';
    
    const questionsString = questions.map((q, i) => 
        `${i + 1}. ${q.question}\nOptions: ${q.options ? q.options.join(', ') : 'N/A'}`
    ).join('\n\n');

    const prompt = `
      You are an expert educator and designer creating a printable worksheet for a child.
      Your task is to format the following pre-generated questions into a visually appealing and age-appropriate worksheet using HTML and Tailwind CSS.

      **Worksheet Details:**
      - **Grade Level:** ${details.gradeLevel}
      - **Topic:** ${details.topic}
      - **Worksheet Type:** ${details.worksheetType}
      - **Custom Instructions:** ${details.customInstructions || "None"}

      **Questions to Format:**
      \`\`\`
      ${questionsString}
      \`\`\`

      **Formatting Rules:**
      1.  **Main Container:** The entire output MUST be enclosed in a single \`<div class="worksheet-container p-8 font-sans">\` tag.
      2.  **Text Color:** ALL text (headings, questions, options, etc.) MUST have a dark text color class, like \`text-slate-800\` or \`text-gray-700\`. This is critical for visibility on a white background.
      3.  **Styling:** Use Tailwind CSS classes for all styling. No inline styles or \`<style>\` blocks.
      4.  **Worksheet Header:**
          - Create a fun, engaging title using \`<h1 class="text-3xl font-bold text-slate-800 mb-2 text-center">\`.
          - Include "Name: __________" and "Date: __________" fields using \`<div class="flex justify-between mb-6 text-lg text-slate-700">\`.
      5.  **Questions:**
          - Each question should be in its own container, like \`<div class="mb-6">\`.
          - Number questions clearly (e.g., \`<p class="font-bold text-slate-800">\`).
          - For multiple choice, use a list format (\`<ul>\`, \`<li>\`) with clear labels (A, B, C, D).
          - For fill-in-the-blank, create visible underlined spaces.
      6.  **Visuals:** Add 1-2 simple, relevant SVG icons within the worksheet to make it visually appealing. Use Tailwind classes for sizing (e.g., 'w-16 h-16 mx-auto').
      7.  **Answer Key Separator:** You MUST separate the worksheet from the answer key using the exact HTML comment: \`<!-- ANSWER_KEY_SEPARATOR -->\`.
      8.  **Answer Key Formatting:**
          - The answer key should start with \`<h2 class="text-2xl font-bold mt-8 mb-4 border-t pt-4 text-slate-800">Answer Key</h2>\`.
          - List the answers clearly, corresponding to the question numbers.

      Generate the complete HTML now based on these rules.
    `;

    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    
    const fullContent = response.text;
    
    if (details.includeAnswerKey && fullContent.includes('<!-- ANSWER_KEY_SEPARATOR -->')) {
      const parts = fullContent.split('<!-- ANSWER_KEY_SEPARATOR -->');
      return { worksheet: parts[0], answerKey: parts[1] };
    } else {
      return { worksheet: fullContent, answerKey: '' };
    }

  } catch (error) {
    console.error("Error formatting worksheet:", error);
    throw new Error("Failed to format worksheet. The AI might be busy, please try again.");
  }
};


// Step 1 of the new flow: Generate structured JSON questions quickly.
export const generateQuizQuestions = async (
  details: GenerationDetails
): Promise<QuizQuestion[]> => {
  try {
    const model = 'gemini-2.5-flash';

    const prompt = `
      You are an expert in creating educational content for children.
      Generate ${details.numQuestions} quiz question(s) for a ${details.gradeLevel} student on the topic of "${details.topic}".
      The desired worksheet type is "${details.worksheetType}".
      Adhere to any custom instructions: "${details.customInstructions || 'None'}".

      For each question, you MUST provide the following fields in a JSON object: "question", "answer", and "type".
      The "type" field must exactly match the requested worksheet type: "${details.worksheetType}".

      - If the type is "Multiple Choice", you MUST also provide an "options" array with 4 distinct choices, one of which is the correct answer.
      - If the type is "Fill-in-the-Blank", the question text MUST include one or more "____" placeholders. The "answer" field should be the exact word(s) that fit in the blank. Do NOT provide an "options" array.
      - For "Short Answer", "Matching", or "Problem Solving", the "answer" field should contain the ideal correct answer. Do NOT provide an "options" array.
    `;

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
              question: { type: Type.STRING },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                nullable: true,
              },
              answer: { type: Type.STRING },
              type: { type: Type.STRING },
            },
            required: ["question", "answer", "type"],
          },
        },
      },
    });

    const jsonText = response.text;
    const questions = JSON.parse(jsonText);

    if (!Array.isArray(questions) || questions.length === 0) {
      throw new Error("AI returned no questions.");
    }

    return questions;

  } catch (error) {
    console.error("Error generating quiz questions:", error);
    throw new Error("Failed to generate quiz questions. Please check the topic and try again.");
  }
};


// Function to generate topics for the worksheet library
export const generateLibraryTopics = async (gradeLevel: string): Promise<Topic[]> => {
    try {
        const model = 'gemini-2.5-flash';
        const response = await ai.models.generateContent({
            model: model,
            contents: `Generate 8 diverse and fun worksheet topic ideas for a ${gradeLevel} student. For each topic, provide a short, engaging title, a simple one-sentence prompt for the AI to generate the worksheet, and a category from this list: Math, Science, History, Language, Art, Trivia, Logic.`,
            config: {
                responseMimeType: 'application/json',
                responseSchema: {
                    type: Type.ARRAY,
                    items: {
                        type: Type.OBJECT,
                        properties: {
                            title: { type: Type.STRING },
                            prompt: { type: Type.STRING },
                            category: { type: Type.STRING },
                        },
                        required: ['title', 'prompt', 'category'],
                    },
                },
            },
        });

        const jsonText = response.text;
        const topics = JSON.parse(jsonText);

        if (!Array.isArray(topics) || topics.length === 0) {
            throw new Error('AI returned no topics.');
        }

        return topics;
    } catch (error) {
        console.error('Error generating library topics:', error);
        throw new Error('Failed to fetch ideas. The AI might be overloaded, please try again.');
    }
};