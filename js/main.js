function goIntermediate() {
    localStorage.setItem("difficulty", "intermediate");
    window.location.href = "intermediate.html";
}

function startExam(type, timer = null) {
    localStorage.setItem("examType", type);

    if (timer) {
        localStorage.setItem("timerValue", timer);
    } else {
        localStorage.removeItem("timerValue");
    }

    window.location.href = "quiz.html";
}

function showTimerOptions() {
    document.getElementById("timer-options").style.display = "block";
}