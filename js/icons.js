$(function(){
  $("#upload-icons").mouseover(function(){
     $(this).attr({
          "src" : "images/icons/upload2.png"
        });
  });
  $("#upload-icons").mouseout(function(){
     $(this).attr({
          "src" : "images/icons/upload1.png"
        });
  });
  $("#dollar-icons").mouseover(function(){
     $(this).attr({
          "src" : "images/icons/dollar2.png"
        });
  });
  $("#dollar-icons").mouseout(function(){
     $(this).attr({
          "src" : "images/icons/dollar1.png"
        });
  });
  $("#question-icons").mouseover(function(){
     $(this).attr({
          "src" : "images/icons/question2.png"
        });
  });
  $("#question-icons").mouseout(function(){
     $(this).attr({
          "src" : "images/icons/question1.png"
        });
  });
});
