const rock = document.querySelectorAll('button')[0];
const paper = document.querySelectorAll('button')[1];
const scissors = document.querySelectorAll('button')[2];
const reset = document.querySelector('.reset');
const autoPlay = document.querySelector('.auto-play-button');






let score = JSON.parse(localStorage.getItem('score')) || {
        wins: 0,
        losses: 0,
        ties: 0
};

updateScoreElement();

// if (!score) {
//         wins: 0,
//         losses: 0,
//         ties: 0
// }

reset.addEventListener('click', function () {
        score.wins = 0;
        score.losses = 0;
        score.ties = 0;
        localStorage.removeItem('score');
        updateScoreElement();
})


document.body.addEventListener('keydown', (event) => {
        if (event.key === 'r') {
                playGame('rock');
        }

        else if (event.key === 'p') {
                playGame('paper');
        }

        else if (event.key === 's') {
                playGame('scissors');
        }
})


rock.addEventListener('click', function () {
        playGame('rock');
})

paper.addEventListener('click', function () {
        playGame('paper');
})

scissors.addEventListener('click', function () {
        playGame('scissors');
})

let isAutoPlaying = false;
let interValid;

autoPlay.addEventListener('click', automatic)
function automatic() {
        if (!isAutoPlaying) {
                interValid = setInterval(function () {
                        const playerMove = pickComputerMove();
                        playGame(playerMove);
                }, 1000)
                isAutoPlaying = true;
        }
        else {
                clearInterval(interValid);
                isAutoPlaying = false;
        }
}

function playGame(playerMove) {
        const computerMove = pickComputerMove();

        console.log(computerMove)
        let result = '';

        if (playerMove === 'scissors') {
                if (computerMove === 'rock') {
                        result = 'You Lose!';
                } else if (computerMove === 'paper') {
                        result = 'You Win!'
                } else if (computerMove === 'scissors') {
                        result = 'Tie!'
                }
        }

        else if (playerMove === 'paper') {
                if (computerMove === 'rock') {
                        result = 'You Win!';
                } else if (computerMove === 'paper') {
                        result = 'Tie!'
                } else if (computerMove === 'scissors') {
                        result = 'You Lose!'
                }
        }

        else if (playerMove === 'rock') {
                if (computerMove === 'rock') {
                        result = 'Tie!';
                } else if (computerMove === 'paper') {
                        result = 'You Lose!'
                } else if (computerMove === 'scissors') {
                        result = 'You Win!'
                }
        }

        if (result === 'You Win!') {
                score.wins += 1;
        }
        else if (result === 'You Lose!') {
                score.losses += 1;
        }
        else if (result === 'Tie!') {
                score.ties += 1;
        }

        localStorage.setItem('score', JSON.stringify(score));

        updateScoreElement();

        document.querySelector('.js-result').innerHTML = result;

        document.querySelector('.js-moves').innerHTML = `You <img src="${playerMove}-emoji.png" alt="rock">   <img src="${computerMove}-emoji.png" alt="rock"> Computer`;

}
function updateScoreElement() {
        const paragraph = document.querySelector('.js-score');
        paragraph.innerHTML = `Wins:${score.wins}, Losses:${score.losses}, Ties:${score.ties}`;
}

const pickComputerMove = function () {
        let computerMove = '';
        const random = Math.random();
        if (random >= 0 && random < 1 / 3) {
                computerMove = 'rock';
        } else if (random >= 1 / 3 && random < 2 / 3) {
                computerMove = 'paper';
        }
        else {
                computerMove = 'scissors';
        }

        return computerMove;
}











