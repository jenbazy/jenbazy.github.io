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

                    $(".form-control").each(function () {
                        var Input = $(this);
                        var default_value = Input.val();
                        Input.focus(function () {
                            $("#inputLog").append("<br>Focus function initiated");
                            $(this).css("background-color", "#e6ffe6");
                            if (Input.val() == default_value) Input.val("");
                        }).blur(function () {
                            if (Input.val().length == 0) Input.val(default_value);
                            $("#inputLog").append("<br>Blur function initiated");
                        })
                    })

                    $('#deliveryDate').datepicker({});

                    $("#cardNumber").on("change", function () {

                        var val = $(this).val();
                        $("#log").append("Please make sure your card number is correct.<br>");
                        $("#inputLog").html("<br>Change function triggered.");

                    });

                    $("#submitButton").one("mouseenter", function () {
                            $("#inputLog").append("<br>button entered trigger");
                            $(this).text("Have you entered all your information?");
                        })
                        .one("mouseleave", function () {
                            $("#inputLog").append("<br>button left trigger");
                            $(this).text("Submit");
                        });

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
                                $(this).text("Received!");
                            }
                            var order = {};

                            order.potSelect = $("#potSelect").val();
                            order.deliveryDate = $("#deliveryDate").val();
                            order.name = $("#name").val();
                            order.cardNumber = $("#cardNumber").val();
                            order.code = $("#securityCode").val();
                            order.expiryMonth = $("#expirymonth").val();
                            order.expiryYear = $("#expiryYear").val();
                            order.address1 = $("#address1").val();
                            order.zip = $("#zip").val();
                            order.state = $("#state").val();
                            order.country = $("#country").val();
                            
                            $("#log").append("<br>You ordered " + order.potSelect);
                            $("#log").append("<br>Delivery Date: " + order.deliveryDate);
                            $("#log").append("<br>Card Holder's Name: " + order.name);
                            $("#log").append("<br>Card Number: " + order.cardNumber);
                            $("#log").append("<br>Security Code: " + order.securityCode);
                            $("#log").append("<br>Expiry Date: " + order.expiryMonth + "/" + order.expiryYear);
                            $("#log").append("<br>Address: " + order.address1 + "<br>" + order.state + "," + order.country + "<br>" + order.zip);

                            $("#inputLog").append("<br>Your inputs were as follows: " + JSON.stringify(order, null, 4));

                        }) //click
                }) //get
        }
        $("#pageContent").fadeIn();

    }

    function sendConfirmation() {
        //make an object to record data for database;
        var order = {};
        //get all the jquery objects
        var formData = $("input, select");
        //for each jquery object
        formData.each(function () {
            var id = $(this).attr("id"); //get the id of the element
            order[id] = $(this).val(); //set the field and the value
        })


        alert("Sending to database " + JSON.stringify(order));
        $("#successMsg").html("Order Received!<br/><br/>" +
            order.potSelect + " will be delivered on " +
            order.deliveryDate + " " + '<span class="glyphicon glyphicon-grain"></span>');

    } //sendConfirmation

    //begin the program, get the homepage
    getPartial("home");

})