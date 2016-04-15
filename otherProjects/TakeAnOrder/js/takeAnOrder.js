$(document).ready(function () {
    /*
    - click- done
    - focus
    - blur
    - change
    - mouseenter & mouseleave
    $("#").on("", function() {
    });
    */
    //change button text
    $("#myButton").one("mouseenter", function () {
            $("#log").append("<br>You should definitely review");
            $(this).text("Click to Review");
        })
        .one("mouseleave", function () {
            $("#log").append("<br><br>We hope you love your item");
            $(this).text("You're going to look great!");
        });


    //change the backgrund color on focus, blue
    /*$("#mySingleLineText").on("focus", function () {
            $("#log").append("<br>What is your colour?");
            $(this).css("background-color", "#e6ffe6");
        })
        .on("blur", function () {
            $("#log").append("<br>What's your style?");
            $(this).css("background-color", "#FFF");
        });*/

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
  .focus(function() {
        if (this.value === this.defaultValue) {
            this.value = '';
        }
  })
  .blur(function() {
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