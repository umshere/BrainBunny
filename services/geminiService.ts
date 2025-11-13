import { GoogleGenAI, Type } from "@google/genai";
import { QuizQuestion, GenerationDetails, Topic } from '../types';

// Initialize the Google GenAI client
// The API key is automatically sourced from the process.env.API_KEY environment variable.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

// Define a schema for the quiz questions to ensure consistent JSON output from the model.
const quizQuestionSchema = {
    type: Type.OBJECT,
    properties: {
        question: { type: Type.STRING },
        options: {
            // FIX: Use oneOf to properly define a property that can be an array or null.
            oneOf: [
                { type: Type.ARRAY, items: { type: Type.STRING } },
                { type: Type.NULL }
            ]
        },
        answer: { type: Type.STRING },
        type: { type: Type.STRING, description: "The type of question, e.g., 'Multiple Choice', 'Short Answer'" },
        explanation: { type: Type.STRING, description: "A brief, kid-friendly explanation for why the answer is correct." },
    },
    required: ['question', 'answer', 'type', 'explanation'],
};

// Function to generate quiz questions based on user specifications.
export const generateQuizQuestions = async (details: GenerationDetails): Promise<QuizQuestion[]> => {
    try {
        const model = 'gemini-2.5-flash';

        const prompt = `
            Create a set of ${details.numQuestions} quiz questions for a ${details.gradeLevel} student.
            The subject is ${details.subject} and the topic is "${details.topic}".
            The worksheet type should be "${details.worksheetType}".
            
            Here are some custom instructions: "${details.customInstructions || 'None'}".

            Generate the questions in a JSON array format. Each object should contain:
            - "question": The question text.
            - "options": An array of possible answers. If the question type is "Multiple Choice" or "Matching", this array MUST contain several non-empty strings. For other types, this can be null.
            - "answer": The correct answer. If options are provided, the answer must be one of the values from the "options" array.
            - "type": The type of question, which should be "${details.worksheetType}".
            - "explanation": A simple, one or two-sentence explanation for why the correct answer is correct. This is for the student to learn from their mistakes.
            
            Ensure the questions are appropriate for the specified grade level and subject.
            Ensure the "explanation" field is always filled.
        `;
        
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.ARRAY,
                    items: quizQuestionSchema,
                },
            },
        });
        
        // The model's response text is a JSON string, which needs to be parsed.
        const responseText = response.text.trim();
        const questions = JSON.parse(responseText);
        
        if (!Array.isArray(questions) || questions.length === 0) {
            throw new Error("The AI returned an invalid or empty list of questions.");
        }

        return questions;

    } catch (error) {
        console.error("Error generating quiz questions:", error);
        throw new Error("Failed to generate quiz questions. Please check the topic and try again.");
    }
};

// Function to format the generated questions into a printable HTML worksheet.
export const formatWorksheetFromQuestions = async (
    questions: QuizQuestion[],
    details: GenerationDetails
): Promise<{ worksheet: string; answerKey: string }> => {
    try {
        const model = 'gemini-2.5-flash';

        const questionsString = questions.map((q, i) =>
            `${i + 1}. ${q.question}\n` +
            (q.options && q.options.length > 0 ? `   Options: ${q.options.join(', ')}\n` : '') +
            `   Answer: ${q.answer}\n`
        ).join('\n');

        const prompt = `
            Please format the following quiz questions into a visually appealing and printable HTML worksheet for a ${details.gradeLevel} student.
            The topic is "${details.topic}". Use Tailwind CSS classes for styling. Make it clean, kid-friendly, and professional.
            
            The final output should be a JSON object with two keys: "worksheet" and "answerKey".
            - The "worksheet" value should be an HTML string containing the worksheet with places for the student to write their name and date, the questions, and answer lines. DO NOT include the answers in the worksheet. Use dark text colors like text-slate-800.
            - The "answerKey" value should be a separate HTML string, clearly marked as an "Answer Key", showing the questions and their correct answers.
            - Use a div with class "p-8 max-w-4xl mx-auto" as the main container for both.
            - Use classes like "text-2xl font-bold mb-4" for headers, "space-y-4" for question lists, etc.
            - For multiple choice, list options using 'A.', 'B.', 'C.' etc.

            Here are the questions:
            ${questionsString}
        `;

        const response = await ai.models.generateContent({
            model,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        worksheet: { type: Type.STRING },
                        answerKey: { type: Type.STRING },
                    },
                    required: ['worksheet', 'answerKey'],
                },
            },
        });

        const responseText = response.text.trim();
        const formattedContent = JSON.parse(responseText);
        
        if (!formattedContent.worksheet || !formattedContent.answerKey) {
            throw new Error("AI failed to format the worksheet correctly.");
        }

        return formattedContent;

    } catch (error) {
        console.error("Error formatting worksheet:", error);
        throw new Error("Failed to format the worksheet. You can still assign the questions or try again.");
    }
};

// Function to generate a library of worksheet topics for inspiration.
export const generateLibraryTopics = async (gradeLevel: string): Promise<Topic[]> => {
    try {
        const model = 'gemini-2.5-flash';
        const categories = ['Math', 'Science', 'History', 'Language', 'Art', 'Logic', 'Trivia', 'Other'];

        const prompt = `
            Generate a list of 8 creative and engaging worksheet ideas for a ${gradeLevel} student.
            For each idea, provide a short, catchy title, a simple prompt for the AI to generate the worksheet, and a category from the following list: ${categories.join(', ')}.
            If a topic doesn't fit well into the main categories, please assign it the category "Other".
            
            Return the list as a JSON array. Each object in the array should have three keys:
            - "title": A short, catchy title for the worksheet (e.g., "Dinosaur Detectives").
            - "prompt": The text that would be used as the 'topic' to generate the worksheet (e.g., "Facts about Tyrannosaurus Rex").
            - "category": One of the provided categories.
        `;

        const response = await ai.models.generateContent({
            model,
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
                            category: { type: Type.STRING },
                        },
                        required: ['title', 'prompt', 'category'],
                    },
                },
            },
        });

        const responseText = response.text.trim();
        const topics = JSON.parse(responseText);

        if (!Array.isArray(topics) || topics.length === 0) {
            throw new Error("The AI returned an invalid or empty list of topics.");
        }

        return topics;

    } catch (error) {
        console.error("Error generating library topics:", error);
        throw new Error("Could not load worksheet ideas at this time. Please try again later.");
    }
};

// Function to generate a single, fun topic for a practice quiz.
export const generateSurpriseTopic = async (gradeLevel: string): Promise<string> => {
    try {
        const model = 'gemini-2.5-flash';
        const prompt = `
            Generate one fun, surprising, and simple quiz topic suitable for a ${gradeLevel} student.
            The topic should be engaging for a child. Examples: "Funny Animal Facts", "Outer Space Mysteries", "The World of Dinosaurs", "Magic and Potions".
            Return only the topic name as a single, clean string. Do not include quotes or any other text.
        `;
        
        const response = await ai.models.generateContent({
            model,
            contents: prompt,
        });
        
        const topic = response.text.trim().replace(/"/g, ''); // Clean up response
        if (!topic) {
            throw new Error("AI failed to generate a surprise topic.");
        }
        return topic;

    } catch (error) {
        console.error("Error generating surprise topic:", error);
        // Return a fun fallback topic
        return "Funny Animal Facts";
    }
};