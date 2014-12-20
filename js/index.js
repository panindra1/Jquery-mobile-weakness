var usreName = ""

$(document).ready(function(){

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
    dataType:"json",
    type:'POST',
    data:{"getWasteTimeInfo":"getWasteTimeInfo"},
    success:function(data1) {
      var keys = [];
      var values = [];
      var total = 0;
      $.each(data1, function(k, v){
        //alert(k);
        keys.push(k);
        total += v;
      });

      $.each(data1, function(k, v){
        values.push((v/total)*100);
      });
     
     pieChart(keys, values);
    }
  });

  $.ajax({
    url:'/getInfo.php',
    dataType:"json",
    type:'POST',
    data:{},
    success:function(data) {
      var keys = [];
      var values = [];
      var total = 0;
      $.each(data, function(k, v){
        //alert(k);
        keys.push(k);
        total += v;
      });

      $.each(data, function(k, v){
        values.push((v/total)*100);
      });
      //alert(values);
     dayspieChart(keys, values);
    }
  });
}

$(document).on('pagebeforeshow', '#grid-page', function(e, data){     
    //alert("My name is " + data.prevPage.find('#test-input').val());
    userName = data.prevPage.find('#test-input').val();
});

$( document ).on( "pagecreate", "#overview", function() {
  getInfo();
}); 

$( document ).on( "pagecreate", "#one", function() {
   // $('#welcomeUser').text("Welcome " + userName + "!");
    $( document ).on( "swipeleft swiperight", "#one", function( e ) {
	alert("on swipe");
        if ( $( ".ui-page-active" ).jqmData( "panel" ) !== "open" ) {
            if ( e.type === "swiperight" ) {
                $( "#left-panel" ).panel( "open" );
            }
        }
    });
});


function pieChart(keys, values) {
    var seriesData = [];
    
     for(var i = 0; i < keys.length; i++) {
        var data = [];
        data.push(keys[i]);
        data.push(values[i]);
        seriesData.push(data);
     }

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
            data: seriesData
        }]
    });
}

function dayspieChart(keys, values) {
  var seriesData = [];
    
     for(var i = 0; i < keys.length; i++) {
        var data = [];
        data.push(keys[i]);
        data.push(values[i]);
        seriesData.push(data);
     }

    $('#container1').highcharts({
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: 0,
            plotShadow: false
        },
        title: {
            text: 'Days<br>Read',
            align: 'center',
            verticalAlign: 'middle',
            y: 50
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    distance: -50,
                    style: {
                        fontWeight: 'bold',
                        color: 'white',
                        textShadow: '0px 1px 2px black'
                    }
                },
                startAngle: -90,
                endAngle: 90,
                center: ['50%', '75%']
            }
        },
        series: [{
            type: 'pie',
            name: 'Days spread',
            innerSize: '50%',
            data: seriesData
        }]
    });
}

