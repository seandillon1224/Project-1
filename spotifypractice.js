 var songTitle;
 var spotifySongResult;
 var currentSong;
 var seansMusixAPIkey = "40cadfe43b9ed1c6bcc47270c4b635c0"
 var musixTrackId;
 var musixLyrics; // just the lyrics
 var musixLyricsResult; // whole object
 var songToPlayer
 var images = [];
 var album;
 // Generate link for sign in button using application ID from Spotify
  function makeSignInLink(){
    var msrtSpotifyClientId = "3134bcfa555b4933a9d6e61d83753f7b";

    var queryURLforSpotifyToken = "https://accounts.spotify.com/authorize/?client_id=" + msrtSpotifyClientId + "&response_type=token&redirect_uri=https://seandillon1224.github.io/Project-1/"
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


  for (var i = 0; i < 5; i++) {
      console.log(spotifySongResult)
      var iPlus = i+1;
      // $("#albumimage"+iPlus).attr('src', );
      // $("#albumimage"+iPlus).parent().data('spotifyID', spotifySongResult.tracks.items[i].id);
      // // console.log("----- Spotify ID -----");
      // // console.log($("#song-img"+iPlus).data('spotifyID'));
      // $("#songtitle"+iPlus).html(spotifySongResult.tracks.items[i].name);
      // $("#albumtitle"+iPlus).html(spotifySongResult.tracks.items[i].album.name);
      // $("#artisttitle"+iPlus).html(spotifySongResult.tracks.items[i].artists[0].name);

  $('.artist-information').append('<li><h3>'+spotifySongResult.tracks.items[i].name+'</h3><h4>'+spotifySongResult.tracks.items[i].album.name+'</h4><h5>'+spotifySongResult.tracks.items[i].artists[0].name+'</li>')
    
images.push(spotifySongResult.tracks.items[i].album.images[0].url)
console.log(images)
// <img src="'+spotifySongResult.tracks.items[i].album.images[0].url+'"/>
// spotifySongResult.tracks.items[i].uri

$(".carousel-item").empty();

var album = $("<div>");
        album.attr({
            "class": 'album',
            // "href": spotifySongResult.tracks.items[i].uri
        });
        album.css({
            "background-image":"url('" + (images[i]) + "')",
            "background-size":"cover"
        });
    $(".carousel-item").append(album);
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