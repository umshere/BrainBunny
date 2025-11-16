# BrainyBunny.ai - Product Roadmap

This document outlines the product vision, current state, and future development phases for the BrainyBunny application.

## 1. Product Vision

To create an adaptive, AI-powered homework platform that makes learning fun and personalized for children. BrainyBunny aims to assist parents and educators by generating high-quality educational content while providing an engaging interactive experience for students to practice and master new concepts.

---

## 2. Bridging the Gap: From Vision to Reality

**The Core Truth:** The current application is a powerful parent-driven tool, but it does not yet fulfill the tagline's promise of autonomous adaptation. The parent is the adaptive engine, not the software.

To achieve our vision, we must evolve the system from a manual worksheet generator into a truly intelligent tutor. This requires addressing three fundamental gaps:

1.  **Lack of Autonomous Action:** The system currently identifies "Weak Points" but takes no action. It is a passive reporting tool. **Solution: Automate the Feedback Loop.**
2.  **Lack of Dynamic Change:** The system delivers static, pre-configured quizzes. It does not alter its strategy based on real-time student performance. **Solution: Implement Dynamic Difficulty Adjustment.**
3.  **Lack of a Connected Path:** Assignments are isolated events. A student completes a quiz, and the journey ends. There is no logical progression. **Solution: Build Learning Paths.**

The following development phases are structured to solve these problems directly.

---

## 3. Version 1.0.0 (The Foundation - July 2024)

The application is a fully-functional, client-side "guest mode" experience. It establishes the core components and demonstrates the manual adaptive loop.

### Key Implemented Features:

-   **✅ Full Guest Mode:** Session persisted in `localStorage`.
-   **✅ Multi-Student Management:** Parents can manage multiple profiles.
-   **✅ Two-Step Worksheet Generation:**
    1.  **Instant Question Generation:** Fast JSON generation for review.
    2.  **On-Demand Formatting:** Format approved questions for printing.
-   **✅ Interactive Student Assignments:** Worksheets can be assigned as on-screen quizzes.
-   **✅ Dynamic Quiz Engine:** UI adapts to multiple question types.
-   **✅ Manual Adaptive Loop:** The system tracks "Weak Points" for parents to act on.
-   **✅ Accessibility & UX Polish:** Adjustable font size, gamified feedback, and custom loading animations.

---

## 4. Future Development Phases

### Phase 1: Building the Foundation for Intelligence

**Goal:** Transition from a session-based guest model to a persistent, account-based system. This is a prerequisite for all future intelligence.

-   **[ ] Backend Development:** Build a Node.js (Express) or FastAPI backend.
-   **[ ] Database Setup:** Implement a Firestore or PostgreSQL database.
-   **[ ] User Authentication:** Integrate Firebase Authentication for Google Sign-In and email/password accounts.
-   **[ ] API Development:** Create API endpoints to manage users, students, assignments, and progress.
-   **[ ] Frontend Migration:** Migrate the frontend to use API calls instead of `localStorage` for all data.

### Phase 2: Implementing True Adaptation

**Goal:** Build the core intelligent tutoring system that fulfills the product's tagline.

-   **[ ] Task 1: Automate the Feedback Loop (Solves Gap #1)**
    -   When a student answers incorrectly, the system must automatically generate a new, targeted micro-assignment based on that specific "Weak Point".
    -   This new assignment is added directly to the student's queue without parent intervention.
-   **[ ] Task 2: Implement Dynamic Difficulty Adjustment (Solves Gap #2)**
    -   Track student mastery on a per-topic basis.
    -   A student's score on a topic must directly influence the difficulty (simpler vocabulary, easier numbers, more hints) of the next auto-generated assignment on that same topic.
-   **[ ] Task 3: Build Learning Paths (Solves Gap #3)**
    -   Define a curriculum graph with prerequisite topics (e.g., "single-digit addition" must be mastered before "double-digit addition").
    -   Create a system where students progress through this defined path, unlocking new topics as they demonstrate mastery.

### Phase 3: Monetization & Growth

**Goal:** Implement the credit-based economy and referral system to support the platform.

-   **[ ] Credit System Logic:** Implement backend logic for tracking, spending, and earning credits.
-   **[ ] Payment Integration:** Integrate Stripe for purchasing credit packs.
-   **[ ] Referral System:** Generate unique referral codes and implement rewards.

### Phase 4: Advanced AI & Gamification

**Goal:** Enhance the now-adaptive learning experience with more advanced AI capabilities and engaging game mechanics.

-   **[ ] AI-Powered Chatbot:** Create a parent/teacher assistant for reports and tips.
-   **[ ] Conversational Voice Apps:** Implement a "Talk to BrainyBunny" mode using the Gemini Live API for oral quizzes.
-   **[ ] Visual Enhancements:**
    -   Use `gemini-2.5-flash-image` to add illustrations to story problems.
    -   Use Veo to create short animated learning clips.
-   **[ ] Gamification & Rewards:**
    -   **[ ]** Implement an XP system (streaks, badges) based on progress through the Learning Path.
    -   **[ ]** Develop a reward mini-game unlocked by exceptional quiz scores.

### Phase 5: Expansion & Platform Growth

**Goal:** Expand the platform's reach and capabilities for educational institutions.

-   **[ ] Smart Reports:** Enhance analytics dashboards with charts and deeper insights.
-   **[ ] Classroom Management:** Build features for teachers to manage multiple students.
-   **[ ] School API:** Create an API for schools and other educational platforms to integrate with BrainyBunny.