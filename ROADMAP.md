# BrainyBunny.ai - Product Roadmap

This document outlines the product vision, current state, and future development phases for the BrainyBunny application.

## 1. Product Vision

To create an adaptive, AI-powered homework platform that makes learning fun and personalized for children. BrainyBunny aims to assist parents and educators by generating high-quality educational content while providing an engaging interactive experience for students to practice and master new concepts.

---

## 2. Current State (Phase 0 Complete)

The application is a fully-functional, client-side "guest mode" experience built with React, TypeScript, and the Google Gemini API. It demonstrates the core product loop and key features.

### Key Implemented Features:

-   **✅ Full Guest Mode:** No login required. Session is persisted in `localStorage`.
-   **✅ Multi-Student Management:** Parents can create and manage profiles for multiple children in a single session.
-   **✅ Two-Step Worksheet Generation:**
    1.  **Instant Question Generation:** Fast, data-only JSON generation for immediate parental review.
    2.  **On-Demand Formatting:** Approved questions can be formatted into a beautiful, printable HTML worksheet.
-   **✅ Interactive Student Assignments:** Worksheets can be assigned as on-screen quizzes.
-   **✅ Dynamic Quiz Engine:** The student quiz card dynamically adapts to support multiple question types (Multiple Choice, Fill-in-the-Blank, etc.).
-   **✅ Adaptive Learning Loop:** The system tracks a student's "Weak Points" from incorrect answers, allowing parents to generate targeted practice worksheets.
-   **✅ Accessibility & UX Polish:**
    -   Adjustable font size in quizzes.
    -   Gamified quiz feedback and "lives" system.
    -   Creative, insightful loading animations instead of generic spinners.

---

## 3. Future Development Phases

### Phase 1: Backend & User Authentication (The Foundation)

**Goal:** Transition from a session-based guest model to a persistent, account-based system.

-   **[ ] Backend Development:** Build a Node.js (Express) or FastAPI backend.
-   **[ ] Database Setup:** Implement a Firestore or PostgreSQL database using the schema defined below.
-   **[ ] User Authentication:** Integrate Firebase Authentication for Google Sign-In and email/password accounts.
-   **[ ] API Development:** Create API endpoints to manage users, students, questions, and progress.
-   **[ ] Migration:** Migrate the frontend to use API calls instead of `localStorage` for all data.

**Firestore Schema:**
```
/users/{id}
  name, email, plan, credits, totalInvites, referredBy
/students/{userId}/{studentId}
  name, grade, avatar, weakPoints[]
/assignments/{studentId}/{assignmentId}
  topic, questions[], status, score, dateAssigned, dateCompleted
/transactions/{userId}/{transactionId}
  amount, creditsPurchased, paymentMethod, timestamp
```

### Phase 2: Monetization & Growth

**Goal:** Implement the credit-based economy and referral system.

-   **[ ] Credit System Logic:** Implement backend logic for tracking, spending, and earning credits.
    -   20 free credits on signup.
    -   1 worksheet = 1 credit.
-   **[ ] Payment Integration:** Integrate Stripe and the Apple Pay (Payment Request API) for purchasing credit packs.
-   **[ ] Referral System:**
    -   Generate unique referral codes for users.
    -   Track successful invites.
    -   Implement rewards: +2 credits per invite, 1-week Premium Trial for 5 invites.
-   **[ ] Premium Tier:** Develop a subscription model for unlimited access and advanced features.

### Phase 3: Advanced AI & Gamification

**Goal:** Enhance the learning experience with more advanced AI capabilities and engaging game mechanics.

-   **[ ] AI-Powered Chatbot:** Create a parent/teacher assistant for reports and tips.
-   **[ ] Conversational Voice Apps:** Implement a "Talk to BrainyBunny" mode using the Gemini Live API for oral quizzes.
-   **[ ] Visual Enhancements:**
    -   Use `gemini-2.5-flash-image` to add illustrations to story problems.
    -   Use Veo to create short animated learning clips or weekly progress summaries.
-   **[ ] Image Analysis:** Develop a feature to auto-grade worksheets uploaded from photos.
-   **[ ] Gamification & Rewards:**
    -   **[ ]** Implement an XP system (streaks, badges).
    -   **[ ]** **(New)** Develop a simple reward mini-game (e.g., "Dino Run" style) unlocked by exceptional quiz scores.

### Phase 4: Expansion & Platform Growth

**Goal:** Expand the platform's reach and capabilities for educational institutions.

-   **[ ] Smart Reports:** Enhance analytics dashboards with charts and deeper insights.
-   **[ ] Geo-Assignments:** Use Google Maps data for geography-based questions.
-   **[ ] Mobile App:** Develop a PWA or Flutter wrapper for a native mobile experience.
-   **[ ] Classroom Management:** Build features for teachers to manage multiple students.
-   **[ ] School API:** Create an API for schools and other educational platforms to integrate with BrainyBunny.
