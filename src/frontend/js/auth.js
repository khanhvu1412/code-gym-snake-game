const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

// ========Register========
if (registerForm) {
    registerForm.addEventListener("submit", function (e) {

        e.preventDefault();

        let username = document.getElementById("regUsername").value;
        let password = document.getElementById("regPassword").value;
        let confirmPassword = document.getElementById("confirmPassword").value;

        if (password !== confirmPassword) {
            alert("Mật khẩu không khớp");
            return;
        }

        fetch("http://localhost:3000/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Server lỗi");
                }
                return res.json();
            })
            .then(data => {
                if (data.success) {
                    alert("Đăng ký thành công!");
                    window.location.href = "/pages/login.html";
                } else {
                    alert(data.message);
                }

            });

    });
}

// ========Login========
if (loginForm) {

    loginForm.addEventListener("submit", function (e) {

        e.preventDefault();

        let username = document.getElementById("loginUsername").value;
        let password = document.getElementById("loginPassword").value;

        fetch("http://localhost:3000/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username,
                password
            })
        })
            .then(res => {
                if (!res.ok) {
                    throw new Error("Server lỗi");
                }
                return res.json();
            })
            .then(data => {
                if (data.success) {
                    alert("Đăng nhập thành công!");

                    // lưu user để dùng sau
                    localStorage.setItem("currentUser", JSON.stringify(data.user));

                    // chuyển sang game
                    window.location.href = "/snake";
                } else {
                    alert("Sai tài khoản hoặc mật khẩu!");
                }
            })
            .catch(err => {
                console.error(err);
                alert("Có lỗi xảy ra!");
            });
    });
}