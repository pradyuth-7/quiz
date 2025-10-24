// Quiz Data
const quizData = [
    {
        question: "What is the capital of France?",
        options: ["London", "Berlin", "Paris", "Madrid"],
        correct: 2
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Venus", "Mars", "Jupiter", "Saturn"],
        correct: 1
    },
    {
        question: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correct: 3
    },
    {
        question: "Who painted the Mona Lisa?",
        options: ["Vincent van Gogh", "Leonardo da Vinci", "Michelangelo", "Raphael"],
        correct: 1
    },
    {
        question: "What is the smallest prime number?",
        options: ["0", "1", "2", "3"],
        correct: 2
    },
    {
        question: "Which country is home to the kangaroo?",
        options: ["New Zealand", "Australia", "South Africa", "Brazil"],
        correct: 1
    },
    {
        question: "What is the chemical symbol for Gold?",
        options: ["Go", "Gd", "Au", "Ag"],
        correct: 2
    },
    {
        question: "How many continents are there?",
        options: ["5", "6", "7", "8"],
        correct: 2
    },
    {
        question: "What is the fastest land animal?",
        options: ["Lion", "Cheetah", "Gazelle", "Greyhound"],
        correct: 1
    },
    {
        question: "Which element has the atomic number 1?",
        options: ["Helium", "Hydrogen", "Lithium", "Beryllium"],
        correct: 1
    }
];

// State Variables
let currentQuestion = 0;
let score = 0;
let selectedAnswers = new Array(quizData.length).fill(null);
let quizStarted = false;

// DOM Elements
const startScreen = document.getElementById('startScreen');
const quizScreen = document.getElementById('quizScreen');
const resultsScreen = document.getElementById('resultsScreen');
const questionText = document.getElementById('questionText');
const optionsContainer = document.getElementById('optionsContainer');
const currentQuestionSpan = document.getElementById('currentQuestion');
const totalQuestionsSpan = document.getElementById('totalQuestions');
const progressFill = document.getElementById('progressFill');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const finalScore = document.getElementById('finalScore');
const resultMessage = document.getElementById('resultMessage');

// Initialize
totalQuestionsSpan.textContent = quizData.length;

// Start Quiz
function startQuiz() {
    quizStarted = true;
    currentQuestion = 0;
    score = 0;
    selectedAnswers = new Array(quizData.length).fill(null);
    
    startScreen.classList.remove('active');
    quizScreen.classList.add('active');
    
    loadQuestion();
}

// Load Question
function loadQuestion() {
    const question = quizData[currentQuestion];
    questionText.textContent = question.question;
    
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option';
        button.textContent = option;
        
        if (selectedAnswers[currentQuestion] === index) {
            button.classList.add('selected');
        }
        
        button.onclick = () => selectOption(index);
        optionsContainer.appendChild(button);
    });
    
    updateProgress();
    updateButtons();
}

// Select Option
function selectOption(index) {
    selectedAnswers[currentQuestion] = index;
    loadQuestion();
}

// Update Progress
function updateProgress() {
    currentQuestionSpan.textContent = currentQuestion + 1;
    const progress = ((currentQuestion + 1) / quizData.length) * 100;
    progressFill.style.width = progress + '%';
}

// Update Buttons
function updateButtons() {
    prevBtn.style.display = currentQuestion > 0 ? 'block' : 'none';
    
    if (currentQuestion === quizData.length - 1) {
        nextBtn.textContent = 'Finish →';
    } else {
        nextBtn.textContent = 'Next →';
    }
}

// Next Question
function nextQuestion() {
    if (currentQuestion < quizData.length - 1) {
        currentQuestion++;
        loadQuestion();
    } else {
        finishQuiz();
    }
}

// Previous Question
function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        loadQuestion();
    }
}

// Finish Quiz
function finishQuiz() {
    // Calculate Score
    score = 0;
    selectedAnswers.forEach((answer, index) => {
        if (answer === quizData[index].correct) {
            score++;
        }
    });
    
    // Show Results
    quizScreen.classList.remove('active');
    resultsScreen.classList.add('active');
    
    finalScore.textContent = score;
    
    // Generate Message
    const percentage = (score / quizData.length) * 100;
    let message = '';
    
    if (percentage === 100) {
        message = "Perfect Score! 🌟 You're a quiz master!";
    } else if (percentage >= 80) {
        message = "Excellent! 🎯 You did amazing!";
    } else if (percentage >= 60) {
        message = "Good Job! 👍 Keep learning!";
    } else if (percentage >= 40) {
        message = "Not Bad! 💪 Try again to improve!";
    } else {
        message = "Keep Practicing! 📚 You'll do better next time!";
    }
    
    resultMessage.textContent = message;
}

// Restart Quiz
function restartQuiz() {
    resultsScreen.classList.remove('active');
    startScreen.classList.add('active');
    currentQuestion = 0;
    score = 0;
    selectedAnswers = new Array(quizData.length).fill(null);
    quizStarted = false;
}