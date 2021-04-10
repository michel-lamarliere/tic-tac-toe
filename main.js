"use strict"

const createPlayer = (sign, active) => {
    return { sign, active }
}

const play = (() => {
    let turn = document.querySelector('.turn');
    const playerOneDiv = document.querySelector('.player-one');
        const playerTwoDiv = document.querySelector('.player-two');
    let playerOne;
    let playerTwo;
    let sign = "";

    const whoStarts = () => {
        playerTwo = createPlayer('X', false);
        playerTwo = createPlayer('O', false);
    let starter = Math.round(Math.random());
        if (starter === 0) {
            playerOne = createPlayer('X', true);
            playerTwo = createPlayer('O', false);
            sign = playerOne.sign;
            playerOneDiv.classList.add('your-turn');
            console.log('p1 starts')
        } else {
            playerOne = createPlayer('X', false);
            playerTwo = createPlayer('O', true);
            sign = playerTwo.sign;
            playerTwoDiv.classList.add('your-turn');
            console.log('p2 starts')
        }
        return { sign, playerOne, playerTwo } 
    }

    
    const whoPlays = () => {
        if (playerOne.active === true) {
            sign = playerOne.sign;
            playerTwoDiv.classList.add('your-turn');
            playerOneDiv.classList.remove('your-turn');
        } else {
            sign = playerTwo.sign;
            playerOneDiv.classList.add('your-turn');
            playerTwoDiv.classList.remove('your-turn');
        }
        let temp = playerOne.active;
        playerOne.active = playerTwo.active;
        playerTwo.active = temp;
        return { sign } 
    }

    return { whoPlays, whoStarts }
})();

const gameBoard = (() => {
    let array = ["", "", "", "", "", "", "", "", ""];
    let playerOneScore = 0;
    let playerTwoScore = 0;
    const gameBoardDiv = document.querySelector('.gameboard');
    const score = document.querySelector('.score');
    const result = document.querySelector('.result');
    const winner = document.querySelector('.winner');
    const leader = document.querySelector('.leader');
    const playAgain = document.querySelector('.play-again');
    play.whoStarts();

    for (let i = 0; i < 9; i++) {
        let square = document.createElement('div');
        square.classList.add('gameboard-square');
        square.dataset.number = i;
        gameBoardDiv.appendChild(square);

        square.addEventListener('click', event => {
            if (event.target.textContent === "") {
                event.target.textContent = play.whoPlays().sign;
                array.splice(event.target.dataset.number, 1, event.target.textContent);
                checkWinner();
            }
        })
    }

    const checkWinner = () => {
        for (let i = 0; i < array.length; i++) {
            if (array[0] === 'X' && array[1] === 'X' && array[2] === 'X' ||
            array[3] === 'X' && array[4] === 'X' && array[5] === 'X' ||
            array[6] === 'X' && array[7] === 'X' && array[8] === 'X' ||
            array[0] === 'X' && array[3] === 'X' && array[6] === 'X' ||
            array[1] === 'X' && array[4] === 'X' && array[7] === 'X' ||
            array[2] === 'X' && array[5] === 'X' && array[8] === 'X' ||
            array[0] === 'X' && array[4] === 'X' && array[8] === 'X' ||
            array[2] === 'X' && array[4] === 'X' && array[6] === 'X') {
                clear();
                playerOneScore++;
                winner.textContent = "Player One Wins!";
                displayResult();
                updateScore();
            } else if (array[0] === 'O' && array[1] === 'O' && array[2] === 'O' ||
            array[3] === 'O' && array[4] === 'O' && array[5] === 'O' ||
            array[6] === 'O' && array[7] === 'O' && array[8] === 'O' ||
            array[0] === 'O' && array[3] === 'O' && array[6] === 'O' ||
            array[1] === 'O' && array[4] === 'O' && array[7] === 'O' ||
            array[2] === 'O' && array[5] === 'O' && array[8] === 'O' ||
            array[0] === 'O' && array[4] === 'O' && array[8] === 'O' ||
            array[2] === 'O' && array[4] === 'O' && array[6] === 'O') {
                clear();
                playerTwoScore++;
                winner.textContent = "Player Two Wins!";
                displayResult();
                updateScore();
            }
            else if (array.indexOf("") == -1) {
                winner.textContent = 'It\s a tie!';
                displayResult();
                updateScore();
            }
            
        }     
        return { playerOneScore, playerTwoScore }   
    }

    const displayResult = () => {
        if (playerOneScore > playerTwoScore) {
            leader.textContent = 'Player One is leading by ' + (playerOneScore - playerTwoScore) + ' !';
        } else if (playerOneScore < playerTwoScore) {
            leader.textContent = 'Player Two is leading by ' + (playerTwoScore - playerOneScore) + ' !';
        } else {
            leader.textContent = 'You both equally suck!'
        }
        result.style.display = 'flex';
    }

    const updateScore = () => {
        score.textContent = playerOneScore + ' - ' + playerTwoScore;
    }

    const clear = () => {
        const squares = document.querySelectorAll('.gameboard-square');
        for (let i = 0; i < squares.length; i++) {
            squares[i].textContent = "";
            array[i] = "";
        }
    }

    playAgain.addEventListener('click', () => {
        result.style.display = 'none';
        clear();
    })
    
    
    return { array, checkWinner }
})();