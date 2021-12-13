var x=document.getElementById('fninp');
var y=document.getElementById('firstnamep');
var z=document.getElementById('scninp');
var l=document.getElementById('seconednamep');
var emailinp=document.getElementById('Emailsinp');
var emaillap=document.getElementById('emaillabel');
var passwordinp=document.getElementById('passes');
var passlap=document.getElementById('passwordlabel');
x.addEventListener('click',function(){
    y.innerHTML="first name";
    y.style.color='orange';
    x.style.outlineColor='white';
    x.style.borderBottomColor='orange'
    
   
})

z.addEventListener('click',function(){
l.innerHTML="last name";
l.style.color='orange';
z.style.outlineColor='white';
})

emailinp.addEventListener('click',function(){
    emaillap.innerHTML="Email";
    emailinp.style.borderBottomColor='orange';
    emaillap.style.color='orange';
    emailinp.style.outlineColor='white';

})
passwordinp.addEventListener('click',function(){
    passlap.innerHTML="password";
    passlap.style.color='orange'
    passwordinp.style.borderBottomColor='orange';
    passwordinp.style.outlineColor='white';
})

$(document).ready(() => {

    const USERS_KEY = "users";

    var user = function(id, fname, lname, email, phone, password, gender) {
        this.id = id;
        this.fname = fname;
    }

    function getUsersList() {
        var data = localStorage.getItem(USERS_KEY);
        if(data) {
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
        for(var i = 0; i < userList.length; i++) {
            if(userList[i].email == email) {
                return true;
            }
        }
        return false;
    }
    
    if(isUserExistInDB("d;flksd")) {
        // show alert
    } else {
        var usersList = getUsersList();
        // create new user object
        var newUser = new user(dslfksdfgl);
        // push new user to getted userList from database
        usersList.push(newUser);
        // restore in database
        restoreUserList(usersList);
        // re-route to login page
        var url = location.origin + location.pathname.replace("register.html", "login.html");
        location.replace(url);
    }



});