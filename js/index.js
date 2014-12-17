var BACK_END_LOC = '/saveInfo.php';
var usreName = ""

$(document).ready(function(){
//  alert("In document ready");
//  saveInfo();
});

function saveInfo() {
 var data = {
"action": 20
}; 

  $.ajax({
    url:BACK_END_LOC,
    datatype:"json",
    type:'POST',
    data:data,
    success:function(data1) {
      //alert(data1);
    }
  });

}

$(document).on('pagebeforeshow', '#grid-page', function(e, data){     
    //alert("My name is " + data.prevPage.find('#test-input').val());
    userName = data.prevPage.find('#test-input').val();
});


$( document ).on( "pagecreate", "#one", function() {
    $('#welcomeUser').text("Welcome " + userName + "!");
    $( document ).on( "swipeleft swiperight", "#one", function( e ) {
	alert("on swipe");
        if ( $( ".ui-page-active" ).jqmData( "panel" ) !== "open" ) {
            if ( e.type === "swiperight" ) {
                $( "#left-panel" ).panel( "open" );
            }
        }
    });
});

