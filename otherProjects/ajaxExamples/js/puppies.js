$(document).ready(function () {
    
        $("#getPuppies").on("click", function () {

                var url = "http://jenbazy.github.io/otherProjects/ajaxExamples/jsonDatabase/puppies.json";

                $.getJSON(url, function (data) {
                        var puppies = '<div id="puppies">';
                        var html = "<table class='table table-hover table-striped'>" +
                            "<tr><th>Breed</th><th>Colours</th><th>Temperament</th></tr>";
                        

                        $.each(data, function (index, item) {
                            puppies += '<img class="puppyPics" src="' + item.image + '"/>' ;

                            html += "<tr>" +
                                "<td>" + item.breed + "</td>" +
                                "<td>" + item.colors + "</td>" +
                                "<td>" + item.temperament + "</td>" +
                                "</tr>";
                            
                        })
                            
                        
                        
                    
                        puppies +="</div>"
                        $("#puppies").append(puppies);
                        
                        html += "</table>";
                        $("#data").append(html);
                        
                        //alert(data);
                        //console.dir(data);

                    })
                //getJSON

            }) //click

    }) //ready