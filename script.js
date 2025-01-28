

import { easyAIMove, hardAIMove } from './ai.js';

const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status');
const resetButton = document.querySelector('#reset');
const pvpButton = document.querySelector('#pvp');
const vsAiButton = document.querySelector('#vs-ai');
const difficultySelection = document.querySelector('#difficulty-selection');
const easyAIButton = document.querySelector('#easy-ai');
const hardAIButton = document.querySelector('#hard-ai');
const scoreX = document.querySelector('#score-x');
const scoreO = document.querySelector('#score-o');

let currentPlayer = 'X';
let gameState = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;
let vsAI = false;
let aiDifficulty = 'easy';
let winsX = 0;
let winsO = 0;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function handleCellClick(event) {
    const clickedCell = event.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add('marked');

    checkForWinner();
}

function checkForWinner() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        const a = gameState[winCondition[0]];
        const b = gameState[winCondition[1]];
        const c = gameState[winCondition[2]];

        if (a === '' || b === '' || c === '') {
            continue;
        }

        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `Jogador ${currentPlayer} venceu!`;
        updateScore(currentPlayer);
        gameActive = false;
        return;
    }

    const roundDraw = !gameState.includes('');
    if (roundDraw) {
        statusText.textContent = 'Empate!';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Vez do Jogador ${currentPlayer}`;

    if (vsAI && currentPlayer === 'O') {
        aiMove();
    }
}

function updateScore(winner) {
    if (winner === 'X') {
        winsX++;
        scoreX.textContent = `Vitórias X: ${winsX}`;
    } else if (winner === 'O') {
        winsO++;
        scoreO.textContent = `Vitórias O: ${winsO}`;
    }
}

function aiMove() {
    let move;
    if (aiDifficulty === 'easy') {
        move = easyAIMove(gameState);
    } else {
        move = hardAIMove(gameState);
    }

    gameState[move] = 'O';
    cells[move].textContent = 'O';
    cells[move].classList.add('marked');
    checkForWinner();
}

function resetGame() {
    gameState = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    statusText.textContent = `Vez do Jogador ${currentPlayer}`;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('marked');
    });
}

function setPVPMode() {
    vsAI = false;
    difficultySelection.style.display = 'none'; 
}

function setAIMode() {
    vsAI = true;
    difficultySelection.style.display = 'block'; 
    resetGame();
}

easyAIButton.addEventListener('click', () => {
    aiDifficulty = 'easy';
    resetGame();
});

hardAIButton.addEventListener('click', () => {
    aiDifficulty = 'hard';
    resetGame();
});

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
pvpButton.addEventListener('click', setPVPMode);
vsAiButton.addEventListener('click', setAIMode);

resetGame();