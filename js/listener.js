//initialize the current source
var free=0;
var busy=0;
var total=0;
var plotList=new Array();

//first time open the page,get info from server
$.ajax({
  url: 'http://112.74.62.114:8080/Entity/U146498b721ca6a/CarPark/CarPark/',
  contentType: "application/json",
  type: 'GET',
  dataType:"json",
  success: function (msg){
    if(jQuery.isEmptyObject(msg)){
        alert("暂无车位");
    }
    else{
      for (var i=0;i<msg.Carpark.length;i++)
      {
        var parkid = msg.Carpark[i].parkid;
        var status = msg.Carpark[i].isempty;
        plotList[i] = msg.Carpark[i].id;
        if(status=="0"){
          $("#"+parkid).css("border-color","#ff8080");
          $("#"+parkid).css("color","#ff8080");
          total++;
          busy++;
        }
        else if(status=="1"){
          $("#"+parkid).css("border-color","#70db70");
          $("#"+parkid).css("color","#70db70");
          free++;
          total++;
        }
      }
      $("#totalPlot").html(total);
      $("#freePlot").html(free);
      $("#busyPlot").html(busy);

      //source listeners
      var sourceList=new Array();
      for(var i=0;i<total;i++){
        sourceList[i] = new EventSource("http://112.74.62.114:8080/Entity/U146498b721ca6a/CarPark/CarPark/"+plotList[i]+"/syncronize");
      }
      for(var i=0;i<total;i++){
          var source = sourceList[i];
          source.onmessage = function (event) {
          update(event);
        }
      }
    }
  }
});

//the update function
function update(event){
  var a = event.data;
  var obj = jQuery.parseJSON(a);
  var parkidU = obj.parkid;
  var statusU = obj.isempty;
  if(statusU == "0"){
    $("#"+parkidU).css("border-color","#ff8080");
    $("#"+parkidU).css("color","#ff8080");
    busy++;
    free--;
  }
  else{
    $("#"+parkidU).css("border-color","#70db70");
    $("#"+parkidU).css("color","#70db70");
    free++;
    busy--;
    }
    $("#freePlot").html(free);
    $("#busyPlot").html(busy);
}
