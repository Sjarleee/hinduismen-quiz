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

let correctFeedbackMessages = [ // 15 stk
    "Yes! Helt konge, Othilie! Mamma og Pappa blir så stolte!",
    "Du er jo helt rå på dette, Othilie! High five fra Lilo & Stitch!",
    "Korrekt! Du er smartere enn en kalkulator, og like glitrende som din favoritt-makeup!",
    "Boom! Rett i mål, som en perfekt trommesolo!",
    "Du naila den, Othilie! Like smooth som Sabrina Carpenter på scenen!",
    "Ohana betyr familie, og familie betyr at Othilie alltid finner riktig svar! Perfekt!",
    "Helt sjef, Othilie! Du er jo en matte-rockestjerne fra Rustad Skole!",
    "Wooo! Du er on fire, Othilie! Oda B og Oda F heier på deg!",
    "Riktig! Dette går jo som en drøm, like vakkert som en korsang!",
    "Perfekt, Othilie! Du har 'Espresso'-fokus, akkurat som Sabrina!",
    "Du er jo et geni, Othilie! Nesten like smart som Stitch (når han er snill)!",
    "Korrekt! Dette var lett som en plett, og like gøy som å legge sminke!",
    "Fantastisk, Othilie! Du spiller førstefiolin i matte, akkurat som i korpset!",
    "Nice, Othilie! Du er like kul som Lilo med solbriller og like flink som Oda F!",
    "Spot on, Othilie! Du er en matte-ninja, og Oda B ville vært imponert!"
];
const newCorrectFeedbackMessages = [
    "Helt rått, Oter'n! Anders jubler i klasserommet nå!",
    "Du er en matte-mester fra Skullerudstubben! Korrekt!",
    "Riktig! Like presist som en perfekt kornett-solo!",
    "Yes! Dette var ikke noe mysterium for deg, Cluedo-ekspert!",
    "Korrekt! Du scorer like lett på matte som på fotballbanen for RASK!",
    "Fantastisk, Othilie! Du er klar for matte-utfordringer i USA!",
    "Helt konge! Dette var IKKE urettferdig, du er jo superflink!",
    "Du svømmer deg gjennom disse oppgavene! Riktig!",
    "Perfekt! Anders er så stolt at han nesten tar en gledeståre!",
    "Oter'n er i sonen! Enda et riktig svar!",
    "Riktig! Du treffer tonen perfekt, akkurat som på kornetten!",
    "Ingen tvil her, Othilie! Du har løst gåten!",
    "Mål! Du er RASK på avtrekkeren med riktig svar!",
    "Supert! Du kommer til å imponere alle i USA med mattekunnskapene dine!",
    "Dette var jo lett match! Ikke urettferdig i det hele tatt!",
    "Du er en stjerne, Othilie! Like glitrende som vannet i svømmebassenget!",
    "Korrekt! Anders sender deg en digital high five!",
    "Oter'n, du er ustoppelig! Riktig igjen!",
    "Du spiller deg til riktig svar, som en mester på kornett!",
    "Saken er løst! Riktig svar, Othilie!"
];
correctFeedbackMessages = correctFeedbackMessages.concat(newCorrectFeedbackMessages);

let incorrectFeedbackMessages = [ // 15 stk
    "Oisann, Othilie! Den var litt vrien, hva? Kanskje Mamma eller Pappa kan hjelpe? Riktig svar var ",
    "Næææh, ikke helt, Othilie. Men neste gang, da sitter'n! Som en perfekt Sabrina Carpenter-sang! Riktig svar var ",
    "Ups! Selv Stitch gjør feil noen ganger, Othilie. Ikke gi deg! Riktig svar var ",
    "Ikke helt i takt der, Othilie, men øvelse gjør korpsmester! Riktig svar var ",
    "Æsj, den glapp, Othilie! Men du er fortsatt like kul som Oda B. Riktig svar var ",
    "Hoopsi! Kanskje du trenger litt mer 'Feather'-lett tenking, som Sabrina? Riktig svar var ",
    "Den var litt kjip, Othilie! Men ikke mist motet, Rustad Skole heier på deg! Riktig svar var ",
    "Bomma litt, Othilie, men det er lov å prøve! Like modig som Lilo! Riktig svar var ",
    "Nesten, Othilie! Som å nesten treffe den høye C-en i koret. Riktig svar var ",
    "Ikke helt, Othilie, men du er fortsatt en stjerne! Oda F vet du kan bedre! Riktig svar var ",
    "Den var litt tricky, Othilie! Som en komplisert dans, eller en vanskelig sminkelook. Riktig svar var ",
    "Auda, Othilie! Men husk, alle kan lære, selv på Rustad Skole! Riktig svar var ",
    "Ikke denne gangen, Othilie, men 'Nonsense'! Du klarer neste, det vet Mamma og Pappa! Riktig svar var ",
    "Oi, den gikk litt skeis, Othilie! Som når Stitch prøver å bake (eller gjøre matte). Riktig svar var ",
    "Litt feil, Othilie, men 'Hakuna Matata' – ingen bekymringer! Du er like flink som Oda B og Oda F! Riktig svar var "
];
const newIncorrectFeedbackMessages = [
    "Oisann, Oter'n! Anders ble litt lei seg nå, men heier på deg videre! Riktig svar var ",
    "Huff da, Skullerudstubben-stjerne! Ikke helt i mål. Riktig svar var ",
    "Nesten, Othilie! Som å bomme på en tone på kornetten. Riktig svar var ",
    "Det var en vrien gåte, Cluedo-detektiv! Riktig svar var ",
    "Bom på mål, RASK-spiller! Men du scorer neste gang! Riktig svar var ",
    "Litt feil, Othilie, men du lærer masse før USA-turen! Riktig svar var ",
    "Uffda, dette føltes kanskje litt urettferdig? Riktig svar var ",
    "En liten svømmetur unna riktig svar, Othilie! Riktig svar var ",
    "Anders sukker litt, men vet du kan bedre, Oter'n! Riktig svar var ",
    "Ikke helt, men Oter'n gir aldri opp! Riktig svar var ",
    "Den tonen satt ikke helt, men øvelse gjør mester! Riktig svar var ",
    "Mysteriet fortsetter... Prøv igjen! Riktig svar var ",
    "Selvmål! Men du kommer sterkere tilbake for RASK! Riktig svar var ",
    "Litt mer øving før USA, så sitter det! Riktig svar var ",
    "Var dette urettferdig vanskelig, Othilie? Riktig svar var ",
    "Du gikk nesten under, men du kommer deg opp igjen! Riktig svar var ",
    "Anders rynker pannen, men har troen på deg! Riktig svar var ",
    "Oter'n, den glapp! Men du er snart tilbake på sporet. Riktig svar var ",
    "En falsk note der, men neste blir ren! Riktig svar var ",
    "Feil spor, detektiv! Men du finner løsningen snart. Riktig svar var "
];
incorrectFeedbackMessages = incorrectFeedbackMessages.concat(newIncorrectFeedbackMessages);

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
