// <!-- Home Slider -->
var homeSliderPrev = document.getElementById("home-Slider-Prev");
var homeSliderNext = document.getElementById("home-Slider-Next");

function prevMouseOver() {
    homeSliderPrev.style.visibility = "visible";
}

function prevMouseLeave() {
    homeSliderPrev.style.visibility = "hidden";
}

function nextMouseOver() {
    homeSliderNext.style.visibility = "visible";
}

function nextMouseLeave() {
    homeSliderNext.style.visibility = "hidden";
}

// <!-- Cards Slider -->
var cardsSliderPrev = document.getElementById("cards-Slider-Prev");
var cardsSliderNext = document.getElementById("cards-Slider-Next");

function cardsSliderMouseOver() {
    cardsSliderNext.style.visibility = "visible";
    cardsSliderPrev.style.visibility = "visible";
}

function cardsSliderMouseLeave() {
    cardsSliderNext.style.visibility = "hidden";
    cardsSliderPrev.style.visibility = "hidden";
}