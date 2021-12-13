$(document).ready(() => {
     // Local Storage data Keys
     const FAVORITES_KEY = "favorites";
     const CARTITEMS_KEY = "cart_items"

    // get cart items list
    function getCartItems() {
        var data = localStorage.getItem(CARTITEMS_KEY);
        if (data) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }

    function getFavorites() {
        var data = localStorage.getItem(FAVORITES_KEY);
        if (data) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }

    var cartItems = getCartItems();
    $(".cart-length").text(cartItems.length)

    
});