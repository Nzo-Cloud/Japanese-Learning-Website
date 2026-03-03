let selectedAnswer = null; // tracks choice for current question
let allQuestions = [];
let questions = [];
let currentIndex = 0;
let score = 0;
let userAnswers = [];
let timer = null;
let interval = null;
let sectionIndex = 0;

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const nextBtn = document.getElementById("nextBtn");
const homeBtn = document.getElementById("homeBtn");
const timerEl = document.getElementById("timer");

const examType = localStorage.getItem("examType") || "random";
const timerValue = localStorage.getItem("timerValue");

const difficulty = localStorage.getItem("difficulty") || "intermediate";
fetch(`data/${difficulty}.json`)
  .then(res => res.json())
  .then(data => {
    allQuestions = data;
    configureExam();
    showQuestion();
  });

function configureExam() {

  if (examType === "random") {
      questions = shuffle([...allQuestions]).slice(0, 25);
      timer = 150; // 2.5 minutes default for random 25
      startTimer();
  }

  if (examType === "structured") {
    sectionIndex = 0; // always start at first section
    questions = getStructuredSection(sectionIndex);
    currentIndex = 0;
    userAnswers = []; // start fresh
  }

  if (examType === "full") {
    questions = shuffle([...allQuestions]);

    // Default timer if timerValue is missing
    timer = timerValue ? parseInt(timerValue) : 900; // 15 min default
    startTimer();
    }
}

function getStructuredSection(sectionIndex) {
    const sections = [
        q => isGojuon(q.question),
        q => isDakuten(q.question),
        q => isHandakuten(q.question),
        q => isYoon(q.question)
    ];

    return shuffle(allQuestions.filter(sections[sectionIndex]));
}

/* --- Character Type Helpers --- */

function isGojuon(char) {
  return char.length === 1 && !isDakuten(char) && !isHandakuten(char);
}

function isDakuten(char) {
  return ["が","ぎ","ぐ","げ","ご","ざ","じ","ず","ぜ","ぞ","だ","ぢ","づ","で","ど","ば","び","ぶ","べ","ぼ"].includes(char);
}

function isHandakuten(char) {
  return ["ぱ","ぴ","ぷ","ぺ","ぽ"].includes(char);
}

function isYoon(char) {
  return char.length > 1;
}

/* --- Quiz Logic --- */

function showQuestion() {
    if (currentIndex >= questions.length) {
        endQuiz();
        return;
    }

    const q = questions[currentIndex];
    questionEl.textContent = q.question;
    choicesEl.innerHTML = "";

    selectedAnswer = null; // reset selection for new question

    shuffle([...q.choices]).forEach(choice => {
        const btn = document.createElement("button");
        btn.textContent = choice;

        btn.onclick = () => {
            // Highlight selected
            Array.from(choicesEl.children).forEach(b => b.classList.remove("selected"));
            btn.classList.add("selected");

            selectedAnswer = choice;
        };

        choicesEl.appendChild(btn);
    });
}

function selectAnswer(choice) {
  const correct = questions[currentIndex].answer;

  userAnswers.push({
    question: questions[currentIndex].question,
    selected: choice,
    correct: correct
  });

  if (choice === correct) score++;
}

nextBtn.onclick = () => {
    if (!selectedAnswer) {
        alert("Please select an answer before continuing.");
        return;
    }

    // Save answer once
    const correct = questions[currentIndex].answer;
    userAnswers.push({
        question: questions[currentIndex].question,
        selected: selectedAnswer,
        correct: correct
    });

    if (selectedAnswer === correct) score++;

    currentIndex++;

    // Existing structured section logic here...
    if (examType === "structured" && currentIndex >= questions.length) {
        sectionIndex++;
        if (sectionIndex < 4) {
            questions = getStructuredSection(sectionIndex);
            currentIndex = 0;
            showQuestion();
            return;
        } else {
            endQuiz();
            return;
        }
    }

    showQuestion();
};

homeBtn.onclick = () => {
    // Stop any running timer
    if (interval) clearInterval(interval);
    document.getElementById("timer").style.display = "none"; // hide timer

    // Clear session-specific data
    localStorage.removeItem("examType");
    localStorage.removeItem("timerValue");
    localStorage.removeItem("structuredIndex");
    localStorage.removeItem("difficulty");
    localStorage.removeItem("score");
    localStorage.removeItem("total");
    localStorage.removeItem("answers");

    // Redirect to home
    window.location.href = "index.html";
};

function startTimer() {
  timerEl.style.display = "block";
  timerEl.textContent = "Time: " + timer;

  interval = setInterval(() => {
    timer--;
    timerEl.textContent = "Time: " + timer;
    if (timer <= 0) endQuiz();
  }, 1000);
}

function endQuiz() {
  if (interval) clearInterval(interval);

  localStorage.setItem("score", score);
  localStorage.setItem("total", userAnswers.length);
  localStorage.setItem("answers", JSON.stringify(userAnswers));

  window.location.href = "results.html";
}

function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}