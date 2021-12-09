$(document).ready(function () {


    var product = function (id, image, title, price, discountedPrice, rating, reviewCount) {
        this.id = id;
        this.image = image;
        this.title = title;
        this.price = price;
        this.discountedPrice = discountedPrice;
        this.rating = rating;
        this.reviewCount = reviewCount;
    }

    var productsGroup = [
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


    for (var i = 0; i < productsGroup.length; i++) {
        $(".product")
            .clone()
            .last()
            .find('.add_to_cart_btn')
            .attr("accessKey", productsGroup[i].id)
            .end()
            .find('.favorite')
            .attr("accessKey", productsGroup[i].id)
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

    });

    // Favorite Button Listener 
    $(".product").find('.favorite').on("click", (event) => {
        // access current product id
        var productId = event.currentTarget.accessKey;
        // check if this product already added to favorite list and we want to remote it 
        var unfavoriteProduct = event.currentTarget.classList.contains('favorite-on');
        // if product id in favorite list remove it otherwise add it
        if (unfavoriteProduct) {
            event.currentTarget.classList.remove("favorite-on");
            // TODO : use this product id to remove this product object 
            // from favorite products in localStorage
        } else {

            event.currentTarget.classList.add("favorite-on");
            // TODO : use this product id to add this product object 
            // to favorite products in localStorage
        }
        console.log("productId: " + productId);
    });
});