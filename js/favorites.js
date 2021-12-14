$(document).ready(function () {

    // Local Storage data Keys
    const FAVORITES_KEY = "favorites";
    const CARTITEMS_KEY = "cart_items";

    // Product Object
    var product = function (id, image, title, price, discountedPrice, rating, reviewCount) {
        this.id = id;
        this.image = image;
        this.title = title;
        this.price = price;
        this.discountedPrice = discountedPrice;
        this.rating = rating;
        this.reviewCount = reviewCount;
    }

    // Cart Item Object
    var cartItem = function (id, image, title, price, discountedPrice, rating, reviewCount, quantity) {
        this.id = id;
        this.image = image;
        this.title = title;
        this.price = price;
        this.discountedPrice = discountedPrice;
        this.rating = rating;
        this.reviewCount = reviewCount;
        this.quantity = quantity;
    }

    // get product item by id
    function getProduct(id) {
        var results = favoritesGroup.filter((prod) => prod.id == id);
        if (results.length > 0) {
            return results[0];
        } else {
            return {};
        }
    }

    // get cart items list
    function getCartItems() {
        var data = localStorage.getItem(CARTITEMS_KEY);
        if (data) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }

    // restore updated cart items
    function restoreUpdateCartItems(updatedGroup) {
        localStorage.setItem(CARTITEMS_KEY, JSON.stringify(updatedGroup));
    }

    // get list of products that added to favorites group
    function getFavorites() {
        var data = localStorage.getItem(FAVORITES_KEY);
        if (data) {
            return JSON.parse(data);
        } else {
            return [];
        }
    }

    // set new products group to favorites group
    function restoreUpdatedFavoriteProducts(updatedGroup) {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedGroup));
    }

    // // get favorites item
    var favoritesGroup = getFavorites();
    // get products ids list that belogin to favorites group
    var favoritesGroupIds = favoritesGroup.map((prod) => prod.id);
    // get cart items
    var cartItems = getCartItems();
    // get product ids list that belogin to cart items group
    var cartGroupIds = cartItems.map((prod) => prod.id);


    for (var i = 0; i < favoritesGroup.length; i++) {

        // current product id
        var id = favoritesGroup[i].id;

        // check if current product added before to favorites group
        var isBelongsToFavorites = favoritesGroupIds.includes(id);

        // check if current product exist in cart items or not
        var isExistInCart = cartGroupIds.includes(id);

        // this list comes from localStorage
        $(".templet-card")
            .clone()
            .last()
            .removeClass("d-none templet-card") // display card and not make it templet
            .addClass("card-id-" + favoritesGroup[i].id) // use this class to access card itself
            .find('.add_to_cart_btn')
            .attr("accessKey", favoritesGroup[i].id)
            .removeClass("disabled") // remove disabled if exist in last cloned element
            .addClass(isExistInCart ? "disabled" : "") // disable add to cart button if this product exist in the cart
            .text(isExistInCart ? "added to cart" : "Add to cart") // disable add to cart button if this product exist in the cart
            .end()

            .find('.favorite')
            .attr("accessKey", favoritesGroup[i].id)
            .addClass("favorite-on")
            .end()
            .find('img')
            .attr('src', favoritesGroup[i].image)
            .end()
            .find('.card-title')
            .text(favoritesGroup[i].title)
            .end()
            .find('.price')
            .text(favoritesGroup[i].price + " EGP")
            .end()
            .find('.discountedPrice')
            .text(favoritesGroup[i].discountedPrice + " EGP")
            .end()
            .find('.reviewsCount')
            .text("(" + favoritesGroup[i].reviewCount + ")")
            .end()
            .insertAfter(".product:last");

        noFavoriteItems()

    }

    // Add To Cart Button Listener
    $(".product").find('.add_to_cart_btn').on("click", (event) => {
        // get current cart items group
        var cartItems = getCartItems();
        // access this product id
        var productId = event.currentTarget.accessKey;
        // change Add To Cart to added to cart 
        event.currentTarget.innerText = 'added to cart';
        // disable button after add it to cart
        event.currentTarget.classList.add("disabled");

        console.log("productId: " + productId);

        // use this product id to add which product object 
        // to localStorage at cart products

        // get current product
        var currentProduct = getProduct(productId);
        // create new cart item object
        var cart_item = new cartItem(currentProduct.id,
            currentProduct.image,
            currentProduct.title,
            currentProduct.price,
            currentProduct.discountedPrice,
            currentProduct.rating,
            currentProduct.reviewCount,
            1);
        // add this cart item to cart items group
        cartItems.push(cart_item);
        // resoter cart items group in local storage
        restoreUpdateCartItems(cartItems);
    });

    // Favorite Button Listener 
    $(".product").find('.favorite').on("click", (event) => {

        // access current product id
        var productId = event.currentTarget.accessKey;

        // check if this product already added to favorite list and we want to remote it 
        var unfavoriteProduct = event.currentTarget.classList.contains('favorite-on');

        // 1. un favorite this product
        event.currentTarget.classList.remove("favorite-on");
        // 2. make this card hidden
        // delay hide card 500 millisecond
        $.wait(
            () => {
                $(".card-id-" + productId).addClass("d-none");
            },
            200
        );

        // use this product id to remove this product object 
        // from favorite products in localStorage

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
        }

        noFavoriteItems()

    });

    // If No favourite items to show
    function noFavoriteItems() {
    if (favoritesGroup.length == 0) {
        $("#noFavorites")
            .removeClass("d-none") // display card
    }
    }
    noFavoriteItems()

    $.wait = function (callback, milliseconds) {
        return window.setTimeout(callback, milliseconds);
    }
});