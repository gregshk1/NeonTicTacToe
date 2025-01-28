
function isPlayerAboutToWin(gameState, player) {
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

    for (let condition of winningConditions) {
        const [a, b, c] = condition;
        if (
            (gameState[a] === player && gameState[b] === player && gameState[c] === '') ||
            (gameState[a] === player && gameState[c] === player && gameState[b] === '') ||
            (gameState[b] === player && gameState[c] === player && gameState[a] === '')
        ) {
            return condition.find(index => gameState[index] === '');
        }
    }
    return null;
}

export function easyAIMove(gameState) {
    const availableCells = gameState.map((cell, index) => cell === '' ? index : null).filter(index => index !== null);
    return availableCells[Math.floor(Math.random() * availableCells.length)];
}

export function hardAIMove(gameState) {
    const winningMove = isPlayerAboutToWin(gameState, 'O');
    if (winningMove !== null) {
        return winningMove;
    }

    const blockingMove = isPlayerAboutToWin(gameState, 'X');
    if (blockingMove !== null) {
        return blockingMove;
    }

    return easyAIMove(gameState);
}