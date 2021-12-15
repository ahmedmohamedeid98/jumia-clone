$(document).ready(() => {

    var category = function(id, image, title) {
        this.id = id;
        this.image = image;
        this.title = title;
    }

    


    var categories = [
        new category(1, "../resources/image/Kids & Baby.png", "Kids & Baby"),
        new category(2, "../resources/index/Men_s Fashion.png", "Men's fashion"),
        new category(3, "../resources/index/Beauty & perfumes.png", "Beauty & perfumes"),
        new category(4, "../resources/index/TVs & Gaming.png", "TVs & Gaming"),
        new category(5, "../resources/index/Home & Appliances.png", "Home & Appliances"),
        new category(6, "../resources/index/Food & Beverage1.png", "Food & Beverage"),
        new category(7, "../resources/image/Laptop & Accessories.png", "Laptop & Accessories"),
        new category(8, "../resources/image/Car Essentials.png", "Car Essentials"),
        new category(9, "../resources/image/Household Care.png", "Household Care"),
        new category(10, "../resources/image/Mobile & Accessories.png", "Mobiles & Accessories"),
        new category(11, "../resources/image/Sporting.png", "Sporting"),
        new category(12, "../resources/image/Women_s Fashion.png", "Women_s Fashion"),
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