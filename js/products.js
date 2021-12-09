$(document).ready(function () {

    console.log("asdlkas;ldkas;l");
    var favorite = $("#favorite");
    var active = false;
    favorite.click(() => {
       if(active) {
           favorite.css("color", "#C7C7CD");
           active = false;
       }
        else {

            favorite.css("color", "#EC255A");
            active = true;
        }
       
    });
    
   
});