document.addEventListener('DOMContentLoaded', function() {
    // Cursor effect
    const cursor = document.getElementById('cursor');
    const cursorBlur = document.getElementById('cursor-blur');

    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursorBlur.style.left = e.clientX - 200 + 'px';
        cursorBlur.style.top = e.clientY - 200 + 'px';
    });

    // Smooth scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Quiz data
    const cognitiveQuizData = [
        {
            question: 'What is the process of storing information called?',
            options: ['Encoding', 'Decoding', 'Storage', 'Retrieval'],
            answer: 'Encoding'
        },
        {
            question: 'Which term refers to the ability to acquire and apply knowledge and skills?',
            options: ['Intelligence', 'Memory', 'Wisdom', 'Learning'],
            answer: 'Learning'
        },
        {
            question: 'What is the best strategy for improving memory retention?',
            options: ['Repetition', 'Cramming', 'Skipping breaks', 'Multitasking'],
            answer: 'Repetition'
        },
    ];

    const learningStyleQuizData = [
        {
            question: 'Which method helps you learn best?',
            options: ['Reading books', 'Listening to lectures', 'Hands-on activities'],
            answer: ''
        },
        {
            question: 'When learning a new skill, do you prefer to:',
            options: ['Watch demonstrations', 'Listen to explanations', 'Try it yourself'],
            answer: ''
        },
        {
            question: 'How do you best remember information?',
            options: ['Visualizing it', 'Repeating it out loud', 'Writing it down'],
            answer: ''
        },
    ];

    const studyQuizData = {
        math: [
            { question: "What is the square root of 144?", answer: "12" },
            { question: "What is the cube root of 27?", answer: "3" },
            { question: "Solve for x: 2x + 5 = 13", answer: "4" },
            { question: "If 3y - 7 = 20, what is y?", answer: "9" },
            { question: "A train travels 120 km in 2 hours. What is its speed in km/h?", answer: "60" }
        ],
        english: [
            { question: "What is the past participle of 'go'?", answer: "gone" },
            { question: "Which tense is used in: 'I have been studying for hours'?", answer: "present perfect continuous" },
            { question: "What is a synonym for 'benevolent'?", answer: "kind" },
            { question: "What is the antonym of 'verbose'?", answer: "concise" },
            { question: "Identify the adverb in: 'She sang beautifully.'", answer: "beautifully" }
        ]
    };

    let cognitiveCurrentQuestion = 0;
    let learningStyleCurrentQuestion = 0;
    let cognitiveScore = 0;
    let learningStyleScores = {visual: 0, auditory: 0, kinesthetic: 0};
    let studyScores = {math: 0, english: 0};
    let currentSubject = '';
    let currentStudyQuestion = 0;

    // Load cognitive quiz
    function loadCognitiveQuiz() {
        const questionEl = document.getElementById('cognitive-question');
        const optionsEl = document.getElementById('cognitive-options');
        const quizData = cognitiveQuizData[cognitiveCurrentQuestion];

        questionEl.textContent = quizData.question;
        optionsEl.innerHTML = '';

        quizData.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.className = 'quiz-option';
            button.addEventListener('click', () => selectCognitiveOption(option));
            optionsEl.appendChild(button);
        });
    }

    // Select cognitive option
    function selectCognitiveOption(selectedOption) {
        const quizData = cognitiveQuizData[cognitiveCurrentQuestion];
        if (selectedOption === quizData.answer) {
            cognitiveScore++;
        }
        cognitiveCurrentQuestion++;
        if (cognitiveCurrentQuestion < cognitiveQuizData.length) {
            loadCognitiveQuiz();
        } else {
            showCognitiveResult();
        }
    }

    // Show cognitive result
    function showCognitiveResult() {
        const resultEl = document.getElementById('cognitive-result');
        resultEl.textContent = `Your cognitive score: ${cognitiveScore}/${cognitiveQuizData.length}`;
        updatePerformance();
    }

    // Load learning style quiz
    function loadLearningStyleQuiz() {
        const questionEl = document.getElementById('learning-style-question');
        const optionsEl = document.getElementById('learning-style-options');
        const quizData = learningStyleQuizData[learningStyleCurrentQuestion];

        questionEl.textContent = quizData.question;
        optionsEl.innerHTML = '';

        quizData.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.className = 'quiz-option';
            button.addEventListener('click', () => selectLearningStyleOption(index));
            optionsEl.appendChild(button);
        });
    }

    // Select learning style option
    function selectLearningStyleOption(optionIndex) {
        if (optionIndex === 0) learningStyleScores.visual++;
        else if (optionIndex === 1) learningStyleScores.auditory++;
        else if (optionIndex === 2) learningStyleScores.kinesthetic++;

        learningStyleCurrentQuestion++;
        if (learningStyleCurrentQuestion < learningStyleQuizData.length) {
            loadLearningStyleQuiz();
        } else {
            showLearningStyleResult();
        }
    }

    // Show learning style result
    function showLearningStyleResult() {
        const resultEl = document.getElementById('learning-style-result');
        const dominantStyle = Object.keys(learningStyleScores).reduce((a, b) => learningStyleScores[a] > learningStyleScores[b] ? a : b);
        resultEl.textContent = `Your dominant learning style is: ${dominantStyle}`;
        updatePerformance();
    }

    // Load study quiz
    let currentQuestionIndex = 0;

function loadStudyQuiz() {
    const questionEl = document.getElementById('study-question');
    const quizData = studyQuizData[currentSubject][currentQuestionIndex];
    questionEl.textContent = quizData.question;
    document.getElementById('study-answer').value = '';
    document.getElementById('study-submit').style.display = 'inline-block';
    document.getElementById('study-next').style.display = 'none';
}

document.getElementById('study-submit').addEventListener('click', function() {
    const answerEl = document.getElementById('study-answer');
    const resultEl = document.getElementById('study-result');
    const quizData = studyQuizData[currentSubject][currentQuestionIndex];

    if (answerEl.value.toLowerCase() === quizData.answer.toLowerCase()) {
        studyScores[currentSubject]++;
        resultEl.textContent = 'Correct!';
    } else {
        resultEl.textContent = `Incorrect. The correct answer is ${quizData.answer}.`;
    }

    document.getElementById('study-submit').style.display = 'none';
    document.getElementById('study-next').style.display = 'inline-block';
});

document.getElementById('study-next').addEventListener('click', function() {
    currentQuestionIndex++;
    if (currentQuestionIndex < studyQuizData[currentSubject].length) {
        loadStudyQuiz();
    } else {
        document.getElementById('study-result').textContent = `You've completed the ${currentSubject} quiz! Score: ${studyScores[currentSubject]}/${studyQuizData[currentSubject].length}`;
        document.getElementById('study-quiz').style.display = 'none';
        updatePerformance();
    }
});

document.querySelectorAll('.study-option').forEach(button => {
    button.addEventListener('click', function() {
        currentSubject = this.getAttribute('data-subject');
        currentQuestionIndex = 0;
        studyScores[currentSubject] = 0; // Reset score for the subject
        document.getElementById('study-quiz').style.display = 'block';
        loadStudyQuiz();
    });
});

function updatePerformance() {
    document.getElementById('math-score').textContent = `${studyScores.math}/${studyQuizData.math.length}`;
    document.getElementById('english-score').textContent = `${studyScores.english}/${studyQuizData.english.length}`;
    document.getElementById('learning-style').textContent = Object.keys(learningStyleScores).reduce((a, b) => learningStyleScores[a] > learningStyleScores[b] ? a : b);
    document.getElementById('cognitive-score').textContent = `${cognitiveScore}/${cognitiveQuizData.length}`;

    updatePerformanceChart();
}

function updatePerformanceChart() {
    const ctx = document.getElementById('performance-chart').getContext('2d');
    if (window.myChart) {
        window.myChart.destroy();
    }
    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Math', 'English', 'Visual', 'Auditory', 'Kinesthetic', 'Cognitive'],
            datasets: [{
                label: 'Scores',
                data: [
                    studyScores.math,
                    studyScores.english,
                    learningStyleScores.visual,
                    learningStyleScores.auditory,
                    learningStyleScores.kinesthetic,
                    cognitiveScore
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: Math.max(studyQuizData.math.length, studyQuizData.english.length, cognitiveQuizData.length)
                }
            }
        }
    });
}
    // Event listeners
    document.querySelectorAll('.study-option').forEach(button => {
        button.addEventListener('click', function() {
            currentSubject = this.getAttribute('data-subject');
            currentStudyQuestion = 0;
            document.getElementById('study-quiz').style.display = 'block';
            loadStudyQuiz();
        });
    });

    // Initialize quizzes
    loadCognitiveQuiz();
    loadLearningStyleQuiz();

    // GSAP Animations
    gsap.from('h1', {duration: 1, y: -100, opacity: 0, ease: 'power3.out'});
    gsap.from('.cta-button', {duration: 1, y: 50, opacity: 0, ease: 'power3.out', delay: 0.5});

    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            },
            opacity: 0,
            y: 50,
            duration: 1,
            ease: 'power3.out'
        });
    });
});

// Extracurricular activities
document.getElementById('extracurricular-submit').addEventListener('click', function() {
    const activities = document.querySelectorAll('input[name="activity"]:checked');
    const result = document.getElementById('extracurricular-result');
    if (activities.length > 0) {
        const activityList = Array.from(activities).map(a => a.value).join(', ');
        result.textContent = `You are involved in: ${activityList}`;
    } else {
        result.textContent = "You haven't selected any activities.";
    }
});

// Classroom engagement
const engagementSlider = document.getElementById('engagement-slider');
const engagementValue = document.getElementById('engagement-value');

engagementSlider.addEventListener('input', function() {
    engagementValue.textContent = this.value;
});

document.getElementById('engagement-submit').addEventListener('click', function() {
    const engagementLevel = engagementSlider.value;
    const motivation = document.getElementById('motivation-select').value;
    const result = document.getElementById('engagement-result');

    if (motivation) {
        result.textContent = `Your engagement level is ${engagementLevel}/10 and you are ${motivation} in class.`;
    } else {
        result.textContent = "Please select a motivation level.";
    }
});

// Timed quiz data
const timedQuestions = [
    { question: "What is 8 x 7?", answer: "56" },
    { question: "What is the capital of France?", answer: "Paris" },
    { question: "How many sides does a triangle have?", answer: "3" },
    { question: "What is 15 + 27?", answer: "42" },
    { question: "Who wrote 'Romeo and Juliet'?", answer: "Shakespeare" }
];

let currentTimedQuestion = 0;
let timedScore = 0;
let timeLeft = 60;
let timerInterval;

function startTimedQuiz() {
    currentTimedQuestion = 0;
    timedScore = 0;
    timeLeft = 60;
    document.getElementById('quiz-area').style.display = 'block';
    document.getElementById('start-timed-quiz').style.display = 'none';
    loadTimedQuestion();
    timerInterval = setInterval(updateTimer, 1000);
}

function loadTimedQuestion() {
    if (currentTimedQuestion < timedQuestions.length) {
        document.getElementById('timed-question').textContent = timedQuestions[currentTimedQuestion].question;
    } else {
        endTimedQuiz();
    }
}

function updateTimer() {
    timeLeft--;
    document.getElementById('time-left').textContent = timeLeft;
    if (timeLeft <= 0) {
        endTimedQuiz();
    }
}

function endTimedQuiz() {
    clearInterval(timerInterval);
    const averageTimePerQuestion = (60 - timeLeft) / timedQuestions.length;
    let learnerType = averageTimePerQuestion < 8 ? "fast" : "slow";
    
    document.getElementById('timed-result').textContent = 
        `Quiz ended. You answered ${timedScore} out of ${timedQuestions.length} correctly. 
        Average time per question: ${averageTimePerQuestion.toFixed(2)} seconds. 
        You appear to be a ${learnerType} learner.`;
    
    document.getElementById('learner-type').textContent = learnerType;
    document.getElementById('quiz-area').style.display = 'none';
    document.getElementById('start-timed-quiz').style.display = 'block';
    updatePerformance();
}

document.getElementById('timed-submit').addEventListener('click', function() {
    const userAnswer = document.getElementById('timed-answer').value.toLowerCase();
    if (userAnswer === timedQuestions[currentTimedQuestion].answer.toLowerCase()) {
        timedScore++;
    }
    currentTimedQuestion++;
    document.getElementById('timed-answer').value = '';
    loadTimedQuestion();
});

document.getElementById('start-timed-quiz').addEventListener('click', startTimedQuiz);

// Update the updatePerformance function
function updatePerformance() {
    document.getElementById('math-score').textContent = `${studyScores.math}/${studyQuizData.math.length}`;
    document.getElementById('english-score').textContent = `${studyScores.english}/${studyQuizData.english.length}`;
    document.getElementById('learning-style').textContent = Object.keys(learningStyleScores).reduce((a, b) => learningStyleScores[a] > learningStyleScores[b] ? a : b);
    document.getElementById('cognitive-score').textContent = `${cognitiveScore}/${cognitiveQuizData.length}`;
    updatePerformanceChart();
}

// Update the updatePerformanceChart function
function updatePerformanceChart() {
    const ctx = document.getElementById('performance-chart').getContext('2d');
    if (window.myChart) {
        window.myChart.destroy();
    }
    window.myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Math', 'English', 'Visual', 'Auditory', 'Kinesthetic', 'Cognitive', 'Timed Quiz'],
            datasets: [{
                label: 'Scores',
                data: [
                    studyScores.math,
                    studyScores.english,
                    learningStyleScores.visual,
                    learningStyleScores.auditory,
                    learningStyleScores.kinesthetic,
                    cognitiveScore,
                    timedScore
                ],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)',
                    'rgba(201, 203, 207, 0.2)'
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                    'rgba(201, 203, 207, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                    max: Math.max(studyQuizData.math.length, studyQuizData.english.length, cognitiveQuizData.length, timedQuestions.length)
                }
            }
        }
    });
}


