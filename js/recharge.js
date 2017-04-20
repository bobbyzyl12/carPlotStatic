$(document).ready(function(){
  //icon display
  $("#recharge-money").focus(function(){
      $("#money-mark").css("color","#70db70");
  });

  $("#recharge-money").blur(function(){
    $("#money-mark").css("color","#999");
  });

  //show dialog function
  $("#dollar-icons").click(function(){
    $("#userNameError").hide();
    $("#noUser1").hide();
    $("#moneyError").hide();
    var bh = $(".wrapper").height();
    var bw = $(".wrapper").width();
    $("#coverbg").css({
        height: bh,
        width: bw,
        display: "block"
    });
    $("#chargeDialog").show();
  });

  //submit function
  $("#recharge-button").click(function(){
    $("#userNameError").hide();
    $("#noUser1").hide();
    $("#moneyError").hide();
    var username = $("#recharge-username").val();
    var moneyTest =$("#recharge-money").val();
    var money =parseInt($("#recharge-money").val());
    var ok1=false;
    if(username=="" || username.length < 3 || username.length > 32){
         $("#userNameError").show();
    }
    else{ok1=true;}

    var ok2=false;
    var regPrice=/(^[1-9]\d*(\.\d{1,2})?$)|(^0(\.\d{1,2})?$)/;
    if((moneyTest=="" ||(!regPrice.test(moneyTest)))){
         $("#moneyError").show();
    }
    else{ok2=true;}
    if(ok1&&ok2){
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
              $("#chargeDialog").show();
              $("#noUser1").show();
            }
            else{
              var age = parseInt(msg.Caruser[0].age);
              var id = parseInt(msg.Caruser[0].id);
              var password = msg.Caruser[0].password;
              var username = msg.Caruser[0].username;
              var orimoney = parseInt(msg.Caruser[0].money);
              money = orimoney+money;
              $.ajax({
                 url: 'http://112.74.62.114:8080/Entity/U146498b721ca6a/CarPark/Caruser/'+id,
                 contentType: "application/json",
                 type: 'PUT',
                 dataType:"json",
                 data:JSON.stringify({
                   "username":username,
                   "password":password,
                   "age":age,
                   "money":money
               }),
                 success: function (msg2){
                   $("#chargeDialog").hide();
                   $("#rechargeSuccessDialog").show();
                   $("#rechargeSuccessUsername").html(username);
                   $("#rechargeSuccessMoney").html(money);
                   $("#spinner-box").hide();
                 }
             });
          }
        }
      });
    }
  });
});
