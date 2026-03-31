const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

if (registerForm) {
    registerForm.addEventListener("submit", function (e) {

        e.preventDefault();

        let username = document.querySelector("#regUsername").value;
        let password = document.querySelector("#regPassword").value;
        let confirmPassword = document.querySelector("#confirmPassword").value;

        if (password !== confirmPassword) {
            alert("Mật khẩu không khớp");
            return;
        }

        let user = {
            username: username,
            password: password
        };

        localStorage.setItem("user", JSON.stringify(user));

        alert("Đăng ký thành công!");

        window.location.href = "snake.html";

    })
}

if (loginForm) {
    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        let username = document.querySelector("#loginUsername".value);
        let password = document.querySelector("#loginPassword".value);

        let savedUser = JSON.parse(localStorage.getItem("user"));

        if (!savedUser) {
            alert("Chưa có tài khoản! Hãy đăng ký.");
            return;
        }

        if (username == savedUser.username && password == savedUser.password) {
            alert("Đăng nhập thành công!");

            window.location.href = "snake.html";
        } else {
            alert("Sai tài khoản hoặc mật khẩu!");
        }
    })
}