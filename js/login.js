$(document).ready(() => {

    var forms = $('.needs-validation');
    var validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });



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
        var userList = getUsersList();
        for(var i = 0; i < userList.length; i++) {
            if(userList[i].email == email) {
                return true;
            }
        }
        return false;
    }

    function checkPassword(email, password) {
      var userList = getUsersList();
        for(var i = 0; i < userList.length; i++) {
            if(userList[i].email == email) {
                if(userList[i].password == password) {
                  return true;
                }
                return false;
            }
        }
        return false;
    }
    
    if(isUserExistInDB("email")) {
      if(checkPassword("emial", "pass")) {
        // re-route user to index page
        var url = location.origin + location.pathname.replace("register.html", "login.html");
        location.replace(url);
      } else {
        // show alert wrong password

      }
    } else {
        // show alert user with this email not founded
    }

});