let humanScore = 0;
let computerScore = 0;

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
  const valid = ["rock", "paper", "scissors"];
  while (true) {
    const input = prompt("rock, paper or scissors?");
    if (input === null) return null;
    const normalized = input.toLowerCase().trim();
    if (valid.includes(normalized)) return normalized;
    alert("Введи rock, paper или scissors");
  }
}

function playRound(humanChoice, computerChoice) {
  humanChoice = humanChoice.toLowerCase();
  const rules = {
    rock: "scissors",
    scissors: "paper",
    paper: "rock",
  };
  const human = humanChoice[0].toUpperCase() + humanChoice.slice(1);
  const computer = computerChoice[0].toUpperCase() + computerChoice.slice(1);
  if (humanChoice === computerChoice) {
    console.log(`Tie! Both chose ${human}`);
    return;
  }
  if (rules[humanChoice] === computerChoice) {
    console.log(`You win! ${human} beats ${computer}`);
    humanScore++;
    return;
  }
  console.log(`You lose! ${computer} beats ${human}`);
  computerScore++;
}

function playGame() {
  humanScore = 0;
  computerScore = 0;

  for (let i = 1; i <= 5; i++) {
    console.log(`--- Round ${i} ---`);
    const humanChoice = getHumanChoice();
    if (humanChoice === null) {
      console.log("Игра отменена");
      return;
    }
    const computerChoice = getComputerChoice();
    playRound(humanChoice, computerChoice);
  }

  console.log("--- Final Score ---");
  console.log(`Human:    ${humanScore}`);
  console.log(`Computer: ${computerScore}`);

  if (humanScore > computerScore) {
    console.log("🏆 You are the winner!");
  } else if (computerScore > humanScore) {
    console.log("💻 Computer wins!");
  } else {
    console.log("🤝 It's a draw!");
  }
}

document.getElementById("playBtn").addEventListener("click", playGame);
