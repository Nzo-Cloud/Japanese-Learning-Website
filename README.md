# Japanese-Learning-Website

A free, browser-based Japanese learning website focused on **Hiragana quizzes** for beginners (JLPT N5 level).  

**Try it live:** [https://japanese-learning-website.netlify.app/](https://japanese-learning-website.netlify.app/)

---

## Overview

This website helps learners practice Hiragana through multiple study modes:

- **Random 25 Questions** – quick warm-up and short-term practice
- **Structured Sections (JLPT N5)** – focused memorization by Gojuon, Dakuten, Handakuten, and Yōon
- **Full Timed Quiz** – challenge mode with 10 and 15-minute options

It tracks **score and answered questions**, and shows **correct answers** at the end. Designed to be **mobile-friendly and interactive**.

---

## How to Use

1. Open [https://japanese-learning-website.netlify.app/](https://japanese-learning-website.netlify.app/) in your browser
2. Select **Intermediate (Hiragana)** or **Hard (Sentence Mode)**
3. For Intermediate:
   - Choose an exam type:
     - Random 25 Questions (warm-up)
     - Structured Sections (focused memorization)
     - Full Timed Quiz (10 or 15 mins)
4. Answer the quiz questions
5. Review your results and track weak characters

---

## File Structure (for reference)

```text
Japanese-Learning-Website/
│
├─ index.html             # Home page, select difficulty
├─ intermediate.html      # Exam type selection for Hiragana
├─ quiz.html              # Quiz interface
├─ results.html           # Results display
├─ hiragana.html          # Full Hiragana chart reference
│
├─ css/
│  └─ styles.css          # Styles for buttons, quiz layout, responsiveness
│
├─ js/
│  ├─ main.js             # Navigation & exam type logic
│  └─ quiz.js             # Quiz logic: question display, scoring, timer
│
├─ data/
│  └─ intermediate.json   # Quiz questions for Hiragana
│
└─ README.md
