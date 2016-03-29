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
        if (partial == "homePage") {
            //ajax get home.html
            $.get("partials/home.html", function (data) {
                $("#pageContent").html(data);
                
            })
        } else if (partial == "seeDogsPage") {
            alert("2");
        } else if (partial == "orderPage") {
            alert("3");
        }
    }

    getPartial("homePage");
})