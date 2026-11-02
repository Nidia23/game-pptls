const WINNING_SCORE = 3;

// Cada opción: su emoji y a quién vence (con el verbo de la regla)
const GAME = {
    Piedra:  { emoji: '✊',  beats: { Tijera: 'aplasta', Lagarto: 'aplasta' } },
    Papel:   { emoji: '✋',  beats: { Piedra: 'cubre', Spock: 'desautoriza' } },
    Tijera:  { emoji: '✌️', beats: { Papel: 'corta', Lagarto: 'decapita' } },
    Lagarto: { emoji: '🦎',  beats: { Spock: 'envenena', Papel: 'devora' } },
    Spock:   { emoji: '🖖',  beats: { Tijera: 'destroza', Piedra: 'vaporiza' } }
};

const options = Object.keys(GAME);

let playerScore = 0;
let computerScore = 0;

const resultEl = document.getElementById('result');
const playerHandEl = document.getElementById('playerHand');
const computerHandEl = document.getElementById('computerHand');
const playerScoreEl = document.getElementById('playerScore');
const computerScoreEl = document.getElementById('computerScore');
const choiceButtons = document.querySelectorAll('.choice');

function playGame(userChoice) {
    const computerChoice = options[Math.floor(Math.random() * options.length)];

    playerHandEl.textContent = GAME[userChoice].emoji;
    computerHandEl.textContent = GAME[computerChoice].emoji;

    let outcome;
    if (userChoice === computerChoice) {
        outcome = 'tie';
        showResult(`Empate. Ambos habéis elegido ${userChoice}`, outcome);
    } else if (GAME[userChoice].beats[computerChoice]) {
        outcome = 'win';
        playerScore++;
        showResult(`¡Ganaste! ${userChoice} ${GAME[userChoice].beats[computerChoice]} a ${computerChoice}`, outcome);
    } else {
        outcome = 'lose';
        computerScore++;
        showResult(`Perdiste. ${computerChoice} ${GAME[computerChoice].beats[userChoice]} a ${userChoice}`, outcome);
    }

    animateHands(outcome);
    updateScore();

    if (playerScore === WINNING_SCORE || computerScore === WINNING_SCORE) {
        endGame();
    }
}

function showResult(message, outcome) {
    resultEl.textContent = message;
    resultEl.className = outcome;
}

function animateHands(outcome) {
    // Reiniciamos la animación para que se repita en cada ronda
    playerHandEl.className = 'hand';
    void playerHandEl.offsetWidth;
    if (outcome === 'win') playerHandEl.classList.add('win');
    if (outcome === 'lose') playerHandEl.classList.add('lose');
}

function updateScore() {
    playerScoreEl.textContent = playerScore;
    computerScoreEl.textContent = computerScore;
}

function endGame() {
    const playerWon = playerScore === WINNING_SCORE;
    showResult(
        playerWon ? '¡Felicidades, has ganado la partida!' : 'Lo siento, ha ganado el ordenador',
        playerWon ? 'win' : 'lose'
    );
    choiceButtons.forEach(button => (button.disabled = true));
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    updateScore();

    playerHandEl.textContent = '❔';
    playerHandEl.className = 'hand';
    computerHandEl.textContent = '❔';
    showResult('Elige tu jugada', '');

    choiceButtons.forEach(button => (button.disabled = false));
}

choiceButtons.forEach(button => {
    button.addEventListener('click', () => playGame(button.dataset.choice));
});

document.getElementById('btnReset').addEventListener('click', resetGame);
