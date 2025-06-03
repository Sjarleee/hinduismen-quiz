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
const DEFAULT_NUM_QUESTIONS_TO_ASK = 20; // Standard antall spørsmål å forsøke å stille
let NUM_QUESTIONS_TO_ASK = DEFAULT_NUM_QUESTIONS_TO_ASK; // Nåværende antall spørsmål for denne quizen
let MAX_TABLE_NUMBER; // Vil bli satt i DOMContentLoaded

const correctFeedbackMessages = [ // 15 stk
    "Yes! Helt konge!",
    "Du er jo helt rå på dette! High five!",
    "Korrekt! Du er smartere enn en kalkulator!",
    "Boom! Rett i mål, som en perfekt trommesolo!",
    "Du naila den! Like smooth som Sabrina Carpenter på scenen!",
    "Ohana betyr familie, og familie betyr at ingen mattefeil blir igjen! Riktig!",
    "Helt sjef! Du er jo en matte-rockestjerne!",
    "Wooo! Du er on fire!",
    "Riktig! Dette går jo som en drøm!",
    "Perfekt! Du har 'Espresso'-fokus!",
    "Du er jo et geni! Akkurat som Stitch... nesten!",
    "Korrekt! Dette var lett som en plett!",
    "Fantastisk! Du spiller førstefiolin i matte!",
    "Nice! Du er like kul som Lilo med solbriller!",
    "Spot on! Du er en matte-ninja!"
];

const incorrectFeedbackMessages = [ // 15 stk
    "Oisann! Den var litt vrien, hva? Riktig svar var ",
    "Næææh, ikke helt. Men neste gang, da sitter'n! Riktig svar var ",
    "Ups! Selv Stitch gjør feil noen ganger. Riktig svar var ",
    "Ikke helt i takt der, men øvelse gjør korpsmester! Riktig svar var ",
    "Æsj, den glapp! Men du er fortsatt kul. Riktig svar var ",
    "Hoopsi! Kanskje du trenger litt mer 'Feather'-lett tenking? Riktig svar var ",
    "Den var litt kjip! Men ikke mist motet! Riktig svar var ",
    "Bomma litt, men det er lov å prøve! Riktig svar var ",
    "Nesten! Som å nesten treffe den høye C-en. Riktig svar var ",
    "Ikke helt, men du er fortsatt en stjerne! Riktig svar var ",
    "Den var litt tricky! Som en komplisert dans. Riktig svar var ",
    "Auda! Men husk, alle kan lære! Riktig svar var ",
    "Ikke denne gangen, men 'Nonsense'! Du klarer neste! Riktig svar var ",
    "Oi, den gikk litt skeis! Som når Stitch prøver å bake. Riktig svar var ",
    "Litt feil, men 'Hakuna Matata' – ingen bekymringer! Riktig svar var "
];

function generateAllPossibleQuestions() {
    allPossibleQuestions = [];
    if (typeof MAX_TABLE_NUMBER === 'undefined') {
        console.error("MAX_TABLE_NUMBER er ikke definert! Bruker 20 som standard.");
        MAX_TABLE_NUMBER = 20;
    }

    for (let i = 1; i <= MAX_TABLE_NUMBER; i++) {
        for (let j = 1; j <= MAX_TABLE_NUMBER; j++) {
            const correctAnswer = i * j;
            let questionText = `Hva er ${i} x ${j}?`;

            // Legg til visuell representasjon for 1-5 tabellen
            if (MAX_TABLE_NUMBER <= 5) {
                const visual_i = '●'.repeat(i);
                const visual_j = '●'.repeat(j);
                questionText += `<br><span class="visual-math">${visual_i} x ${visual_j}</span>`;
            }

            // Sikre at vi ikke har flere spørsmål enn unike kombinasjoner
            
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
    // Juster NUM_QUESTIONS_TO_ASK hvis det er færre unike spørsmål enn 20
    if (allPossibleQuestions.length < NUM_QUESTIONS_TO_ASK) {
        NUM_QUESTIONS_TO_ASK = allPossibleQuestions.length;
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
        // Bruk innerHTML for å rendre <br> og <span> for visuell representasjon
        questionEl.innerHTML = q.text; 
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
            const randomCorrectMsg = correctFeedbackMessages[Math.floor(Math.random() * correctFeedbackMessages.length)];
            feedbackEl.textContent = randomCorrectMsg;
            feedbackEl.style.color = "#2ecc71"; // Green
            if (selectedButtonElement) selectedButtonElement.classList.add('correct'); // Ensure selected is also marked
        } else {
            const randomIncorrectMsg = incorrectFeedbackMessages[Math.floor(Math.random() * incorrectFeedbackMessages.length)];
            feedbackEl.textContent = `${randomIncorrectMsg}${randomIncorrectMsg.includes("var ") ? correctAnswer : " " + correctAnswer}.`;
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
    NUM_QUESTIONS_TO_ASK = DEFAULT_NUM_QUESTIONS_TO_ASK; // Nullstill til standard for hver nye quiz
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswerValue = null;
    selectedButtonElement = null;
    
    // Regenerate questions based on MAX_TABLE_NUMBER every time a quiz starts
    // This ensures that if a user navigates between different max_table quizzes,
    // the correct set of questions is generated.
    generateAllPossibleQuestions();
    selectRandomQuestions();

    quizContainer.style.display = 'block';
    scoreEl.style.display = 'none';
    feedbackEl.textContent = '';
    
    // Ensure the event listener is only added once or re-added correctly
    nextButton.removeEventListener('click', handleNextButtonClick); // Remove previous if any
    nextButton.addEventListener('click', handleNextButtonClick);
    
    displayQuestion();
}

document.addEventListener('DOMContentLoaded', () => {
    const defaultMaxTable = 20; // Standard hvis attributt mangler
    const maxTableAttr = document.body.dataset.maxTable;
    MAX_TABLE_NUMBER = maxTableAttr ? parseInt(maxTableAttr, 10) : defaultMaxTable;

    // Oppdater hoved H1-tittelen på quiz-siden
    const quizTitleElement = document.querySelector('.app-container > h1');
    if (quizTitleElement) {
        quizTitleElement.textContent = `Gangetabell Quiz (1-${MAX_TABLE_NUMBER})`;
    }
    // Oppdater også <title>-taggen i head for bedre visning i nettleserfanen
    document.title = `Gangetabell Quiz (1-${MAX_TABLE_NUMBER})`;

    startQuiz();
});
