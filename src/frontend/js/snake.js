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