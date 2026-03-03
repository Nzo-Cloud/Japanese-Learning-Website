const score = localStorage.getItem("score");
const total = localStorage.getItem("total");
const answers = JSON.parse(localStorage.getItem("answers"));

document.getElementById("score").textContent =
    `Score: ${score} / ${total}`;

const details = document.getElementById("details");

answers.forEach(a => {
    const p = document.createElement("p");
    p.textContent =
        `Question: ${a.question} | Your Answer: ${a.selected} | Correct: ${a.correct}`;
    details.appendChild(p);
});