var usreName = ""

$(document).ready(function(){
  //alert("In document ready");
//  saveInfo();
    getInfo();


   $('#MBtn').click(function() {
       var studyTime = $('#MidealTime').val();
       var studiedTime = $('#MstudiedTime').val();
       var wastedTimeSource = $('#MwasteTime').val();
       var day = "Monday";
       saveInfo(studyTime, studiedTime, wastedTimeSource, day);
       
   });
   
   $('#TuBtn').click(function() {
	     var studyTime = $('#TuidealTime').val();
       var studiedTime = $('#TustudiedTime').val();
       var wastedTimeSource = $('#TuwasteTime').val();
       var day = "Tuesday";
       saveInfo(studyTime, studiedTime, wastedTimeSource, day);
   });

   $('#WBtn').click(function() {
	     var studyTime = $('#WidealTime').val();
       var studiedTime = $('#WstudiedTime').val();
       var wastedTimeSource = $('#WwasteTime').val();
       var day = "Wednesday";
       saveInfo(studyTime, studiedTime, wastedTimeSource, day);
   });

   $('#TBtn').click(function() {
	     var studyTime = $('#TidealTime').val();
       var studiedTime = $('#TstudiedTime').val();
       var wastedTimeSource = $('#TwasteTime').val();
       var day = "Thursday";
       saveInfo(studyTime, studiedTime, wastedTimeSource, day);
   });

   $('#FBtn').click(function() {
	     var studyTime = $('#FidealTime').val();
       var studiedTime = $('#FstudiedTime').val();
       var wastedTimeSource = $('#FwasteTime').val();
       var day = "Friday";
       saveInfo(studyTime, studiedTime, wastedTimeSource, day);
   });

});

function saveInfo(studyTime, studiedTime, wastedTimeSource, day) {

  $.ajax({
    url:'/saveInfo.php',
    datatype:"json",
    type:'POST',
    data:{"studyTime": studyTime, "studiedTime": studiedTime, "wastedTimeSource": wastedTimeSource, "day": day},
    success:function(data1) {
      //alert(data1);
    }
  });

}

function getInfo() {

  $.ajax({
    url:'/getInfo.php',
    datatype:"json",
    type:'POST',
    data:{},
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


$(function () {
    $('#container').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 1,//null,
            plotShadow: false
        },
        title: {
            text: 'My time wastage'
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    style: {
                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                }
            }
        },
        series: [{
            type: 'pie',
            name: 'Browser share',
            data: [
                ['Firefox',   45.0],
                ['IE',       26.8],
                {
                    name: 'Chrome',
                    y: 12.8,
                    sliced: true,
                    selected: true
                },
                ['Safari',    8.5],
                ['Opera',     6.2],
                ['Others',   0.7]
            ]
        }]
    });
});

