var canvas = document.getElementById("game");
var ctx = canvas.getContext("2d");
var box = 20;
var snake, food, direction, score, game;

function startGame() {
    clearInterval(game);
    snake = [{ x: 200, y: 200 }];
    food = { x: 100, y: 100 };
    direction = "right";
    score = 0;
    document.getElementById("score").textContent = score;
    game = setInterval(update, 300);
}

document.addEventListener("keydown", function (event) {
    if (event.key == "ArrowUp" && direction != "down") direction = "up";
    if (event.key == "ArrowDown" && direction != "up") direction = "down";
    if (event.key == "ArrowLeft" && direction != "right") direction = "left";
    if (event.key == "ArrowRight" && direction != "left") direction = "right";
});

function update() {
    var head = { x: snake[0].x, y: snake[0].y };
    if (direction == "up") head.y -= box;
    if (direction == "down") head.y += box;
    if (direction == "left") head.x -= box;
    if (direction == "right") head.x += box;

    if (head.x < 0 || head.x >= canvas.width ||
        head.y < 0 || head.y >= canvas.height) {
        clearInterval(game);
        alert("Game over! Your score: " + score);
        return;
    }

    snake.unshift(head);
    if (head.x == food.x && head.y == food.y) {
        score++;
        document.getElementById("score").textContent = score;
        food = {
            x: Math.floor(Math.random() * 20) * box,
            y: Math.floor(Math.random() * 20) * box
        };
    } else {
        snake.pop();
    }

    for (var i = 1; i < snake.length; i++) {
        if (head.x == snake[i].x && head.y == snake[i].y) {
            clearInterval(game);
            alert("Game over! Your score: " + score);
            return;
        }
    }

    draw();
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the snake's body as overlapping circles so it looks connected.
    for (var i = snake.length - 1; i > 0; i--) {
        var x = snake[i].x + box / 2;
        var y = snake[i].y + box / 2;

        ctx.fillStyle = i % 2 == 0 ? "#45a832" : "#58bd3c";
        ctx.beginPath();
        ctx.arc(x, y, box / 2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#91df55";
        ctx.beginPath();
        ctx.arc(x - 3, y - 3, 3, 0, Math.PI * 2);
        ctx.fill();
    }

    var headX = snake[0].x + box / 2;
    var headY = snake[0].y + box / 2;
    var moveX = 0;
    var moveY = 0;
    if (direction == "right") moveX = 1;
    if (direction == "left") moveX = -1;
    if (direction == "up") moveY = -1;
    if (direction == "down") moveY = 1;

    ctx.fillStyle = "#3e9f2d";
    ctx.beginPath();
    ctx.arc(headX, headY, box / 2 + 2, 0, Math.PI * 2);
    ctx.fill();

    // Place the eyes on either side of the direction the snake is facing.
    for (var eye = -1; eye <= 1; eye += 2) {
        var eyeX = headX + moveX * 4 + moveY * eye * 4;
        var eyeY = headY + moveY * 4 + moveX * eye * 4;
        ctx.fillStyle = "white";
        ctx.beginPath();
        ctx.arc(eyeX, eyeY, 3, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#17351b";
        ctx.beginPath();
        ctx.arc(eyeX + moveX, eyeY + moveY, 1.5, 0, Math.PI * 2);
        ctx.fill();
    }

    // Draw a little forked tongue in front of the head.
    ctx.strokeStyle = "#e83e56";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(headX + moveX * 10, headY + moveY * 10);
    ctx.lineTo(headX + moveX * 15, headY + moveY * 15);
    ctx.moveTo(headX + moveX * 15, headY + moveY * 15);
    ctx.lineTo(headX + moveX * 18 + moveY * 2, headY + moveY * 18 - moveX * 2);
    ctx.moveTo(headX + moveX * 15, headY + moveY * 15);
    ctx.lineTo(headX + moveX * 18 - moveY * 2, headY + moveY * 18 + moveX * 2);
    ctx.stroke();

    ctx.fillStyle = "#f4515d";
    ctx.beginPath();
    ctx.arc(food.x + box / 2, food.y + box / 2, box / 2 - 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#398b37";
    ctx.fillRect(food.x + box / 2, food.y + 1, 3, 6);
}

startGame();