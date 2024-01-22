const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),


    },

    values:{
        timerId: null,
        countDownTimeId: setInterval(countDown, 1000),
        gameVelocity: 500,
        hitPosition: 0,
        result: 0,
        currentTime: 60,
    },

    actions:{

    }
}; 

function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;
    if(state.values.currentTime <= 0){
        clearInterval(state.values.countDownTimeId);
        clearInterval(state.values.timerId);
        state.view.score.textContent = 0;
        alert("Game Over!! \n o seu resultado foi " + state.values.result);
    }
}

function moveEnemy(){
    state.values.timerId = setInterval(randomSquare, state.values.gameVelocity);
}

function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy");

    })

    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;

}

function addListenerHitBox(){
    state.view.squares.forEach((square) => {
     square.addEventListener("mousedown", () => {
     if(square.id === state.values.hitPosition){
            playSound(nomeDoAquivodeSom);
            state.values.result++;
            state.view.score.textContent = state.values.result;
            state.values.hitPosition = null;
     }
     })  

    } );
}

function playSound(audioName){
    let audio = new Audio("./src/audios/${audioName}.m4a");
    audio.volume =0.2;
    audio.play();
}

function initialize(){
    moveEnemy();
    addListenerHitBox()
}

initialize();