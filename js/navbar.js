// navbar javascript
$(document).ready(() => {

    var isUserSignedIn = localStorage.getItem("is_logged_in");

    if (JSON.parse(isUserSignedIn) === true) {
        $("#sign_in_out").text("Sign Out");
    } else {
        $("#sign_in_out").text("Sign In");
    }

    $("#sign_in_out").on("click", () => {
        if (JSON.parse(isUserSignedIn) === true) {
            localStorage.setItem("is_logged_in", false);
        }
    });



    // update cart items count
    var data = localStorage.getItem("cart_items");

    if (data) {
        var len = JSON.parse(data).length;
        console.log( len);
        $("#cart-items-count").text(len);
    } else {
        $("#cart-items-count").text(0);
    }

});