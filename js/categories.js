$(document).ready(() => {

    var category = function(id, image, title) {
        this.id = id;
        this.image = image;
        this.title = title;
    }

    


    var categories = [
        new category(10, "../resources/categories/Mobile & Accessories.png", "Mobiles & Accessories"),
        new category(1, "../resources/categories/Kids & Baby.png", "Kids & Baby"),
        new category(2, "../resources/categories/Men_s Fashion.png", "Men's fashion"),
        new category(3, "../resources/categories/Beauty & perfumes.png", "Beauty & perfumes"),
        new category(4, "../resources/categories/TVs & Gaming.png", "TVs & Gaming"),
        new category(5, "../resources/categories/Home & Appliances.png", "Home & Appliances"),
        new category(6, "../resources/categories/Food & Beverage.png", "Food & Beverage"),
        new category(7, "../resources/categories/Laptop & Accessories.png", "Laptop & Accessories"),
        new category(8, "../resources/categories/Car Essentials.png", "Car Essentials"),
        new category(9, "../resources/categories/Household Care.png", "Household Care"),
        new category(11, "../resources/categories/Sporting.png", "Sporting"),
        new category(12, "../resources/categories/Women_s Fashion.png", "Women's Fashion"),
    ];

    for(var i = 0; i < categories.length; i++) {
        var currectCategory = categories[i];
        $(".templet-card")
        .clone()
        .last()
        .removeClass("d-none templet-card")
        .find(".cat-img")
        .attr("src", currectCategory.image)
        .end()
        .find(".card-title")
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