

	//var type = $(this).attr("data-type");
	//console.log("this is 'this' number one:" + this);
	// API request
	//var queryURL ="http://api.musixmatch.com/ws/1.1/" + type + "&api_key=47e24958033e4feae2828884f4d956bb";
var trackName;	
var musixTrackId
var musixLyrics; // just the lyrics
var musixLyricsResult; // whole object

$(".searchbutton").on("click", function queryMusixForId(trackName){
	console.log("cat")
	event.preventDefault();
	
	// Remove spaces in query
	//trackName = trackName.replace(/ /g, "%20").toLowerCase();

	trackName = $(".searchbar").val();
	artistName = $(".artist-input").val();
	console.log(trackName);
	 var queryURL = "https://cors-anywhere.herokuapp.com/http://api.musixmatch.com/ws/1.1/track.search?q_track=" + trackName + "&q_artist=" + artistName + "&f_has_lyrics=1" + "&format=json&" + "apikey=40cadfe43b9ed1c6bcc47270c4b635c0";

// "&f_has_lyrics=1" + "&format=json" +

	
//Ajax copied from old in class activity
$.ajax({
		url: queryURL,
		async: false,
		method: "GET"
	}).done(function(musixIdResponse) {
		
		
		// Response for Id query needed to be parsed
      musixIdResponse = JSON.parse(musixIdResponse);
      // console.log(musixIdResponse)

      // Collect just the Musix Track Id
      musixTrackId = musixIdResponse.message.body.track_list[0].track.track_id;
      // console.log(musixIdResponse.message.body.track_list[0].track.track_id)


      // Call the next AJAX call after this call is done
      queryMusixForLyrics(musixTrackId);

	// end of .done function
	});

})// end of queryMusixForId


function queryMusixForLyrics(){
	// search with the Musix ID to get back Track Lyrics
	var queryMusixForLyricsURL = "https://cors-anywhere.herokuapp.com/" + "http://api.musixmatch.com/ws/1.1/" + "track.lyrics.get?track_id=" + musixTrackId + "&apikey=40cadfe43b9ed1c6bcc47270c4b635c0";

	$.ajax({url: queryMusixForLyricsURL, async : false, method: 'GET'}).done(function(musixLyricsResponse){

      // Response for Id query needed to be parsed
      musixLyricsResponse = JSON.parse(musixLyricsResponse);
      // console.log(musixLyricsResponse)

      // Globally store the Lyrics Search Response
      musixLyricsResult = musixLyricsResponse;
      console.log(musixLyricsResult)

      // Collect just the Musix Lyrics
      musixLyrics = musixLyricsResponse.message.body.lyrics.lyrics_body;

      // Remove the Non-Commerical Use message at the bottom of the lyrics
      musixLyrics = musixLyrics.replace("******* This Lyrics is NOT for Commercial use *******", "");

      // Remove the "\n" values 
      musixLyrics = musixLyrics.replace(/\n/g, " ");

      // Make the Lyrics into a string
      musixLyrics = JSON.stringify(musixLyrics);
      console.log(musixLyrics)

	$("#lyrics").append(musixLyrics);

 });

    }

// $('#add-lyrics').on("click", function(event) {

// event.preventDefault();
// queryMusixForId();


// });
