$(document).ready(() => {

    var category = function(id, image, title) {
        this.id = id;
        this.image = image;
        this.title = title;
    }


    var categories = [
        new category(1, "../resources/image/Mobile & Accessories.png", "Mobiles & Accessories"),
        new category(1, "../resources/image/Mobile & Accessories.png", "Mobiles & Accessories"),
        new category(1, "../resources/image/Mobile & Accessories.png", "Mobiles & Accessories"),
        new category(1, "../resources/image/Mobile & Accessories.png", "Mobiles & Accessories"),
        new category(1, "../resources/image/Mobile & Accessories.png", "Mobiles & Accessories"),
        new category(1, "../resources/image/Mobile & Accessories.png", "Mobiles & Accessories"),
        new category(1, "../resources/image/Mobile & Accessories.png", "Mobiles & Accessories"),
        new category(1, "../resources/image/Mobile & Accessories.png", "Mobiles & Accessories"),
        new category(1, "../resources/image/Mobile & Accessories.png", "Mobiles & Accessories"),
        new category(1, "../resources/image/Mobile & Accessories.png", "Mobiles & Accessories"),
        new category(1, "../resources/image/Mobile & Accessories.png", "Mobiles & Accessories"),
        new category(1, "../resources/image/Mobile & Accessories.png", "Mobiles & Accessories"),
        new category(1, "../resources/image/Mobile & Accessories.png", "Mobiles & Accessories"),
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
});