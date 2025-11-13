# BrainyBunny.ai - AI Coding Assistant Context

This document provides context for an AI coding assistant to understand the BrainyBunny.ai project, its architecture, and development guidelines.

## 1. Project Overview

BrainyBunny is a web application that helps parents and educators create personalized homework for children. It uses the Google Gemini API to generate content. The core user experience is a session-based "guest mode" that allows for full functionality without requiring a login, supporting multiple student profiles within a single session.

The key user flow is:
1.  **Guest Login**: User starts a session from a public landing page.
2.  **Profile Setup**: User creates one or more student profiles (name, grade).
3.  **Profile Selection**: User chooses which student is active or enters the "Parent Zone".
4.  **Parent Zone**:
    *   **Generate Questions**: The parent uses a form to specify a topic, grade, etc. The app calls the Gemini API to generate a list of questions (JSON). This is a fast, data-only operation.
    *   **Review Questions**: The parent reviews the generated questions. They can approve them, or regenerate if needed.
    *   **Finalize**: From the review screen, the parent can either:
        *   **Assign as Interactive Homework**: The questions are added to the active student's assignment list.
        *   **Format for Printing**: A second Gemini API call is made to format the approved questions into a styled, printable HTML worksheet.
5.  **Student Zone**:
    *   The student sees their list of pending interactive assignments.
    *   They can complete assignments on-screen.
    *   Performance is tracked, and topics of incorrect answers are saved as "Weak Points" on their profile.
6.  **Adaptive Loop**: Student performance is tracked, and topics from incorrect answers are saved as "Weak Points" to their profile. Parents can view these topics and use them to manually create new, targeted worksheets, creating a personalized learning cycle.

## 2. Technology Stack

-   **Frontend**: React with TypeScript, using hooks for state management.
-   **Styling**: Tailwind CSS for utility-first styling.
-   **AI**: Google Gemini API via `@google/genai` library.
    -   `gemini-2.5-flash`: This is the primary model used for all AI tasks, including fast, structured JSON generation (quiz questions, library topics) and for formatting the printable HTML worksheets.
-   **State Management**: React Context API (`UserContext`) for global session state.
-   **Persistence**: A custom `usePersistentState` hook saves the entire session object to `window.localStorage`, enabling a seamless guest experience across browser refreshes.

## 3. Code Structure

-   `index.tsx`: Main entry point.
-   `App.tsx`: Sets up the global `UserProvider`.
-   `components/`: Contains all React components, organized by feature area (e.g., `parent/`, `student/`).
    -   `MainDashboard.tsx`: The top-level component that acts as a router, deciding which view to show based on the session state (landing, setup, profile selector, parent, or student zone).
    -   `contexts/UserContext.tsx`: The heart of the application state. Manages the session object, including adding students, selecting the active student, adding assignments, and completing them.
    -   `services/geminiService.ts`: All interactions with the Gemini API are centralized here.
-   `types.ts`: Defines all shared TypeScript types (`StudentProfile`, `Assignment`, `SessionData`, etc.).
-   `hooks/`: Custom React hooks, like `usePersistentState`.

## 4. Core AI Functionalities & Prompts

-   **`generateQuizQuestions`**:
    -   **Goal**: Quickly generate structured question data.
    -   **Model**: `gemini-2.5-flash`
    -   **Prompt Strategy**: Asks for a specific number of questions on a topic for a grade level. Crucially, it uses `responseMimeType: "application/json"` and a `responseSchema` to ensure the output is valid, parseable JSON.
-   **`formatWorksheetFromQuestions`**:
    -   **Goal**: Convert approved JSON questions into beautiful, printable HTML.
    -   **Model**: `gemini-2.5-flash`
    -   **Prompt Strategy**: Provides the pre-generated questions and a strict set of formatting rules. It heavily emphasizes using Tailwind CSS classes and explicitly mandates dark text colors (e.g., `text-slate-800`) to prevent styling bugs.
-   **`generateLibraryTopics`**:
    -   **Goal**: Generate creative, diverse topic ideas for the library feature.
    -   **Model**: `gemini-2.5-flash`
    -   **Prompt Strategy**: Similar to question generation, it requests structured JSON output with a title, a prompt for generation, and a category.

## 5. Development Guidelines for AI Assistant

-   **State is King**: All user data (profiles, assignments) is managed through `UserContext`. Components should consume data from the `useUser()` hook and use the provided functions (`addStudent`, `completeAssignment`, etc.) to modify state. Do not manage session state locally in components.
-   **Follow the Workflow**: The parent's journey is now `idle` -> `generating_questions` -> `reviewing` -> `complete`. When adding features, respect this state machine, managed in `MainApp.tsx`.
-   **Decouple Generation and Formatting**: Do not create new features that generate HTML directly in one step. First, generate the necessary data as JSON. Then, if needed, create a separate function to format that data for display. This keeps the app fast and responsive.
-   **Be Explicit with Prompts**: When prompting Gemini, be extremely clear about the desired output format, especially when requesting HTML. Specify Tailwind classes and other structural requirements to ensure consistency.
-   **Types are Truth**: Refer to `types.ts` for all data structures. Ensure all new code is strongly typed.
-   **Centralize API Calls**: All new Gemini API interactions should be added as functions within `services/geminiService.ts`.

## 6. Project Roadmap Awareness

-   **Consult the Roadmap**: A `ROADMAP.md` file exists in the root directory. This document outlines the long-term vision and phased development plan for the project. Please consult it to understand the context of future features.
-   **Update on Progress**: When prompted, or after implementing a significant feature milestone from the roadmap, please update the `ROADMAP.md` file to reflect this progress (e.g., by checking off a task `[x]`). This helps keep our planning documents aligned with the current state of the application.