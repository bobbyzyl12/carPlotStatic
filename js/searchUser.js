$(document).ready(function(){
    $("#question-icons").click(function(){
    $("#noUser2").hide();
    $("#userNameError2").hide();
    var bh = $(".wrapper").height();
    var bw = $(".wrapper").width();
    $("#coverbg").css({
        height: bh,
        width: bw,
        display: "block"
    });
    $("#questionDialog").show();
  });

  //submit function
  $("#question-button").click(function(){
    $("#noUser2").hide();
    $("#userNameError2").hide();
    var username = $("#question-username").val();
    var ok1=false;
    if(username=="" || username.length < 3 || username.length > 32){
         $("#userNameError2").show();
    }
    else{
      ok1=true;
    }
    if(ok1){
      $("#coverbg").show();
      $(".dialog").hide();
      $("#spinner-box").show();
      $.ajax({
          url: 'http://112.74.62.114:8080/Entity/U146498b721ca6a/CarPark/Caruser/?Caruser.username='+username,
          contentType: "application/json",
          type: 'GET',
          dataType:"json",
          success: function (msg){
            if(jQuery.isEmptyObject(msg)){
              $("#spinner-box").hide();
              $("#questionDialog").show();
              $("#noUser2").show();
             }
            else{
              $("#questionDialog").hide();
              $("#spinner-box").hide();
              $("#answerDialog").show();
              $("#answerUsername").html(username);
              $("#answerMoney").html(msg.Caruser[0].money);
            }
          }
      });
    }

});
});
