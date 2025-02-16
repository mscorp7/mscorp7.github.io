
const canvas = document.getElementById('gameCanvas');
    const ctx = canvas.getContext('2d');
    const speedSelector = document.getElementById('speedSelector');
    const startBtn = document.getElementById('startBtn');
    const restartBtn = document.getElementById('restartBtn');
    const gameOverMessage = document.getElementById('gameOverMessage');
    const upBtn = document.getElementById('upBtn');
    const downBtn = document.getElementById('downBtn');
    const leftBtn = document.getElementById('leftBtn');
    const rightBtn = document.getElementById('rightBtn');

    const gridSize = 20;
    const canvasWidth = 600;
    const canvasHeight = 400;

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    let snake = [{ x: 40, y: 40 }];
    let food = { x: 200, y: 200 };
    let direction = { x: gridSize, y: 0 };
    let gameOver = false;
    let interval;
    let speed = 200;

    function draw() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);

        // Draw snake
        ctx.fillStyle = 'lime';
        for (let segment of snake) {
            ctx.beginPath();
            ctx.arc(segment.x + gridSize / 2, segment.y + gridSize / 2, gridSize / 2, 0, 2 * Math.PI);
            ctx.fill();
        }

        // Draw food
        ctx.fillStyle = 'red';
        ctx.beginPath();
        ctx.arc(food.x + gridSize / 2, food.y + gridSize / 2, gridSize / 2, 0, 2 * Math.PI);
        ctx.fill();

        if (gameOver) {
            gameOverMessage.style.display = 'block';
        }
    }

    function update() {
        if (gameOver) return;

        let head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

        if (head.x === food.x && head.y === food.y) {
            snake.unshift(head);
            food = generateFood();
        } else {
            snake.unshift(head);
            snake.pop();
        }

        if (head.x < 0 || head.y < 0 || head.x >= canvasWidth || head.y >= canvasHeight || checkCollision(head)) {
            gameOver = true;
            clearInterval(interval);
            restartBtn.style.display = 'block';
            startBtn.style.display = 'none';
        }

        draw();
    }

    function checkCollision(head) {
        for (let i = 1; i < snake.length; i++) {
            if (head.x === snake[i].x && head.y === snake[i].y) {
                return true;
            }
        }
        return false;
    }

    function generateFood() {
        let x = Math.floor(Math.random() * (canvasWidth / gridSize)) * gridSize;
        let y = Math.floor(Math.random() * (canvasHeight / gridSize)) * gridSize;
        return { x, y };
    }

    function startGame() {
        speed = parseInt(speedSelector.value);
        direction = { x: gridSize, y: 0 };
        snake = [{ x: 40, y: 40 }];
        food = generateFood();
        gameOver = false;
        gameOverMessage.style.display = 'none';
        restartBtn.style.display = 'none';
        startBtn.style.display = 'block';
        clearInterval(interval);
        interval = setInterval(update, speed);
    }

    function changeDirection(dir) {
        if (dir === 'up' && direction.y === 0) {
            direction = { x: 0, y: -gridSize };
        } else if (dir === 'down' && direction.y === 0) {
            direction = { x: 0, y: gridSize };
        } else if (dir === 'left' && direction.x === 0) {
            direction = { x: -gridSize, y: 0 };
        } else if (dir === 'right' && direction.x === 0) {
            direction = { x: gridSize, y: 0 };
        }
    }

    // Keyboard Controls
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp') changeDirection('up');
        if (e.key === 'ArrowDown') changeDirection('down');
        if (e.key === 'ArrowLeft') changeDirection('left');
        if (e.key === 'ArrowRight') changeDirection('right');
    });

    // Touch Controls
    upBtn.addEventListener('click', () => changeDirection('up'));
    downBtn.addEventListener('click', () => changeDirection('down'));
    leftBtn.addEventListener('click', () => changeDirection('left'));
    rightBtn.addEventListener('click', () => changeDirection('right'));

    startBtn.addEventListener('click', startGame);
    restartBtn.addEventListener('click', startGame);
