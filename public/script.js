document.addEventListener('DOMContentLoaded', () => {
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const nextButton = document.getElementById('next');
    const scoreElement = document.getElementById('score');

    let currentQuestionIndex = 0;
    let score = 0;
    let questions = [];

    async function fetchQuestions() {
        try {
            const response = await fetch('/questions');
            questions = await response.json();
            displayQuestion(questions[currentQuestionIndex]);
        } catch (error) {
            console.error("Error fetching questions:", error);
        }
    }

    function displayQuestion(question) {
        questionElement.textContent = question.question;
        optionsElement.innerHTML = '';

        question.options.forEach((option) => {
            const button = document.createElement('button');
            button.textContent = option;
            button.classList.add('option-btn');
            button.addEventListener('click', () => selectAnswer(option, question.answer)); 
            optionsElement.appendChild(button);
        });
    }

    function selectAnswer(selectedOption, correctAnswer) {
        console.log(`Selected: ${selectedOption}, Correct: ${correctAnswer}`); 
        if (selectedOption === correctAnswer) {
            score++;
        }
        scoreElement.textContent = `Score: ${score}`; 
        currentQuestionIndex++;

        if (currentQuestionIndex < questions.length) {
            displayQuestion(questions[currentQuestionIndex]);
        } else {
            showScore();
        }
    }

    function showScore() {
        questionElement.textContent = 'Quiz Over!';
        optionsElement.innerHTML = '';
        scoreElement.textContent = `Your final score: ${score}`;
        nextButton.style.display = 'none';
    }

    nextButton.addEventListener('click', () => {
        if (currentQuestionIndex < questions.length) {
            displayQuestion(questions[currentQuestionIndex]);
        } else {
            showScore();
        }
    });

    fetchQuestions();
});
