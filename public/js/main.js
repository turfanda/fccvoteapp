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
                var ss=$("<button>").addClass("btn btn-info shareResult").text("Share Result");
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
    console.log(JSON.stringify(x));
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
            success:function(){
            alert("vote taken");
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
            dataType: 'json',
            data:data
        });
  });
  
    $(document).on("click",".deletePoll",function(){
    var data ={
    "pollName":$(this).parent().attr("id"),
    }
      $.ajax({
            type: 'post',
            url: "/deletePoll",
            dataType: 'json',
            data:data
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
            console.log(result);
            var ctx = $("#pollChart");
            var pollChartjs = new Chart(ctx, {
                type: 'pie',
                data: {
                    datasets: [{
                        data: [10, 20, 30]
                    }],


                    labels: [
                        'Red',
                        'Yellow',
                        'Blue'
                    ]
                },
            });

            $("#pollResult").modal("show");
        }
    });
});
  
  
})


/*data: {
                      labels: [result.A, result.B, result.C, result.D],
                      datasets: [{
                          label: '# of Votes',
                          data: [result.Act, result.Dct, result.Cct, result.Dct, ],
                          backgroundColor: [
                              'rgba(255, 99, 132, 0.2)',
                              'rgba(54, 162, 235, 0.2)',
                              'rgba(255, 206, 86, 0.2)',
                              'rgba(75, 192, 192, 0.2)',
                          ],
                          borderColor: [
                              'rgba(255,99,132,1)',
                              'rgba(54, 162, 235, 1)',
                              'rgba(255, 206, 86, 1)',
                              'rgba(75, 192, 192, 1)',
                          ],
                          borderWidth: 1
                      }]
                  },*/