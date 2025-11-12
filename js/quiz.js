// Quiz functionality

const questions = [
    {
        question: "What is the correct form of the verb 'to be' in present simple for 'I'?",
        options: ["am", "is", "are", "be"],
        correct: 0
    },
    {
        question: "Which word is a synonym for 'happy'?",
        options: ["Sad", "Joyful", "Angry", "Tired"],
        correct: 1
    },
    {
        question: "What is the plural of 'child'?",
        options: ["Childs", "Children", "Childes", "Childrens"],
        correct: 1
    },
    {
        question: "Which sentence is correct?",
        options: ["I goed to school.", "I went to school.", "I go to school.", "I going to school."],
        correct: 1
    },
    {
        question: "What does 'ubiquitous' mean?",
        options: ["Rare", "Present everywhere", "Very small", "Very large"],
        correct: 1
    },
    {
        question: "Choose the correct preposition: 'I live ___ Paris.'",
        options: ["at", "on", "in", "to"],
        correct: 2
    },
    {
        question: "What is the past tense of 'eat'?",
        options: ["Eated", "Ate", "Eaten", "Eating"],
        correct: 1
    },
    {
        question: "Which word is an adjective?",
        options: ["Run", "Beautiful", "Quickly", "Sing"],
        correct: 1
    },
    {
        question: "What is the opposite of 'hot'?",
        options: ["Warm", "Cold", "Wet", "Dry"],
        correct: 1
    },
    {
        question: "Complete the idiom: 'It's raining ___ ___ ___ ___'",
        options: ["cats and dogs", "like a storm", "very hard", "in the sky"],
        correct: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

const questionContainer = document.getElementById('question-container');
const resultContainer = document.getElementById('result-container');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const currentQuestionEl = document.getElementById('current-question');
const totalQuestionsEl = document.getElementById('total-questions');
const currentScoreEl = document.getElementById('current-score');
const scoreEl = document.getElementById('score');
const feedbackEl = document.getElementById('feedback');
const retryBtn = document.getElementById('retry-btn');

function loadQuestion() {
    const question = questions[currentQuestionIndex];
    questionEl.textContent = question.question;
    optionsEl.innerHTML = '';

    question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.className = 'option-btn';
        button.addEventListener('click', () => selectAnswer(index));
        optionsEl.appendChild(button);
    });

    currentQuestionEl.textContent = currentQuestionIndex + 1;
    totalQuestionsEl.textContent = questions.length;
    currentScoreEl.textContent = score;
}

function selectAnswer(selectedIndex) {
    userAnswers[currentQuestionIndex] = selectedIndex;
    if (selectedIndex === questions[currentQuestionIndex].correct) {
        score++;
        currentScoreEl.textContent = score;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    questionContainer.style.display = 'none';
    resultContainer.style.display = 'block';

    scoreEl.textContent = `Your score: ${score}/${questions.length}`;
    
    let feedback = '';
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) {
        feedback = "Excellent! You're doing great!";
    } else if (percentage >= 60) {
        feedback = "Good job! Keep practicing!";
    } else {
        feedback = "Keep studying! You'll improve with more practice.";
    }
    feedbackEl.textContent = feedback;

    // Update user progress
    updateProgress('english', percentage);
}

function updateProgress(language, percentage) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (currentUser) {
        if (!currentUser.progress) currentUser.progress = {};
        currentUser.progress[language] = Math.max(currentUser.progress[language] || 0, percentage);
        currentUser.points = (currentUser.points || 0) + score * 10;
        currentUser.streak = (currentUser.streak || 0) + 1;
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }
}

retryBtn.addEventListener('click', () => {
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = [];
    resultContainer.style.display = 'none';
    questionContainer.style.display = 'block';
    loadQuestion();
});

loadQuestion();
