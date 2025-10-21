# Mini Math Quiz – Requirement Specification

## 1. Overview
This document defines all functional and non-functional requirements for the **Mini Math Quiz** application.  
The quiz is a web component-based browser game where users solve math questions within a time limit.

## 2. Scope
The system allows players to:
- Enter a nickname.
- Choose a difficulty level (Easy or Medium).
- Answer a series of math questions within 60 seconds.
- Gain points for each correct answer.
- End the game immediately upon a wrong answer or when time runs out.
- View and store high scores per difficulty level in `localStorage`.
- Restart the quiz after it ends.

## 3. Functional Requirements

**ID** | **Requirement**
---|---
REQ-1 | The app shall collect a nickname before the game starts.
REQ-2 | The app shall allow selecting a difficulty: *easy* or *medium*. (Support for future implementation of “Hard” should be implemented.)
REQ-3 | The app shall shuffle the chosen difficulty’s questions once per game.
REQ-4 | The app shall display one question at a time in `<quiz-question>`.
REQ-5 | The player shall type an answer and submit (Enter or Submit button).
REQ-6 | The app shall evaluate the answer using the Calculator module.
REQ-7 | On a correct answer, the score shall increase by 1 and the next question shall render.
REQ-8 | On a wrong answer, the quiz shall end immediately.
REQ-9 | The quiz shall run a single countdown timer of 60 seconds per game.
REQ-10 | When time reaches 0, the quiz shall end immediately.
REQ-11 | At game end, the app shall show a result message (success/fail) and the final score.
REQ-12 | On success, the app shall persist `{nickname, score, difficulty}` in a difficulty-specific key: `highScores-<difficulty>`. (Supprt for future implementation of "Hard" difficulty.)
REQ-13 | The high-score view shall render the top 5 entries for the selected difficulty, sorted by score descending.
REQ-14 | The app shall display only the table for the current difficulty.
REQ-15 | The app shall provide a Restart button at the end of a game.
REQ-16 | Restart shall reset state (score, index, timer, UI visibility) and return to nickname → difficulty flow.
REQ-17 | Custom DOM events shall be used for component communication: `nickname-submitted`, `difficulty-submitted`, `answer-submitted`, `time-up`.
REQ-18 | All sub-components shall use shadow DOM encapsulation and event bubbling/composed where needed.
REQ-19 | Non-numeric answers shall be treated as incorrect or rejected.
REQ-20 | Empty nickname input shall be prevented.
REQ-21 | The app shall not repeat questions within one game until the shuffled list is exhausted.

## 4. Non-Functional Requirements

**ID** | **Requirement**
---|---
NFR-1 | The app shall run entirely in the client browser (no backend).
NFR-2 | State persistence shall use `localStorage`.
NFR-3 | The app shall be deployed on NETLIFY


