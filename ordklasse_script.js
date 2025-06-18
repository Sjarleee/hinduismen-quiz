const questionWordEl = document.getElementById('question-word');
const optionsContainer = document.getElementById('options');
const feedbackEl = document.getElementById('feedback');
const nextBtn = document.getElementById('next-btn');
const questionCounterEl = document.getElementById('question-counter');
const quizContainer = document.getElementById('quiz-container');
const scoreContainer = document.getElementById('score-container');
const scoreTextEl = document.getElementById('score-text');
const restartBtn = document.getElementById('restart-btn');

const wordClasses = ["Adjektiv", "Verb", "Substantiv"];

let allQuestions = [
    { word: "hus", type: "Substantiv" },
    { word: "løper", type: "Verb" },
    { word: "grønn", type: "Adjektiv" },
    { word: "bok", type: "Substantiv" },
    { word: "tenker", type: "Verb" },
    { word: "lykkelig", type: "Adjektiv" },
    { word: "ser", type: "Verb" },
    { word: "stor", type: "Adjektiv" },
    { word: "lærer", type: "Substantiv" },
    { word: "hjalp", type: "Verb" }, // Uregelrett verb, preteritum
    { word: "gammel", type: "Adjektiv" },
    { word: "Norge", type: "Substantiv" }, // Egennavn
    { word: "svømme", type: "Verb" }, // Infinitiv
    { word: "norsk", type: "Adjektiv" },
    // Nye ord lagt til under:
    { word: "bil", type: "Substantiv" },
    { word: "synger", type: "Verb" },
    { word: "rask", type: "Adjektiv" },
    { word: "katt", type: "Substantiv" },
    { word: "spiser", type: "Verb" },
    { word: "liten", type: "Adjektiv" },
    { word: "sol", type: "Substantiv" },
    { word: "danser", type: "Verb" },
    { word: "vakker", type: "Adjektiv" },
    { word: "tre", type: "Substantiv" },
    { word: "skriver", type: "Verb" },
    { word: "kald", type: "Adjektiv" },
    { word: "vann", type: "Substantiv" },
    { word: "leser", type: "Verb" },
    { word: "varm", type: "Adjektiv" },
    { word: "fjell", type: "Substantiv" },
    { word: "tegner", type: "Verb" },
    { word: "snill", type: "Adjektiv" },
    { word: "mat", type: "Substantiv" },
    { word: "sover", type: "Verb" },
    { word: "trist", type: "Adjektiv" },
    { word: "by", type: "Substantiv" },
    { word: "hopper", type: "Verb" },
    { word: "ny", type: "Adjektiv" },
    { word: "dag", type: "Substantiv" },
    { word: "snakker", type: "Verb" },
    { word: "lang", type: "Adjektiv" },
    { word: "venn", type: "Substantiv" },
    { word: "leker", type: "Verb" },
    { word: "sterk", type: "Adjektiv" },
    { word: "fisk", type: "Substantiv" },
    { word: "flyr", type: "Verb" },
    { word: "sint", type: "Adjektiv" },
    { word: "jobb", type: "Substantiv" },
    { word: "hører", type: "Verb" },
    { word: "tung", type: "Adjektiv" },
    { word: "sang", type: "Substantiv" },
    { word: "smiler", type: "Verb" },
    { word: "morsom", type: "Adjektiv" },
    { word: "år", type: "Substantiv" },
    { word: "reiser", type: "Verb" },
    { word: "redd", type: "Adjektiv" },
    { word: "barn", type: "Substantiv" },
    { word: "gråter", type: "Verb" },
    { word: "sur", type: "Adjektiv" },
    { word: "ball", type: "Substantiv" },
    { word: "elsker", type: "Verb" },
    { word: "sulten", type: "Adjektiv" },
    { word: "måne", type: "Substantiv" },
    { word: "kjører", type: "Verb" },
    { word: "tørst", type: "Adjektiv" },
    // Nye 50 ord lagt til under:
    { word: "vindu", type: "Substantiv" },
    { word: "åpner", type: "Verb" },
    { word: "lys", type: "Adjektiv" }, // Kan også være substantiv, men her som beskrivende
    { word: "drøm", type: "Substantiv" },
    { word: "ønsker", type: "Verb" },
    { word: "modig", type: "Adjektiv" },
    { word: "blomst", type: "Substantiv" },
    { word: "vokser", type: "Verb" },
    { word: "myk", type: "Adjektiv" },
    { word: "gress", type: "Substantiv" },
    { word: "klipper", type: "Verb" },
    { word: "hard", type: "Adjektiv" },
    { word: "stein", type: "Substantiv" },
    { word: "kaster", type: "Verb" },
    { word: "rund", type: "Adjektiv" },
    { word: "sky", type: "Substantiv" },
    { word: "regner", type: "Verb" },
    { word: "våt", type: "Adjektiv" },
    { word: "snø", type: "Substantiv" },
    { word: "fryser", type: "Verb" },
    { word: "hvit", type: "Adjektiv" },
    { word: "is", type: "Substantiv" },
    { word: "smelter", type: "Verb" },
    { word: "klar", type: "Adjektiv" }, // "klar himmel"
    { word: "stjerne", type: "Substantiv" },
    { word: "skinner", type: "Verb" },
    { word: "mørk", type: "Adjektiv" },
    { word: "natt", type: "Substantiv" },
    { word: "våkner", type: "Verb" },
    { word: "tidlig", type: "Adjektiv" }, // Kan også være adverb, men her som adjektivisk bruk
    { word: "morgen", type: "Substantiv" },
    { word: "hilser", type: "Verb" },
    { word: "vennlig", type: "Adjektiv" },
    { word: "familie", type: "Substantiv" },
    { word: "besøker", type: "Verb" },
    { word: "koselig", type: "Adjektiv" },
    { word: "eventyr", type: "Substantiv" },
    { word: "forteller", type: "Verb" },
    { word: "spennende", type: "Adjektiv" },
    { word: "hemmelighet", type: "Substantiv" },
    { word: "visker", type: "Verb" },
    { word: "stille", type: "Adjektiv" },
    { word: "musikk", type: "Substantiv" },
    { word: "spiller", type: "Verb" }, // Spiller et instrument
    { word: "høy", type: "Adjektiv" }, // Høy lyd
    { word: "latter", type: "Substantiv" }, // Substantiv
    { word: "ler", type: "Verb" }, // Verb
    { word: "glad", type: "Adjektiv" }, // Adjektiv
    // Nye 50 ord lagt til under:
    { word: "vei", type: "Substantiv" },
    { word: "bygger", type: "Verb" },
    { word: "bred", type: "Adjektiv" },
    { word: "elv", type: "Substantiv" },
    { word: "renner", type: "Verb" },
    { word: "dyp", type: "Adjektiv" },
    { word: "bro", type: "Substantiv" },
    { word: "krysser", type: "Verb" },
    { word: "langsom", type: "Adjektiv" },
    { word: "tog", type: "Substantiv" },
    { word: "stopper", type: "Verb" },
    { word: "full", type: "Adjektiv" },
    { word: "buss", type: "Substantiv" },
    { word: "venter", type: "Verb" },
    { word: "tom", type: "Adjektiv" },
    { word: "flyplass", type: "Substantiv" },
    { word: "lander", type: "Verb" },
    { word: "trygg", type: "Adjektiv" },
    { word: "skip", type: "Substantiv" },
    { word: "seiler", type: "Verb" },
    { word: "rolig", type: "Adjektiv" },
    { word: "hav", type: "Substantiv" },
    { word: "bølger", type: "Verb" }, // Kan også være substantiv, her som verb
    { word: "blå", type: "Adjektiv" },
    { word: "sand", type: "Substantiv" },
    { word: "graver", type: "Verb" },
    { word: "fin", type: "Adjektiv" },
    { word: "øy", type: "Substantiv" },
    { word: "oppdager", type: "Verb" },
    { word: "fjern", type: "Adjektiv" },
    { word: "skog", type: "Substantiv" },
    { word: "vandrer", type: "Verb" },
    { word: "grønnkledd", type: "Adjektiv" }, // Sammensatt adjektiv
    { word: "sti", type: "Substantiv" },
    { word: "følger", type: "Verb" },
    { word: "smal", type: "Adjektiv" },
    { word: "hule", type: "Substantiv" },
    { word: "utforsker", type: "Verb" },
    { word: "hemmelig", type: "Adjektiv" },
    { word: "skatt", type: "Substantiv" },
    { word: "finner", type: "Verb" },
    { word: "dyrbar", type: "Adjektiv" },
    { word: "kart", type: "Substantiv" },
    { word: "studerer", type: "Verb" },
    { word: "nøyaktig", type: "Adjektiv" },
    { word: "kompass", type: "Substantiv" },
    { word: "peker", type: "Verb" },
    { word: "riktig", type: "Adjektiv" }
];


let currentQuestions = [];
let currentQuestionIndex = 0;
let score = 0;
const totalQuizQuestions = 10; // Antall spørsmål per runde

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startGame() {
    shuffleArray(allQuestions);
    currentQuestions = allQuestions.slice(0, totalQuizQuestions);
    if (currentQuestions.length === 0) {
        questionWordEl.textContent = "Ingen ord funnet!";
        optionsContainer.innerHTML = "";
        return;
    }
    currentQuestionIndex = 0;
    score = 0;
    quizContainer.style.display = 'block';
    scoreContainer.style.display = 'none';
    nextBtn.style.display = 'none';
    feedbackEl.textContent = '';
    loadQuestion();
}

function loadQuestion() {
    if (currentQuestionIndex >= currentQuestions.length) {
        endQuiz();
        return;
    }

    const currentWordData = currentQuestions[currentQuestionIndex];
    questionWordEl.textContent = currentWordData.word;
    questionCounterEl.textContent = `Ord ${currentQuestionIndex + 1} av ${currentQuestions.length}`;
    optionsContainer.innerHTML = '';
    feedbackEl.textContent = '';
    nextBtn.style.display = 'none';

    wordClasses.forEach(wordClass => {
        const button = document.createElement('button');
        button.textContent = wordClass;
        button.classList.add('option-btn');
        button.addEventListener('click', () => checkAnswer(wordClass, currentWordData.type, button));
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedType, correctType, button) {
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.disabled = true; // Deaktiver alle knapper etter svar
        if (btn.textContent === correctType) {
            btn.classList.add('correct');
        } else if (btn === button) { // Kun hvis det er den feilaktig valgte knappen
            btn.classList.add('wrong');
        }
    });

    if (selectedType === correctType) {
        feedbackEl.textContent = 'Riktig!';
        feedbackEl.style.color = 'green';
        score++;
    } else {
        feedbackEl.textContent = `Feil. Riktig svar var ${correctType}.`;
        feedbackEl.style.color = 'red';
    }
    nextBtn.style.display = 'inline-block';
}

function endQuiz() {
    quizContainer.style.display = 'none';
    scoreContainer.style.display = 'block';
    let message = "";
    const percentage = (score / currentQuestions.length) * 100;

    if (percentage === 100) {
        message = "Fantastisk! Alle riktige! 🎉";
    } else if (percentage >= 70) {
        message = "Kjempebra jobba!";
    } else if (percentage >= 50) {
        message = "Bra forsøk!";
    } else {
        message = "Bedre lykke neste gang!";
    }
    scoreTextEl.textContent = `Du fikk ${score} av ${currentQuestions.length} riktige. ${message}`;
}

nextBtn.addEventListener('click', () => {
    currentQuestionIndex++;
    // Fjern .correct og .wrong klasser før neste spørsmål
    document.querySelectorAll('.option-btn').forEach(btn => {
        btn.classList.remove('correct', 'wrong');
        btn.disabled = false;
    });
    loadQuestion();
});

restartBtn.addEventListener('click', startGame);

// Start spillet når siden lastes
startGame();