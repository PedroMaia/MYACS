  $(function(){

    
  var json_uri = "https://spreadsheets.google.com/feeds/cells/0AnnAt5-CXyhXdFN2S19abGpuX2ZjWTZvd3BUaXFzbEE/od6/public/basic?alt=json";
  $.ajax({
    type: "GET",
    url: json_uri,
    success: function(data){
    
    var items = [];
    var eventName = '';
    var text='';
    var digs='';

//inicia apartir do ponto 3 do array
 for(var i = 3; i < data.feed.entry.length; i++){
  
  text=data.feed.entry[i].title.$t;
//fazer função auciliar para isto.
      if(text[0] == 'B')
      {
         
         ant=text[0];
         eventName += data.feed.entry[i].content.$t+"B"+i+"</br>";
         if(data.feed.entry[i].content.$t[0]=='?')
          digs+="User->User:"+data.feed.entry[i].content.$t.substr(1,data.feed.entry[i].content.$t.length)+"\n";
          else
         digs+="User->Sistem:"+data.feed.entry[i].content.$t+"\n";

       }else
          if(text[0] == 'C')
          {

          if(data.feed.entry[i].content.$t[0]=='?')
          digs+="Sistem->Sistem:"+data.feed.entry[i].content.$t.substr(1,data.feed.entry[i].content.$t.length)+"\n";
              else
              {
                eventName += data.feed.entry[i].content.$t+"C"+i+"</br>";
                digs+="Sistem->User:"+data.feed.entry[i].content.$t+"\n";
              }
          }
      else
        eventName += data.feed.entry[i].content.$t+"A"+i+"</br>"

}

//Desenha diagrama.
  $('#outputTitle').append(eventName); 
    var diagram = Diagram.parse(digs+""); 
     
    diagram.drawSVG("diagram", {theme: 'simple'});  
 
// document.write("LALALA:"+data.feed.entry[2].content.$t);

    }
  });
});