function ScrollDiv(){

   if(document.getElementById('lyrics').scrollTop<(document.getElementById('lyrics').scrollHeight-document.getElementById('lyrics').offsetHeight)){-1
         document.getElementById('lyrics').scrollTop=document.getElementById('lyrics').scrollTop+1
         }
   else {document.getElementById('lyrics').scrollTop=0;}
}

setInterval(ScrollDiv,100)