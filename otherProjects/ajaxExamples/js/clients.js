$(document).ready(function() {

    $("#getClients").on("click", function() {

        var url = "http://jenbazy.github.io/otherProjects/ajaxExamples/js/clients.js";

        $.getJSON(url, function(data) {
            var html = "<table class='table table-hover table-striped'>" +
              "<tr><th>Name</th><th>Email</th><th>Company</th></tr>";

            $.each(data, function(index, item) {

              html += "<tr>" +
                "<td>" + item.name + "</td>" +
                "<td>" + item.email + "</td>" +
                "<td>" + item.company + "</td>" +
                "</tr>";
            })

            html += "</table>";
            $("#data").append(html);
            //alert(data);
            //console.dir(data);

          }) //getJSON

      }) //click

  }) //ready