 var songTitle;
 var spotifySongResult;
 var currentSong;
 var seansMusixAPIkey = "40cadfe43b9ed1c6bcc47270c4b635c0"
 var musixTrackId;
 var musixLyrics; // just the lyrics
 var musixLyricsResult; // whole object
 var songToPlayer
 var images = [];
 var album1;
 var album2;
 var album3;
 var album4;
 var album5;
 var cover1;
 var cover2;
 var cover3;
 var cover4;
 var cover5;
 var replacedSong;

 // Generate link for sign in button using application ID from Spotify
  function makeSignInLink(){
    var SpotifyClientId = "3134bcfa555b4933a9d6e61d83753f7b";

    var queryURLforSpotifyToken = "https://accounts.spotify.com/authorize/?client_id=" + SpotifyClientId + "&response_type=token&redirect_uri=https://seandillon1224.github.io/Project-1/"
    // console.log(queryURLforSpotifyToken);

    $("#button_signup").append("<a href='"+queryURLforSpotifyToken+"' class='button'>Sign Up</button>")

  }
  function getUserSpotifyId(){
    // Check for a hash symbol in the URL (A successful login will bring the user to a URL with the Access Token encoded as a hash)
    if(window.location.hash != ""){
      console.log("cat")
      // Collect the Access Token from the URL
      var cropToGetToken = window.location.hash;
      console.log(cropToGetToken)
      cropToGetToken = cropToGetToken.split("#access_token=");
      cropToGetToken = cropToGetToken[1];
      cropToGetToken = cropToGetToken.split("&");
      cropToGetToken = cropToGetToken[0];

      // Collect the access token from the cropped window hash
      spotifyAccessToken = cropToGetToken;
      console.log(spotifyAccessToken)

      // AJAX Call to get the User Information (using the Access Token)
      $.ajax({
        url: 'https://api.spotify.com/v1/me',
        headers: {
          'Authorization': 'Bearer ' + spotifyAccessToken
        },
        success: function(userInfoResponse) {
          console.log(userInfoResponse)

          // Collect the User's Spotify Id
          userSpotifyId = userInfoResponse.id;
        }
      });
    }
  }

// Search Spotify by song title
$(".searchbutton").on("click", function spotifySongSearch (songTitle) {


  event.preventDefault()
  $(".car1").empty()
  $(".car2").empty()
  $(".car3").empty()
  $(".car4").empty()
  $(".car5").empty()

  $("#mainheader").text("Top 5 Most Relevant!")
  
  songTitle = $(".searchbar").val()
  console.log(songTitle)

    // Replace any spaces with a plus sign for query
    songTitle = songTitle.trim().replace(/ /g, "+");

    // Run an initial search to identify the song's (track) unique Spotify ID
    var queryURL1 = "https://api.spotify.com/v1/search?q=" + songTitle + "&type=track";

      $.ajax({
        url: queryURL1,  
        headers: {
          'Authorization': 'Bearer ' + spotifyAccessToken
        }, 
        method: 'GET'}).done(function(songResponse) {

        // Globally store the Song Search Response
        spotifySongResult = songResponse;
        console.log(spotifySongResult)
        cover1=spotifySongResult.tracks.items[0].album.images[0].url
        console.log(cover1)
        cover2=spotifySongResult.tracks.items[1].album.images[0].url
        cover3=spotifySongResult.tracks.items[2].album.images[0].url
        cover4=spotifySongResult.tracks.items[3].album.images[0].url
        cover5=spotifySongResult.tracks.items[4].album.images[0].url

 $('.song-play').attr('src','"https://open.spotify.com/embed?uri="'+spotifySongResult.tracks.items[0].uri);


        //Replace the spotify link with the top song selection

        // replacedSong= $(".artist-information").val()
        // console.log(replacedSong)

        // replacedSong = replacedSong.replace("spotify:track:2TpxZ7JUBn3uw46aR7qd6V", "spotifySongResult.tracks.items[0].uri")
        // console.log(replacedSong)

        // $(".artist-information").append(replacedSong)


$(".carousel-item").empty();

var album1 = $("<div>");
        album1.attr({
            "class": 'album',
            // "href": spotifySongResult.tracks.items[i].uri
        });
        album1.css({
            "background-image":"url('" + cover1 + "')",
            "background-size":"cover"
        });
    $(".car1").append(album1);

var album2 = $("<div>");
        album2.attr({
            "class": 'album',
            // "href": spotifySongResult.tracks.items[i].uri
        });
        album2.css({
            "background-image":"url('" + cover2 + "')",
            "background-size":"cover"
   
        });
         $(".car2").append(album2);


var album3 = $("<div>");
        album3.attr({
            "class": 'album',
            // "href": spotifySongResult.tracks.items[i].uri
        });
        album3.css({
            "background-image":"url('" + cover3 + "')",
            "background-size":"cover"
        });
    $(".car3").append(album3);


var album4 = $("<div>");
        album4.attr({
            "class": 'album',
            // "href": spotifySongResult.tracks.items[i].uri
        });
        album4.css({
            "background-image":"url('" + cover4 + "')",
            "background-size":"cover"
        });
    $(".car4").append(album4);


var album5 = $("<div>");
        album5.attr({
            "class": 'album',
            // "href": spotifySongResult.tracks.items[i].uri
        });
        album5.css({
            "background-image":"url('" + cover5 + "')",
            "background-size":"cover"
        });
    $(".car5").append(album5);


  for (var i = 0; i < 5; i++) {
      console.log(spotifySongResult)
      var iPlus = i+1;

  $('.artist-info2').append('<li><h3>'+spotifySongResult.tracks.items[i].name+'</h3><h4>'+spotifySongResult.tracks.items[i].album.name+'</h4><h5>'+spotifySongResult.tracks.items[i].artists[0].name+'</li>')
    
// <img src="'+spotifySongResult.tracks.items[i].album.images[0].url+'"/>


    }
    })
      }); 

// function lyricsGrab(){
//   $(":header").on("click", function grabbing(){

//   }
// }

// $("#linkURL").on("click", function(){
//   songToPlayer=$("linkURL").val()

// $("#playerDiv").prepend('<iframe src="https://open.spotify.com/embed?uri=spotify:track:"+ songToPlayer +" width="300" height="380" frameborder="0" allowtransparency="true"></iframe>')


// })



$(document).ready(function(){

  makeSignInLink(); // Add hyperlink to sign in button
 
  getUserSpotifyId(); // pull user ID from current page's URL
  

})