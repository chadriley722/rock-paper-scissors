// Game state
let humanScore = 0;
let computerScore = 0;
let round = 1;

// DOM elements (will be initialized after DOM is loaded)
let rockButton;
let paperButton;
let scissorsButton;
let scoreDisplay;
let gameLog;
let newGameButton;

function getComputerChoice() {
    const randomNumber = Math.floor(Math.random() * 3);
    if (randomNumber === 0) {
        return "rock";
    } else if (randomNumber === 1) {
        return "paper";
    } else {
        return "scissors";
    }
}

function playRound(humanChoice, computerChoice) {
    humanChoice = humanChoice.toLowerCase();
    
    if (humanChoice === computerChoice) {
        return "It's a tie!";
    } else if (humanChoice === "rock" && computerChoice === "scissors") {
        return "You win! Rock beats scissors.";
    } else if (humanChoice === "paper" && computerChoice === "rock") {
        return "You win! Paper beats rock.";
    } else if (humanChoice === "scissors" && computerChoice === "paper") {
        return "You win! Scissors beats paper.";
    } else {
        return "You lose! Computer wins.";
    }
}

function updateGameLog(message) {
    const logEntry = document.createElement('p');
    logEntry.textContent = message;
    gameLog.appendChild(logEntry);
    
    // Auto-scroll to the bottom
    gameLog.scrollTop = gameLog.scrollHeight;
    
    // Also log to console as requested
    console.log(message);
}

function updateScore() {
    scoreDisplay.textContent = `Score: You ${humanScore} - Computer ${computerScore}`;
}

function handlePlayerSelection(playerSelection) {
    // Get computer's choice
    const computerSelection = getComputerChoice();
    
    // Log the round information
    updateGameLog(`\nRound ${round}:`);
    updateGameLog(`You chose: ${playerSelection}`);
    updateGameLog(`Computer chose: ${computerSelection}`);
    
    // Play the round and get the result
    const result = playRound(playerSelection, computerSelection);
    updateGameLog(result);
    
    // Update scores based on the result
    if (result.includes("You win")) {
        humanScore++;
    } else if (result.includes("You lose")) {
        computerScore++;
    }
    
    // Update the score display
    updateScore();
    updateGameLog(`Current Score - You: ${humanScore}, Computer: ${computerScore}`);
    
    // Check if there's a winner (first to 5 points)
    if (humanScore >= 5 || computerScore >= 5) {
        declareWinner();
    } else {
        // Increment round counter if game continues
        round++;
    }
}

function declareWinner() {
    // Announce the winner
    updateGameLog('\n*** GAME OVER ***');
    
    if (humanScore > computerScore) {
        updateGameLog(`You are the winner! Final Score - You: ${humanScore}, Computer: ${computerScore}`);
    } else {
        updateGameLog(`Computer is the winner! Final Score - You: ${humanScore}, Computer: ${computerScore}`);
    }
    
    // Add a visual indicator of the game ending
    gameLog.style.borderColor = '#4CAF50';
    gameLog.style.borderWidth = '3px';
    
    // Disable game buttons
    setButtonsEnabled(false);
    
    // Show the new game button
    newGameButton.style.display = 'inline-block';
    
    // Add a message about starting a new game
    updateGameLog('\nClick "Start New Game!" to play again.');
}

function resetGame() {
    // Reset scores and round counter
    humanScore = 0;
    computerScore = 0;
    round = 1;
    
    // Update the score display
    updateScore();
    
    // Clear the game log
    gameLog.innerHTML = '';
    
    // Reset the game log styling
    gameLog.style.borderColor = '#ccc';
    gameLog.style.borderWidth = '1px';
    
    // Re-enable buttons
    setButtonsEnabled(true);
    
    // Hide the new game button
    newGameButton.style.display = 'none';
    
    // Start a new game
    updateGameLog('New game started! Choose rock, paper, or scissors.');
}

function setButtonsEnabled(enabled) {
    rockButton.disabled = !enabled;
    paperButton.disabled = !enabled;
    scissorsButton.disabled = !enabled;
    
    // Visual feedback for disabled/enabled state
    const buttons = [rockButton, paperButton, scissorsButton];
    buttons.forEach(button => {
        if (enabled) {
            button.style.opacity = '1';
            button.style.cursor = 'pointer';
        } else {
            button.style.opacity = '0.5';
            button.style.cursor = 'default';
        }
    });
}

// Initialize the game when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    // Initialize DOM elements
    rockButton = document.getElementById('rock');
    paperButton = document.getElementById('paper');
    scissorsButton = document.getElementById('scissors');
    scoreDisplay = document.getElementById('score');
    gameLog = document.getElementById('game-log');
    newGameButton = document.getElementById('new-game');
    
    // Add event listeners to game buttons
    rockButton.addEventListener('click', () => handlePlayerSelection('rock'));
    paperButton.addEventListener('click', () => handlePlayerSelection('paper'));
    scissorsButton.addEventListener('click', () => handlePlayerSelection('scissors'));
    
    // Add event listener to new game button
    newGameButton.addEventListener('click', resetGame);
    
    // Start the game
    updateGameLog('Game Log');
});