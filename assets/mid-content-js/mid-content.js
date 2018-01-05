// Carousel Start
var collection = [];
$(document).ready(function() {
    for(var i=0;i<audios.length;i++) {
          var audio = new Audio(audios[i]);
          collection.push(audio);
  }
}
    var audioElement = document.createElement('audio');
    
    audioElement.addEventListener('ended', function() {
        this.play();
    }, false);
    
    audioElement.addEventListener("canplay",function(){
        $("#length").text("Duration:" + audioElement.duration + " seconds");
        $("#status").text("Status: Playing").css("color","red");
    });
    
    audioElement.addEventListener("timeupdate",function(){
        $("#currentTime").text("Current second:" + audioElement.currentTime);
    });
    
    $('#play').click(function() {
        audioElement.play();
        $("#status").text("Status: Playing");
    });
    
    $('#pause').click(function() {
        audioElement.pause();
        $("#status").text("Status: Paused");
    });
    
    $('#restart').click(function() {
        audioElement.currentTime = 0;
    });
    function playLooped() {
    var audio=Math.floor(Math.random() * (collection.length));
    audio=collection[audio];
    audio.play();
    setTimeout(playLooped,audio.duration*1000);
}
    init([
    'http://.mp3',
    'http://.mp3',
    'http://.mp3',
]);
    
}
}
var image;
var resetAndStart = function () {
    $(".carousel-item").empty();
    var images = [
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                '',
                ];
for(var i = 0; i < 10; i++){
  
    var album = $("<div>");
        album.attr({
            "class": 'album',
            "data-random": random
        });
        album.css({
            "background-image":"url('" + (images[i]) + "')",
            "background-size":"cover"
        });
    $(".carousel-item").append(album);
    }
resetAndStart();
var reset = function () {
}
// Carousel End











// Lyric Scroll Function Start
// function ScrollDiv(){

//    if(document.getElementById('lyrics').scrollTop<(document.getElementById('lyrics').scrollHeight-document.getElementById('lyrics').offsetHeight)){-1
//          document.getElementById('lyrics').scrollTop=document.getElementById('lyrics').scrollTop+1
//          }
//    else {document.getElementById('lyrics').scrollTop=0;}
// }

// setInterval(ScrollDiv,100)
// Lyric Scroll Function End



















