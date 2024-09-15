let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];
const statusDisplay = document.getElementById('status');
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-btn');
const modeButtons = document.querySelectorAll('.mode-btn');
const popup = document.createElement('div');
popup.classList.add('popup');
document.body.appendChild(popup);

const updateStatus = () => {
    statusDisplay.textContent = `${currentPlayer}'s turn`;
};

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

const handleResultValidation = () => {
    let roundWon = false;
    for (let i = 0; i < winningConditions.length; i++) {
        const winCondition = winningConditions[i];
        let a = gameState[winCondition[0]];
        let b = gameState[winCondition[1]];
        let c = gameState[winCondition[2]];
        if (a === '' || b === '' || c === '') {
            continue;
        }
        if (a === b && b === c) {
            roundWon = true;
            break;
        }
    }
    
    if (roundWon) {
        popup.innerHTML = `
            <div class="message">${currentPlayer} wins! 🎉🎉</div>
            <button class="reset-btn" onclick="handleResetGame()">Reset Game</button>
        `;
        popup.style.display = 'flex';
        gameActive = false;
        return;
    }

    if (!gameState.includes('')) {
        popup.innerHTML = `
            <div class="message">Game ends in a draw!</div>
            <button class="reset-btn" onclick="handleResetGame()">Reset Game</button>
        `;
        popup.style.display = 'flex';
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
};

const handleCellClick = (clickedCellEvent) => {
    const clickedCell = clickedCellEvent.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('id'));

    if (gameState[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    handleResultValidation();
};

const handleResetGame = () => {
    gameActive = true;
    currentPlayer = 'X';
    gameState = ['', '', '', '', '', '', '', '', ''];
    updateStatus();
    cells.forEach(cell => (cell.textContent = ''));
    popup.style.display = 'none'; 
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', handleResetGame);

modeButtons.forEach(button => {
    button.addEventListener('click', () => {
        console.log(`${button.textContent} mode selected`);
    });
});

updateStatus();  
