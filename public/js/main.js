var char=64;
var polls;
function getAllUserPollonLoad(){
  $.ajax({
            type: 'GET',
            url: "/getAllUserPoll",
            success:function(data){
              polls=data
              var groupPanel = $("<div>").addClass("panel-group");
              $.each(polls,function(index,item){
                var y=$("<div>")
                for(var i=0;i<item.pollItems.length;i++){
                var q =$("<div>").addClass("radio").append($("<input type='radio' name='options'>").val(item.pollItems[i].optionName)).append($("<span>").text(item.pollItems[i].optionVal));
                y.append(q);
                }
                var qq=$("<button>").addClass("btn btn-primary vote").text("Vote");
                var ww=$("<button>").addClass("btn btn-secondary showResult").text("Show Result");
                var ss=$("<a>").addClass("btn btn-info shareResult").text("Share Result").attr({href:"https://twitter.com/intent/tweet?text=https://fcc-vote-app.glitch.me/showPoll/"+item.pollName+""});
                var zz=$("<button>").addClass("btn btn-danger deletePoll").text("DeletePoll");
                var x = $("<div>").addClass("panel panel-primary ")
                .append($("<div>").addClass("panel-heading").text(item.pollName).append("<span class='pull-right clickable panel-collapsed'><i class='fa fa-arrow-up'></i></span>"))
                .append($("<div>").addClass("panel-body").attr("id",item.pollName).text(item.pollQuestion).append(y).append(qq).append(ww).append(ss).append(zz));
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
                for(var i=0;i<item.pollItems.length;i++){
                var q =$("<div>").addClass("radio").append($("<input type='radio' name='options'>").val(item.pollItems[i].optionName)).append($("<span>").text(item.pollItems[i].optionVal));
                y.append(q);
                }
                var qq=$("<button>").addClass("btn btn-primary vote").text("Vote");
                var ww=$("<button>").addClass("btn btn-secondary showResult").text("Show Result");
                var x = $("<div>").addClass("panel panel-primary ")
                .append($("<div>").addClass("panel-heading").text(item.pollName).append("<span class='pull-right clickable panel-collapsed'><i class='fa fa-arrow-up'></i></span>"))
                .append($("<div>").addClass("panel-body").attr("id",item.pollName).text(item.pollQuestion).append(y).append(qq).append(ww));
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
            success:function(result){
            location.reload();
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
            success:function(result){
            if(result==="OK")
              alert("Vote Taken");
            else
              alert("There was a Problem");
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
            success:function(result){
            if(result==="OK")
              alert("Vote Taken");
            else
              alert("There was a Problem");
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
          console.log(backgroundColor);
            var ctx = $("#pollChart");
            var pollChartjs = new Chart(ctx, {
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