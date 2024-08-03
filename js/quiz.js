// Array of quiz questions
const questions = [
  {
    question: "Which is the largest animal in the world?",
    answers: [
      { text: "Lion", correct: false },
      { text: "Elephant", correct: true },
      { text: "Giraffe", correct: false },
      { text: "Zebra", correct: false },
    ],
  },
  {
    question: "Which is the smallest country in the world?",
    answers: [
      { text: "Vatican City", correct: true },
      { text: "Monaco", correct: false },
      { text: "Nauru", correct: false },
      { text: "Tuvalu", correct: false },
    ],
  },
  {
    question: "Which is the largest planet in our solar system?",
    answers: [
      { text: "Earth", correct: false },
      { text: "Saturn", correct: false },
      { text: "Jupiter", correct: true },
      { text: "Uranus", correct: false },
    ],
  },
  {
    question: "Which is the fastest animal in the world?",
    answers: [
      { text: "Cheetah", correct: true },
      { text: "Lion", correct: false },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
    ],
  },
  {
    question: "Which is the smallest mammal in the world?",
    answers: [
      { text: "Bumblebee Bat", correct: true },
      { text: "Etruscan Shrew", correct: false },
      { text: "Elephant", correct: false },
      { text: "Giraffe", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Mars", correct: true },
      { text: "Venus", correct: false },
      { text: "Earth", correct: false },
      { text: "Jupiter", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for Gold?",
    answers: [
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
      { text: "Fe", correct: false },
      { text: "Pb", correct: false },
    ],
  },
  {
    question: "Who wrote 'To Kill a Mockingbird'?",
    answers: [
      { text: "Harper Lee", correct: true },
      { text: "Mark Twain", correct: false },
      { text: "Ernest Hemingway", correct: false },
      { text: "F. Scott Fitzgerald", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "What is the capital city of Canada?",
    answers: [
      { text: "Toronto", correct: false },
      { text: "Vancouver", correct: false },
      { text: "Montreal", correct: false },
      { text: "Ottawa", correct: true },
    ],
  },
];

// Get DOM elements
const questionEl = document.getElementById("question");
const answerBtn = document.getElementById("answer-buttons");
const nextBtn = document.getElementById("next-btn");
const backBtn = document.getElementById("back-btn");
const headerEl = document.querySelector(".app h1");
const scoreEl = document.createElement('span'); // Create a span element to display the score

let currentQuestionIndex = 0; // Tracks the index of the current question
let score = 0; // Tracks the player's score

// Initialize the quiz
function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextBtn.innerHTML = "Next";
  headerEl.style.display = "block"; 
  headerEl.style.borderBottom = "1px solid #333"; 
  showQuestion();
}

// Display the current question
function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  let questionNo = currentQuestionIndex + 1;
  scoreEl.innerHTML = `Score: ${score}`; // Update score display
  questionEl.innerHTML = `Question ${questionNo}/10 <span style="float: right;">${scoreEl.outerHTML}</span><br><br> ${currentQuestion.question} <br><br>`;

  // Create and display answer buttons
  currentQuestion.answers.forEach(function (answer) {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerBtn.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

// Reset the state of the quiz (buttons, etc.)
function resetState() {
  nextBtn.style.display = "none";
  backBtn.style.display = "none";
  while (answerBtn.firstChild) {
    answerBtn.removeChild(answerBtn.firstChild);
  }
}

// Handle the answer selection
function selectAnswer(e) {
  const selectedBtn = e.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
  } else {
    selectedBtn.classList.add("incorrect");
  }
  Array.from(answerBtn.children).forEach(function (button) {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextBtn.style.display = "block";
  scoreEl.innerHTML = `Score: ${score}`; // Update score display after answer selection
}

// Display the final score
function showScore() {
  resetState();
  questionEl.innerHTML = `<div style="text-align: center;"><span style="font-size: 5em;">👑</span><br><br>You've completed the Quiz Game! Congrats! 🎉<br>You scored ${score} out of ${questions.length}.</div>`;
  headerEl.style.display = "none";
  headerEl.style.borderBottom = "none";
  nextBtn.innerHTML = "Play Again";
  backBtn.innerHTML = "Go Home";
  nextBtn.style.display = "inline-block";
  backBtn.style.display = "inline-block";

  if (backBtn) {
    backBtn.addEventListener("click", function () {
      window.location.href = "../index.html"; // Navigate to home page
    });
  } else {
    console.error("Back button not found in the DOM");
  }
}

// Handle the click event for the Next button
function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

// Set up event listeners for the Next button
nextBtn.addEventListener("click", function () {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

// Start the quiz game
startQuiz();
