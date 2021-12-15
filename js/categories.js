$(document).ready(() => {

    var category = function(id, image, title) {
        this.id = id;
        this.image = image;
        this.title = title;
    }

    


    var categories = [
        new category(1, "../resources/image/Mobile & Accessories.png", "Mobiles & Accessories"),
        new category(2, "../resources/index/Men_s Fashion.png", "Men's fashion"),
        new category(3, "../resources/index/Women_s Fashion.png", "Women's fashion"),
        new category(4, "../resources/index/TVs & Gaming.png", "TVs & Gaming"),
        new category(5, "../resources/index/Home & Appliances.png", "Home & Appliances"),
        new category(6, "../resources/index/Food & Beverage1.png", "Food & Beverage"),
        new category(7, "../resources/image/Mobile & Accessories.png", "Mobiles & Accessories"),
        new category(8, "../resources/image/Mobile & Accessories.png", "Mobiles & Accessories"),
        new category(9, "../resources/image/Mobile & Accessories.png", "Mobiles & Accessories"),
        new category(10, "../resources/image/Mobile & Accessories.png", "Mobiles & Accessories"),
        new category(11, "../resources/image/Mobile & Accessories.png", "Mobiles & Accessories"),
        new category(12, "../resources/image/Mobile & Accessories.png", "Mobiles & Accessories"),
        new category(13, "../resources/image/Mobile & Accessories.png", "Mobiles & Accessories"),
    ];

    for(var i = 0; i < categories.length; i++) {
        var currectCategory = categories[i];
        $(".templet-cart")
        .clone()
        .last()
        .removeClass("d-none templet-cart")
        .find(".cat-img")
        .attr("src", currectCategory.image)
        .end()
        .find(".cart-title")
        .text(currectCategory.title)
        .end()
        .insertAfter(".cat-card:last")
    }

    $(".card").on("click", (e) => {
        console.log(location.pathname);
        var url = location.origin + location.pathname.replace("categories.html", "products.html");
    location.replace(url);
    });
});