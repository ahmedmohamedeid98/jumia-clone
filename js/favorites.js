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

    // Note that this list in future will come from localStorage
    var productsGroup = [
        new product(1, "../resources/products/1.jpg", "Apple iPhone 13 Single SIM with FaceTime - 256GB - Blue", 1200, 1450, 3, 78),
        new product(2, "../resources/products/2.jpg", "Apple iPhone 13 Single SIM with FaceTime - 256GB - Blue", 1300, 1450, 3, 78),
        new product(5, "../resources/products/5.jpg", "Apple iPhone 13 Single SIM with FaceTime - 512GB - Pink", 1750, 1790, 4, 120),

    ];

    // get product item by id
    function getProduct(id) {
        var results = productsGroup.filter((prod) => prod.id == id);
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

    // // get favorites item
    // var favoritesGroup = getFavorites();
    // get cart items
    var cartItems = getCartItems();
    // // get products ids list that belogin to favorites group
    // var favoritesGroupIds = favoritesGroup.map((prod) => prod.id);
    // get product ids list that belogin to cart items group
    var cartGroupIds = cartItems.map((prod) => prod.id);


    for (var i = 0; i < productsGroup.length; i++) {

        // current product id
        var id = productsGroup[i].id;
        // // check if current product added before to favorites group
        // var isBelongsToFavorites = favoritesGroupIds.includes(id);
        // check if current product exist in cart items or not
        var isExistInCart = cartGroupIds.includes(id);

        $(".templet-card")
            .clone()
            .last()
            .removeClass("d-none templet-card") // display card and not make it templet
            .addClass("card-id-" + productsGroup[i].id) // use this class to access card itself
            .find('.add_to_cart_btn')
            .attr("accessKey", productsGroup[i].id)
            .removeClass("disabled") // remove disabled if exist in last cloned element
            .addClass(isExistInCart ? "disabled" : "") // disable add to cart button if this product exist in the cart
            .text(isExistInCart ? "added to cart" : "Add to cart") // disable add to cart button if this product exist in the cart
            .end()

            .find('.favorite')
            .attr("accessKey", productsGroup[i].id)
            .addClass("favorite-on")
            .end()
            .find('img')
            .attr('src', productsGroup[i].image)
            .end()
            .find('.card-title')
            .text(productsGroup[i].title)
            .end()
            .find('.price')
            .text(productsGroup[i].price + "$")
            .end()
            .find('.discountedPrice')
            .text(productsGroup[i].discountedPrice + "$")
            .end()
            .find('.reviewsCount')
            .text("(" + productsGroup[i].reviewCount + ")")
            .end()
            .insertAfter(".product:last");
    }

    // Add To Cart Button Listener
    $(".product").find('.add_to_cart_btn').on("click", (event) => {
        // access this product id
        var productId = event.currentTarget.accessKey;
        // change Add To Cart to added to cart 
        event.currentTarget.innerText = 'added to cart';
        // disable button after add it to cart
        event.currentTarget.classList.add("disabled");

        console.log("productId: " + productId);

        // TODO : use this product id to add which product object 
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

        // TODO: use this product id to remove this product object 
        // from favorite products in localStorage


    });


    $.wait = function (callback, milliseconds) {
        return window.setTimeout(callback, milliseconds);
    }
});