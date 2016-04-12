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
        if (partial == "home") {
            //ajax get home.html
            $.get("partials/home.html", function (data) {
                $("#pageContent").html(data);
                $('.carousel').carousel();

            })
        } else if (partial == "seeCatsPage") { //ajax models.html
            //paste the getJSON here; change the append id; change the file name
            $.getJSON("jsonDatabase/finalCats.json", function (data) {

                    var html = "";

                    $.each(data, function (index, item) {
                            html += '<div class="col-xs-12 col-md-4 jsonCat">' +
                                '<div class="catName">' + item.name + '</div>' +
                                '<div class="catType"><small>type </small>' + item.type + '</div>' +
                                '<div class="catGender"><small>gender </small>' + item.gender + '</div>' +
                                '<img class="catImage" src="' + item.image + '"/>' +
                                //deleted commentsContainer
                                '<div class="panel panel-default">' + //added
                                '<div class="panel-heading">Renter Comments</div>'; //added
                            $.each(item.comments, function (ind, i) {
                                    html += '<div class="panel-body">' + //added
                                        '<div class="renterName"><small>' + i.username + '</small></div>' +
                                        '<div class="renterComment">' + i.comment + '</div>' +
                                        '<div class="renterStars">';

                                    for (var j = 1; j <= 5; j++) {

                                        if (j <= i.stars) {
                                            html += '<img src="images/fullStar.png"/>';
                                        } else {
                                            html += '<img src="images/emptyStar.png"/>';
                                        }
                                    }
                                    html += '</div>' + //end stars
                                        '</div>'; //panel body
                                }) //each comment

                            html += '</div>' + //panel
                                '</div>'; //col-md-4
                        }) //each cat

                    $("#pageContent").html(html);

                }) //getJSON

        } else if (partial == "orderPage") {
            $.get("partials/orderPage.html", function (data) {
                $("#pageContent").html(data);
                $("#myButton").one("mouseenter", function () {
                        $("#log").append("<br>You should definitely review");
                        $(this).text("Click to Review");
                    })
                    .one("mouseleave", function () {
                        $("#log").append("<br><br>We hope you love your item");
                        $(this).text("You're going to look great!");
                    });

                $("#mySingleLineText").each(function () {
                    var Input = $(this);
                    var default_value = Input.val();
                    Input.focus(function () {
                        $("#log").append("<br>What is your colour?");
                        $(this).css("background-color", "#e6ffe6");
                        if (Input.val() == default_value) Input.val("");
                    }).blur(function () {
                        if (Input.val().length == 0) Input.val(default_value);
                    })
                });

                $("#myTextarea")
                    .focus(function () {
                        if (this.value === this.defaultValue) {
                            this.value = '';
                        }
                    })
                    .blur(function () {
                        if (this.value === '') {
                            this.value = this.defaultValue;
                        }
                    });


                //give the user a message about their selection
                $("#mySelect").on("change", function () {

                    var val = $(this).val();
                    $("#log").append("<br>Is that the correct size?");
                    $("#mySelectMessage").html(val + " is a nice selection!");

                });

                //user clicks the button
                $("#myButton").on("click", function () {

                    $("#log").append("<br><br>Let's see what you made!:<br>");

                    var userOrder = {};

                    userOrder.myInput = $("#mySingleLineText").val();
                    userOrder.myTextarea = $("#myTextarea").val();
                    userOrder.mySelect = $("#mySelect").val();
                    userOrder.myRadio = $("[name='gender']:checked").val();
                    userOrder.myCheckValues = [];

                    $("[name='options']:checked").each(function () {
                        userOrder.myCheckValues.push($(this).val());
                    });

                    $("#log").append("<br>You would like an item that's colour is primarily " + userOrder.myInput);
                    $("#log").append("<br>In the following size: " + userOrder.mySelect);
                    $("#log").append("<br>You would describe your style as " + userOrder.myTextarea);
                    $("#log").append("<br>Your style is " + userOrder.myRadio);
                    $("#log").append("<br>You are interested in: " + userOrder.myCheckValues.join());
                    $("#inputLog").append("Your inputs were as follows: " + JSON.stringify(userOrder));

                })

            });

        }
    }

    getPartial("home");
})