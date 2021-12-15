var fnameInput = document.getElementById("fname");
var lnameInput = document.getElementById("lname");

var emailInput = document.getElementById("email");
var emailInvalidSpan = document.getElementById("invalid-email");

var passwordInput = document.getElementById("password");
var passwordInvalidSpan = document.getElementById("invalid-password");

var phoneInput = document.getElementById("phone");
var phoneInvalidSpan = document.getElementById("invalid-phone");

var gender = document.getElementsByName("gender");
var genderInvalidSpan = document.getElementById("invalid-gender");
var genderStr = "male"; // init value

var emailExistAlert = document.getElementById("existance-alert");

var loginBtn = document.getElementById("login-btn");
var resiterBtn = document.getElementById("register-btn");

loginBtn.addEventListener("click", (event) => {
    event.preventDefault();
    re_route_to_login();
});



function re_route_to_login() {
    var url = location.origin + location.pathname.replace("register.html", "login.html");
    location.replace(url);
}

//=============================
//       Validation Methods
//=============================

function validatePhoneNumber() {
    var pattern = /^[0][1][0 1 2 5]\d{8}$/;
    console.log(phoneInput.value);
    if (phoneInput.value != null && phoneInput.value.match(pattern)) {
        return true;
    } else {
        return false;
    }
}

function validateEmail() {
    var emailPattern = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    console.log(emailInput.value);
    if (emailInput.value != null && emailInput.value.match(emailPattern)) {
        return true;
    } else {
        return false;
    }
}

function validatePassword() {
    if (passwordInput.value != null && passwordInput.value.length >= 8) {
        return true;
    }
    return false;
}

function validateGender() {
    for (var i in gender) {
        if (gender[i].checked) {
            genderStr = i == 0 ? "male" : "female";
            return true;
        }
    }
    return false;
}

//==============================
//       Submit method
//==============================

function resetAllErrorsToBeHidden() {
    if (!emailInvalidSpan.classList.contains("d-none"))
        emailInvalidSpan.classList.add("d-none");

    if (!passwordInvalidSpan.classList.contains("d-none"))
        passwordInvalidSpan.classList.add("d-none");

    if (!phoneInvalidSpan.classList.contains("d-none"))
        phoneInvalidSpan.classList.add("d-none");

    if (!genderInvalidSpan.classList.contains("d-none"))
        genderInvalidSpan.classList.add("d-none");

    if (!emailExistAlert.classList.contains("d-none"))
        emailExistAlert.classList.add("d-none");

}

resiterBtn.addEventListener("click", (e) => {

    resetAllErrorsToBeHidden();
    console.log("sumbit");
    var everyThingValid = true;
    if (!validateEmail()) {
        console.log("email is not valid");
        if (emailInput.value != "")
            emailInvalidSpan.classList.remove("d-none");
        everyThingValid = false;
    }
    if (!validatePassword()) {
        if (passwordInput.value != "")
            passwordInvalidSpan.classList.remove("d-none");
        everyThingValid = false;
    }
    if (!validatePhoneNumber()) {
        if (phoneInput.value != "")
            phoneInvalidSpan.classList.remove("d-none");
        everyThingValid = false;
    }
    if (!validateGender()) {
        genderInvalidSpan.classList.remove("d-none");
        everyThingValid = false;
    }



    if (everyThingValid) {
        e.preventDefault();

        if (isUserExistInDB(emailInput.value)) {
            document.getElementById("existance-alert").classList.remove("d-none");
        } else {

            var users = getUsersList();

            var newUser = new user(
                users.length + 1,
                fnameInput.value,
                lnameInput.value,
                emailInput.value,
                phoneInput.value,
                passwordInput.value,
                genderStr);

            users.push(newUser);
            restoreUserList(users);
            re_route_to_login();

        }
    } else {
        e.preventDefault();

    }
});


//=======================
// Database Section
//=======================

var user = function (id, fname, lname, email, phone, password, gender) {
    this.id = id;
    this.fname = fname;
    this.lname = lname;
    this.email = email;
    this.password = password;
    this.phone = phone;
    this.gender = gender;
}

const USERS_KEY = "users";

function getUsersList() {
    var data = localStorage.getItem(USERS_KEY);
    if (data) {
        return JSON.parse(data); // [user]
    } else {
        return [];
    }
}

function restoreUserList(newUsersList) {
    localStorage.setItem(USERS_KEY, JSON.stringify(newUsersList));
}

function isUserExistInDB(email) {
    var userList = getUsersList();
    for (var i = 0; i < userList.length; i++) {
        if (userList[i].email == email) {
            return true;
        }
    }
    return false;
}