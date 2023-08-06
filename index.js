let foodX = 10 , foodY = 6;
let snakeX = 10, snakeY = 6;
let velocityX = 0, velocityY = 0; 
let snakebody = [];
let gameover = false;
let setintervalid;
let score = 0;
let highscore = localStorage.getItem("high--score");
const playboard = document.querySelector(".play-bord");
const scoreEL = document.querySelector(".score");
const highscoreEl = document.querySelector(".high-score");

highscoreEl.innerText = `high score: ${highscore}`








function changefoodposition(){
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;

}
function init(){
    if(gameover == true){
        return handlegameover();
    }

    let markup = `<div class="food" style="grid-area: ${foodY}
    / ${foodX}"></div>`;

    snakeX += velocityX;

    snakeY += velocityY;

    if (snakeX === foodX && snakeY === foodY) {

        changefoodposition()
        snakebody.push([foodX,foodY]);
        score ++ ;
        if(score > highscore){
            highscore = score;
            let highscorestorage = localStorage.setItem("high--score",highscore);
        }
        scoreEL.innerText = `score: ${score}`;
        highscoreEl.innerText = `highscore: ${highscore}`

    }

    if(snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30){
        gameover = true;
    }
       for(let i = snakebody.length - 1; i > 0; i -- ){
        snakebody[i] = snakebody[i - 1]
    }

    snakebody[0] = [snakeX, snakeY]

    for(let i = 0; i< snakebody.length; i++){

         markup += `<div class="snake" style="grid-area: ${snakebody[i][1]}
        / ${snakebody[i][0]}"></div>`;

        if(i !== 0 && snakebody[0][1] === snakebody[i][1] && snakebody[0][0] === snakebody[i][0]){
               gameover = true;
          }

    }
    
   
    playboard.innerHTML = markup;

   
}


function changedirection(e){

    init();
    if (e.code === "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.code === "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
      else if(e.code === "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
      else if(e.code === "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
}

function handlegameover(){

    clearInterval(setintervalid);
    alert("game over press ok to reset the game");
    location.reload();

}

changefoodposition()
setintervalid = setInterval(init , 100)
document.addEventListener("keydown" , changedirection)