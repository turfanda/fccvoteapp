
var char=64;
var polls;
function getAllPollonLoad(){
  $.ajax({
            type: 'GET',
            url: "/getAllPoll",
            success:function(data){
              polls=data
              console.log(polls);
              var groupPanel = $("<div>").addClass("panel-group");
              $.each(polls,function(index,item){
                var x = $("<div>").addClass("panel panel-primary").attr("id",item.pollName)
                .append($("<div>").addClass("panel-heading").text(item.pollName).append("<span class='pull-right clickable'><i class='glyphicon glyphicon-chevron-up'></i></span>"))
                .append($("<div>").addClass("panel-body").text(item.pollQuestion));
                for(var i=1;i<item.optionCount+1;i++){
                var z = String.fromCharCode(char+i);
                var q =$("<div>").addClass("radio").append($("<input type='radio' name='options'>").val(z)).append($("<span>").text(item[z]));
                x.append(q);
                }
                x.append($("<div>").addClass("panel-footer").append($("<button>").addClass("btn btn-primary vote").text("Vote")).append($("<button>").addClass("btn btn-secondary showResult").text("Show Result")) );
                groupPanel.append(x);
              });
              $(".jumbotron").append(groupPanel);
              
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
    $("#optionCount").val(parseInt($("#optionCount").val())+1);
    var z =y.append(x);
    $("#options").append(z);

    $("#deleteOption").css("display","block");
  });
  
  $("#deleteOption").on("click",function(event ){
    event.preventDefault();
    $("li:last").remove();
    char=char-1;
    $("#optionCount").val(parseInt($("#optionCount").val())-1);
    
    if($("#options li").length===0){
      $("#deleteOption").css("display","none")
    }
  });
})