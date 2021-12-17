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

    // Dummy Products Data
    var productsGroup = [
        new product(1, "../resources/products/1.jpg", "Huawei Y6p - 6.3-inch 64GB/3GB 4G Mobile Phone - Emerald Green", 850, 1000, 3, 40),
        new product(2, "../resources/products/2.jpg", "Apple iPhone 13 Single SIM with FaceTime - 256GB - Blue", 1400, 1450, 3, 78),
        new product(5, "../resources/products/5.jpg", "Apple iPhone 13 Single SIM with FaceTime - 512GB - Pink", 1750, 1790, 4, 120),
        new product(6, "../resources/products/6.jpg", "Amazfit GTS 2 Mini ( 1.55 ) Bluetooth Smartwatch -Flamingo Pink", 520, 699, 4, 470),
        new product(7, "../resources/products/7.jpg", "Amazfit GTS 2 Mini ( 1.55 ) Smartwatch , 14-Day Battery Life , 70 Sports Modes - Midnight Black", 620, 700, 4, 220),
        new product(8, "../resources/products/8.jpg", "Nokia 106 (2018) - 1.8-inch Dual SIM Mobile Phone - Dark Grey", 21, 32, 4, 35),
        new product(9, "../resources/products/9.jpg", "Nokia - 1.8-inch Dual SIM Mobile Phone - Dark Grey", 19, 28, 4, 45),
        new product(10, "../resources/products/10.jpg", "Silicone Sport Strap Replacement Bands For Apple Watch - 44mm/42mm - White", 4, 9, 3, 13),
        new product(11, "../resources/products/11.jpg", "Nokia C1 - 5.45-inch 16GB/1GB Dual SIM 3G Mobile Phone - Red", 65, 72, 4, 15),
        new product(12, "../resources/products/12.jpg", "Apple iPhone 13 Mini Single SIM with FaceTime - 256GB - Midnight", 1500, 1600, 4, 2),
        new product(13, "../resources/products/13.jpg", "Remax RPP-96 Power Bank - 10000mAh - Black", 85, 120, 4, 40),
        new product(14, "../resources/products/14.jpg", "Nokia 106 (2018) - 1.8-inch Dual SIM Mobile Phone - Dark Grey", 160, 180, 4, 5),
        new product(4, "../resources/products/4.jpg", "Apple iPhone 13 Mini Single SIM with FaceTime - 256GB - Midnight", 2200, 2400, 3, 75),
        new product(3, "../resources/products/3.jpg", "Apple iPhone 12 mini with FaceTime - 64GB - Purple", 1400, 14200, 3, 21),
    ];

    // get list of products that added to favorites group
    // "[item: sdf, lkfd: ""]"
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

    // get favorites item
    var favoritesGroup = getFavorites();
    // get cart items
    var cartItems = getCartItems();
    // get products ids list that belogin to favorites group
    var favoritesGroupIds = favoritesGroup.map((prod) => prod.id);
    // get product ids list that belogin to cart items group
    var cartGroupIds = cartItems.map((prod) => prod.id);

    // publish data
    for (var i = 0; i < productsGroup.length; i++) {
        // current product id
        var id = productsGroup[i].id;
        // check if current product added before to favorites group
        var isBelongsToFavorites = favoritesGroupIds.includes(id);
        // check if current product exist in cart items or not
        var isExistInCart = cartGroupIds.includes(id);
        $(".templet-cart")
            .clone()
            .last()
            .removeClass("d-none templet-cart") // display card and not make it templet
            .find('.add_to_cart_btn')
            .attr("accessKey", id) // give "add_to_cart button" current product id for use it later
            .removeClass("disabled") // remove disabled if exist in last cloned element
            .addClass(isExistInCart ? "disabled" : "") // disable add to cart button if this product exist in the cart
            .text(isExistInCart ? "added to cart" : "Add to cart") // disable add to cart button if this product exist in the cart
            .end()
            .find('.favorite')
            .removeClass('favorite-on') // remove favorite-on if it exist from last cloned element
            .attr("accessKey", id) // also give favorite button current product id for use it later
            .addClass(isBelongsToFavorites ? "favorite-on" : "") // add it if this product added before to favorites group
            .end()
            .find('img')
            .attr('src', productsGroup[i].image)
            .end()
            .find('.card-title')
            .text(productsGroup[i].title)
            .end()
            .find('.price')
            .text(productsGroup[i].price + " EGP")
            .end()
            .find('.discountedPrice')
            .text(productsGroup[i].discountedPrice + " EGP")
            .end()
            .find('.reviewsCount')
            .text("(" + productsGroup[i].reviewCount + ")")
            .end()
            .insertAfter(".product:last");
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
        // update cart items count
        updateTotalItemsCountInCart(cartItems);
        // resoter cart items group in local storage
        restoreUpdateCartItems(cartItems);
    });

    function updateTotalItemsCountInCart(cartItems) {
        $("#cart-items-count").text(cartItems.length);
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
});