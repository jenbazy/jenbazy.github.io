$(document).ready(function () {

    //get all the nav li, add click event
    $(".nav").find("li").on("click", function () {
            $("#pageContent").hide().html("");
            //remove all active class
            $(".nav").find("li").removeClass("active");
            //add active class to clicked li
            $(this).addClass("active");

            //get the correct page according to click
            var page = $(this).attr("id");
            getPartial(page);

        }) //click

    //get the parital via JSON, add to page, activiate associating js
    function getPartial(partial) {

        if (partial == "home") { //ajax get home.html
            $.get("partials/home.html", function (data) {
                $("#pageContent").html(data);
                $('.carousel').carousel();
            })
        } else if (partial == "seePots") { //ajax get order.html
            $.getJSON("jsonDatabase/finalPots.json", function (data) {

                    var html = "";

                    $.each(data, function (index, item) {
                            html += '<div class="col-xs-12 col-md-4 jsonPot">' +
                                '<div class="potName">' + item.name + '</div>' +
                                '<div class="potType"><small>type </small>' + item.type + '</div>' +
                                '<div class="potColor"><small>color </small>' + item.color + '</div>' +
                                '<img class="potImage" src="' + item.image + '"/>' +
                                //deleted commentsContainer
                                '<div class="panel panel-default">' + //added
                                '<div class="panel-heading">Buyer Reviews</div>'; //added
                            $.each(item.comments, function (ind, i) {
                                    html += '<div class="panel-body">' + //added
                                        '<div class="renterName"><small>' + i.username + '</small></div>' +
                                        '<div class="buyerComment">' + i.comment + '</div>' +
                                        '<div class="buyerLeaves">';

                                    for (var j = 1; j <= 5; j++) {

                                        if (j <= i.leaves) {
                                            html += '<span class="glyphicon glyphicon-leaf"></span>';
                                        } else {
                                            html += ' ';
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
        } else if (partial == "orderPage") { //ajax get order.html
            $.get("partials/order2.html", function (data) {

                    $("#pageContent").html(data);

                    $('#deliveryDate').datepicker({});

                    $("#submitButton").on("click", function () {

                            //get all empty inputs and select
                            //add error class to div container
                            $("input, select").filter(function () {
                                return !this.value;
                            }).closest("div").addClass("has-error");

                            //remove error class for non empty ones
                            $("input, select").filter(function () {
                                return this.value; //removed !
                            }).closest("div").removeClass("has-error");

                            var errors = $(".has-error");

                            if (errors.length < 1) {
                                //alert("no errors");
                                sendConfirmation();
                            }

                        }) //click
                }) //get
        }
        $("#pageContent").fadeIn();

    }

    function sendConfirmation() {
        //make an object to record data for database;
        var order = {};
        //get all teh jquery objects
        var formData = $("input, select");
        //for each jquery object
        formData.each(function () {
            var id = $(this).attr("id"); //get the id of the element
            order[id] = $(this).val(); //set the field and the value
        })

        alert("Sending to database " + JSON.stringify(order));
        $("#successMsg").html("Order Received!<br/><br/>" +
            order.catSelect + " will be delivered on " +
            order.deliveryDate );

    } //sendConfirmation

    //begin the program, get the homepage
    getPartial("home");

})