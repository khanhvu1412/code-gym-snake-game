let canvas = document.getElementById("gameCanvas");
let ctx = canvas.getContext("2d");

let snake = [{x: 10, y: 10}];
let dx = 1;
let dy = 0;
let food = {x: 5, y: 5};
let score = 0;
let gameLoop;

let user = JSON.parse(localStorage.getItem("currentUser"));


if (!user) {
    alert("Bạn cần đăng nhập!");
    window.location.href = "/login";
}

// document.getElementById("playerName").innerHTML = "👤 " + user.username;

fetch("http://localhost:3000/user/" + user.id)
    .then(res => {
        if (!res.ok) throw new Error("Không tìm thấy user!");
        return res.json();
    })
    .then(data => {
        document.getElementById("playerInfo").innerHTML = "👤 " + data.username + " | Score: " + data.score;
    })
    .catch(err => {
        console.error(err);
    })


function drawGame() {
    // xóa màn hình
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // ===== HIỂN THỊ SCORE TRONG CANVAS =====
    ctx.fillStyle = "#00ffcc";
    ctx.font = "bold 20px Arial";
    ctx.fillText("Score: " + score, 10, 25);

    // ===== VẼ RẮN =====
    snake.forEach((part, index) => {
        ctx.fillStyle = index === 0 ? "yellow" : "lime";
        ctx.fillRect(part.x * 20, part.y * 20, 20, 20);
    });

    // ===== VẼ MỒI =====
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * 20, food.y * 20, 20, 20);

    // ===== TẠO ĐẦU MỚI =====
    let head = {
        x: snake[0].x + dx,
        y: snake[0].y + dy,
    };

    // ===== GAME OVER (đụng tường) =====
    if (head.x < 0 || head.y < 0 || head.x >= 20 || head.y >= 20) {
        return gameOver();
    }

    // ===== GAME OVER (đụng thân) =====
    for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return gameOver();
        }
    }

    // thêm đầu mới
    snake.unshift(head);

    // ===== ĂN MỒI =====
    if (head.x === food.x && head.y === food.y) {
        score++;

        food = {
            x: Math.floor(Math.random() * 20),
            y: Math.floor(Math.random() * 20)
        };

    } else {
        snake.pop();
    }

}

function gameOver() {
    clearInterval(gameLoop);

    alert("💀 Game Over! Score: " + score);

    // Lưu điểm
    fetch("http://localhost:3000/score", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            userId: user.id,
            score: score
        })
    })
}

function startGame() {
    let user = JSON.parse(localStorage.getItem("currentUser"));

    if (!user) {
        alert("Bạn cần đăng nhập!");
        window.location.href = "/login";
        return;
    }
    if (gameLoop) return;
    gameLoop = setInterval(drawGame, 150);
}

function restartGame() {
    clearInterval(gameLoop);

    snake = [{x: 10, y: 10}];

    dx = 1;
    dy = 0;

    score = 0;

    food = {
        x: Math.floor(Math.random() * 20),
        y: Math.floor(Math.random() * 20)
    }

    drawGame();
}

let direction = "RIGHT";

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" && direction !== "DOWN") {
        direction = "UP";
        dx = 0;
        dy = -1;
    }
    if (e.key === "ArrowDown"&& direction !== "UP") {
        direction = "DOWN";
        dx = 0;
        dy = 1;
    }
    if (e.key === "ArrowLeft" && direction !== "RIGHT") {
        direction = "LEFT";
        dx = -1;
        dy = 0;
    }
    if (e.key === "ArrowRight" && direction !== "LEFT") {
        direction = "RIGHT"
        dx = 1;
        dy = 0;
    }
})