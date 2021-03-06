var char=64;
var polls;
var pollChartjs;
function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 6; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

function getAllUserPollonLoad(){
  $.ajax({
            type: 'GET',
            url: "/getAllUserPoll",
     xhrFields: {withCredentials: true},
            success:function(data){
              polls=data
              var groupPanel = $("<div>").addClass("panel-group");
              $.each(polls,function(index,item){
                var y=$("<div>")
                var randomId=makeid();
                for(var i=0;i<item.pollItems.length;i++){
                var q =$("<div>").addClass("radio").append($("<input type='radio' name='options'>").val(item.pollItems[i].optionName)).append($("<span>").text(item.pollItems[i].optionVal));
                y.append(q);
                }
                var qq=$("<button>").addClass("btn btn-primary vote").text("Vote");
                var ww=$("<button>").addClass("btn btn-secondary showResult").text("Show Result");
                var ss=$("<a>").addClass("btn btn-info shareResult").text("Share Result").attr({href:"https://twitter.com/intent/tweet?text=https://fcc-vote-app.glitch.me/showPoll/"+item.pollName+""});
                var zz=$("<button>").addClass("btn btn-danger deletePoll").text("DeletePoll");
                var rr=$("<button>").addClass("btn btn-warning updatePoll").text("UpdatePoll");
                var x = $("<div>").addClass("panel panel-primary ")
                .append($("<div>").addClass("panel-heading").append($("<div>").addClass("panel-title").append($("<a>").text(item.pollName).attr("data-toggle","collapse").attr("href","#"+randomId))))
                .append($("<div>").attr("id",randomId).addClass("panel-collapse collapse").append($("<div>").addClass("panel-body").attr("id",item.pollName).text(item.pollQuestion).append(y).append(qq).append(ww).append(ss).append(zz).append(rr)));
                groupPanel.append(x);
              });
              $("#dashjumbotron").append(groupPanel);
            }
        });
}

function getAllPollonLoad(){
  $.ajax({
            type: 'GET',
            url: "/getAllPoll",
            success:function(data){
              polls=data
              var groupPanel = $("<div>").addClass("panel-group");
              $.each(polls,function(index,item){
                var y=$("<div>")
                var randomId=makeid();
                for(var i=0;i<item.pollItems.length;i++){
                var q =$("<div>").addClass("radio").append($("<input type='radio' name='options'>").val(item.pollItems[i].optionName)).append($("<span>").text(item.pollItems[i].optionVal));
                y.append(q);
                }
                var qq=$("<button>").addClass("btn btn-primary vote").text("Vote");
                var ww=$("<button>").addClass("btn btn-secondary showResult").text("Show Result");
                var x = $("<div>").addClass("panel panel-primary ")
                .append($("<div>").addClass("panel-heading").append($("<div>").addClass("panel-title").append($("<a>").text(item.pollName).attr("data-toggle","collapse").attr("href","#"+randomId))))
                .append($("<div>").attr("id",randomId).addClass("panel-collapse collapse").append($("<div>").addClass("panel-body").attr("id",item.pollName).text(item.pollQuestion).append(y).append(qq).append(ww)));
                groupPanel.append(x);
                groupPanel.append(x);
              });
              $("#indexjumbotron").append(groupPanel);
            }
        });
}

$(function(){
  getAllUserPollonLoad();
  getAllPollonLoad();
  
  $("#addOption").on("click",function(event ){
    event.preventDefault();
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
  
  $("#submitPoll").on("click",function(event){
   event.preventDefault();
  
    var x=[];
    $("ol li input").each(function(index){
      var obj={
        optionName:$(this).attr("id"),
        optionVal:$(this).val(),
        optionCount:0
      }
      x.push(obj);
    });
    var data={
      pollName:$("#pollName").val(),
      pollQuestion:$("#pollQuestion").val(),
      pollItems:JSON.stringify(x)
   };
    $.ajax({
            type: 'post',
            url: "/cpoll",
            dataType: 'json',
            data:data,
            xhrFields: {withCredentials: true},
            success:function(result){
              if(result.status===201){
                alert(result.success);
                location.reload();
              }
              if(result.status===501){
                alert(result.success);
                location.reload();
              }
              if(result.status===500){
                alert(result.success);
                 location.reload();
              }
        }

  });
});
  
  $(document).on('click', '.panel-heading span.clickable', function(e){
    var $this = $(this);
	if(!$this.hasClass('panel-collapsed')) {
		$this.parents('.panel').find('.panel-body').slideUp();
		$this.addClass('panel-collapsed');
		$this.find('i').removeClass('fa-arrow-up').addClass('fa-arrow-down');
	} else {
		$this.parents('.panel').find('.panel-body').slideDown();
		$this.removeClass('panel-collapsed');
		$this.find('i').removeClass('fa-arrow-down').addClass('fa-arrow-up');
	}
});
  
  $(document).on("click",".vote",function(){
    var data ={
    "pollName":$(this).parent().attr("id"),
    "vote":$('input[name=options]:checked').val()
    }
      $.ajax({
            type: 'post',
            url: "/vote",
            data:data,
         xhrFields: {withCredentials: true},
            success:function(result){
              if(result.status===201){
                alert(result.success);
              }
              if(result.status===500){
                alert(result.success);
              }
            }
        });
  });
  
  $(document).on("click",".deletePoll",function(){
    var data ={
    "pollName":$(this).parent().attr("id"),
    }
      $.ajax({
            type: 'post',
            url: "/deletePoll",
            data:data,
         xhrFields: {withCredentials: true},
            success:function(result){
              if(result.status===201){
                alert(result.success);
                location.reload();
              }
              if(result.status===500){
                alert(result.success);
                 location.reload();
              }
            }
        });
  });
  
    $(document).on("click",".updatePoll",function(){
    var data ={
    "pollName":$(this).parent().attr("id"),
    }
      $.ajax({
            type: 'post',
            url: "/updateOption",
            data:data,
            xhrFields: {withCredentials: true},
            success:function(result){
              if(result.status===500){
                alert(result.success);
                 location.reload();
              }
              else{
                if($("#pollName").val()!==""){
                alert("first submit current poll");
                  return;
                }
                else{
                $("#deleteOption").css("display","block");
                $("#pollName").val(result.pollName);
                $("#pollQuestion").val(result.pollQuestion);
                $.each(result.pollItems,function(index,item){
                  var y =$("<li>")
                  var x = $("<input>").val(item.optionVal).attr("id",item.optionName).attr("name",item.optionName).attr("type","text");
                  y.append(x);
                  $("#options").append(y);
                });
                $('html, body').animate({scrollTop:0}, 'slow');
                }
              }
            }
        });
  });
  
  $(document).on("click", ".showResult", function() {
    var data = {
        "pollName": $(this).parent().attr("id")
    }
    $.ajax({
        type: 'post',
        url: "/getPollResult",
        dataType: 'json',
        data: data,
       xhrFields: {withCredentials: true},
        success: function(result) {
          var data=[];
          var label=[];
          var backgroundColor=[];
          var val=[]
          $.each(result.pollItems,function(index,item){
            
            data.push(item.optionCount);
            label.push(item.optionName);
            val.push(item.optionVal);
            backgroundColor.push("rgba("+Math.floor(Math.random() * 255)+", "+Math.floor(Math.random() * 255)+", "+Math.floor(Math.random() * 255)+", 1)");
          });
           
            var ctx = $("#pollChart");
            pollChartjs = new Chart(ctx, {
                type: 'pie',
                data: {
                    datasets: [{
                        data: data,
                        backgroundColor:backgroundColor
                    }],
                    labels: label,
                 
                },
            });

            $("#pollResult").modal("show");
        }
    });
});
  
})