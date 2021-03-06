$(document).ready(function () {

    // Local Storage data Keys
    const FAVORITES_KEY = "favorites";
    const CARTITEMS_KEY = "cart_items";

    //get and restore favorite
    function getFavorites() {
        var data = localStorage.getItem(FAVORITES_KEY);
        if (data) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }

    function getProduct(id) {
        var results = cartItems.filter((prod) => prod.id == id);
        if (results.length > 0) {
            return results[0];
        } else {
            return {};
        }
    }

    function restoreUpdatedFavoriteProducts(updatedGroup) {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedGroup));
    }
    //get and restore cart
    function getCartItems() {
        var data = localStorage.getItem(CARTITEMS_KEY);
        if (data) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }

    //add a number of items
    var cartItems = getCartItems();
    $(".cart-length").text(cartItems.length)

    function restoreUpdateCartItems(updatedGroup) {
        localStorage.setItem(CARTITEMS_KEY, JSON.stringify(updatedGroup));
    }


    // get favorites item
    var favoritesGroup = getFavorites();
    // get products ids list that belogin to favorites group
    var favoritesGroupIds = favoritesGroup.map((prod) => prod.id);

    var cartItems = getCartItems();

    var total = getTotal(cartItems);

    $("#totalPrice-id").text(total);

    noItems(cartItems);

    //loop in cart items
    for (var i = 0; i < cartItems.length; i++) {
        // current product id
        var id = cartItems[i].id;
        // check if current product added before to favorites group
        var isBelongsToFavorites = favoritesGroupIds.includes(id);

        $(".templet-cart")
            .clone()
            .last()
            .removeClass("d-none templet-cart") // display card and not make it templet
            .find(".qnt-menu")
            .attr("accessKey", id)
            .val(cartItems[i].quantity)
            .end()

            .find('.favorite')
            .removeClass('favorite-on') // remove favorite-on if it exist from last cloned element
            .attr("accessKey", id) // also give favorite button current product id for use it later
            .addClass(isBelongsToFavorites ? "favorite-on" : "") // add it if this product added before to favorites group
            .end()
            .addClass("cart-id-" + id)
            .find('.remove')
            //.addClass("d-none") // remove favorite-on if it exist from last cloned element
            .attr("accessKey", id) // also give favorite button current product id for use it later
            //.addClass(isExistInCart ? "" : "") // add it if this product added before to favorites group
            .end()

            .find('img')
            .attr('src', cartItems[i].image)
            .end()

            .find('.itemname')
            .text(cartItems[i].title)
            .end()

            .find('.itempara')
            .text(cartItems[i].title)
            .end()

            .find('.itemPrice')
            .text(cartItems[i].price + " EGP")
            .end()

            .find('.itemOldPrice')
            .text(cartItems[i].discountedPrice + " EGP")
            .end()

            .find('.savingPrice')
            .text("Savings:EGP" + cartItems[i].reviewCount)
            .end()

            .find('.totalPrice')
            .text("EGP " + cartItems[i].price * cartItems[i].quantity)
            .end()

            .insertAfter(".product:last"); //asm aldvaya
    }


    // Favorite Button Listener 
    $(".product").find('.favorite').on("click", (event) => {
        // access current product id
        var productId = event.currentTarget.accessKey;
        // check if this product already added to favorite list and we want to remote it 
        var unfavoriteProduct = event.currentTarget.classList.contains('favorite-on');
        // if product id in favorite list remove it otherwise add it
        var favoritesGroup = getFavorites();

        if (unfavoriteProduct) {
            // update ui
            event.currentTarget.classList.remove("favorite-on");
            // remove current product object from favorite products in localStorage
            for (var i = 0; i < favoritesGroup.length; i++) {
                if (favoritesGroup[i].id == productId) {
                    favoritesGroup.splice(i, 1); // remove one item starting from index i
                    break; // for performance 
                }
            }
            // restore updated favorites group
            restoreUpdatedFavoriteProducts(favoritesGroup);
        } else {
            // update ui
            event.currentTarget.classList.add("favorite-on");
            //add this product object to favorite products in localStorage
            var currentProduct = getProduct(productId);
            // push new current product to exist favorites group
            favoritesGroup.push(currentProduct);
            // restore updated favorites group to local storage 
            restoreUpdatedFavoriteProducts(favoritesGroup);
        }
    });


    /////////////////////////////remoooooooooooooooooooove/////////////////////////
    $(".product").find('.remove').on("click", (event) => {
        // access current product id
        var productId = event.currentTarget.accessKey;
        console.log("productId: " + productId);
        var removedItem = event.currentTarget.classList.contains('remove');

        var cartItems = getCartItems();

        if (removedItem) {

            // update ui
            $(".cart-id-" + productId).addClass("d-none");

            // remove current product object from favorite products in localStorage
            for (var i = 0; i < cartItems.length; i++) {
                if (cartItems[i].id == productId) {
                    cartItems.splice(i, 1); // remove one item starting from index i
                    break; // for performance 
                }
            }
            // update cart items count
            updateTotalItemsCountInCart(cartItems);
            // restore updated favorites group
            restoreUpdateCartItems(cartItems);
            var total = getTotal(cartItems);
            $("#totalPrice-id").text(total);
            noItems(cartItems);
        } else {
            return "hello"
        }
    });

    //calculate the total of total
    $(".qnt-menu").on("change", (e) => {
        var cartItems = getCartItems();
        var qnt = e.currentTarget.options.selectedIndex + 1;

        var cart_item_id = e.currentTarget.accessKey;
        for (var i = 0; i < cartItems.length; i++) {
            if (cartItems[i].id == cart_item_id) {
                cartItems[i].quantity = qnt;
                $(".cart-id-" + cart_item_id + " .totalPrice").text("EGP " + cartItems[i].price * cartItems[i].quantity)
                var total = getTotal(cartItems);
                $("#totalPrice-id").text(total);
            }
        }
        restoreUpdateCartItems(cartItems);

    });

    function updateTotalItemsCountInCart(cartItems) {
        $("#cart-items-count").text(cartItems.length);
        $(".cart-length").text(cartItems.length);
    } 

    function getTotal(items) {
        var total = 0;
        for (i in items) {
            total += items[i].quantity * items[i].price;
        }
        return total;
    }

    // If No items to show
    function noItems(items) {
        if (items.length == 0) {
            $("#noItems").removeClass("d-none") // display card
            $("#total-items").addClass("d-none")
            $(".hide-if-empty").addClass("d-none");
        }
    }
});