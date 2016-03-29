$(document).ready(function () {
    //get all the nav li, add click event
    $(".nav").find("li").on("click", function () {

            //remove all active class
            $(".nav").find("li").removeClass("active");

            //add active class to clicked li
            $(this).addClass("active");

            var page = $(this).attr("id");
            getPartial(page);

        }) //click


    function getPartial(partial) {
        alert(partial);
    }
})