const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const ground = new Image();
ground.src = "img/back.png";

const snakeh = new Image();
snakeh.src = 'img/snake.png';

const snakeb = new Image();
snakeb.src = 'img/snake.png';

const carrot = new Image();
carrot.src = "img/point.png";

let box = 32; 

let score = 0;

let food = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box,

};

let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
};

document.addEventListener("keydown", direction);

let dir;

function direction(event) {
    if(event.keyCode == 37 && dir != "right")
        dir = "left";
    else if (event.keyCode == 38 && dir != "down")
        dir = "up";
    else if (event.keyCode == 39 && dir != "left")
        dir = "right";
    else if (event.keyCode == 40 && dir != "up")
        dir = "down";
}

function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
  }
    this.stop = function(){
      this.sound.pause();
  }
}

const eatSound = new sound('audio/EatSound.ogg');
const dieSound = new sound('audio/DieSound.ogg');


const forceReload = () => {
  clearInterval(game)
  location.reload(true)
  dieSound.stop()
}

let snakeX = snake[0].x;
let snakeY = snake[0].y;

//Rotate head snake
function rotateHead(direction = "down", snakeX, snakeY) {
  ctx.save();
  ctx.translate(snakeX + box / 2, snakeY + box / 2);
  if(direction == "left") {
    ctx.rotate(90 * Math.PI / 180)
  } else if(direction == "right") {
    ctx.rotate(-90 * Math.PI / 180)
  } else if(direction == "up") {
    ctx.rotate( 180 * Math.PI / 180)
  } ctx.rotate( 0  / 180);
  ctx.drawImage(snakeh, box / 2 * (-1), box / 2 * (-1), box, box);
  ctx.restore();
}





function eatTail(head, arr) {
  for(let i = 0; i < arr.length; i++) {
    if(head.x == arr[i].x && head.y == arr[i].y){
        dieSound.play()
      const tryAgain = confirm(`Игра Окончена, твой счёт ${score} , нажми ОК что бы сыграть ещё раз!`);
      tryAgain ? forceReload() : clearInterval(game)
  }
  }

}

function drawGame() {
    ctx.drawImage(ground, 0, 0);
    
    ctx.drawImage(carrot, food.x, food.y);
    
    
   // for(let i = 0; i < snake.length; i++) {
      //  ctx.fillStyle = i == 0 ? "green" : "purple";
      //  ctx.fillRect(snake[i].x, snake[i].y, box, box);
   // }
    
    
   //for(let i = 0; i < snake.length; i++) {
	//	ctx.drawImage(snakeh, snake[0].x, snake[0].y) ;
	//	if (i!= 0) { ctx.drawImage(snakeb, snake[i].x, snake[i].y);}
	//}
    
    
    
    
    
    

    ctx.fillStyle = "white";
    ctx.font = "50px algerian";
    ctx.fillText(score, box * 2.5, box * 1.7);
    
    
    if(snakeX == food.x && snakeY == food.y) {
        eatSound.play()
        score++;
        food = {
    x: Math.floor((Math.random() * 17 + 1)) * box,
    y: Math.floor((Math.random() * 15 + 3)) * box,

        };
    } else {
        snake.pop();
    }
    
    if(snakeX < box || snakeX > box * 17
      || snakeY < 3 * box || snakeY > box * 17){
        dieSound.play()
      const tryAgain = confirm(`Игра Окончена, твой счёт ${score} , нажми ОК что бы сыграть ещё раз!`);
      tryAgain ? forceReload() : clearInterval(game)
  }
        
        
        
    
    if(dir == "left") snakeX -= box;
    if(dir == "right") snakeX += box;
    if(dir == "up") snakeY -= box;
    if(dir == "down") snakeY += box;
    
    let newHead = {
        x: snakeX,
        y: snakeY
    };
    
    eatTail(newHead, snake);
    
    snake.unshift(newHead);
}

let game = setInterval(drawGame, 100);
