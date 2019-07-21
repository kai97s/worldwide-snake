const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const groundImg = new Image();
groundImg.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

let box = 32;

let score = 0;

let food = {
  x: Math.floor((Math.random() * 17 + 1)) * box,
  y: Math.floor((Math.random() * 15 + 3)) * box,
};
//змея
let snake = [];
snake[0] = {
  x: 9 * box,
  y: 10 * box
};
//управление (обработчик событий)
document.addEventListener("keydown", direction);

let dir;
//какая клавиша нажата
function direction(event) {
  if(event.keyCode == 37 && dir != "right")
    dir = "left";
  else if(event.keyCode == 38 && dir != "down")
    dir = "up";
  else if(event.keyCode == 39 && dir != "left")
    dir = "right";
  else if(event.keyCode == 40 && dir != "up")
    dir = "down";
}

function eatTail(head, arr) {
  for(let i = 0; i < arr.length; i++){
    if(head.x == arr[i].x && head.y == arr[i].y)
    clearInterval(game),
    location.reload();

  }
}
//Отображение игры
function drawGame() {
  //фон (сама поверхность)
  ctx.drawImage(groundImg, 0, 0);
  //еда
  ctx.drawImage(foodImg, food.x, food.y);
  //змейка
  for(let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i == 0 ? "red" : "yellow";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }
  //счет
  ctx.fillStyle = "white";
  ctx.font = "50px Arial";
  ctx.fillText(score, box * 2.5, box * 1.7);
//передвижение змейки (head of snake)
  let snakeX = snake[0].x;
  let snakeY = snake[0].y;
//add element to snake when its feeding
  if(snakeX == food.x && snakeY == food.y){
    score++;
    food = {
      x: Math.floor((Math.random() * 17 + 1)) * box,
      y: Math.floor((Math.random() * 15 + 3)) * box,
    };
  } else {
    snake.pop();
  }
  //out of ground = lose
  if(snakeX < box || snakeX > box * 17
    || snakeY < 3 * box || snakeY > box * 17)
    clearInterval(game),
    location.reload();

    //alert("DEAD", score),



  if(dir == "left") snakeX -= box;
  if(dir == "right") snakeX += box;
  if(dir == "up") snakeY -= box;
  if(dir == "down") snakeY += box;

  let newHead = {
    x: snakeX,
    y: snakeY
  };

  eatTail(newHead, snake);
  //добавляет новый элемент в массив, в начало
  snake.unshift(newHead);

}

let game = setInterval(drawGame, 100);
