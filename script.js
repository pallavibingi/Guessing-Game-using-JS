
const rangeInput = document.getElementById("range");
const startBtn = document.getElementById("start-btn");
const guessForm = document.getElementById("guess-form");
const guessInput = document.getElementById("guess-input");
const feedback = document.getElementById("feedback");
const attemptsDisplay = document.getElementById("attempts");
const remainingDisplay = document.getElementById("remaining");
const maxRangeDisplay = document.getElementById("max-range");
const quitBtn = document.getElementById("quit-btn");
const restartBtn = document.getElementById("restart-btn");

let range = 100;
let random = 0;
let attempts = 0;
let gameOver = false;

function startGame() {
    const selectedRange = Number(rangeInput.value);

    if (
        !Number.isInteger(selectedRange) ||
        selectedRange < 1 ||
        selectedRange > 100
    ) {
        showFeedback(
            "Please choose a whole number between 1 and 100.",
            "error"
        );
        rangeInput.focus();
        return;
    }

    range = selectedRange;
    random = Math.floor(Math.random() * range) + 1;
    attempts = 0;
    gameOver = false;

    maxRangeDisplay.textContent = range;
    remainingDisplay.textContent = range;
    attemptsDisplay.textContent = attempts;

    guessInput.min = 1;
    guessInput.max = range;
    guessInput.value = "";
    guessInput.disabled = false;

    guessForm.querySelector("button").disabled = false;
    quitBtn.disabled = false;

    showFeedback(
        `I'm thinking of a number from 1 to ${range}. Good luck!`
    );

    guessInput.focus();
}

function showFeedback(message, type = "") {
    feedback.textContent = message;
    feedback.className = "feedback";

    if (type) {
        feedback.classList.add(type);
    }
}

function finishGame() {
    gameOver = true;
    guessInput.disabled = true;
    guessForm.querySelector("button").disabled = true;
    quitBtn.disabled = true;
}

function checkGuess(event) {
    event.preventDefault();

    if (gameOver) return;

    const guess = Number(guessInput.value);

    if (
        guessInput.value.trim() === "" ||
        !Number.isInteger(guess) ||
        guess < 1 ||
        guess > range
    ) {
        showFeedback(
            `Enter a whole number between 1 and ${range}.`,
            "error"
        );
        return;
    }

    attempts++;
    attemptsDisplay.textContent = attempts;
    remainingDisplay.textContent = Math.max(range - attempts, 0);

    if (guess === random) {
        showFeedback(
            `🎉 Correct! You found ${random} in ${attempts} attempt(s)!`,
            "success"
        );

        finishGame();
    } else if (guess < random) {
        showFeedback("⬆️ Too low! Try a bigger number.");
    } else {
        showFeedback("⬇️ Too high! Try a smaller number.");
    }

    if (!gameOver) {
        guessInput.value = "";
        guessInput.focus();
    }
}

function quitGame() {
    if (gameOver) return;

    showFeedback(
        `Game over! The secret number was ${random}.`,
        "error"
    );

    finishGame();
}

startBtn.addEventListener("click", startGame);
guessForm.addEventListener("submit", checkGuess);
quitBtn.addEventListener("click", quitGame);

restartBtn.addEventListener("click", () => {
    startGame();
});

// Start with a random number from 1 to 100.
startGame();

