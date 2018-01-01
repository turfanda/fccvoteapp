var char=64;

function getAllPollonLoad(){
  $.ajax({
            type: 'GET',
            url: "/dashboard/getAllPoll",
            success:function(data){
            }
        });
}

$(function(){
  getAllPollonLoad();
  $("#addOption").on("click",function(event ){
    event.preventDefault();
    if($("#options li").length>4){
      alert("Max option limit is 4");
      return;
    }

    var y =$("<li>")
    var x = $("<input type='text'>").attr("id",String.fromCharCode(char+1)).attr("name",String.fromCharCode(char+1))
    char=char+1;
    var z =y.append(x);
    $("#options").append(z);

    $("#deleteOption").css("display","block");
  });
  
  $("#deleteOption").on("click",function(event ){
    event.preventDefault();
    $("li:last").remove();
    char=char-1;
    
    if($("#options li").length===0){
      $("#deleteOption").css("display","none")
    }
  });
})