// alert("hello world");

const state = {
    view: {
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives"),
        play: document.querySelector("#play"),
    },
    values: {
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        startTime: 60,
        currentTime: 60,
        lives: 3,
        gameStart: false,
    },
    actions: {
        timerId: null,
        countDownTimerId: null,
    }
};

function gameOver() {
    state.values.gameStart = false;
    
    clearInterval(state.actions.countDownTimerId);
    clearInterval(state.actions.timerId);
    alert("Fim de Jogo! O seu resultado foi: " + state.values.result);

    resetValues()
}

function playSound(audioName) {
    let audio = new Audio("./src/audios/" + audioName + ".m4a");

    audio.volume = 0.2;
    audio.play();
}

function countDown() {
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime <= 0) {
        gameOver();
    }
}

function randomSquare() {
    state.view.squares.forEach((square) => {
        square.classList.remove("enemy");
    });

    let randomNumber = Math.floor(Math.random() * state.view.squares.length);
    let randomSquare = state.view.squares[randomNumber];
    
    randomSquare.classList.add("enemy");

    state.values.hitPosition = randomSquare.id;
}

// function moveEnemy() {
//     state.values.timerId = setInterval(randomSquare, state.values.gameVelocity)
// }

function addListenerHitBox() {
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", () => {
            // alert("clicou");
            if (square.id === state.values.hitPosition) {
                playSound("hit");

                state.values.result++;
                state.view.score.textContent = state.values.result; 

                if (state.values.result % 10 === 0) {
                    state.values.lives++;
                    state.view.lives.textContent = state.values.lives;
                }

                if (state.values.result % 20 === 0) {
                    state.values.currentTime += 10;
                    state.view.timeLeft.textContent = state.values.currentTime;
                }
            } else {
                state.values.lives--;
                state.view.lives.textContent = state.values.lives;

                if (state.values.lives <= 0) {
                    gameOver()
                }
            }
        });
    });
}

function initialize() {
    // moveEnemy();

    addListenerHitBox();
}

function resetValues() {
    state.values.currentTime = 60;
    state.values.result = 0;
    state.values.lives = 3;
    state.view.timeLeft.textContent = state.values.currentTime;
    state.view.score.textContent = state.values.result;
    state.view.lives.textContent = state.values.lives;
}

state.view.play.addEventListener("click", () => {
    if (state.values.gameStart) {
        clearInterval(state.actions.countDownTimerId);
        clearInterval(state.actions.timerId);        
        resetValues();
    }
    else {        
        state.view.play.innerHTML = "Reiniciar";
        state.values.gameStart = true;
    }
    
    state.actions.timerId = setInterval(randomSquare, state.values.gameVelocity);
    state.actions.countDownTimerId = setInterval(countDown, state.values.gameVelocity);
});

initialize();