function startQuiz(mode) {
    localStorage.setItem("quizMode", mode);
    window.location.href = "quiz.html";
}