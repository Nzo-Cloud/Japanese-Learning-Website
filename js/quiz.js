let questions = [];
let currentIndex = 0;
let score = 0;
let userAnswers = [];
let timer = 60;
let interval;

const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const nextBtn = document.getElementById("nextBtn");
const timerEl = document.getElementById("timer");

const mode = localStorage.getItem("quizMode") || "intermediate";

fetch(`data/${mode}.json`)
    .then(res => res.json())
    .then(data => {
        questions = shuffle(data);
        startTimer();
        showQuestion();
    });

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function showQuestion() {
    const q = questions[currentIndex];
    questionEl.textContent = q.question;

    choicesEl.innerHTML = "";

    const shuffledChoices = shuffle([...q.choices]);

    shuffledChoices.forEach(choice => {
        const btn = document.createElement("button");
        btn.textContent = choice;
        btn.onclick = () => selectAnswer(choice);
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

    if (choice === correct) {
        score++;
    }
}

nextBtn.onclick = () => {
    currentIndex++;
    if (currentIndex < questions.length) {
        showQuestion();
    } else {
        endQuiz();
    }
};

function startTimer() {
    interval = setInterval(() => {
        timer--;
        timerEl.textContent = "Time: " + timer;
        if (timer <= 0) {
            endQuiz();
        }
    }, 1000);
}

function endQuiz() {
    clearInterval(interval);

    localStorage.setItem("score", score);
    localStorage.setItem("total", questions.length);
    localStorage.setItem("answers", JSON.stringify(userAnswers));

    window.location.href = "results.html";
}