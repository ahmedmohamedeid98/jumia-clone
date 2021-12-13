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

    // Note that this list in future will come from localStorage
    var productsGroup = [
        new product(1, "../resources/products/1.jpg", "Apple iPhone 13 Single SIM with FaceTime - 256GB - Blue", 1200, 1450, 3, 78),
        new product(2, "../resources/products/2.jpg", "Apple iPhone 13 Single SIM with FaceTime - 256GB - Blue", 1300, 1450, 3, 78),
        new product(5, "../resources/products/5.jpg", "Apple iPhone 13 Single SIM with FaceTime - 512GB - Pink", 1750, 1790, 4, 120),
    ];


    for (var i = 0; i < productsGroup.length; i++) {
        $(".templet-card")
            .clone()
            .last()
            .removeClass("d-none templet-card") // display card and not make it templet
            .addClass("card-id-" + productsGroup[i].id) // use this class to access card itself
            .find('.add_to_cart_btn')
            .attr("accessKey", productsGroup[i].id)
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


    $.wait = function( callback, milliseconds){
        return window.setTimeout( callback, milliseconds );
     }
});