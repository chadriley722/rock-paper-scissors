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

function getHumanChoice() {
    const humanChoice = prompt("Enter your choice: rock, paper, scissors");
    return humanChoice.toLowerCase();
}

function playGame() {
    let humanScore = 0;
    let computerScore = 0;
    
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
    
    let round = 1;
    let playing = true;
    
    while (playing) {
        console.log(`\nRound ${round}:`);
        
        const humanSelection = getHumanChoice();
        
        // Allow user to quit the game
        if (humanSelection === 'quit' || humanSelection === 'exit') {
            playing = false;
            break;
        }
        
        const computerSelection = getComputerChoice();
        
        console.log(`You chose: ${humanSelection}`);
        console.log(`Computer chose: ${computerSelection}`);
        
        const result = playRound(humanSelection, computerSelection);
        console.log(result);
        
        // Update scores based on the result
        if (result.includes("You win")) {
            humanScore++;
        } else if (result.includes("You lose")) {
            computerScore++;
        }
        
        console.log(`Current Score - You: ${humanScore}, Computer: ${computerScore}`);
        round++;
    }
    
    // Announce final winner
    console.log("\nGame Over!");
    if (humanScore > computerScore) {
        console.log(`You won the game! Final Score - You: ${humanScore}, Computer: ${computerScore}`);
    } else if (computerScore > humanScore) {
        console.log(`Computer won the game! Final Score - You: ${humanScore}, Computer: ${computerScore}`);
    } else {
        console.log(`It's a tie! Final Score - You: ${humanScore}, Computer: ${computerScore}`);
    }
}

// Start the game
playGame();