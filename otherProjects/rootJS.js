//get the file (replace with your own url)
$.get("http://jenbazy.github.io/otherProjects/partials/nav.html", function (data) {

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
$.get("http://jenbazy.github.io/otherProjects/partials/footer.html", function (data) {

    $(document).ready(function () {

        //check if this document has .container
        var footCall = $(".footCall");

        //if so add nav.html contents to the top
        if (footCall) {
            footCall.prepend(data)
            footCall.fadeIn();
        }

    });

});