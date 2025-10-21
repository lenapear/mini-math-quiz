# Mini Math Quiz – Manual Test Specification and Report

## Test Overview
This document describes the manual test procedures for verifying all requirements of the **Mini Math Quiz** application.

## Test Environment
- Device: Desktop / Laptop
- Storage: `localStorage` must be available and cleared before testing
- Start condition:  
  Clear stored data via DevTools → Application → Local Storage → remove  
  `highScores-easy` and `highScores-medium`, or run:
  ```js
  localStorage.removeItem('highScores-easy');
  localStorage.removeItem('highScores-medium');
  ```


# Test Cases

## Onboarding / Forms

### TC-01 – Nickname required
**Requirements:** REQ-1, REQ-20

**Steps:**
1. Load the app.
2. Leave nickname empty → click Start Game.

**Expected:** Input validation prevents continuation; game does not start.

### TC-02 – Nickname accepted
**Requirements:** REQ-1

**Steps:** 
1. Enter nickname (e.g., "Lena").
2. Click Start Game.

**Expected:** Nickname form hides; difficulty form shows.

### TC-03 – Difficulty selection (Easy)
**Requirements:** REQ-2, REQ-17

**Steps:** Click Easy.

**Expected:** Difficulty form hides; question and timer show; timer starts at 60.

### TC-03b – Difficulty selection (Medium)
**Requirements:** REQ-2, REQ-17

**Steps:** 
1. Enter nickname (e.g., "Daniel").
2. Click Start Game.
3. Click Medium.

**Expected:** Difficulty form hides; Medium question displays; timer starts at 60.

---

## Game Flow / Questions

### TC-04 – Questions shuffled
**Requirements:** REQ-3, REQ-4, REQ-21

**Steps:** Observe first question across multiple game reloads (restart multiple times).

**Expected:** Order differs between games; no repeats within the same game session.

### TC-05 – Submit correct answer
**Requirements:** REQ-5, REQ-6, REQ-7

**Steps:** 
1. Read the question.
2. Calculate the correct answer.
3. Type correct numeric answer → submit.

**Expected:** Next question shows; input cleared; score increases by 1.

### TC-06 – Score increments
**Requirements:** REQ-7

**Steps:** Answer three questions correctly in succession.

**Expected:** Score increments with each correct answer; final result shows score = 3.

### TC-07 – Wrong answer ends quiz
**Requirements:** REQ-8, REQ-11

**Steps:** 
1. Type an incorrect answer.
2. Submit.

**Expected:** Game ends immediately; timer stops; failure message displays with final score; high-score view visible.

### TC-08 – Non-numeric answer
**Requirements:** REQ-19

**Steps:** 
1. Type non-numeric characters (e.g., "abc").
2. Submit.

**Expected:** Treated as invalid/incorrect; quiz ends; failure message shown.

### TC-09 – Time-up event
**Requirements:** REQ-9, REQ-10, REQ-11

**Steps:** 
1. Start game.
2. Wait 60 seconds without answering.

**Expected:** Timer reaches 0; timer stops; quiz ends; failure message + final score displayed; high-score view visible.

### TC-10 – Result message content
**Requirements:** REQ-11

**Steps:** 
1. Answer 2–3 questions correctly.
2. Finish game (via correct answer or timeout).

**Expected:** Result message displays outcome (success/failure) and final score.

### TC-11 – Restart button visibility
**Requirements:** REQ-15

**Steps:** 
1. Finish a game (any outcome).
2. Observe the UI.

**Expected:** Restart button appears below high-score table.

### TC-12 – Restart resets state
**Requirements:** REQ-16

**Steps:** 
1. Click Restart button.

**Expected:** High-score table hides; timer resets; nickname form reappears.

---

## High-Score Management

### TC-13 – High-score persistence (localStorage)
**Requirements:** REQ-12

**Steps:**
1. Play Easy difficulty and answer at least 1 question correctly.
2. Finish game; note the nickname and score in high-score table.
3. Close the browser tab completely.
4. Reopen the app.
5. Enter any nickname and select Easy difficulty.
6. View the high-score table.

**Expected:** Previous score persists and appears in the high-score table with the saved nickname and score.

### TC-14 – High-score top-5 ranking and sorting
**Requirements:** REQ-13

**Steps:**
1. Clear localStorage before starting.
2. Play Easy difficulty 6 separate times with scores of: 2, 5, 1, 8, 3, 6 (vary answers to achieve different scores).
3. After each game ends, check the high-score table.

**Expected:** 
- Only top 5 scores display in the table.
- Scores are sorted in descending order: 8, 6, 5, 3, 2.
- Score of 1 does not appear (below top 5).

### TC-15 – Difficulty-specific high scores
**Requirements:** REQ-12, REQ-14

**Steps:**
1. Play Easy difficulty and get 5 correct answers → finish and note score.
2. Click Restart.
3. Select Medium difficulty and get 2 correct answers → finish and note score.
4. View the high-score table (currently showing Medium).
5. Switch difficulty selector to Easy.
6. View the Easy high-score table.

**Expected:**
- Medium high-score table shows score of 2 (only Medium scores).
- Easy high-score table shows score of 5 (only Easy scores).
- Tables are completely separate; Easy score does not appear in Medium table and vice versa.

---
## Test Reports

**Date:** 2025-10-21

**Summary:**

| Metric           | Count |
| ---------------- | ----- |
| Total test cases | 15    |
| Passed           | 15    |
| Failed           | —     |
| Blocked / N/A    | —     |

**Notes:**
All critical requirements verified.
