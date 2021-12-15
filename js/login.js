$(document).ready(() => {

    var emailAlert = $("#existance-email-alert");
    var passwordAlert = $("#password-alert");

    function hiddenAlertIfShowen() {
    
      if(!emailAlert.attr("class").split(" ").includes("d-none")) {
        emailAlert.addClass("d-none");
      }

      if(!passwordAlert.attr("class").split(" ").includes("d-none")) {
        passwordAlert.addClass("d-none");
      }
    }

    hiddenAlertIfShowen();

    const USERS_KEY = "users";

    function getUsersList() {
        var data = localStorage.getItem(USERS_KEY);
        if(data) {
            return JSON.parse(data); // [user]
        } else {
            return [];
        }
    }

    function isUserExistInDB(email) {
      console.log("email: "+email);
        var userList = getUsersList();
        for(var i = 0; i < userList.length; i++) {
            if(userList[i].email == email) {
              console.log("email exist");
                return true;
            }
        }
        return false;
    }

    function checkPassword(email, password) {
      console.log("email: "+email+", password:"+password);
      var userList = getUsersList();
        for(var i = 0; i < userList.length; i++) {
            if(userList[i].email == email) {
                if(userList[i].password == password) {
                  console.log("true password");
                  return true;
                }
                return false;
            }
        }
        console.log("false password");
        return false;
    }
    
    $("#login-btn-id").on("click", (e) => {
      e.preventDefault();
      if(isUserExistInDB($("#email-id").val())) {
        if(checkPassword($("#email-id").val(), $("#password-id").val())) {
          hiddenAlertIfShowen();
          localStorage.setItem("is_logged_in", true);
          location.replace("../index.html");
        } else {
          // show alert wrong password
          passwordAlert.removeClass("d-none");
        }
      } else {
          // show alert user with this email not founded
          emailAlert.removeClass("d-none");
      }
    });
});