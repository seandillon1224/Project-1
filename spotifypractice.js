 var songTitle;
 var spotifySongResult;
 var currentSong;

 // Generate link for sign in button using application ID from Spotify
  function makeSignInLink(){
    var msrtSpotifyClientId = "3134bcfa555b4933a9d6e61d83753f7b";

    // Log In and Link to MSRT App
    https://accounts.spotify.com/authorize?client_id=5fe01282e94241328a84e7c5cc169164&redirect_uri=
    var queryURLforSpotifyToken = "https://accounts.spotify.com/authorize/?client_id=" + msrtSpotifyClientId + "&response_type=token&redirect_uri=https://seandillon1224.github.io/Project-1/"
    // console.log(queryURLforSpotifyToken);

    $('#sign-in').attr('href', queryURLforSpotifyToken);

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
      });
function printTopResults() {
  console.log("dog")
    for (var i = 0; i < 5; i++) {
      var iPlus = i+1;
      $("#albumimage"+iPlus).attr('src', spotifySongResult.tracks.items[i].album.images[0].url);
      $("#albumimage"+iPlus).parent().data('spotifyID', spotifySongResult.tracks.items[i].id);
      // console.log("----- Spotify ID -----");
      // console.log($("#song-img"+iPlus).data('spotifyID'));
      $("#songtitle"+iPlus).html(spotifySongResult.tracks.items[i].name);
      $("#albumtitle"+iPlus).html(spotifySongResult.tracks.items[i].album.name);
      $("#artisttitle"+iPlus).html(spotifySongResult.tracks.items[i].artists[0].name);
    }
  }
  })



// $('#searchbar').keyup(function(e){

//     search = $(this).val();

//     // Only run query when key pressed is a letter (a = 65 and z = 90)
//     if(e.keyCode >= 65 && e.keyCode <= 90){
//       spotifySongSearch(search);
//     }

// });
 
// $('.dropdown-row').on('click', function(){
//   var div = $(this);
//   // set currentSong
//   currentSong = {
//     'title': div.children("[id*='songtitle']").html(),
//     'album': div.children("[id*='albumtitle']").html(),
//     'albumImg': div.children("[id*='albumimage']").attr('src'),
//     'artist': div.children("[id*='artisttitle']").html(),
//     'spotifyID': div.data('spotifyID')
//   };
// });
// Album image, and song title, artist, and album title information.






$(document).ready(function(){

  makeSignInLink(); // Add hyperlink to sign in button
 
  getUserSpotifyId(); // pull user ID from current page's URL
  

});
