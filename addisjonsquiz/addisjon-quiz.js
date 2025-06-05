document.addEventListener('DOMContentLoaded', () => {
    const questionElement = document.getElementById('question');
    const optionsContainer = document.getElementById('options');
    const feedbackElement = document.getElementById('feedback');
    const nextButton = document.getElementById('next-btn');
    const scoreContainer = document.getElementById('score-container');
    const quizContainer = document.getElementById('quiz-container');
    const questionCounterElement = document.getElementById('question-counter');

    const TOTAL_QUESTIONS = 10;
    const NUMBER_OF_OPTIONS = 6;
    let currentQuestions = [];
    let currentQuestionIndex = 0;
    let score = 0;

    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    function generateSingleQuestion() {
        const sumResult = Math.floor(Math.random() * 101); // Summen er mellom 0 og 100
        const num1 = Math.floor(Math.random() * (sumResult + 1)); // Første addend, 0 til sumResult
        const correctAnswer = sumResult - num1; // Dette er den manglende verdien

        const questionText = `${num1} + ? = ${sumResult}`;

        const options = new Set();
        options.add(correctAnswer);

        // Generer unike feilalternativer
        while (options.size < NUMBER_OF_OPTIONS) {
            const randomOption = Math.floor(Math.random() * 101); // Alternativer også mellom 0-100
            options.add(randomOption);
        }

        const optionsArray = Array.from(options);
        shuffleArray(optionsArray);

        return {
            question: questionText,
            options: optionsArray,
            answer: correctAnswer
        };
    }

    function generateAllQuestions() {
        currentQuestions = [];
        for (let i = 0; i < TOTAL_QUESTIONS; i++) {
            currentQuestions.push(generateSingleQuestion());
        }
    }

    function displayQuestion() {
        if (currentQuestionIndex < TOTAL_QUESTIONS) {
            const questionData = currentQuestions[currentQuestionIndex];
            questionElement.textContent = questionData.question;
            questionCounterElement.textContent = `Spørsmål ${currentQuestionIndex + 1} av ${TOTAL_QUESTIONS}`;

            optionsContainer.innerHTML = '';
            questionData.options.forEach(option => {
                const button = document.createElement('button');
                button.textContent = option;
                button.classList.add('option-btn'); // Forventer styling fra style.css
                button.addEventListener('click', () => selectAnswer(option, questionData.answer));
                optionsContainer.appendChild(button);
            });

            feedbackElement.textContent = '';
            feedbackElement.className = 'feedback';
            nextButton.style.display = 'none';
            enableOptionButtons(true);
        } else {
            showResults();
        }
    }

    function selectAnswer(selectedOption, correctAnswer) {
        enableOptionButtons(false);
        if (selectedOption === correctAnswer) {
            feedbackElement.textContent = 'Riktig!';
            feedbackElement.className = 'feedback correct'; // For styling av riktig svar
            score++;
        } else {
            feedbackElement.textContent = `Feil. Riktig svar var ${correctAnswer}.`;
            feedbackElement.className = 'feedback incorrect'; // For styling av feil svar
        }
        nextButton.style.display = 'block';
    }

    function enableOptionButtons(enable) {
        const optionButtons = optionsContainer.querySelectorAll('.option-btn');
        optionButtons.forEach(button => {
            button.disabled = !enable;
        });
    }

    function showResults() {
        quizContainer.style.display = 'none';
        scoreContainer.style.display = 'block';
        scoreContainer.innerHTML = `
            <h2>Quizen er ferdig!</h2>
            <p>Du fikk ${score} av ${TOTAL_QUESTIONS} riktige.</p>
            <button id="restart-btn" class="button">Spill Igjen</button>
        `;
        document.getElementById('restart-btn').addEventListener('click', startQuiz);
    }

    function startQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        generateAllQuestions();
        scoreContainer.style.display = 'none';
        quizContainer.style.display = 'block';
        displayQuestion();
    }

    nextButton.addEventListener('click', () => {
        currentQuestionIndex++;
        displayQuestion();
    });

    startQuiz(); // Initialiser quizen
});