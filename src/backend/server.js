const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();

app.use(cors());
app.use(express.json());


const FILE = path.join(__dirname, "data.json");

function readData() {
    return JSON.parse(fs.readFileSync(FILE, "utf-8"));
}

function writeData(data) {
    fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/pages/snake.html"));
});
app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/pages/login.html"));
});
app.get("/snake", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/pages/snake.html"));
});
app.get("/register", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/pages/register.html"));
});

// ======Get User=====
app.get("/user/:id", (req, res) => {
    let id = req.params.id;

    let data = readData();

    let user = data.users.find(u => u.id == id);

    if (user) {
        res.json(user);
    } else {
        res.status(404).json({message: "Không tìm thấy user!"});
    }
})

// ======Register=====
app.post("/register", (req, res) => {
    let {username, password} = req.body;

    let data = readData();

    let exits = data.users.find(u => u.username === username);

    if (exits) {
        return res.json({success: false, message: "Username đã tồn tại"});
    }

    data.users.push({
        id: Date.now(),
        username,
        password,
        score: 0
    });

    writeData(data);

    res.json({success: true});
});

// =======Login=======
app.post("/login", (req, res) => {
    let {username, password} = req.body;

    let data = readData();

    let user = data.users.find(
        u => u.username === username && u.password === password
    );

    if (user) {
        res.json({success: true, user});
    } else {
        res.json({success: false});
    }
});

// =======Save Score======
app.post("/score", (req, res) => {
    let {userId, score} = req.body;

    let data = readData();

    let user = data.users.find(u => u.id == userId);

    if (user) {
        user.score = Math.max(user.score, score);
    }

    writeData(data);

    res.json({success: true});
});


app.listen(3000, () => {
    console.log("Server chạy tại http://localhost:3000");
})

app.use(express.static(path.join(__dirname, "../frontend")));



