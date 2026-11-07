// Quiz questions
const questions = [
    {
        question: "Which language is used to add interactivity to a website?",
        answers: [
            "HTML",
            "CSS",
            "JavaScript",
            "SQL"
        ],
        correct: 2
    },
    {
        question: "What does HTML stand for?",
        answers: [
            "HyperText Markup Language",
            "HighText Machine Language",
            "Hyper Transfer Markup Language",
            "Home Tool Markup Language"
        ],
        correct: 0
    },
    {
        question: "Which CSS property is used to change text color?",
        answers: [
            "font-style",
            "background-color",
            "color",
            "text-align"
        ],
        correct: 2
    },
    {
        question: "Which symbol is used for a single-line comment in JavaScript?",
        answers: [
            "<!-- -->",
            "//",
            "##",
            "**"
        ],
        correct: 1
    },
    {
        question: "Which HTML tag is used to create a hyperlink?",
        answers: [
            "<link>",
            "<a>",
            "<href>",
            "<url>"
        ],
        correct: 1
    }
];

// Get elements from the page
const startScreen = document.getElementById("start-screen");
const quizContent = document.getElementById("quiz-content");
const resultScreen = document.getElementById("result-screen");

const startBtn = document.getElementById("start-btn");
const nextBtn = document.getElementById("next-btn");
const restartBtn = document.getElementById("restart-btn");

const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const questionCountElement = document.getElementById("question-count");
const scoreElement = document.getElementById("score");
const progressElement = document.getElementById("progress");

const finalScoreElement = document.getElementById("final-score");
const resultMessageElement = document.getElementById("result-message");

// Quiz variables
let currentQuestion = 0;
let score = 0;
let answerSelected = false;

// Start the quiz
startBtn.addEventListener("click", startQuiz);

function startQuiz() {
    currentQuestion = 0;
    score = 0;

    startScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    quizContent.classList.remove("hidden");

    showQuestion();
}

// Display the current question
function showQuestion() {
    answerSelected = false;

    const currentQuizQuestion = questions[currentQuestion];

    questionElement.textContent = currentQuizQuestion.question;

    questionCountElement.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    scoreElement.textContent = `Score: ${score}`;

    const progressPercentage =
        ((currentQuestion + 1) / questions.length) * 100;

    progressElement.style.width = `${progressPercentage}%`;

    answersElement.innerHTML = "";

    currentQuizQuestion.answers.forEach((answer, index) => {
        const button = document.createElement("button");

        button.textContent = answer;
        button.classList.add("answer-btn");

        button.addEventListener("click", () => {
            selectAnswer(index, button);
        });

        answersElement.appendChild(button);
    });

    // Change button text for the last question
    if (currentQuestion === questions.length - 1) {
        nextBtn.textContent = "See Results";
    } else {
        nextBtn.textContent = "Next Question";
    }
}

// Handle answer selection
function selectAnswer(selectedIndex, selectedButton) {
    if (answerSelected) {
        return;
    }

    answerSelected = true;

    const correctAnswer = questions[currentQuestion].correct;
    const answerButtons = document.querySelectorAll(".answer-btn");

    answerButtons.forEach((button, index) => {
        button.disabled = true;

        if (index === correctAnswer) {
            button.classList.add("correct");
        }
    });

    if (selectedIndex === correctAnswer) {
        score++;
        scoreElement.textContent = `Score: ${score}`;
    } else {
        selectedButton.classList.add("wrong");
    }
}

// Move to the next question
nextBtn.addEventListener("click", () => {
    if (!answerSelected) {
        alert("Please select an answer before continuing!");
        return;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResults();
    }
});

// Display quiz results
function showResults() {
    quizContent.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    finalScoreElement.textContent =
        `${score} / ${questions.length}`;

    const percentage = (score / questions.length) * 100;

    if (percentage === 100) {
        resultMessageElement.textContent =
            "Perfect score! You are a QuizMaster! 🏆";
    } else if (percentage >= 60) {
        resultMessageElement.textContent =
            "Great job! You have excellent knowledge! 🎉";
    } else {
        resultMessageElement.textContent =
            "Good effort! Keep learning and try again! 📚";
    }
}

// Restart the quiz
restartBtn.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;

    resultScreen.classList.add("hidden");
    startScreen.classList.remove("hidden");
});