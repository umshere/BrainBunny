# BrainyBunny.ai Product Roadmap

## 🚀 Product Vision

To create a comprehensive, AI-powered adaptive learning platform that helps students master subjects through personalized, engaging homework. BrainyBunny will empower parents and teachers with tools to generate tailored content, track progress, and receive actionable insights, while providing a fun and rewarding experience for students.

---

## ✅ Current State: The Foundation (Frontend Complete)

The current application serves as a robust, feature-complete frontend prototype. It operates in a "guest mode" using browser local storage to simulate the full user experience. The following core features and workflows are already implemented:

-   **Session-Based Guest Mode:** Full application access without requiring a login.
-   **Multi-Student Management:** Parents can create and switch between multiple student profiles within a single session.
-   **Decoupled AI Generation:** A fast, two-step process for creating worksheets:
    1.  **Instant Question Generation:** AI quickly generates structured question data (JSON).
    2.  **Parental Review & Finalization:** A dedicated screen allows parents to review questions before choosing to either format them into a printable worksheet or assign them as an interactive quiz.
-   **Interactive On-Screen Assignments:** Students can complete their assigned homework directly within the app.
-   **Dynamic Interactive Quizzes:** The quiz card dynamically adapts to the question type, supporting **Multiple Choice**, **Fill-in-the-Blank**, and **Short Answer** formats.
-   **Adaptive Learning Loop:** The system captures topics from incorrect answers as "Weak Points," which parents can then use to generate targeted practice worksheets, closing the learning loop.
-   **Polished & Engaging UI:** The user interface has been refined with consistent iconography, creative loading animations, and accessibility features like a student-controlled font size slider in the quiz.

---

## 🗺️ Future Development Roadmap

This roadmap outlines the major phases to transition BrainyBunny from a frontend prototype to a full-stack, monetizable application.

### Phase 1: Backend Infrastructure & User Persistence

**Goal:** Build the server-side foundation to store all user data persistently.

-   **[ ] Technology:**
    -   **Backend:** Node.js (Express) or similar on Firebase Cloud Functions.
    -   **Database:** Firestore for flexible, scalable data storage.
    -   **Authentication:** Firebase Authentication for secure user accounts (Google Sign-In, Email/Password).
-   **[ ] Milestones:**
    1.  **Database Schema:** Implement the Firestore schema for `users`, `students`, `assignments`, and `transactions`.
    2.  **User Authentication:** Set up Firebase Auth and create API endpoints for user registration and login.
    3.  **Data Migration:** Develop logic to seamlessly migrate a user's "guest session" data into their permanent account upon their first sign-up.
    4.  **API Endpoints:** Create secure API routes for all current functionalities (generating homework, updating profiles, completing assignments).

### Phase 2: Monetization & Growth Engine

**Goal:** Implement the credit-based economy and referral system to ensure platform sustainability.

-   **[ ] Technology:**
    -   **Payments:** Stripe for processing payments, utilizing the Payment Request API to support Apple Pay and Google Pay.
-   **[ ] Milestones:**
    1.  **Credit System Backend:** Implement logic to track user credits (initial grant, spending on generation, earning on completion).
    2.  **Stripe Integration:** Integrate Stripe Checkout or custom payment flows for purchasing credit packs.
    3.  **Referral System:** Build backend logic to manage referral codes, track successful invites, and award credits/trials.
    4.  **Premium Tier:** Introduce a subscription option for unlimited access and advanced features.

### Phase 3: Enhanced AI & Adaptive Learning

**Goal:** Leverage more advanced AI capabilities to make the learning experience truly personalized and interactive.

-   **[ ] Technology:**
    -   Gemini Live API, Gemini File Search API, Veo API.
-   **[ ] Milestones:**
    1.  **Conversational Voice Quizzes:** Implement the "Voice Quiz" feature using the **Gemini Live API** for real-time speech-to-text and text-to-speech.
    2.  **Generate from Document:** Allow users to upload their own curriculum documents (PDFs, DOCX) and generate worksheets using the **Gemini File Search API**.
    3.  **Deeper Answer Analysis:** Go beyond right/wrong. Analyze the *content* of student answers to provide more nuanced feedback and identify specific conceptual misunderstandings.
    4.  **AI Parent Coach:** Generate actionable tips and suggestions for parents based on a student's performance patterns.

### Phase 4: Advanced Features & Expansion

**Goal:** Broaden the platform's capabilities with rich media and tools for educators.

-   **[ ] Technology:**
    -   Veo API, Google Maps Platform.
-   **[ ] Milestones:**
    1.  **Animated Learning:** Use the **Veo API** to create short, animated learning clips or weekly progress summary videos ("Aditi's Learning Journey").
    2.  **Geography Assignments:** Integrate **Google Maps data** for interactive geography questions.
    3.  **Classroom Management:** Build a dedicated dashboard for teachers to manage multiple students, assign homework to groups, and track classroom-level progress.
    4.  **Expanded Content Library:** Develop a richer, more curated library of worksheets and lesson plans accessible to all users.
