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
                var y=$("<div>")
                for(var i=1;i<item.optionCount+1;i++){
                var z = String.fromCharCode(char+i);
                var q =$("<div>").addClass("radio").append($("<input type='radio' name='options'>").val(z)).append($("<span>").text(item[z]));
                y.append(q);
                }
                var qq=$("<button>").addClass("btn btn-primary vote").text("Vote");
                var ww=$("<button>").addClass("btn btn-secondary showResult").text("Show Result");
                var x = $("<div>").addClass("panel panel-primary ")
                .append($("<div>").addClass("panel-heading").text(item.pollName).append("<span class='pull-right clickable panel-collapsed'><i class='fa fa-arrow-up'></i></span>"))
                .append($("<div>").addClass("panel-body").attr("id",item.pollName).text(item.pollQuestion).append(y).append(qq).append(ww));
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
    if($("#options li").length>3){
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
  
  $(".vote").on("click",function(){
  
  $(this).parent().attr("id")
  
  });
  
  $(".showResult").on("click",function(){});
  
})