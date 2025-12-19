const questions = [
  {
    question: "What does HTML stand for?",
    answers: [
      "Hyper Text Markup Language",
      "High Tech Modern Language",
      "Home Tool Markup Language",
      "Hyperlinks and Text Markup Language",
    ],
    correct: 0,
  },
  {
    question: "Which CSS property is used to change text color?",
    answers: ["text-color", "font-color", "color", "text-style"],
    correct: 2,
  },
  {
    question: "What is the correct way to declare a JavaScript variable?",
    answers: ["variable myVar;", "let myVar;", "v myVar;", "var: myVar;"],
    correct: 1,
  },
  {
    question: "Which HTML tag is used for the largest heading?",
    answers: ["<heading>", "<h6>", "<head>", "<h1>"],
    correct: 3,
  },
  {
    question: "What does CSS stand for?",
    answers: [
      "Creative Style Sheets",
      "Cascading Style Sheets",
      "Computer Style Sheets",
      "Colorful Style Sheets",
    ],
    correct: 1,
  },
];

document.addEventListener('DOMContentLoaded', function() {

let currentQuestionIndex = 0;
let score = 0;
let answered = false;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const nextBtn = document.getElementById("nextBtn");
const currentQuestionEl = document.getElementById("currentQuestion");
const totalQuestionsEl = document.getElementById("totalQuestions");
const scoreEl = document.getElementById("score");
const quizEl = document.getElementById("quiz");
const resultsEl = document.getElementById("results");
const finalScoreEl = document.getElementById("finalScore");
const resultsMessageEl = document.getElementById("resultsMessage");
const restartBtn = document.getElementById("restartBtn");

totalQuestionsEl.textContent = questions.length;

function loadQuestion() {
  answered = false;
  nextBtn.classList.add("hidden");

  const currentQuestion = questions[currentQuestionIndex];
  questionEl.textContent = currentQuestion.question;
  currentQuestionEl.textContent = currentQuestionIndex + 1;

  answersEl.innerHTML = "";
  currentQuestion.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.className = "answer-btn";
    btn.addEventListener("click", () => selectAnswer(index));
    answersEl.appendChild(btn);
  });
}

function selectAnswer(selectedIndex) {
  if (answered) return;

  answered = true;
  const currentQuestion = questions[currentQuestionIndex];
  const answerBtns = document.querySelectorAll(".answer-btn");

  answerBtns.forEach((btn, index) => {
    btn.disabled = true;
    if (index === currentQuestion.correct) {
      btn.classList.add("correct");
    }
    if (index === selectedIndex && selectedIndex !== currentQuestion.correct) {
      btn.classList.add("incorrect");
    }
  });

  if (selectedIndex === currentQuestion.correct) {
    score++;
    scoreEl.textContent = score;
  }

  nextBtn.classList.remove("hidden");
}

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  quizEl.classList.add("hidden");
  resultsEl.classList.add("show");

  const percentage = Math.round((score / questions.length) * 100);
  finalScoreEl.textContent = `${score} / ${questions.length}`;

  if (percentage === 100) {
    resultsMessageEl.textContent = "Perfect! You're a quiz master! 🏆";
  } else if (percentage >= 80) {
    resultsMessageEl.textContent = "Excellent work! 🌟";
  } else if (percentage >= 60) {
    resultsMessageEl.textContent = "Good job! Keep learning! 👍";
  } else {
    resultsMessageEl.textContent = "Nice try! Practice makes perfect! 💪";
  }
}

function restartQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  scoreEl.textContent = score;
  quizEl.classList.remove("hidden");
  resultsEl.classList.remove("show");
  loadQuestion();
}

nextBtn.addEventListener("click", nextQuestion);
restartBtn.addEventListener("click", restartQuiz);

loadQuestion();
});
