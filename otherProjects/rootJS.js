//get the file (replace with your own url)
$.get("http://jenbazy.github.io/otherProjects/nav.html", function (data) {

    $(document).ready(function () {

        //check if this document has .container
        var navCall = $(".navCall");

        //if so add nav.html contents to the top
        if (navCall) {
            navCall.prepend(data)
            navCall.fadeIn();
        }

    });

});