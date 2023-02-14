const display = document.querySelector('[data-rps-display]');
const choiceContainer = document.querySelector('[data-rps-choice-cotainer]');

choiceContainer.addEventListener('click', handleUserChoice);

const choices = {
  rock: {
    beats: {
      scissors: 'beats',
      lizard: 'crushes',
    },
  },
  paper: {
    beats: {
      rock: 'covers',
      spock: 'disproves',
    },
  },
  scissors: {
    beats: {
      paper: 'cuts',
      lizard: 'decapitates',
    },
  },
  lizard: {
    beats: {
      spock: 'poisons',
      paper: 'eats',
    },
  },
  spock: {
    beats: {
      rock: 'pulverizes',
      scissors: 'smashes',
    },
  },
};

function handleUserChoice(e) {
  const choice = e.target.dataset.rpsChoice;
  if (!choice) {
    return;
  }
  play(choice);
}

function play(userChoice) {
  const computerChoice = getRandomChoice();

  if (hasUserWon(userChoice, computerChoice)) {
    const message = getMessage(userChoice, computerChoice);
    console.log(`User has won: ${userChoice} ${message} ${computerChoice}`, {
      userChoice,
      computerChoice,
    });
  } else if (userChoice === computerChoice) {
    console.log('Egalitate', { userChoice, computerChoice });
  } else {
    const message = getMessage(computerChoice, userChoice);
    console.log(
      `Computer has won: ${computerChoice} ${message} ${userChoice}`,
      { userChoice, computerChoice }
    );
  }
}

function hasUserWon(userChoice, computerChoice) {
  return Boolean(getMessage(userChoice, computerChoice));
}

function getMessage(choice1, choice2) {
  return choices[choice1].beats[choice2];
}

function getRandomChoice() {
  const choiceArray = Object.keys(choices);
  const index = getRandomNumber(0, choiceArray.length);
  return choiceArray[index];
}

function getRandomNumber(min = 0, max = 1) {
  return Math.floor(Math.random() * (max - min) + min);
}
