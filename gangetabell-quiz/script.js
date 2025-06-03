const quizContainer = document.getElementById('quiz-container');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const feedbackEl = document.getElementById('feedback');
const nextButton = document.getElementById('next-btn');
const scoreEl = document.getElementById('score-container');
const questionCounterEl = document.getElementById('question-counter');

let allPossibleQuestions = [];
let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
const NUM_QUESTIONS_TO_ASK = 20;

function generateAllPossibleQuestions() {
    allPossibleQuestions = [];
    for (let i = 1; i <= 20; i++) {
        for (let j = 1; j <= 20; j++) {
            const correctAnswer = i * j;
            const questionText = `Hva er ${i} x ${j}?`;

            let options = new Set();
            options.add(correctAnswer);

            let attempts = 0;
            while (options.size < 4 && attempts < 50) {
                attempts++;
                let distractor;
                const type = Math.random();

                if (type < 0.5 || correctAnswer < 5) {
                    const maxOffset = Math.max(3, Math.floor(correctAnswer * 0.3)) + (options.size * 2); // Vary offset slightly
                    const offset = (Math.floor(Math.random() * maxOffset) + 1) * (Math.random() < 0.5 ? 1 : -1);
                    distractor = correctAnswer + offset;
                } else if (type < 0.75) {
                    const i_offset = (Math.random() < 0.5 && i > 1) ? -1 : 1;
                    distractor = (i + i_offset) * j;
                } else {
                    const j_offset = (Math.random() < 0.5 && j > 1) ? -1 : 1;
                    distractor = i * (j + j_offset);
                }

                if (distractor > 0 && !options.has(distractor)) {
                    options.add(distractor);
                }
            }
            
            let fallbackValue = 1;
            while (options.size < 4) {
                if (!options.has(fallbackValue) && fallbackValue !== correctAnswer ) { // Ensure fallback is not the answer
                    options.add(fallbackValue);
                }
                fallbackValue++;
                 if (fallbackValue > correctAnswer + 20 && fallbackValue > 60) break; 
            }

            allPossibleQuestions.push({
                text: questionText,
                options: shuffleArray(Array.from(options)),
                answer: correctAnswer
            });
        }
    }
}

function selectRandomQuestions() {
    currentQuestions = shuffleArray([...allPossibleQuestions]).slice(0, NUM_QUESTIONS_TO_ASK);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function displayQuestion() {
    if (currentQuestionIndex < currentQuestions.length) {
        const q = currentQuestions[currentQuestionIndex];
        questionEl.textContent = q.text;
        questionCounterEl.textContent = `Spørsmål ${currentQuestionIndex + 1} av ${currentQuestions.length}`;
        optionsEl.innerHTML = '';
        feedbackEl.textContent = '';
        
        q.options.forEach(option => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('option-btn');
            button.addEventListener('click', () => handleOptionClick(option, button));
            optionsEl.appendChild(button);
        });

        nextButton.textContent = 'Sjekk Svar';
        nextButton.style.display = 'none';
        document.querySelectorAll('.option-btn').forEach(btn => btn.disabled = false);
    } else {
        showResults();
    }
}

let selectedAnswerValue = null;
let selectedButtonElement = null;

function handleOptionClick(option, buttonEl) {
    if (nextButton.textContent === 'Neste Spørsmål' || nextButton.textContent === 'Se Resultater') {
        return; // Answer already checked for this question
    }

    document.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('selected'));
    buttonEl.classList.add('selected');
    selectedAnswerValue = option;
    selectedButtonElement = buttonEl;
    nextButton.style.display = 'block';
}

function handleNextButtonClick() {
    if (nextButton.textContent === 'Sjekk Svar') {
        if (selectedAnswerValue === null) {
            feedbackEl.textContent = "Vennligst velg et svar.";
            feedbackEl.style.color = "#e67e22"; // Orange for warning
            return;
        }

        const currentQ = currentQuestions[currentQuestionIndex];
        const correctAnswer = currentQ.answer;

        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.disabled = true;
            if (parseInt(btn.textContent) === correctAnswer) {
                btn.classList.add('correct');
            }
        });

        if (selectedAnswerValue === correctAnswer) {
            score++;
            feedbackEl.textContent = "Riktig!";
            feedbackEl.style.color = "#2ecc71"; // Green
            if (selectedButtonElement) selectedButtonElement.classList.add('correct'); // Ensure selected is also marked
        } else {
            feedbackEl.textContent = `Feil. Riktig svar var ${correctAnswer}.`;
            feedbackEl.style.color = "#e74c3c"; // Red
            if (selectedButtonElement) selectedButtonElement.classList.add('incorrect');
        }

        if (currentQuestionIndex < currentQuestions.length - 1) {
            nextButton.textContent = 'Neste Spørsmål';
        } else {
            nextButton.textContent = 'Se Resultater';
        }

    } else if (nextButton.textContent === 'Neste Spørsmål') {
        currentQuestionIndex++;
        selectedAnswerValue = null;
        selectedButtonElement = null;
        displayQuestion();
    } else if (nextButton.textContent === 'Se Resultater') {
        showResults();
    }
}

function showResults() {
    quizContainer.style.display = 'none';
    scoreEl.style.display = 'block';
    scoreEl.innerHTML = `
        <h2>Quiz Ferdig!</h2>
        <p>Du fikk ${score} av ${currentQuestions.length} riktige.</p>
        <button id="restart-btn">Start på nytt</button>
    `;
    document.getElementById('restart-btn').addEventListener('click', startQuiz);
}

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswerValue = null;
    selectedButtonElement = null;
    
    if (allPossibleQuestions.length === 0) {
        generateAllPossibleQuestions();
    }
    selectRandomQuestions();

    quizContainer.style.display = 'block';
    scoreEl.style.display = 'none';
    feedbackEl.textContent = '';
    
    nextButton.removeEventListener('click', handleNextButtonClick);
    nextButton.addEventListener('click', handleNextButtonClick);
    
    displayQuestion();
}

document.addEventListener('DOMContentLoaded', () => {
    startQuiz();
});
