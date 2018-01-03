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


$(document).ready(function(){

  makeSignInLink(); // Add hyperlink to sign in button
 
  getUserSpotifyId(); // pull user ID from current page's URL
  

});
