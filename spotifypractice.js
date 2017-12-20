 function displayMovieInfo() {

        var movie = $(this).attr("data-name");
        var queryURL = "https://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

        // Creates AJAX call for the specific movie button being clicked
        $.ajax({
          url: queryURL,
          method: "GET"
        }).done(function(response) {

          // YOUR CODE GOES HERE!!!
          $("#poster").html("<img src =" + response.Poster + " </img>")
          $("#rating").html(response.Rated)
          $("#release").html(response.Released)
          $("#plot").html(response.Plot)
          console.log(response)
          console.log("<img src =" + response.Poster + " </img>")

        });

      }