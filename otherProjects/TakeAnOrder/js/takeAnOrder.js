$(document).ready(function () {
    var log = $("#log");
    //click event
    //user wants to order
    $("button").on("click", function () {

        log.append($("input").val() + "<br/>")
            .append($("textarea").val() + "<br/>")
            .append($("select").val() + "<br/>")
            .append($("[name='gender']:checked").val() + "<br/>")
            .append($('input:checkbox:checked').map(function () {
                return this.value;
            }).get().join());

    })

    //focus event
    //chnages background to grey
    $("#mySingleLineText").on("focus", function () {
            log.append("User focussed on the input <br/>");
            $(this).css("background-color", "grey");
        })
        //blur event
        //chnages background to whilte
        .on("blur", function () {
            log.append("User moved away from the input <br/>");
            $(this).css("background-color", "white");
        });
    //mouseenter mouseleave envent
    //changes message on the button text
    $("button").on("mouseenter", function () {
            log.append("User is hovering on button <br/>");
            $(this).text("Give me $$$");

        })
        .on("mouseleave", function () {
            log.append("User is no longer hovering on the button <br/>");
            $(this).text("Click me");

        })

    //select event
    //writes some html on the screen depending on the selection
    $("#mySelect").on("change", function () {
        
        var val = $(this).val();
        log.append("User changed selection <br/>");
        var selInfo = $("#mySelect"),
            choice = $(this).val();

        if (choice == "value1") {
            selInfo.html("Good choice!");
        } else if (choice == "value2") {
            selInfo.html("That model is great!");
        } else if (choice == "value3") {
            selInfo.html("You will love it.");
        }
    })

})