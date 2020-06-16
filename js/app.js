document.cookie = "login=false";
function logout() {
    document.cookie = "login=false";
    document.cookie = "username=";
    location.href = "login.html";
}

var user = [
    ['ivan', 'user1'],
    ['1234', 'none']
];

var cookie_arr = [];
var save_user = document.querySelector('#save_user');
var get_input = document.querySelectorAll('.border-input > input');
var get_placeholder = document.querySelectorAll('.login-placeholder');
var username = document.querySelector('#username');
var password = document.querySelector('#password');
var get_alert = document.querySelectorAll('.alert');
var get_user = document.cookie.substring(document.cookie.indexOf("user=") + 5, document.cookie.indexOf("user=") + 6);

cookie_arr.push(document.cookie.split(";"));

for (let i = 0; i < user[0].length; i++) {
    console.log("username :", user[0][i], " password :", user[1][i]);
}

for (let i = 0; i < get_input.length; i++) {
    get_input[i].addEventListener("focusin", function () {
        get_placeholder[i].style.margin = "-9px 10px";
        get_placeholder[i].style.transition = "0.5s";
    });
    get_input[i].addEventListener("focusout", function () {
        if (this.value == "") {
            get_placeholder[i].style.margin = "9px 10px";
        }
    });
}
var count_password = 0;
if (window.location.pathname.substring(16) == "/login.html") {
    document.querySelector('#login').addEventListener("click", function () {
        if (username.value == "") {
            get_alert[0].innerHTML = "Username tidak boleh kosong";
        }

        if (password.value == "") {
            get_alert[1].innerHTML = "Password tidak boleh kosong";
        }
        if (count_password < 3) {
            if (username.value != "" && password.value != "") {
                for (let i = 0; i < user[0].length; i++) {
                    if (user[0][i] == username.value) {
                        if (user[1][i] == password.value) {
                            document.cookie = "login=true";
                            document.cookie = "username=" + username.value;
                            location.href = "index.html";
                            if (save_user.checked) {
                                document.cookie = "user=" + i;
                            } else {
                                document.cookie = "user=";
                            }
                            count_password = 0;
                        } else {
                            get_alert[1].innerHTML = "Password anda salah";
                            get_alert[0].innerHTML = "";
                            count_password++;
                        }
                    }
                }
            }
        } else {
            for (let i = 1; i <= 6; i++) {
                setTimeout(function () {
                    document.querySelector('.login-box').style.display = "none";
                    document.querySelector('.show-block').style.display = "block";
                    document.querySelector('#time').innerHTML = i;
                    if (i > 5) {
                        document.querySelector('.show-block').style.display = "none";
                        document.querySelector('.login-box').style.display = "block";
                        count_password = 0;
                        for (let j = 0; j < 2; j++) {
                            get_input[j].value = "";
                            get_placeholder[j].style.margin = "9px 10px";
                            get_alert[j].innerHTML = "";
                        }
                    }
                }, i * 1000);
            }
        }
    });
}

// function show_cookie() {
//     alert(document.cookie);
// }

if (document.cookie.substring(document.cookie.indexOf("login") + 6, document.cookie.indexOf("login") + 10) == "true") {
    history.pushState(null, null, location.href);
    window.onpopstate = function () {
        history.go(1);
    };
    if (window.location.pathname.substring(16) != "/index.html") {
        location.href = "404.html";
    }
    for (let i = 0; i < cookie_arr[0].length; i++) {
        if (cookie_arr[0][i].indexOf("username") > -1) {
            document.querySelector(".title-home").innerHTML = "Selamat Datang " + cookie_arr[0][i].substring(10);
        }
    }
} else if (document.cookie.substring(document.cookie.indexOf("login") + 6, document.cookie.indexOf("login") + 11) == "false") {
    if(window.location.pathname.substring(16) == "/"){
        location.replace("login.html");
    }else{
        if (window.location.pathname.substring(16) != "/login.html") {
            setTimeout(function () {
                location.replace("404.html");
            }, 0);
        } else {
            for (let i = 0; i < user.length; i++) {
                if (get_user == i) {
                    username.value = user[0][get_user];
                    password.value = user[1][get_user];
                    for (let i = 0; i < 2; i++) {
                        get_placeholder[i].style.margin = "-9px 10px";
                    }
                    save_user.checked = true;
                }
            }
        }
    }        
}
