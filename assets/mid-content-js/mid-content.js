// Carousel Start

var images = []
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
}









function ScrollDiv(){

   if(document.getElementById('lyrics').scrollTop<(document.getElementById('lyrics').scrollHeight-document.getElementById('lyrics').offsetHeight)){-1
         document.getElementById('lyrics').scrollTop=document.getElementById('lyrics').scrollTop+1
         }
   else {document.getElementById('lyrics').scrollTop=0;}
}

setInterval(ScrollDiv,100)







