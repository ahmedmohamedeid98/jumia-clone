// navbar javascript
$(document).ready(() => {

    var isUserSignedIn = localStorage.getItem("is_logged_in");
 
    if(isUserSignedIn) {
        $("#sign_in_out").text("Sign Out");
    } else {
        $("#sign_in_out").text("Sign In");
    }

    $("#sign_in_out").on("click", () => {
        if(isUserSignedIn) {
            localStorage.setItem("is_logged_in", false);
        }
    });

});